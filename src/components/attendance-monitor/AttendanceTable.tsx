import React from 'react';
import type { AttendanceRecord, Employee } from '../../lib/types';
import { Avatar, Badge, Card } from '../ui/Primitives';

type AttendanceRow = { emp: Employee; rec?: AttendanceRecord };

export function AttendanceTable({ rows, children }: { rows: AttendanceRow[]; children?: React.ReactNode }) {
  return (
    <Card className="overflow-hidden">
      {children}
      <div className="overflow-x-auto">
        <table className="min-w-[680px] w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-medium">Employee</th>
              <th className="px-4 py-3 font-medium">Department</th>
              <th className="px-4 py-3 font-medium">Check in</th>
              <th className="px-4 py-3 font-medium">Hours</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ emp, rec }) => (
              <tr key={emp.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar src={emp.avatar} alt={emp.name} size={32} />
                    <div>
                      <p className="font-medium text-content">{emp.name}</p>
                      <p className="text-xs text-muted">{emp.jobTitle}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted">{emp.department}</td>
                <td className="px-4 py-3 text-muted">{rec?.checkIn ?? '—'}</td>
                <td className="px-4 py-3 tabular-nums text-content">
                  {rec?.workedHours ? `${rec.workedHours}h` : '—'}
                </td>
                <td className="px-4 py-3">
                  <Badge label={rec?.status ?? 'Absent'} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
