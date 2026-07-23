

import React from 'react';
import { Pin, Megaphone } from 'lucide-react';
import { useApp } from '../lib/store';
import { empById } from '../lib/seed';
import { PageHeader, Card, Badge, Avatar, Button } from '../components/ui/Primitives';

export function Announcements() {
  const { role, announcements } = useApp();
  const canPost = role === 'super_admin' || role === 'hr_admin' || role === 'manager';
  const pinned = announcements.filter((a) => a.pinned);
  const rest = announcements.filter((a) => !a.pinned);

  return (
    <div>
      <PageHeader
        title="Announcements"
        subtitle="Company-wide updates and news"
        action={canPost ? <Button><Megaphone size={16} /> New announcement</Button> : undefined} />
      
      <div className="space-y-4">
        {[...pinned, ...rest].map((a) => {
          const author = empById(a.authorId)!;
          return (
            <Card key={a.id} className="p-5">
              <div className="mb-2 flex items-center gap-2">
                {a.pinned && <Pin size={14} className="text-primary" />}
                <Badge label={a.category} />
                <span className="text-xs text-muted">{new Date(a.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
              </div>
              <h3 className="text-lg font-semibold text-content">{a.title}</h3>
              <p className="mt-1.5 text-sm text-muted">{a.body}</p>
              <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
                <Avatar src={author.avatar} alt={author.name} size={24} />
                <span className="text-xs text-muted">Posted by {author.name}</span>
              </div>
            </Card>);

        })}
      </div>
    </div>);

}