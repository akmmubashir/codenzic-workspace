import React from 'react';
import type { Task } from '../../lib/types';
import { Badge, Card } from '../ui/Primitives';

export function TaskList({ tasks, projectName }: { tasks: Task[]; projectName: (id: string) => string }) {
  if (!tasks.length)
    return <Card className="p-10 text-center text-sm text-muted">No tasks assigned to you right now.</Card>;
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <Card key={task.id} className="flex flex-wrap items-center gap-3 p-4">
          <div className="min-w-0 flex-1">
            <p className="font-medium text-content">{task.title}</p>
            <p className="text-xs text-muted">
              {projectName(task.projectId)} · due {new Date(task.dueDate).toLocaleDateString()}
            </p>
          </div>
          <Badge label={task.status} />
          <Badge label={task.priority} />
          <div className="w-24">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
              <div className="h-full rounded-full bg-primary" style={{ width: `${task.progress}%` }} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
