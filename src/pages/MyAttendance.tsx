import React from 'react';
import { useApp } from '../lib/store';
import { PageHeader } from '../components/ui/Primitives';
import { CheckInWidget } from '../components/my-attendance/CheckInWidget';
import { AttendanceOverview } from '../components/my-attendance/AttendanceOverview';
import { AttendanceHistory } from '../components/my-attendance/AttendanceHistory';
import { AttendanceCalendar } from '../components/my-attendance/AttendanceCalendar';

export function MyAttendance() {
  const { currentUserId, attendanceRecords } = useApp();
  const records = attendanceRecords.filter((record) => record.employeeId === currentUserId());
  return (
    <div>
      <PageHeader title="My Attendance" subtitle="Your check-in history and working hours" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <CheckInWidget />
        </div>
        <AttendanceOverview records={records} />
      </div>
      <AttendanceHistory records={records} />
      <AttendanceCalendar records={records} />
    </div>
  );
}
