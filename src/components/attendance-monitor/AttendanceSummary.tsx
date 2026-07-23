import React from 'react';
import { Stat } from '../ui/Primitives';

export function AttendanceSummary() {
  return (
    <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
      <Stat label="Present" value={11} tone="text-emerald-600" />
      <Stat label="Late" value={2} tone="text-amber-600" />
      <Stat label="Remote" value={3} tone="text-sky-600" />
      <Stat label="On leave" value={1} tone="text-violet-600" />
    </div>
  );
}
