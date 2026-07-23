import React from 'react';
import { FolderKanban, Pencil, Trash2, Eye } from 'lucide-react';
import type { Project } from '../../lib/types';
import { empById } from '../../lib/seed';
import { Avatar, Badge, Button, Card } from '../ui/Primitives';

export function ProjectCard({
  project,
  onEdit,
  onDelete,
  onView,
}: {
  project: Project;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
            <FolderKanban size={20} />
          </div>
          <div>
            <p className="font-semibold text-content">{project.name}</p>
            <p className="text-xs text-muted">{project.client}</p>
          </div>
        </div>
        <Badge label={project.status} />
      </div>
      <p className="mt-3 text-sm text-muted">{project.description}</p>
      <div className="mt-4">
        <div className="mb-1 flex justify-between text-xs text-muted">
          <span>Progress</span>
          <span className="font-semibold text-content">{project.progress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
          <div className="h-full rounded-full bg-primary" style={{ width: `${project.progress}%` }} />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex -space-x-2">
          {project.memberIds.slice(0, 4).map((id) => {
            const member = empById(id);
            return member ? <Avatar key={id} src={member.avatar} alt={member.name} size={28} /> : null;
          })}
        </div>
        <Badge label={project.priority} />
      </div>
      {(onView || onEdit || onDelete) && (
        <div className="mt-4 flex gap-2 border-t border-border pt-3">
          <Button size="sm" variant="outline" onClick={onView} aria-label={`View ${project.name}`}>
            <Eye size={14} />
          </Button>
          <Button size="sm" variant="outline" className="flex-1" onClick={onEdit}>
            <Pencil size={14} />
            Edit
          </Button>
          <Button size="sm" variant="outline" onClick={onDelete} aria-label={`Delete ${project.name}`}>
            <Trash2 size={14} />
          </Button>
        </div>
      )}
    </Card>
  );
}
