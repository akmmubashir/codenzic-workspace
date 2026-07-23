import React from 'react';
import { Card } from '../ui/Primitives';

export function BrandingSettings({ name, onNameChange }: { name: string; onNameChange: (value: string) => void }) {
  return (
    <Card className="p-5">
      <h3 className="mb-4 text-sm font-semibold text-content">Branding</h3>
      <label className="mb-1.5 block text-sm font-medium text-content">Workspace name</label>
      <input
        value={name}
        onChange={(event) => onNameChange(event.target.value)}
        className="h-10 w-full rounded-lg border border-border bg-bg px-3 text-sm text-content focus:border-secondary focus:outline-none"
      />
      <p className="mt-2 text-xs text-muted">Displayed in the sidebar and login page.</p>
      <div className="mt-4 flex gap-2">
        <span className="h-9 w-9 rounded-lg bg-primary" title="Primary" />
        <span className="h-9 w-9 rounded-lg bg-secondary" title="Secondary" />
        <span className="h-9 w-9 rounded-lg bg-accent" title="Accent" />
      </div>
    </Card>
  );
}
