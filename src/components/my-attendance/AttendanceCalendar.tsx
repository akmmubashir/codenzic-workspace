import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { AttendanceRecord, AttendanceStatus } from '../../lib/types';
import { cn } from '../../lib/ui';
import { Card } from '../ui/Primitives';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const statusStyles: Partial<Record<AttendanceStatus, string>> = {
  Present: 'bg-emerald-500',
  Late: 'bg-amber-500',
  'Work From Home': 'bg-sky-500',
  'On Leave': 'bg-violet-500',
  Absent: 'bg-rose-500',
  'Half Day': 'bg-orange-500',
};

function fromIsoDate(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function AttendanceCalendar({ records }: { records: AttendanceRecord[] }) {
  const [month, setMonth] = useState(() => {
    const latest = records[0]?.date;
    const date = latest ? fromIsoDate(latest) : new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(records[0]?.date ?? null);

  const recordsByDate = useMemo(() => new Map(records.map((record) => [record.date, record])), [records]);
  const days = useMemo(() => {
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    return Array.from({ length: firstDay.getDay() + daysInMonth }, (_, index) =>
      index < firstDay.getDay() ? null : new Date(month.getFullYear(), month.getMonth(), index - firstDay.getDay() + 1)
    );
  }, [month]);

  const selected = selectedDate ? recordsByDate.get(selectedDate) : undefined;
  const today = dateKey(new Date());
  const monthLabel = month.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

  return (
    <Card className="mt-6 p-4 sm:p-5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold text-content">Attendance calendar</h2>
          <p className="mt-0.5 text-sm text-muted">Select a day to see its attendance details.</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => setMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))}
            className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-bg hover:text-content"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="min-w-28 text-center text-sm font-semibold text-content">{monthLabel}</span>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => setMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))}
            className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-bg hover:text-content"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((day) => (
          <div key={day} className="py-1 text-xs font-medium text-muted">
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          if (!day) return <div key={`blank-${index}`} aria-hidden="true" />;
          const key = dateKey(day);
          const record = recordsByDate.get(key);
          const isSelected = selectedDate === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedDate(key)}
              className={cn(
                'relative mx-auto grid h-9 w-9 place-items-center rounded-full text-sm font-medium transition-colors sm:h-10 sm:w-10',
                isSelected
                  ? 'bg-primary text-white'
                  : key === today
                    ? 'bg-primary/10 text-primary'
                    : 'text-content hover:bg-bg'
              )}
            >
              {day.getDate()}
              {record && (
                <span
                  className={cn(
                    'absolute bottom-0.5 h-1.5 w-1.5 rounded-full ring-1 ring-surface',
                    statusStyles[record.status] ?? 'bg-slate-400'
                  )}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-4 text-xs text-muted">
        {Object.entries(statusStyles)
          .slice(0, 5)
          .map(([status, color]) => (
            <span key={status} className="inline-flex items-center gap-1.5">
              <i className={cn('h-2 w-2 rounded-full', color)} />
              {status}
            </span>
          ))}
      </div>
      <div className="mt-4 rounded-lg bg-bg px-3 py-2.5 text-sm">
        {selected ? (
          <>
            <span className="font-semibold text-content">
              {fromIsoDate(selected.date).toLocaleDateString(undefined, {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
              })}
            </span>
            <span className="text-muted">
              {' '}
              · {selected.status}
              {selected.checkIn ? ` · ${selected.checkIn} – ${selected.checkOut ?? 'In progress'}` : ''}
            </span>
          </>
        ) : (
          <span className="text-muted">No attendance record for this day.</span>
        )}
      </div>
    </Card>
  );
}
