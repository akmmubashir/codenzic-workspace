

import React from 'react';
import { useApp } from '../lib/store';
import { empById } from '../lib/seed';
import { PageHeader, Card, Badge, Avatar, Stat } from '../components/ui/Primitives';

export function TeamEOD() {
  const { eodReports } = useApp();
  return (
    <div>
      <PageHeader title="Team EOD" subtitle="Daily reports and blockers across your team" />
      <div className="mb-6 grid grid-cols-3 gap-4">
        <Stat label="Submitted" value={eodReports.length} tone="text-emerald-600" />
        <Stat label="Pending" value={4} tone="text-amber-600" />
        <Stat label="Open blockers" value={eodReports.filter((e) => e.blockers).length} tone="text-rose-600" />
      </div>
      <div className="space-y-3">
        {eodReports.map((e) => {
          const emp = empById(e.employeeId)!;
          return (
            <Card key={e.id} className="p-4">
              <div className="flex items-center gap-3">
                <Avatar src={emp.avatar} alt={emp.name} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-content">{emp.name}</p>
                    <Badge label={e.status} />
                  </div>
                  <p className="text-xs text-muted">{emp.jobTitle}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-content">{e.summary}</p>
              {e.blockers &&
              <div className="mt-2 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-400">
                  🚧 {e.blockers}
                </div>
              }
            </Card>);

        })}
      </div>
    </div>);

}