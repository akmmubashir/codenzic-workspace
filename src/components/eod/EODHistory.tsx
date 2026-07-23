import React from 'react';
import { FileText } from 'lucide-react';
import type { EODReport } from '../../lib/types';
import { Badge, Card } from '../ui/Primitives';

export function EODHistory({ reports }: { reports: EODReport[] }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold text-content">History</h3>
      <div className="space-y-3">
        {reports.length === 0 && <Card className="p-6 text-center text-sm text-muted">No reports yet.</Card>}
        {reports.map((report) => (
          <Card key={report.id} className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-content">
                <FileText size={15} className="text-primary" />
                {new Date(report.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </div>
              <Badge label={report.status} />
            </div>
            <p className="text-sm text-content">{report.summary}</p>
            {report.blockers && <p className="mt-2 text-xs text-rose-600">Blocker: {report.blockers}</p>}
          </Card>
        ))}
      </div>
    </div>
  );
}
