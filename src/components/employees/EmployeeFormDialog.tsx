import React, { useState } from 'react';
import { X } from 'lucide-react';
import { DEPARTMENTS } from '../../lib/seed';
import { ROLE_LABELS, type Employee, type EmploymentType, type Role } from '../../lib/types';
import { Button } from '../ui/Primitives';

const roles = Object.keys(ROLE_LABELS) as Role[];
const employmentTypes: EmploymentType[] = [
  'Full-time',
  'Part-time',
  'Intern',
  'Contract',
  'Consultant',
  'Freelancer',
  'Probation',
  'Temporary',
];
const locations: Employee['workLocation'][] = ['Office', 'Hybrid', 'Remote'];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
type Values = Omit<Employee, 'id' | 'avatar'>;
const blank: Values = {
  code: '',
  name: '',
  companyEmail: '',
  phone: '',
  role: 'employee',
  jobTitle: '',
  department: DEPARTMENTS[0],
  team: '',
  reportingManager: '-',
  employmentType: 'Full-time',
  status: 'Active',
  workLocation: 'Office',
  joiningDate: new Date().toISOString().slice(0, 10),
  dob: '',
  skills: [],
  salary: undefined,
  scheduledCheckInTime: '09:00',
  workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
};

export function EmployeeFormDialog({
  employee,
  managers,
  onClose,
  onSave,
}: {
  employee?: Employee;
  managers: Employee[];
  onClose: () => void;
  onSave: (values: Values) => void;
}) {
  const [values, setValues] = useState<Values>(employee ? (({ id, avatar, ...rest }) => rest)(employee) : blank);
  const [error, setError] = useState('');
  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setError('');
  };
  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!values.name || !values.companyEmail || !values.jobTitle)
      return setError('Name, email and job title are required.');
    if (!values.workingDays?.length) return setError('Select at least one working day.');
    onSave(values);
  }
  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-slate-950/45 sm:items-center sm:justify-center sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      <form
        onSubmit={submit}
        className="max-h-[94vh] w-full overflow-y-auto rounded-t-2xl bg-surface p-5 shadow-xl sm:max-w-3xl sm:rounded-2xl sm:p-6"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-content">{employee ? 'Edit employee' : 'Add employee'}</h2>
            <p className="mt-1 text-sm text-muted">
              Set employment, reporting, location, salary and attendance details.
            </p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-1 text-muted hover:bg-bg" aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Full name *">
            <input value={values.name} onChange={(e) => set('name', e.target.value)} />
          </Field>
          <Field label="Employee code">
            <input
              value={employee ? values.code : 'Generated automatically'}
              readOnly
              className="cursor-not-allowed text-muted"
            />
          </Field>
          <Field label="Work email *">
            <input type="email" value={values.companyEmail} onChange={(e) => set('companyEmail', e.target.value)} />
          </Field>
          <Field label="Phone">
            <input value={values.phone} onChange={(e) => set('phone', e.target.value)} />
          </Field>
          <Field label="Job title *">
            <input value={values.jobTitle} onChange={(e) => set('jobTitle', e.target.value)} />
          </Field>
          <Field label="Department">
            <select value={values.department} onChange={(e) => set('department', e.target.value)}>
              {DEPARTMENTS.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
          <Field label="Role">
            <select value={values.role} onChange={(e) => set('role', e.target.value as Role)}>
              {roles.map((item) => (
                <option key={item} value={item}>
                  {ROLE_LABELS[item]}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Reporting manager">
            <select value={values.reportingManager} onChange={(e) => set('reportingManager', e.target.value)}>
              <option value="-">No manager</option>
              {managers
                .filter((item) => item.id !== employee?.id)
                .map((item) => (
                  <option key={item.id}>{item.name}</option>
                ))}
            </select>
          </Field>
          <Field label="Team">
            <input value={values.team} onChange={(e) => set('team', e.target.value)} />
          </Field>
          <Field label="Job type">
            <select
              value={values.employmentType}
              onChange={(e) => set('employmentType', e.target.value as EmploymentType)}
            >
              {employmentTypes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
          <Field label="Job location">
            <select
              value={values.workLocation}
              onChange={(e) => set('workLocation', e.target.value as Employee['workLocation'])}
            >
              {locations.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
          <Field label="Annual salary">
            <input
              type="number"
              min="0"
              value={values.salary ?? ''}
              onChange={(e) => set('salary', e.target.value ? Number(e.target.value) : undefined)}
              placeholder="e.g. 720000"
            />
          </Field>
          <Field label="Joining date">
            <input type="date" value={values.joiningDate} onChange={(e) => set('joiningDate', e.target.value)} />
          </Field>
          <Field label="Check-in time">
            <input
              type="time"
              value={values.scheduledCheckInTime}
              onChange={(e) => set('scheduledCheckInTime', e.target.value)}
            />
          </Field>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-content">Working days</p>
          <div className="mt-2 flex flex-wrap gap-3">
            {days.map((day) => (
              <label key={day} className="inline-flex items-center gap-1.5 text-sm text-muted">
                <input
                  type="checkbox"
                  checked={values.workingDays?.includes(day)}
                  onChange={() =>
                    set(
                      'workingDays',
                      values.workingDays?.includes(day)
                        ? values.workingDays.filter((item) => item !== day)
                        : [...(values.workingDays ?? []), day]
                    )
                  }
                />
                {day}
              </label>
            ))}
          </div>
        </div>
        {error && <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
        <div className="mt-6 flex justify-end gap-2 border-t border-border pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{employee ? 'Save changes' : 'Create employee'}</Button>
        </div>
      </form>
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium text-content">
      {label}
      <span className="mt-1.5 block [&_input]:h-10 [&_input]:w-full [&_input]:rounded-lg [&_input]:border [&_input]:border-border [&_input]:bg-bg [&_input]:px-3 [&_select]:h-10 [&_select]:w-full [&_select]:rounded-lg [&_select]:border [&_select]:border-border [&_select]:bg-bg [&_select]:px-3">
        {children}
      </span>
    </label>
  );
}
