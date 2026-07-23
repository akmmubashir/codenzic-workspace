import React, { useState } from 'react';
import { AlertCircle, Paperclip, X } from 'lucide-react';
import type { AttendanceRules, LateReasonCategory } from '../../lib/types';
import { Button } from '../ui/Primitives';

const categories: LateReasonCategory[] = [
  'Traffic Delay',
  'Public Transport Delay',
  'Medical Reason',
  'Personal Emergency',
  'Weather Conditions',
  'Client Meeting',
  'Work-Related Travel',
  'Technical Issue',
  'Manager Approved',
  'Other',
];

type Props = {
  rules: AttendanceRules;
  lateDurationMins: number;
  onClose: () => void;
  onSubmit: (reason: { reasonCategory: LateReasonCategory; explanation: string; attachmentName?: string }) => void;
};

export function LateCheckInReasonDialog({ rules, lateDurationMins, onClose, onSubmit }: Props) {
  const [category, setCategory] = useState<LateReasonCategory | ''>('');
  const [explanation, setExplanation] = useState('');
  const [attachmentName, setAttachmentName] = useState<string>();
  const [error, setError] = useState('');
  const needsAttachment = Boolean(category && rules.attachmentRequiredFor.includes(category));

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!category) return setError('Select a reason category to continue.');
    if (!explanation.trim()) return setError('Please provide a short explanation.');
    if (category === 'Other' && explanation.trim().length < 20)
      return setError('Please provide a detailed explanation for Other (at least 20 characters).');
    if (needsAttachment && !attachmentName) return setError(`Supporting evidence is required for ${category}.`);
    onSubmit({ reasonCategory: category, explanation: explanation.trim(), attachmentName });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-slate-950/45 p-0 sm:items-center sm:justify-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="late-reason-title"
    >
      <form
        onSubmit={submit}
        className="max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-surface p-5 shadow-xl sm:max-w-lg sm:rounded-2xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-700">
              <AlertCircle size={19} />
            </div>
            <h2 id="late-reason-title" className="text-lg font-bold text-content">
              Late check-in reason
            </h2>
            <p className="mt-1 text-sm text-muted">
              You are {lateDurationMins} minute{lateDurationMins === 1 ? '' : 's'} past the allowed check-in time.
              Submit a reason to complete check-in.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-muted hover:bg-bg hover:text-content"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-content">
              Reason category <span className="text-rose-600">*</span>
            </label>
            <select
              value={category}
              onChange={(event) => {
                setCategory(event.target.value as LateReasonCategory);
                setError('');
              }}
              className="h-10 w-full rounded-lg border border-border bg-bg px-3 text-sm text-content focus:border-secondary focus:outline-none"
            >
              <option value="">Select a reason</option>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-content">
              Explanation <span className="text-rose-600">*</span>
            </label>
            <textarea
              value={explanation}
              onChange={(event) => {
                setExplanation(event.target.value);
                setError('');
              }}
              rows={3}
              placeholder={
                category === 'Other'
                  ? 'Provide a detailed explanation (minimum 20 characters)'
                  : 'Briefly explain the delay'
              }
              className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-content focus:border-secondary focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-content">
              Supporting evidence{' '}
              {needsAttachment ? (
                <span className="text-rose-600">*</span>
              ) : (
                <span className="font-normal text-muted">(optional)</span>
              )}
            </label>
            <label className="flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border px-3 text-sm text-muted hover:bg-bg">
              <Paperclip size={16} />
              {attachmentName ?? 'Attach a file'}
              <input
                type="file"
                className="sr-only"
                onChange={(event) => {
                  setAttachmentName(event.target.files?.[0]?.name);
                  setError('');
                }}
              />
            </label>
          </div>
          {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
        </div>
        <div className="mt-6 flex justify-end gap-2 border-t border-border pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Submit reason & check in</Button>
        </div>
      </form>
    </div>
  );
}
