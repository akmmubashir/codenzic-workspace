import React, { useState } from 'react';
import { Clock3, FolderOpen, LayoutList, NotebookPen, Plus, X } from 'lucide-react';
import type { Employee, Project, Task } from '../../lib/types';
import { Badge, Button, Card } from '../ui/Primitives';

export function ProjectDetailsDialog({
  project,
  tasks,
  employees,
  onClose,
  embedded = false,
}: {
  project: Project;
  tasks: Task[];
  employees: Employee[];
  onClose: () => void;
  embedded?: boolean;
}) {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState<string[]>([]);
  const completed = tasks.filter((task) => task.status === 'Completed').length;
  const team = employees.filter((employee) => project.memberIds.includes(employee.id));
  return (
    <div
      className={embedded ? '' : 'fixed inset-0 z-50 bg-slate-950/45 p-0 sm:p-4'}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-details-title"
    >
      <div
        className={
          embedded
            ? 'mx-auto flex w-full flex-col overflow-hidden rounded-xl border border-border bg-bg shadow-card'
            : 'mx-auto flex h-full w-full flex-col overflow-hidden bg-bg shadow-xl sm:h-[94vh] sm:rounded-2xl'
        }
      >
        <div className="flex items-start justify-between border-b border-border bg-surface px-5 py-4 sm:px-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 id="project-details-title" className="text-lg font-bold text-content">
                {project.name}
              </h2>
              <Badge label={project.status} />
              <Badge label={project.priority} />
            </div>
            <p className="mt-1 text-sm text-muted">
              {project.client} · Due {project.dueDate}
            </p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-muted hover:bg-bg" aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <Metric
              label="Automatic progress"
              value={`${project.progress}%`}
              hint={`${completed}/${tasks.length} tasks completed`}
            />
            <Metric label="Time tracking" value="42h 35m" hint="This sprint" />
            <Metric label="Active sprint" value="Sprint 8" hint="Ends in 5 days" />
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <Card className="p-5">
                <h3 className="font-semibold text-content">Project overview</h3>
                <p className="mt-2 text-sm text-muted">{project.description}</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Info
                    label="Manager"
                    value={employees.find((employee) => employee.id === project.managerId)?.name ?? 'Not assigned'}
                  />
                  <Info label="Team" value={team.map((employee) => employee.name).join(', ') || 'No members'} />
                  <Info label="Tags" value="Product, Delivery, Q3" />
                  <Info label="Status" value={project.status} />
                </div>
              </Card>
              <Card className="overflow-hidden">
                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                  <div className="flex items-center gap-2">
                    <LayoutList size={17} className="text-primary" />
                    <h3 className="font-semibold text-content">Related task board</h3>
                  </div>
                  <span className="text-sm text-muted">{tasks.length} tasks</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-[580px] w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
                        <th className="px-4 py-3">Task</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Priority</th>
                        <th className="px-4 py-3">Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map((task) => (
                        <tr key={task.id} className="border-b border-border last:border-0">
                          <td className="px-4 py-3 font-medium text-content">{task.title}</td>
                          <td className="px-4 py-3">
                            <Badge label={task.status} />
                          </td>
                          <td className="px-4 py-3">
                            <Badge label={task.priority} />
                          </td>
                          <td className="px-4 py-3 text-muted">{task.progress}%</td>
                        </tr>
                      ))}
                      {!tasks.length && (
                        <tr>
                          <td colSpan={4} className="px-4 py-8 text-center text-muted">
                            No tasks linked to this project yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>
              <Card className="p-5">
                <div className="flex items-center gap-2">
                  <NotebookPen size={17} className="text-primary" />
                  <h3 className="font-semibold text-content">Notes</h3>
                </div>
                <div className="mt-3 flex gap-2">
                  <input
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="Add a project note"
                    className="h-9 flex-1 rounded-lg border border-border bg-bg px-3 text-sm"
                  />
                  <Button
                    size="sm"
                    onClick={() => {
                      if (note.trim()) {
                        setNotes([note.trim(), ...notes]);
                        setNote('');
                      }
                    }}
                  >
                    <Plus size={15} />
                    Add
                  </Button>
                </div>
                {notes.map((item, index) => (
                  <p key={`${item}-${index}`} className="mt-3 rounded-lg bg-bg px-3 py-2 text-sm text-content">
                    {item}
                  </p>
                ))}
              </Card>
            </div>
            <div className="space-y-6">
              <Panel
                icon={<FolderOpen size={17} />}
                title="Resources & documents"
                items={
                  project.documents?.length || project.resources?.length
                    ? [...(project.documents ?? []), ...(project.resources ?? [])]
                    : ['No project files uploaded yet.']
                }
              />
              <Panel
                icon={<Clock3 size={17} />}
                title="Time tracking"
                items={['Today: 5h 20m', 'This week: 42h 35m', 'Team entries: 18']}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Metric({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <Card className="p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-2 text-xl font-bold text-content">{value}</p>
      <p className="mt-1 text-xs text-muted">{hint}</p>
    </Card>
  );
}
function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 text-sm text-content">{value}</p>
    </div>
  );
}
function Panel({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 text-primary">
        {icon}
        <h3 className="text-sm font-semibold text-content">{title}</h3>
      </div>
      <ul className="mt-3 space-y-2">
        {items.map((item) => {
          const [name, url] = item.split('|||');
          return (
            <li key={item} className="text-sm text-muted">
              {url ? (
                <a href={url} target="_blank" rel="noreferrer" className="font-medium text-primary hover:underline">
                  {name}
                </a>
              ) : (
                name
              )}
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
