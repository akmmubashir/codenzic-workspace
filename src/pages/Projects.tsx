

import React from 'react';
import { FolderKanban } from 'lucide-react';
import { projects, empById } from '../lib/seed';
import { PageHeader, Card, Badge, Avatar, Button } from '../components/ui/Primitives';

export function Projects() {
  return (
    <div>
      <PageHeader title="Projects" subtitle="All active and archived projects" action={<Button>New project</Button>} />
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p) => {
          const mgr = empById(p.managerId)!;
          return (
            <Card key={p.id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                    <FolderKanban size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-content">{p.name}</p>
                    <p className="text-xs text-muted">{p.client}</p>
                  </div>
                </div>
                <Badge label={p.status} />
              </div>
              <p className="mt-3 text-sm text-muted">{p.description}</p>
              <div className="mt-4">
                <div className="mb-1 flex justify-between text-xs text-muted">
                  <span>Progress</span><span className="font-semibold text-content">{p.progress}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${p.progress}%` }} />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {p.memberIds.slice(0, 4).map((id) => {
                    const m = empById(id);
                    return m ? <Avatar key={id} src={m.avatar} alt={m.name} size={28} /> : null;
                  })}
                </div>
                <Badge label={p.priority} />
              </div>
            </Card>);

        })}
      </div>
    </div>);

}