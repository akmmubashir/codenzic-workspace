import React, { useState } from 'react';
import { useApp } from '../lib/store';
import { PageHeader, Button } from '../components/ui/Primitives';
import { BrandingSettings } from '../components/settings/BrandingSettings';
import { WorkingHoursSettings } from '../components/settings/WorkingHoursSettings';

export function Settings() {
  const { companyName } = useApp();
  const [name, setName] = useState(companyName);
  const [start, setStart] = useState('09:00');
  const [end, setEnd] = useState('18:00');
  const [grace, setGrace] = useState('15');
  return (
    <div>
      <PageHeader title="Company Settings" subtitle="Configure your workspace, branding and working hours" />
      <div className="grid gap-6 lg:grid-cols-2">
        <BrandingSettings name={name} onNameChange={setName} />
        <WorkingHoursSettings
          start={start}
          end={end}
          grace={grace}
          onStartChange={setStart}
          onEndChange={setEnd}
          onGraceChange={setGrace}
        />
      </div>
      <div className="mt-6 flex justify-end">
        <Button>Save changes</Button>
      </div>
    </div>
  );
}
