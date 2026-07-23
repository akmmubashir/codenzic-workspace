import React, { useState } from 'react';
import { Search, Download, Plus } from 'lucide-react';
import { employees, DEPARTMENTS } from '../lib/seed';
import { PageHeader, Card, Badge, Avatar, Button } from '../components/ui/Primitives';
import { ROLE_LABELS } from '../lib/types';
import { cn } from '../lib/ui';

export function Employees() {
  const [q, setQ] = useState('');
  const [dept, setDept] = useState('All');
  const list = employees.filter(
    (e) =>
      (dept === 'All' || e.department === dept) &&
      (e.name.toLowerCase().includes(q.toLowerCase()) || e.jobTitle.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div>
      <PageHeader
        title="Employee Directory"
        subtitle={`${employees.length} people at Codenzic Innovations`}
        action={
          <div className="flex gap-2">
            <Button variant="outline">
              <Download size={16} /> Export
            </Button>
            <Button>
              <Plus size={16} /> Add employee
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
          {['All', ...DEPARTMENTS.slice(0, 5)].map((d) => (
            <button
              key={d}
              onClick={() => setDept(d)}
              className={cn(
                'rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                dept === d ? 'bg-primary text-white' : 'border border-border text-muted hover:text-content'
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((e) => (
          <Card key={e.id} className="p-5">
            <div className="flex items-start gap-3">
              <Avatar src={e.avatar} alt={e.name} size={48} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate font-semibold text-content">{e.name}</p>
                  <Badge label={e.status} />
                </div>
                <p className="truncate text-sm text-muted">{e.jobTitle}</p>
                <p className="mt-0.5 truncate text-xs text-muted">{e.department}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted">
              <span>{e.code}</span>
              <span className="rounded bg-black/5 px-1.5 py-0.5 dark:bg-white/5">{ROLE_LABELS[e.role]}</span>
              <span>{e.workLocation}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
