import { useState } from 'react';
import { Search, Download, Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { DEPARTMENTS } from '../lib/seed';
import { PageHeader, Card, Badge, Avatar, Button } from '../components/ui/Primitives';
import { ROLE_LABELS, type Employee } from '../lib/types';
import { cn } from '../lib/ui';
import { useApp } from '../lib/store';
import { EmployeeFormDialog } from '../components/employees/EmployeeFormDialog';
import { EmployeeDetailsDialog } from '../components/employees/EmployeeDetailsDialog';

export function Employees() {
  const [q, setQ] = useState('');
  const [dept, setDept] = useState('All');
  const [editing, setEditing] = useState<Employee | 'new' | null>(null);
  const [viewing, setViewing] = useState<Employee | null>(null);
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useApp();
  const list = employees.filter(
    (employee) =>
      (dept === 'All' || employee.department === dept) &&
      (employee.name.toLowerCase().includes(q.toLowerCase()) ||
        employee.jobTitle.toLowerCase().includes(q.toLowerCase()))
  );
  if (editing) {
    return (
      <div>
        <PageHeader
          title={editing === 'new' ? 'Add employee' : 'Edit employee'}
          subtitle="Create or update the employee profile"
          action={
            <Button variant="outline" onClick={() => setEditing(null)}>
              Back to directory
            </Button>
          }
        />
        <EmployeeFormDialog
          embedded
          employee={editing === 'new' ? undefined : editing}
          managers={employees}
          onClose={() => setEditing(null)}
          onSave={(values) => {
            if (editing === 'new') addEmployee(values);
            else updateEmployee(editing.id, values);
            setEditing(null);
          }}
        />
      </div>
    );
  }
  if (viewing) {
    return (
      <div>
        <PageHeader
          title="Employee profile"
          subtitle="Employment, schedule and document details"
          action={
            <Button variant="outline" onClick={() => setViewing(null)}>
              Back to directory
            </Button>
          }
        />
        <EmployeeDetailsDialog embedded employee={viewing} onClose={() => setViewing(null)} />
      </div>
    );
  }
  return (
    <div>
      <PageHeader
        title="Employee Directory"
        subtitle={`${employees.length} people at Codenzic Innovations`}
        action={
          <div className="flex gap-2">
            <Button variant="outline">
              <Download size={16} />
              Export
            </Button>
            <Button onClick={() => setEditing('new')}>
              <Plus size={16} />
              Add employee
            </Button>
          </div>
        }
      />
      <Card className="mb-6 flex flex-wrap items-center gap-3 p-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or title…"
            className="h-9 w-full rounded-lg border border-border bg-bg pl-9 pr-3 text-sm text-content focus:border-secondary focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {['All', ...DEPARTMENTS].map((item) => (
            <button
              key={item}
              onClick={() => setDept(item)}
              className={cn(
                'rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                dept === item ? 'bg-primary text-white' : 'border border-border text-muted hover:text-content'
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </Card>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((employee) => (
          <Card key={employee.id} className="p-5">
            <div className="flex items-start gap-3">
              <Avatar src={employee.avatar} alt={employee.name} size={48} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate font-semibold text-content">{employee.name}</p>
                  <Badge label={employee.status} />
                </div>
                <p className="truncate text-sm text-muted">{employee.jobTitle}</p>
                <p className="mt-0.5 truncate text-xs text-muted">{employee.department}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted">
              <span>{employee.code}</span>
              <span className="rounded bg-black/5 px-1.5 py-0.5 dark:bg-white/5">{ROLE_LABELS[employee.role]}</span>
              <span>{employee.workLocation}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
              <span>{employee.employmentType}</span>
              <span>Start {employee.scheduledCheckInTime ?? '09:00'}</span>
              {employee.salary && <span>₹{employee.salary.toLocaleString('en-IN')}</span>}
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setViewing(employee)}
                aria-label={`View ${employee.name}`}
              >
                <Eye size={14} />
              </Button>
              <Button size="sm" variant="outline" className="flex-1" onClick={() => setEditing(employee)}>
                <Pencil size={14} />
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  if (window.confirm(`Delete ${employee.name}?`)) deleteEmployee(employee.id);
                }}
                aria-label={`Delete ${employee.name}`}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
