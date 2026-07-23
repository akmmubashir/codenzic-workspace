import React from 'react';
import type { AttendanceRecord } from '../../lib/types';
import { Badge, Card } from '../ui/Primitives';

export function AttendanceHistory({ records }: { records: AttendanceRecord[] }) {
  return (
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
            {records.map((record) => (
              <tr key={record.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-content">
                  {new Date(record.date).toLocaleDateString(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="px-4 py-3 text-muted">{record.checkIn ?? '-'}</td>
                <td className="px-4 py-3 text-muted">{record.checkOut ?? '-'}</td>
                <td className="px-4 py-3 tabular-nums text-content">
                  {record.workedHours ? `${record.workedHours}h` : '-'}
                </td>
                <td className="px-4 py-3 text-muted">{record.mode}</td>
                <td className="px-4 py-3">
                  <Badge label={record.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
