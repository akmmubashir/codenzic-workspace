import React from 'react';
import { Megaphone } from 'lucide-react';
import { useApp } from '../lib/store';
import { PageHeader, Button } from '../components/ui/Primitives';
import { AnnouncementList } from '../components/announcements/AnnouncementList';

export function Announcements() {
  const { role, announcements } = useApp();
  const canPost = role === 'super_admin' || role === 'hr_admin' || role === 'manager';
  const ordered = [...announcements.filter((item) => item.pinned), ...announcements.filter((item) => !item.pinned)];
  return (
    <div>
      <PageHeader
        title="Announcements"
        subtitle="Company-wide updates and news"
        action={
          canPost ? (
            <Button>
              <Megaphone size={16} /> New announcement
            </Button>
          ) : undefined
        }
      />
      <AnnouncementList announcements={ordered} />
    </div>
  );
}
