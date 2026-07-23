import type { FormEvent } from 'react';
import { Card, Button } from '../ui/Primitives';

type Props = {
  summary: string;
  blockers: string;
  plan: string;
  submitted: boolean;
  onSummaryChange: (value: string) => void;
  onBlockersChange: (value: string) => void;
  onPlanChange: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
};
const fieldClass =
  'w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-content focus:border-secondary focus:outline-none';

export function EODReportForm({
  summary,
  blockers,
  plan,
  submitted,
  onSummaryChange,
  onBlockersChange,
  onPlanChange,
  onSubmit,
}: Props) {
  return (
    <Card className="p-5">
      <h3 className="mb-4 text-sm font-semibold text-content">Today’s report</h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-content">Work summary</label>
          <textarea
            required
            value={summary}
            onChange={(event) => onSummaryChange(event.target.value)}
            rows={3}
            placeholder="What did you accomplish today?"
            className={fieldClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-content">Blockers</label>
          <textarea
            value={blockers}
            onChange={(event) => onBlockersChange(event.target.value)}
            rows={2}
            placeholder="Anything blocking your progress?"
            className={fieldClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-content">Plan for tomorrow</label>
          <textarea
            value={plan}
            onChange={(event) => onPlanChange(event.target.value)}
            rows={2}
            className={fieldClass}
          />
        </div>
        <div className="flex items-center gap-3">
          <Button type="submit">Submit report</Button>
          {submitted && <span className="text-sm font-medium text-emerald-600">Submitted ✓</span>}
        </div>
      </form>
    </Card>
  );
}
