import React from 'react';
import type { AttendanceRules, LateReasonCategory } from '../../lib/types';
import { Card } from '../ui/Primitives';

const attachmentCategories: LateReasonCategory[] = [
  'Medical Reason',
  'Client Meeting',
  'Work-Related Travel',
  'Manager Approved',
];

export function LateArrivalRulesSettings({
  rules,
  onChange,
}: {
  rules: AttendanceRules;
  onChange: (rules: AttendanceRules) => void;
}) {
  const update = <K extends keyof AttendanceRules>(key: K, value: AttendanceRules[K]) =>
    onChange({ ...rules, [key]: value });
  const toggleAttachment = (category: LateReasonCategory) =>
    update(
      'attachmentRequiredFor',
      rules.attachmentRequiredFor.includes(category)
        ? rules.attachmentRequiredFor.filter((item) => item !== category)
        : [...rules.attachmentRequiredFor, category]
    );
  return (
    <Card className="p-5 lg:col-span-2">
      <h3 className="text-sm font-semibold text-content">Late arrival rules</h3>
      <p className="mt-1 text-sm text-muted">These rules determine when a reason is required and who is notified.</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <label className="text-sm font-medium text-content">
          Minimum delay before reason (minutes)
          <input
            type="number"
            min="1"
            value={rules.minimumDelayForReasonMins}
            onChange={(event) => update('minimumDelayForReasonMins', Number(event.target.value))}
            className="mt-1.5 h-10 w-full rounded-lg border border-border bg-bg px-3 font-normal text-content"
          />
        </label>
        <label className="text-sm font-medium text-content">
          Monthly late-arrival alert threshold
          <input
            type="number"
            min="1"
            value={rules.repeatedLateAlertThreshold}
            onChange={(event) => update('repeatedLateAlertThreshold', Number(event.target.value))}
            className="mt-1.5 h-10 w-full rounded-lg border border-border bg-bg px-3 font-normal text-content"
          />
        </label>
        <label className="text-sm font-medium text-content">
          Exempt employee IDs
          <input
            value={rules.exemptEmployeeIds.join(', ')}
            onChange={(event) =>
              update(
                'exemptEmployeeIds',
                event.target.value
                  .split(',')
                  .map((value) => value.trim())
                  .filter(Boolean)
              )
            }
            placeholder="e.g. u1, u2"
            className="mt-1.5 h-10 w-full rounded-lg border border-border bg-bg px-3 font-normal text-content"
          />
        </label>
        <label className="text-sm font-medium text-content">
          Exempt departments
          <input
            value={rules.exemptDepartments.join(', ')}
            onChange={(event) =>
              update(
                'exemptDepartments',
                event.target.value
                  .split(',')
                  .map((value) => value.trim())
                  .filter(Boolean)
              )
            }
            placeholder="e.g. Sales"
            className="mt-1.5 h-10 w-full rounded-lg border border-border bg-bg px-3 font-normal text-content"
          />
        </label>
      </div>
      <div className="mt-5 grid gap-4 border-t border-border pt-4 sm:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-content">Attachment required for</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {attachmentCategories.map((category) => (
              <label key={category} className="inline-flex items-center gap-1.5 text-sm text-muted">
                <input
                  type="checkbox"
                  checked={rules.attachmentRequiredFor.includes(category)}
                  onChange={() => toggleAttachment(category)}
                />
                {category}
              </label>
            ))}
          </div>
        </div>
        <div className="space-y-2 text-sm text-content">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={rules.managerApprovalRequired}
              onChange={(event) => update('managerApprovalRequired', event.target.checked)}
            />
            Manager approval required
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={rules.acceptedReasonExcusesLate}
              onChange={(event) => update('acceptedReasonExcusesLate', event.target.checked)}
            />
            Accepted reason changes status to Excused Late
          </label>
          <p className="pt-1 text-muted">Notifications are sent to: {rules.notificationRecipients.join(' and ')}.</p>
        </div>
      </div>
    </Card>
  );
}
