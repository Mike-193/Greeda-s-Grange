import { Phone, X } from 'lucide-react';
import { useEffect } from 'react';
import { BOOKING } from '../data';

interface DirectBookingModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DirectBookingModal({ open, onClose }: DirectBookingModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const phone = BOOKING.directBookingPhone;
  const tel = phone.replace(/[^+\d]/g, '');

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="direct-booking-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md rounded-2xl border border-[#1e3d2f]/10 bg-[#faf7f2] p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#c97d60]">Direct Booking</span>
            <h2 id="direct-booking-title" className="mt-1 font-serif text-2xl font-bold text-[#1e3d2f]">
              {BOOKING.directBookingTitle}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#1e3d2f]/60 transition-colors hover:bg-[#1e3d2f]/5 hover:text-[#1e3d2f]"
            aria-label="Close booking dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-[#1c1a18]/70">{BOOKING.directBookingMessage}</p>

        <a
          href={`tel:${tel}`}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1e3d2f] px-5 py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-lg transition hover:bg-[#1e3d2f]/90"
        >
          <Phone className="h-4 w-4" />
          {BOOKING.directBookingPhone}
        </a>

        <p className="mt-3 text-center text-[10px] font-mono uppercase tracking-wider text-[#1c1a18]/45">
          {BOOKING.directBookingNote}
        </p>
      </div>
    </div>
  );
}
