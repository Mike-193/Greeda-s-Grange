import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BookedRange } from '../types';
import { BOOKING } from '../data';

interface AvailabilityCalendarProps {
  checkIn: string; // ISO yyyy-mm-dd, '' if unset
  checkOut: string; // ISO yyyy-mm-dd, '' if unset
  onChange: (checkIn: string, checkOut: string) => void;
  bookedRanges: BookedRange[];
}

const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTH_LABEL_FORMAT = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });

function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function isBooked(iso: string, bookedRanges: BookedRange[]): boolean {
  return bookedRanges.some((r) => iso >= r.start && iso < r.end);
}

export default function AvailabilityCalendar({ checkIn, checkOut, onChange, bookedRanges }: AvailabilityCalendarProps) {
  const todayIso = toIsoDate(new Date());
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(checkIn ? new Date(checkIn) : new Date()));

  const canGoPrev = viewMonth > startOfMonth(new Date());

  const goPrevMonth = () => {
    if (!canGoPrev) return;
    setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1));
  };
  const goNextMonth = () => {
    setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1));
  };

  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
  const leadingBlanks = viewMonth.getDay();
  const cells: (string | null)[] = [
    ...Array(leadingBlanks).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => toIsoDate(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), i + 1))),
  ];

  const handleDayClick = (iso: string) => {
    if (iso < todayIso || isBooked(iso, bookedRanges)) return;

    // No selection yet, or a full range already chosen — start fresh
    if (!checkIn || (checkIn && checkOut)) {
      onChange(iso, '');
      return;
    }

    // Clicking on/before the current check-in restarts the selection
    if (iso <= checkIn) {
      onChange(iso, '');
      return;
    }

    // Reject a span that crosses over a booked date in between
    let cursor = new Date(checkIn);
    cursor.setDate(cursor.getDate() + 1);
    const endDate = new Date(iso);
    let crossesBooked = false;
    while (cursor < endDate) {
      if (isBooked(toIsoDate(cursor), bookedRanges)) {
        crossesBooked = true;
        break;
      }
      cursor.setDate(cursor.getDate() + 1);
    }

    if (crossesBooked) {
      onChange(iso, '');
      return;
    }

    onChange(checkIn, iso);
  };

  return (
    <div className="bg-white border border-[#1e3d2f]/15 rounded-xl p-2.5">
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={goPrevMonth}
          disabled={!canGoPrev}
          className="p-1 rounded-lg text-[#1e3d2f] hover:bg-[#1e3d2f]/5 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <span className="font-serif font-bold text-xs text-[#1e3d2f]">
          {MONTH_LABEL_FORMAT.format(viewMonth)}
        </span>
        <button
          type="button"
          onClick={goNextMonth}
          className="p-1 rounded-lg text-[#1e3d2f] hover:bg-[#1e3d2f]/5 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5 mb-0.5">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className="text-center text-[8px] font-mono uppercase text-[#1c1a18]/40 py-0.5">
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((iso, idx) => {
          if (!iso) return <div key={`blank-${idx}`} />;

          const disabled = iso < todayIso || isBooked(iso, bookedRanges);
          const isCheckIn = iso === checkIn;
          const isCheckOut = iso === checkOut;
          const inRange = checkIn && checkOut && iso > checkIn && iso < checkOut;

          return (
            <button
              key={iso}
              type="button"
              onClick={() => handleDayClick(iso)}
              disabled={disabled}
              title={disabled && isBooked(iso, bookedRanges) ? 'Not available' : undefined}
              className={`h-7 w-full rounded-md text-[11px] font-mono flex items-center justify-center transition-colors ${
                disabled
                  ? isBooked(iso, bookedRanges)
                    ? 'text-[#1c1a18]/25 line-through cursor-not-allowed bg-[#1c1a18]/[0.03]'
                    : 'text-[#1c1a18]/20 cursor-not-allowed'
                  : isCheckIn || isCheckOut
                  ? 'bg-[#1e3d2f] text-white font-bold'
                  : inRange
                  ? 'bg-[#c97d60]/15 text-[#1e3d2f]'
                  : 'text-[#1c1a18]/80 hover:bg-[#1e3d2f]/5 cursor-pointer'
              }`}
            >
              {Number(iso.slice(8, 10))}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3 mt-2 pt-2 border-t border-[#1e3d2f]/5 text-[8px] font-mono uppercase text-[#1c1a18]/50">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded bg-[#1e3d2f]"></span> {BOOKING.calendarLegendSelected}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded bg-[#c97d60]/15"></span> {BOOKING.calendarLegendInRange}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded bg-[#1c1a18]/10"></span> {BOOKING.calendarLegendUnavailable}
        </span>
      </div>
    </div>
  );
}
