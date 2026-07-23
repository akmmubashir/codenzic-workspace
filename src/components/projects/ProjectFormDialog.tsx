import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Employee, Project, ProjectStatus } from '../../lib/types';
import { Button } from '../ui/Primitives';

type Values = Omit<Project, 'id'>;
const statuses: ProjectStatus[] = ['Planning', 'Active', 'On Hold', 'At Risk', 'Completed', 'Cancelled', 'Archived'];
const priorities: Project['priority'][] = ['Low', 'Medium', 'High', 'Urgent'];
const blank: Values = {
  name: '',
  client: '',
  managerId: '',
  status: 'Planning',
  priority: 'Medium',
  progress: 0,
  memberIds: [],
  startDate: new Date().toISOString().slice(0, 10),
  dueDate: '',
  description: '',
  documents: [],
  resources: [],
};

export function ProjectFormDialog({
  project,
  employees,
  onClose,
  onSave,
  embedded = false,
}: {
  project?: Project;
  employees: Employee[];
  onClose: () => void;
  onSave: (values: Values) => void;
  embedded?: boolean;
}) {
  const [values, setValues] = useState<Values>(project ? (({ id, ...rest }) => rest)(project) : blank);
  const [error, setError] = useState('');
  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setError('');
  };
  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!values.name || !values.client || !values.managerId || !values.dueDate || !values.description)
      return setError('Name, client, manager, due date and description are required.');
    onSave(values);
  }
  return (
    <div
      className={
        embedded ? '' : 'fixed inset-0 z-50 flex items-end bg-slate-950/45 sm:items-center sm:justify-center sm:p-4'
      }
      role="dialog"
      aria-modal="true"
    >
      <form
        onSubmit={submit}
        className={
          embedded
            ? 'w-full rounded-xl border border-border bg-surface p-5 shadow-card sm:p-6'
            : 'max-h-[94vh] w-full overflow-y-auto rounded-t-2xl bg-surface p-5 shadow-xl sm:max-w-2xl sm:rounded-2xl sm:p-6'
        }
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-content">{project ? 'Edit project' : 'New project'}</h2>
            <p className="mt-1 text-sm text-muted">Set ownership, delivery dates, priority and team members.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-1 text-muted hover:bg-bg" aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="mt-5 rounded-xl bg-primary/5 px-4 py-3">
          <p className="text-sm font-semibold text-content">Project setup</p>
          <p className="mt-0.5 text-xs text-muted">
            Define the project brief, delivery plan, collaborators and supporting files.
          </p>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Project name *">
            <input value={values.name} onChange={(e) => set('name', e.target.value)} />
          </Field>
          <Field label="Client *">
            <input value={values.client} onChange={(e) => set('client', e.target.value)} />
          </Field>
          <Field label="Project manager *">
            <select value={values.managerId} onChange={(e) => set('managerId', e.target.value)}>
              <option value="">Select manager</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Status">
            <select value={values.status} onChange={(e) => set('status', e.target.value as ProjectStatus)}>
              {statuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </Field>
          <Field label="Priority">
            <select value={values.priority} onChange={(e) => set('priority', e.target.value as Project['priority'])}>
              {priorities.map((priority) => (
                <option key={priority}>{priority}</option>
              ))}
            </select>
          </Field>
          <Field label="Start date">
            <input type="date" value={values.startDate} onChange={(e) => set('startDate', e.target.value)} />
          </Field>
          <Field label="Due date *">
            <input type="date" value={values.dueDate} onChange={(e) => set('dueDate', e.target.value)} />
          </Field>
        </div>
        <div className="mt-6 border-t border-border pt-5">
          <p className="text-sm font-semibold text-content">Scope & delivery</p>
          <label className="mt-3 block text-sm font-medium text-content">
            Description *
            <textarea
              value={values.description}
              onChange={(e) => set('description', e.target.value)}
              rows={3}
              className="mt-1.5 w-full rounded-lg border border-border bg-bg px-3 py-2 font-normal text-content"
            />
          </label>
        </div>
        <div className="mt-5 rounded-xl border border-border p-4">
          <p className="text-sm font-medium text-content">Team members</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {employees.map((employee) => (
              <label key={employee.id} className="flex items-center gap-2 text-sm text-muted">
                <input
                  type="checkbox"
                  checked={values.memberIds.includes(employee.id)}
                  onChange={() =>
                    set(
                      'memberIds',
                      values.memberIds.includes(employee.id)
                        ? values.memberIds.filter((id) => id !== employee.id)
                        : [...values.memberIds, employee.id]
                    )
                  }
                />
                {employee.name}
              </label>
            ))}
          </div>
        </div>
        <div className="mt-5 grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-content">Project documents</p>
            <label className="mt-2 flex cursor-pointer items-center rounded-lg border border-dashed border-border px-3 py-2 text-sm text-muted hover:bg-bg">
              Upload documents
              <input
                type="file"
                multiple
                className="sr-only"
                onChange={(event) =>
                  set('documents', [
                    ...(values.documents ?? []),
                    ...Array.from(event.target.files ?? []).map(
                      (file) => `${file.name}|||${URL.createObjectURL(file)}`
                    ),
                  ])
                }
              />
            </label>
            {values.documents?.length ? (
              <p className="mt-2 text-xs text-muted">
                {values.documents.map((file) => file.split('|||')[0]).join(', ')}
              </p>
            ) : null}
          </div>
          <div>
            <p className="text-sm font-medium text-content">Project resources</p>
            <label className="mt-2 flex cursor-pointer items-center rounded-lg border border-dashed border-border px-3 py-2 text-sm text-muted hover:bg-bg">
              Upload resources
              <input
                type="file"
                multiple
                className="sr-only"
                onChange={(event) =>
                  set('resources', [
                    ...(values.resources ?? []),
                    ...Array.from(event.target.files ?? []).map(
                      (file) => `${file.name}|||${URL.createObjectURL(file)}`
                    ),
                  ])
                }
              />
            </label>
            {values.resources?.length ? (
              <p className="mt-2 text-xs text-muted">
                {values.resources.map((file) => file.split('|||')[0]).join(', ')}
              </p>
            ) : null}
          </div>
        </div>
        {error && <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
        <div className="mt-6 flex justify-end gap-2 border-t border-border pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{project ? 'Save changes' : 'Create project'}</Button>
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
