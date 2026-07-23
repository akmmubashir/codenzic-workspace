import React from 'react';
import { Card } from '../ui/Primitives';

type Props = {
  start: string;
  end: string;
  grace: string;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
  onGraceChange: (value: string) => void;
};
export function WorkingHoursSettings({ start, end, grace, onStartChange, onEndChange, onGraceChange }: Props) {
  return (
    <Card className="p-5">
      <h3 className="mb-4 text-sm font-semibold text-content">Working hours</h3>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-content">Start</label>
          <input
            type="time"
            value={start}
            onChange={(event) => onStartChange(event.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-bg px-3 text-sm text-content focus:border-secondary focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-content">End</label>
          <input
            type="time"
            value={end}
            onChange={(event) => onEndChange(event.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-bg px-3 text-sm text-content focus:border-secondary focus:outline-none"
          />
        </div>
      </div>
      <label className="mb-1.5 mt-4 block text-sm font-medium text-content">Grace period (minutes)</label>
      <input
        type="number"
        value={grace}
        onChange={(event) => onGraceChange(event.target.value)}
        className="h-10 w-full rounded-lg border border-border bg-bg px-3 text-sm text-content focus:border-secondary focus:outline-none"
      />
    </Card>
  );
}
