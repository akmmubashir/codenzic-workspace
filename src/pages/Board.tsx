import { useState } from 'react';
import { useApp } from '../lib/store';
import type { TaskStatus } from '../lib/types';
import { PageHeader } from '../components/ui/Primitives';
import { BoardColumn } from '../components/task-board/BoardColumn';

const columns: TaskStatus[] = ['Backlog', 'To Do', 'In Progress', 'In Review', 'Testing', 'Blocked', 'Completed'];
export function Board() {
  const { tasks, moveTask } = useApp(); const [draggingId, setDraggingId] = useState<string | null>(null); const [activeDrop, setActiveDrop] = useState<TaskStatus | null>(null);
  return <div><PageHeader title="Task Board" subtitle="Drag cards across columns to update status" /><div className="flex gap-4 overflow-x-auto pb-4">{columns.map((status) => <BoardColumn key={status} status={status} tasks={tasks.filter((task) => task.status === status)} draggingId={draggingId} activeDrop={activeDrop} onDragStart={setDraggingId} onDragEnd={() => setDraggingId(null)} onDragOver={() => setActiveDrop(status)} onDragLeave={() => setActiveDrop((current) => current === status ? null : current)} onDrop={() => { if (draggingId) moveTask(draggingId, status); setDraggingId(null); setActiveDrop(null); }} />)}</div></div>;
}
