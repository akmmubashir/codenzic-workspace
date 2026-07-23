import React from 'react';
import { FolderKanban } from 'lucide-react';
import type { Project } from '../../lib/types';
import { empById } from '../../lib/seed';
import { Avatar, Badge, Card } from '../ui/Primitives';

export function ProjectCard({ project }: { project: Project }) {
  return <Card className="p-5"><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><FolderKanban size={20} /></div><div><p className="font-semibold text-content">{project.name}</p><p className="text-xs text-muted">{project.client}</p></div></div><Badge label={project.status} /></div><p className="mt-3 text-sm text-muted">{project.description}</p><div className="mt-4"><div className="mb-1 flex justify-between text-xs text-muted"><span>Progress</span><span className="font-semibold text-content">{project.progress}%</span></div><div className="h-1.5 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/10"><div className="h-full rounded-full bg-primary" style={{ width: `${project.progress}%` }} /></div></div><div className="mt-4 flex items-center justify-between"><div className="flex -space-x-2">{project.memberIds.slice(0, 4).map((id) => { const member = empById(id); return member ? <Avatar key={id} src={member.avatar} alt={member.name} size={28} /> : null; })}</div><Badge label={project.priority} /></div></Card>;
}
