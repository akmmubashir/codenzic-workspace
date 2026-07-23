

import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { useApp } from '../lib/store';
import { PageHeader, Card, Badge, Button } from '../components/ui/Primitives';

export function EOD() {
  const { currentUserId, eodReports, submitEOD } = useApp();
  const mine = eodReports.filter((e) => e.employeeId === currentUserId());
  const [summary, setSummary] = useState('');
  const [blockers, setBlockers] = useState('');
  const [plan, setPlan] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    submitEOD({
      employeeId: currentUserId(),
      date: new Date().toISOString().slice(0, 10),
      summary, completed: summary ? [summary.slice(0, 40)] : [], inProgress: [], blockers, plan
    });
    setSummary('');setBlockers('');setPlan('');setDone(true);
    setTimeout(() => setDone(false), 2500);
  };

  return (
    <div>
      <PageHeader title="My EOD Reports" subtitle="Share what you got done and any blockers" />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-sm font-semibold text-content">Today’s report</h3>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-content">Work summary</label>
              <textarea required value={summary} onChange={(e) => setSummary(e.target.value)} rows={3} placeholder="What did you accomplish today?" className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-content focus:border-secondary focus:outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-content">Blockers</label>
              <textarea value={blockers} onChange={(e) => setBlockers(e.target.value)} rows={2} placeholder="Anything blocking your progress?" className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-content focus:border-secondary focus:outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-content">Plan for tomorrow</label>
              <textarea value={plan} onChange={(e) => setPlan(e.target.value)} rows={2} className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-content focus:border-secondary focus:outline-none" />
            </div>
            <div className="flex items-center gap-3">
              <Button type="submit">Submit report</Button>
              {done && <span className="text-sm font-medium text-emerald-600">Submitted ✓</span>}
            </div>
          </form>
        </Card>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-content">History</h3>
          <div className="space-y-3">
            {mine.length === 0 && <Card className="p-6 text-center text-sm text-muted">No reports yet.</Card>}
            {mine.map((e) =>
            <Card key={e.id} className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium text-content">
                    <FileText size={15} className="text-primary" />
                    {new Date(e.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </div>
                  <Badge label={e.status} />
                </div>
                <p className="text-sm text-content">{e.summary}</p>
                {e.blockers && <p className="mt-2 text-xs text-rose-600">Blocker: {e.blockers}</p>}
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>);

}