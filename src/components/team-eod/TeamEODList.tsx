import React from 'react';
import type { EODReport } from '../../lib/types';
import { empById } from '../../lib/seed';
import { Avatar, Badge, Card } from '../ui/Primitives';

export function TeamEODList({ reports }: { reports: EODReport[] }) {
  return <div className="space-y-3">{reports.map((report) => { const employee = empById(report.employeeId); return employee ? <Card key={report.id} className="p-4"><div className="flex items-center gap-3"><Avatar src={employee.avatar} alt={employee.name} /><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="font-medium text-content">{employee.name}</p><Badge label={report.status} /></div><p className="text-xs text-muted">{employee.jobTitle}</p></div></div><p className="mt-3 text-sm text-content">{report.summary}</p>{report.blockers && <div className="mt-2 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-400">Blocker: {report.blockers}</div>}</Card> : null; })}</div>;
}
