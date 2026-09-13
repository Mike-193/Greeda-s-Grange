import { useState, useRef, useEffect } from 'react';
import { CalendarDays } from 'lucide-react';
import AvailabilityCalendar from './AvailabilityCalendar';
import { BookedRange } from '../types';
import { BOOKING } from '../data';

interface DateRangePickerProps {
  checkIn: string;
  checkOut: string;
  onChange: (checkIn: string, checkOut: string) => void;
  bookedRanges: BookedRange[];
  checkInLabel: string;
  checkOutLabel: string;
}

export default function DateRangePicker({
  checkIn,
  checkOut,
  onChange,
  bookedRanges,
  checkInLabel,
  checkOutLabel,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleCalendarChange = (newCheckIn: string, newCheckOut: string) => {
    onChange(newCheckIn, newCheckOut);
    if (newCheckIn && newCheckOut) {
      setIsOpen(false); // a complete range was picked, close automatically
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`text-left p-3 bg-white border rounded-lg transition-colors flex items-center justify-between gap-2 ${
            isOpen ? 'border-[#1e3d2f]' : 'border-[#1e3d2f]/15 hover:border-[#1e3d2f]/40'
          }`}
        >
          <span>
            <span className="block text-[10px] font-mono uppercase tracking-wider text-[#1c1a18]/50 mb-0.5">
              {checkInLabel}
            </span>
            <span className="font-serif text-sm font-bold text-[#1e3d2f]">{checkIn || BOOKING.selectDatePlaceholder}</span>
          </span>
          <CalendarDays className="w-4 h-4 text-[#c97d60] flex-shrink-0" />
        </button>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`text-left p-3 bg-white border rounded-lg transition-colors flex items-center justify-between gap-2 ${
            isOpen ? 'border-[#1e3d2f]' : 'border-[#1e3d2f]/15 hover:border-[#1e3d2f]/40'
          }`}
        >
          <span>
            <span className="block text-[10px] font-mono uppercase tracking-wider text-[#1c1a18]/50 mb-0.5">
              {checkOutLabel}
            </span>
            <span className="font-serif text-sm font-bold text-[#1e3d2f]">{checkOut || BOOKING.selectDatePlaceholder}</span>
          </span>
          <CalendarDays className="w-4 h-4 text-[#c97d60] flex-shrink-0" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-30 top-full left-0 mt-2 w-[280px] shadow-2xl rounded-xl overflow-hidden">
          <AvailabilityCalendar
            checkIn={checkIn}
            checkOut={checkOut}
            onChange={handleCalendarChange}
            bookedRanges={bookedRanges}
          />
        </div>
      )}
    </div>
  );
}
