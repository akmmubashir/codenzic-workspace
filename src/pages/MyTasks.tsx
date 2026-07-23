import React from 'react';
import { useApp } from '../lib/store';
import { projects } from '../lib/seed';
import { PageHeader } from '../components/ui/Primitives';
import { TaskList } from '../components/my-tasks/TaskList';

export function MyTasks() {
  const { tasks, currentUserId } = useApp();
  const mine = tasks.filter((task) => task.assigneeId === currentUserId());
  const projectName = (id: string) => projects.find((project) => project.id === id)?.name ?? '-';
  return (
    <div>
      <PageHeader title="My Tasks" subtitle={`${mine.length} tasks assigned to you`} />
      <TaskList tasks={mine} projectName={projectName} />
    </div>
  );
}
