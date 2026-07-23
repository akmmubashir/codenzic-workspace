import React from 'react';
import type { AttendanceRecord } from '../../lib/types';
import { Stat } from '../ui/Primitives';

export function AttendanceOverview({ records }: { records: AttendanceRecord[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-2">
      <Stat label="Avg. hours / day" value="8.2h" tone="text-primary" />
      <Stat
        label="Present days"
        value={`${records.filter((record) => record.status !== 'On Leave').length}/5`}
        tone="text-emerald-600"
      />
      <Stat
        label="Late arrivals"
        value={records.filter((record) => record.status === 'Late').length}
        tone="text-amber-600"
      />
    </div>
  );
}
