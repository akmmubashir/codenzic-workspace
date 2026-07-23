

import React from 'react';
import { useApp } from '../lib/store';
import { attendance } from '../lib/seed';
import { PageHeader, Card, Badge, Stat } from '../components/ui/Primitives';
import { CheckInWidget } from '../components/my-attendance/CheckInWidget';

export function MyAttendance() {
  const { currentUserId } = useApp();
  const mine = attendance.filter((a) => a.employeeId === currentUserId());

  return (
    <div>
      <PageHeader title="My Attendance" subtitle="Your check-in history and working hours" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1"><CheckInWidget /></div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-2">
          <Stat label="Avg. hours / day" value="8.2h" tone="text-primary" />
          <Stat label="Present days" value={`${mine.filter((m) => m.status !== 'On Leave').length}/5`} tone="text-emerald-600" />
          <Stat label="Late arrivals" value={mine.filter((m) => m.status === 'Late').length} tone="text-amber-600" />
        </div>
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="overflow-x-auto">
        <table className="min-w-[680px] w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Check in</th>
              <th className="px-4 py-3 font-medium">Check out</th>
              <th className="px-4 py-3 font-medium">Hours</th>
              <th className="px-4 py-3 font-medium">Mode</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {mine.map((m) =>
            <tr key={m.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-content">
                  {new Date(m.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                </td>
                <td className="px-4 py-3 text-muted">{m.checkIn ?? '-'}</td>
                <td className="px-4 py-3 text-muted">{m.checkOut ?? '-'}</td>
                <td className="px-4 py-3 tabular-nums text-content">{m.workedHours ? `${m.workedHours}h` : '-'}</td>
                <td className="px-4 py-3 text-muted">{m.mode}</td>
                <td className="px-4 py-3"><Badge label={m.status} /></td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </Card>
    </div>);

}
