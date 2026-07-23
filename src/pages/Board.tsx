

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../lib/store';
import { empById } from '../lib/seed';
import type { TaskStatus } from '../lib/types';
import { PageHeader, Badge, Avatar } from '../components/ui/Primitives';
import { cn } from '../lib/ui';

const COLUMNS: TaskStatus[] = ['Backlog', 'To Do', 'In Progress', 'In Review', 'Testing', 'Blocked', 'Completed'];

export function Board() {
  const { tasks, moveTask } = useApp();
  const [dragId, setDragId] = useState<string | null>(null);
  const [over, setOver] = useState<TaskStatus | null>(null);

  return (
    <div>
      <PageHeader title="Task Board" subtitle="Drag cards across columns to update status" />
      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((col) => {
          const items = tasks.filter((t) => t.status === col);
          return (
            <div
              key={col}
              onDragOver={(e) => {e.preventDefault();setOver(col);}}
              onDragLeave={() => setOver((c) => c === col ? null : c)}
              onDrop={() => {if (dragId) moveTask(dragId, col);setDragId(null);setOver(null);}}
              className={cn(
                'w-72 shrink-0 rounded-xl border border-border bg-surface/60 p-3 transition-colors',
                over === col && 'border-secondary bg-primary/5'
              )}>
              
              <div className="mb-3 flex items-center justify-between px-1">
                <h3 className="text-sm font-semibold text-content">{col}</h3>
                <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs font-medium text-muted dark:bg-white/10">{items.length}</span>
              </div>
              <div className="space-y-2">
                {items.map((t) => {
                  const a = empById(t.assigneeId);
                  return (
                    <motion.div
                      layout
                      key={t.id}
                      draggable
                      onDragStart={() => setDragId(t.id)}
                      onDragEnd={() => setDragId(null)}
                      className="cursor-grab rounded-lg border border-border bg-surface p-3 shadow-card active:cursor-grabbing">
                      
                      <p className="text-sm font-medium text-content">{t.title}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {t.labels.map((l) =>
                        <span key={l} className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">{l}</span>
                        )}
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <Badge label={t.priority} />
                        {a && <Avatar src={a.avatar} alt={a.name} size={24} />}
                      </div>
                    </motion.div>);

                })}
                {items.length === 0 && <p className="px-1 py-4 text-center text-xs text-muted">No tasks</p>}
              </div>
            </div>);

        })}
      </div>
    </div>);

}