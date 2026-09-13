import { useState, FormEvent } from 'react';
import { Room } from '../types';
import { ROOMS, SITE, BOOKING } from '../data';
import { Calendar, Users, FileText, CheckCircle2, ShieldCheck, Info, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import DateRangePicker from '../components/DateRangePicker';

interface BookingFormProps {
  selectedRoomId: string;
  onSelectRoom: (roomId: string) => void;
}

export default function BookingForm({ selectedRoomId, onSelectRoom }: BookingFormProps) {
  const content = SITE.bookingSection;
  const activeRoom = ROOMS.find((r) => r.id === selectedRoomId) || ROOMS[0];

  const [checkIn, setCheckIn] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [checkOut, setCheckOut] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d.toISOString().split('T')[0];
  });
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestsCount, setGuestsCount] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const calculateNights = (): number => {
    if (!checkIn || !checkOut) return 0;
    const diffTime = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return diffTime > 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : 0;
  };

  const nights = calculateNights();
  const rawSubtotal = nights * activeRoom.pricePerNight;
  const hospitalityTax = Math.round(rawSubtotal * BOOKING.taxRate);
  const cleanFee = BOOKING.cleanFee;
  const totalPrice = rawSubtotal > 0 ? rawSubtotal + hospitalityTax + cleanFee : 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitted(false);

    if (!guestName.trim()) return setErrorMsg('Please provide your name.');
    if (!guestEmail.trim() || !/^\S+@\S+\.\S+$/.test(guestEmail)) return setErrorMsg('Please provide a valid e-mail.');
    if (!checkIn || !checkOut) return setErrorMsg('Please select your check-in and check-out dates.');
    if (nights < BOOKING.minNights) return setErrorMsg(content.minNightsError);
    if (guestsCount > activeRoom.capacity) return setErrorMsg(`The maximum occupancy for ${activeRoom.name} is ${activeRoom.capacity} guests.`);
    if (!BOOKING.whatsappNumber) return setErrorMsg('WhatsApp booking is not configured yet. Please contact the property directly.');

    const message = [
      BOOKING.whatsappMessageIntro,
      '',
      `Name: ${guestName.trim()}`,
      `Phone: ${guestPhone.trim() || 'Not provided'}`,
      `Email: ${guestEmail.trim()}`,
      `Check-in: ${checkIn}`,
      `Check-out: ${checkOut}`,
      `Guests: ${guestsCount}`,
      `Room/Lodge: ${activeRoom.name}`,
      `Estimated total: ${BOOKING.currencySymbol}${totalPrice}`,
      `Message: ${specialRequests.trim() || 'None'}`,
    ].join('\n');

    const whatsappUrl = `https://wa.me/${BOOKING.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    setSubmitted(true);
    window.location.href = whatsappUrl;
  };

  return (
    <section id="booking-desk" className="w-full py-24 bg-[#f2ede4]/40 border-b border-[#1e3d2f]/5 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="col-span-1 lg:col-span-7 bg-[#faf7f2] rounded-2xl border border-[#1e3d2f]/10 p-6 md:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-[#c97d60]" />
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#c97d60] font-bold">{content.eyebrow}</span>
                <h3 className="font-serif text-2xl md:text-3xl font-semibold text-[#1e3d2f]">{content.heading}</h3>
              </div>
            </div>

            <div className="mb-6 rounded-xl border border-[#c97d60]/20 bg-[#c97d60]/5 p-4">
              <div className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#c97d60]" />
                <div>
                  <p className="font-serif text-sm font-bold text-[#1e3d2f]">Quote requests go directly to WhatsApp</p>
                  <p className="mt-1 text-xs leading-relaxed text-[#1c1a18]/65">Complete the form below. After validation, WhatsApp will open with a ready-to-send message.</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#1c1a18]/60 mb-2 font-bold">{content.roomLabel}</label>
                <select value={selectedRoomId} onChange={(e) => onSelectRoom(e.target.value)} className="w-full bg-white border border-[#1e3d2f]/15 p-3 rounded-lg text-sm text-[#1c1a18] font-serif focus:outline-none focus:ring-1 focus:ring-[#1e3d2f]">
                  {ROOMS.map((r: Room) => <option key={r.id} value={r.id}>{r.name} — {BOOKING.currencySymbol}{r.pricePerNight} per night (Fits max {r.capacity} guests)</option>)}
                </select>
              </div>

              <DateRangePicker
                checkIn={checkIn}
                checkOut={checkOut}
                onChange={(newCheckIn, newCheckOut) => { setCheckIn(newCheckIn); setCheckOut(newCheckOut); }}
                bookedRanges={[]}
                checkInLabel={content.checkInLabel}
                checkOutLabel={content.checkOutLabel}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#1c1a18]/60 mb-2 font-bold">{content.nameLabel}</label>
                  <input type="text" value={guestName} onChange={(e) => setGuestName(e.target.value)} placeholder={content.namePlaceholder} className="w-full bg-white border border-[#1e3d2f]/15 p-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3d2f]" required />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#1c1a18]/60 mb-2 font-bold">{content.emailLabel}</label>
                  <input type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} placeholder={content.emailPlaceholder} className="w-full bg-white border border-[#1e3d2f]/15 p-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3d2f]" required />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#1c1a18]/60 mb-2 font-bold">{content.guestsLabel}</label>
                  <input type="number" value={guestsCount} onChange={(e) => setGuestsCount(parseInt(e.target.value) || 1)} min="1" max={activeRoom.capacity} className="w-full bg-white border border-[#1e3d2f]/15 p-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3d2f]" required />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#1c1a18]/60 mb-2 font-bold">{content.phoneLabel} <span className="text-stone-400 font-normal">{content.phoneOptional}</span></label>
                  <input type="tel" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} placeholder={content.phonePlaceholder} className="w-full bg-white border border-[#1e3d2f]/15 p-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3d2f]" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#1c1a18]/60 mb-2 font-bold">{content.requestsLabel}</label>
                <textarea value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} placeholder={content.requestsPlaceholder} rows={3} className="w-full bg-white border border-[#1e3d2f]/15 p-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3d2f] resize-none" />
              </div>

              {errorMsg && <div className="p-4 bg-orange-50 border-l-4 border-[#c97d60] rounded-r-lg text-xs font-mono text-[#c97d60] flex items-center gap-2"><Info className="w-4 h-4 flex-shrink-0" /><span>{errorMsg}</span></div>}

              <div className="bg-[#1e3d2f]/5 border border-[#1e3d2f]/10 p-5 rounded-xl space-y-3">
                <div className="flex justify-between text-xs text-[#1c1a18]/70"><span>{activeRoom.name} x {nights} {content.subtotalLabelSuffix}{nights !== 1 ? 's' : ''}</span><span className="font-mono text-xs font-semibold">{BOOKING.currencySymbol}{rawSubtotal}</span></div>
                <div className="flex justify-between text-xs text-[#1c1a18]/70"><span>{content.taxLabel} ({Math.round(BOOKING.taxRate * 100)}%)</span><span className="font-mono text-xs font-semibold">{BOOKING.currencySymbol}{hospitalityTax}</span></div>
                <div className="flex justify-between text-xs text-[#1c1a18]/70"><span>{content.cleanFeeLabel}</span><span className="font-mono text-xs font-semibold">{BOOKING.currencySymbol}{cleanFee}</span></div>
                <div className="border-t border-[#1e3d2f]/10 pt-3.5 flex justify-between items-baseline font-serif"><span className="font-bold text-[#1e3d2f] text-base">{content.totalLabel}</span><span className="font-mono text-xl font-bold text-[#1e3d2f]">{BOOKING.currencySymbol}{totalPrice}</span></div>
                {nights < BOOKING.minNights && <p className="text-[10px] font-mono text-[#c97d60] mt-1 italic">{content.minNightsNotice}</p>}
              </div>

              <button type="submit" className="w-full py-4 bg-[#1e3d2f] hover:bg-[#1e3d2f]/95 text-white rounded-xl font-mono text-xs uppercase tracking-widest font-bold shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2">
                <MessageCircle className="h-4 w-4" />
                {content.submitButtonLabel}
              </button>
            </form>
          </div>

          <div className="col-span-1 lg:col-span-5 space-y-8">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="submitted" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#1e3d2f] text-[#faf7f2] rounded-2xl p-6 border border-[#2d493a] shadow-2xl">
                  <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-[#2d493a]">
                    <div className="p-2 bg-[#c97d60] rounded-xl text-white"><CheckCircle2 className="w-5 h-5" /></div>
                    <div><h4 className="font-serif font-bold text-lg leading-tight">WhatsApp is ready</h4><p className="text-[10px] font-mono text-[#faf7f2]/60 uppercase tracking-widest mt-0.5">Your quote details are pre-filled</p></div>
                  </div>
                  <p className="text-xs leading-relaxed text-[#faf7f2]/75">WhatsApp should open with your request already filled in. Review the message and press Send to contact the property.</p>
                  <div className="mt-6 p-3 bg-[#2d493a]/40 border border-[#2d493a] rounded-lg flex items-start gap-2.5"><ShieldCheck className="w-4 h-4 text-[#c97d60] flex-shrink-0 mt-0.5" /><p className="text-[9px] text-[#faf7f2]/70 leading-normal">No payment is taken by this form. The property will confirm availability and final pricing directly.</p></div>
                </motion.div>
              ) : (
                <div key="no-ticket" className="bg-[#1e3d2f]/5 border-2 border-dashed border-[#1e3d2f]/15 rounded-2xl p-8 flex flex-col items-center text-center justify-center min-h-[220px]"><FileText className="w-10 h-10 text-[#1e3d2f]/20 mb-4" /><h4 className="font-serif font-bold text-base text-[#1e3d2f]">{content.emptyStateTitle}</h4><p className="text-xs text-[#1c1a18]/60 mt-1.5 max-w-xs leading-relaxed">{content.emptyStateText}</p></div>
              )}
            </AnimatePresence>

            <div className="rounded-2xl border border-[#1e3d2f]/10 bg-white p-6 shadow-md">
              <div className="flex items-start gap-3"><Users className="mt-0.5 h-5 w-5 text-[#c97d60]" /><div><h4 className="font-serif font-bold text-sm text-[#1e3d2f]">Direct booking</h4><p className="mt-1 text-xs leading-relaxed text-stone-500">Prefer a phone call? Use the direct-booking button to ask about availability and any direct-booking discount.</p></div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
