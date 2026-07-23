import React from 'react';
import { Pin } from 'lucide-react';
import type { Announcement } from '../../lib/types';
import { empById } from '../../lib/seed';
import { Avatar, Badge, Card } from '../ui/Primitives';

export function AnnouncementList({ announcements }: { announcements: Announcement[] }) {
  return <div className="space-y-4">{announcements.map((announcement) => { const author = empById(announcement.authorId); return author ? <Card key={announcement.id} className="p-5"><div className="mb-2 flex items-center gap-2">{announcement.pinned && <Pin size={14} className="text-primary" />}<Badge label={announcement.category} /><span className="text-xs text-muted">{new Date(announcement.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span></div><h3 className="text-lg font-semibold text-content">{announcement.title}</h3><p className="mt-1.5 text-sm text-muted">{announcement.body}</p><div className="mt-4 flex items-center gap-2 border-t border-border pt-3"><Avatar src={author.avatar} alt={author.name} size={24} /><span className="text-xs text-muted">Posted by {author.name}</span></div></Card> : null; })}</div>;
}
