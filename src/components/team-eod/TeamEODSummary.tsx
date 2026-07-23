import React from 'react';
import type { EODReport } from '../../lib/types';
import { Stat } from '../ui/Primitives';

export function TeamEODSummary({ reports }: { reports: EODReport[] }) {
  return <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3"><Stat label="Submitted" value={reports.length} tone="text-emerald-600" /><Stat label="Pending" value={4} tone="text-amber-600" /><Stat label="Open blockers" value={reports.filter((report) => report.blockers).length} tone="text-rose-600" /></div>;
}
