import React from 'react';
import { Paperclip, X } from 'lucide-react';
import type { Employee } from '../../lib/types';
import { Avatar, Badge } from '../ui/Primitives';

export function EmployeeDetailsDialog({
  employee,
  onClose,
  embedded = false,
}: {
  employee: Employee;
  onClose: () => void;
  embedded?: boolean;
}) {
  const details = [
    ['Employee code', employee.code],
    ['Department', employee.department],
    ['Role', employee.jobTitle],
    ['Reporting manager', employee.reportingManager],
    ['Work location', employee.workLocation],
    ['Job type', employee.employmentType],
    ['Check-in time', employee.scheduledCheckInTime ?? '09:00'],
    ['Working days', employee.workingDays?.join(', ') || 'Mon–Fri'],
    ['Salary', employee.salary ? `₹${employee.salary.toLocaleString('en-IN')} / year` : 'Not set'],
    ['Joining date', employee.joiningDate],
    ['Date of birth', employee.dob || 'Not set'],
    ['Email', employee.companyEmail],
    ['Phone', employee.phone || 'Not set'],
  ];
  return (
    <div
      className={
        embedded ? '' : 'fixed inset-0 z-50 flex items-end bg-slate-950/45 sm:items-center sm:justify-center sm:p-4'
      }
      role="dialog"
      aria-modal="true"
      aria-labelledby="employee-details-title"
    >
      <div
        className={
          embedded
            ? 'w-full rounded-xl border border-border bg-surface p-5 shadow-card sm:p-6'
            : 'w-full rounded-t-2xl bg-surface p-5 shadow-xl sm:max-w-2xl sm:rounded-2xl sm:p-6'
        }
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar src={employee.avatar} alt={employee.name} size={52} />
            <div>
              <h2 id="employee-details-title" className="text-lg font-bold text-content">
                {employee.name}
              </h2>
              <p className="text-sm text-muted">{employee.jobTitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-muted hover:bg-bg" aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="mt-4">
          <Badge label={employee.status} />
        </div>
        <dl className="mt-5 grid gap-x-6 gap-y-4 border-t border-border pt-5 sm:grid-cols-2">
          {details.map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted">{label}</dt>
              <dd className="mt-1 text-sm text-content">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 border-t border-border pt-5">
          <h3 className="font-semibold text-content">Employee documents</h3>
          <p className="mt-1 text-sm text-muted">Documents uploaded through the employee profile form.</p>
          <div className="mt-3 space-y-2">
            {employee.documents?.length ? (
              employee.documents.map((document) => {
                const [name, url] = document.split('|||');
                return (
                  <p key={document} className="flex items-center gap-2 rounded-lg bg-bg px-3 py-2 text-sm text-content">
                    <Paperclip size={15} className="text-primary" />
                    {url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-primary hover:underline"
                      >
                        View {name}
                      </a>
                    ) : (
                      name
                    )}
                  </p>
                );
              })
            ) : (
              <p className="rounded-lg bg-bg px-3 py-2 text-sm text-muted">No documents uploaded.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
