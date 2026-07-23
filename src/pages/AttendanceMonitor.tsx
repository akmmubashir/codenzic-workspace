import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { employees } from '../lib/seed';
import { useApp } from '../lib/store';
import { PageHeader } from '../components/ui/Primitives';
import { AttendanceSummary } from '../components/attendance-monitor/AttendanceSummary';
import { AttendanceTable } from '../components/attendance-monitor/AttendanceTable';
import { LateReasonReviewList } from '../components/attendance-monitor/LateReasonReviewList';

export function AttendanceMonitor() {
  const [query, setQuery] = useState('');
  const { attendanceRecords } = useApp();
  const rows = employees
    .map((emp) => ({ emp, rec: attendanceRecords.find((record) => record.employeeId === emp.id) }))
    .filter(({ emp }) => emp.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <PageHeader title="Attendance Monitor" subtitle="Live view of who's in, late, remote or on leave" />
      <AttendanceSummary />
      <AttendanceTable rows={rows}>
        <div className="border-b border-border p-3">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search employee…"
              className="h-9 w-full rounded-lg border border-border bg-bg pl-9 pr-3 text-sm text-content focus:border-secondary focus:outline-none"
            />
          </div>
        </div>
      </AttendanceTable>
      <LateReasonReviewList />
    </div>
  );
}
