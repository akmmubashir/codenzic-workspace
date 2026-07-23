import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { AttendanceRecord } from '../../lib/types';
import { Button } from '../ui/Primitives';

export function AttendanceUpdateRequestDialog({
  record,
  onClose,
  onSubmit,
}: {
  record: AttendanceRecord;
  onClose: () => void;
  onSubmit: (values: { requestedCheckIn: string; requestedCheckOut: string; reason: string }) => void;
}) {
  const [requestedCheckIn, setRequestedCheckIn] = useState(record.checkIn ?? '');
  const [requestedCheckOut, setRequestedCheckOut] = useState(record.checkOut ?? '');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!requestedCheckIn || !requestedCheckOut) return setError('Enter both requested check-in and check-out times.');
    if (reason.trim().length < 10) return setError('Please explain the correction (at least 10 characters).');
    onSubmit({ requestedCheckIn, requestedCheckOut, reason: reason.trim() });
  }
  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-slate-950/45 sm:items-center sm:justify-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="attendance-update-title"
    >
      <form
        onSubmit={submit}
        className="w-full rounded-t-2xl bg-surface p-5 shadow-xl sm:max-w-md sm:rounded-2xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="attendance-update-title" className="text-lg font-bold text-content">
              Request attendance update
            </h2>
            <p className="mt-1 text-sm text-muted">Submit the correct times for review by your manager or HR.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-1 text-muted hover:bg-bg" aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <label className="text-sm font-medium text-content">
            Check in
            <input
              type="time"
              value={requestedCheckIn}
              onChange={(event) => {
                setRequestedCheckIn(event.target.value);
                setError('');
              }}
              className="mt-1.5 h-10 w-full rounded-lg border border-border bg-bg px-3 font-normal"
            />
          </label>
          <label className="text-sm font-medium text-content">
            Check out
            <input
              type="time"
              value={requestedCheckOut}
              onChange={(event) => {
                setRequestedCheckOut(event.target.value);
                setError('');
              }}
              className="mt-1.5 h-10 w-full rounded-lg border border-border bg-bg px-3 font-normal"
            />
          </label>
        </div>
        <label className="mt-4 block text-sm font-medium text-content">
          Reason
          <textarea
            value={reason}
            onChange={(event) => {
              setReason(event.target.value);
              setError('');
            }}
            rows={3}
            placeholder="Explain why this attendance entry needs correction"
            className="mt-1.5 w-full rounded-lg border border-border bg-bg px-3 py-2 font-normal"
          />
        </label>
        {error && <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
        <div className="mt-5 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Submit request</Button>
        </div>
      </form>
    </div>
  );
}
