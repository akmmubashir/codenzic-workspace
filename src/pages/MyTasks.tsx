

import React from 'react';
import { useApp } from '../lib/store';
import { projects } from '../lib/seed';
import { PageHeader, Card, Badge } from '../components/ui/Primitives';

export function MyTasks() {
  const { tasks, currentUserId } = useApp();
  const mine = tasks.filter((t) => t.assigneeId === currentUserId());
  const proj = (id: string) => projects.find((p) => p.id === id)?.name ?? '-';

  return (
    <div>
      <PageHeader title="My Tasks" subtitle={`${mine.length} tasks assigned to you`} />
      {mine.length === 0 ?
      <Card className="p-10 text-center text-sm text-muted">No tasks assigned to you right now.</Card> :

      <div className="space-y-2">
          {mine.map((t) =>
        <Card key={t.id} className="flex flex-wrap items-center gap-3 p-4">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-content">{t.title}</p>
                <p className="text-xs text-muted">{proj(t.projectId)} · due {new Date(t.dueDate).toLocaleDateString()}</p>
              </div>
              <Badge label={t.status} />
              <Badge label={t.priority} />
              <div className="w-24">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${t.progress}%` }} />
                </div>
              </div>
            </Card>
        )}
        </div>
      }
    </div>);

}