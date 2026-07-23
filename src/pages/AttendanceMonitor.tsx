

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { attendance, employees, empById } from '../lib/seed';
import { PageHeader, Card, Badge, Avatar, Stat } from '../components/ui/Primitives';

export function AttendanceMonitor() {
  const [q, setQ] = useState('');
  const todays = employees.map((e) => {
    const rec = attendance.find((a) => a.employeeId === e.id);
    return { emp: e, rec };
  }).filter(({ emp }) => emp.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <PageHeader title="Attendance Monitor" subtitle="Live view of who's in, late, remote or on leave" />
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Present" value={11} tone="text-emerald-600" />
        <Stat label="Late" value={2} tone="text-amber-600" />
        <Stat label="Remote" value={3} tone="text-sky-600" />
        <Stat label="On leave" value={1} tone="text-violet-600" />
      </div>

      <Card className="overflow-hidden">
        <div className="border-b border-border p-3">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search employee…"
              className="h-9 w-full rounded-lg border border-border bg-bg pl-9 pr-3 text-sm text-content focus:border-secondary focus:outline-none" />
            
          </div>
        </div>
        <table className="w-full text-sm">
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
            {todays.map(({ emp, rec }) =>
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
                <td className="px-4 py-3 tabular-nums text-content">{rec?.workedHours ? `${rec.workedHours}h` : '—'}</td>
                <td className="px-4 py-3"><Badge label={rec?.status ?? 'Absent'} /></td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>);

}