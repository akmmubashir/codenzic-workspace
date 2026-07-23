

import React, { useState } from 'react';
import { useApp } from '../lib/store';
import { PageHeader, Card, Button } from '../components/ui/Primitives';

export function Settings() {
  const { companyName } = useApp();
  const [name, setName] = useState(companyName);
  const [start, setStart] = useState('09:00');
  const [end, setEnd] = useState('18:00');
  const [grace, setGrace] = useState('15');

  return (
    <div>
      <PageHeader title="Company Settings" subtitle="Configure your workspace, branding and working hours" />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-sm font-semibold text-content">Branding</h3>
          <label className="mb-1.5 block text-sm font-medium text-content">Workspace name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="h-10 w-full rounded-lg border border-border bg-bg px-3 text-sm text-content focus:border-secondary focus:outline-none" />
          <p className="mt-2 text-xs text-muted">Displayed in the sidebar and login page.</p>
          <div className="mt-4 flex gap-2">
            <span className="h-9 w-9 rounded-lg bg-primary" title="Primary" />
            <span className="h-9 w-9 rounded-lg bg-secondary" title="Secondary" />
            <span className="h-9 w-9 rounded-lg bg-accent" title="Accent" />
          </div>
        </Card>
        <Card className="p-5">
          <h3 className="mb-4 text-sm font-semibold text-content">Working hours</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-content">Start</label>
              <input type="time" value={start} onChange={(e) => setStart(e.target.value)} className="h-10 w-full rounded-lg border border-border bg-bg px-3 text-sm text-content focus:border-secondary focus:outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-content">End</label>
              <input type="time" value={end} onChange={(e) => setEnd(e.target.value)} className="h-10 w-full rounded-lg border border-border bg-bg px-3 text-sm text-content focus:border-secondary focus:outline-none" />
            </div>
          </div>
          <label className="mb-1.5 mt-4 block text-sm font-medium text-content">Grace period (minutes)</label>
          <input type="number" value={grace} onChange={(e) => setGrace(e.target.value)} className="h-10 w-full rounded-lg border border-border bg-bg px-3 text-sm text-content focus:border-secondary focus:outline-none" />
        </Card>
      </div>
      <div className="mt-6 flex justify-end">
        <Button>Save changes</Button>
      </div>
    </div>);

}