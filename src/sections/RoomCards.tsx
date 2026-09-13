import { Room } from '../types';
import { ROOMS, SITE, BOOKING } from '../data';
import { Users, LayoutGrid, Bed, Check, Sparkles, ThumbsUp, Phone } from 'lucide-react';
import { motion } from 'motion/react';

interface RoomCardsProps {
  selectedRoomId: string;
  onSelectRoom: (roomId: string) => void;
  onDirectBook: () => void;
}

export default function RoomCards({ selectedRoomId, onSelectRoom, onDirectBook }: RoomCardsProps) {
  const content = SITE.rooms;

  return (
    <section id="rooms" className="w-full py-20 bg-[#f2ede4]/40 border-y border-[#1e3d2f]/5">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center md:text-left max-w-xl mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#c97d60] font-bold">{content.eyebrow}</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1e3d2f] mt-2 mb-4">
            {content.heading}
          </h2>
          <p className="text-sm md:text-base text-[#1c1a18]/70 leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {ROOMS.map((room: Room) => {
            const isSelected = selectedRoomId === room.id;

            return (
              <motion.div
                id={`room-card-${room.id}`}
                key={room.id}
                className={`flex flex-col h-full rounded-2xl bg-[#faf7f2] border transition-all duration-500 overflow-hidden ${
                  isSelected 
                    ? 'shadow-2xl border-[#1e3d2f] ring-1 ring-[#1e3d2f]' 
                    : 'shadow-md border-[#1e3d2f]/10 hover:border-[#1e3d2f]/30'
                }`}
                whileHover={{ y: -6 }}
              >
                {/* Image Section */}
                <div className="relative aspect-[16/9] overflow-hidden group">
                  <img
                    src={room.image}
                    alt={room.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Floating Price Pill */}
                  <div className="absolute top-4 right-4 bg-[#1e3d2f] px-3.5 py-1.5 rounded-full text-white font-mono text-xs font-semibold shadow-md">
                    {BOOKING.currencySymbol}{room.pricePerNight} <span className="text-white/70 font-normal"> / night</span>
                  </div>

                  {/* Booking selection ribbon */}
                  {isSelected && (
                    <div className="absolute left-4 top-4 bg-[#c97d60] text-white text-[10px] font-mono uppercase tracking-widest font-bold px-3 py-1 rounded-md shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-white" />
                      <span>{content.activeSelectionLabel}</span>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header Details */}
                    <div className="flex justify-between items-baseline mb-1.5">
                      <h3 className="font-serif text-lg md:text-xl font-bold text-[#1e3d2f]">
                        {room.name}
                      </h3>
                      <span className="font-mono text-xs text-[#c97d60] font-semibold tracking-wider">
                        {BOOKING.currencySymbol}{room.pricePerNight * 2} {content.minNightsSuffix}
                      </span>
                    </div>

                    <p className="text-xs text-[#1c1a18]/75 mb-3 leading-relaxed line-clamp-1">
                      {room.shortDesc}
                    </p>

                    {/* Specifications grid for mobile/desktop layout */}
                    <div className="grid grid-cols-3 gap-2 border-y border-[#1e3d2f]/5 py-2 mb-3 text-center">
                      <div className="flex flex-col items-center">
                        <Users className="w-3.5 h-3.5 text-[#c97d60] mb-0.5" />
                        <span className="text-[9px] font-mono text-[#1c1a18]/50 uppercase tracking-widest">{content.sleepsLabel}</span>
                        <span className="text-xs font-bold text-[#1e3d2f] mt-0.5">{room.capacity} {content.guestsSuffix}</span>
                      </div>
                      <div className="flex flex-col items-center border-x border-[#1e3d2f]/5">
                        <LayoutGrid className="w-3.5 h-3.5 text-[#c97d60] mb-0.5" />
                        <span className="text-[9px] font-mono text-[#1c1a18]/50 uppercase tracking-widest">{content.areaLabel}</span>
                        <span className="text-xs font-bold text-[#1e3d2f] mt-0.5">{room.sizeSqFt} {content.areaSuffix}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Bed className="w-3.5 h-3.5 text-[#c97d60] mb-0.5" />
                        <span className="text-[9px] font-mono text-[#1c1a18]/50 uppercase tracking-widest">{content.bedsLabel}</span>
                        <span className="text-xs font-bold text-[#1e3d2f] mt-0.5 tracking-tight truncate max-w-full">
                          {room.bedType}
                        </span>
                      </div>
                    </div>

                    {/* Features checklist */}
                    <div className="mb-3">
                      <p className="font-mono text-[9px] uppercase font-bold text-[#1c1a18]/40 tracking-wider mb-1.5">
                        {content.highlightsLabel}
                      </p>
                      <ul className="space-y-1">
                        {room.features.slice(0, 3).map((feat, index) => (
                          <li key={index} className="flex items-start gap-1.5 text-xs text-[#1c1a18]/80">
                            <Check className="w-3.5 h-3.5 text-[#1e3d2f] stroke-[3] mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-1">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Interactive Buttons */}
                  <div className="pt-3 border-t border-[#1e3d2f]/5 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        onSelectRoom(room.id);
                        // Smooth scroll down to the booking desk
                        const bookingForm = document.getElementById('booking-desk');
                        if (bookingForm) {
                          bookingForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }}
                      className={`w-full py-2.5 rounded-xl text-[10px] font-mono uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-[#c97d60] text-[#faf7f2] shadow-md shadow-[#c97d60]/10 hover:bg-[#c97d60]/95'
                          : 'bg-[#1e3d2f]/5 text-[#1e3d2f] hover:bg-[#1e3d2f] hover:text-[#faf7f2]'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <ThumbsUp className="w-3 h-3 text-white fill-white" />
                          <span>{content.selectedButtonLabel}</span>
                        </>
                      ) : (
                        content.selectButtonLabel
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={onDirectBook}
                      className="w-full py-2.5 rounded-xl text-[10px] font-mono uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-1 border border-[#1e3d2f]/15 text-[#1e3d2f] hover:border-[#1e3d2f]/40 hover:bg-[#1e3d2f]/5"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{BOOKING.directBookingTitle}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
