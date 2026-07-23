import React, { useState } from 'react';
import { useApp } from '../lib/store';
import { PageHeader, Button } from '../components/ui/Primitives';
import { BrandingSettings } from '../components/settings/BrandingSettings';
import { WorkingHoursSettings } from '../components/settings/WorkingHoursSettings';
import { LateArrivalRulesSettings } from '../components/settings/LateArrivalRulesSettings';

export function Settings() {
  const { companyName, attendanceRules, updateAttendanceRules } = useApp();
  const [name, setName] = useState(companyName);
  const [start, setStart] = useState(attendanceRules.shiftStartTime);
  const [end, setEnd] = useState('18:00');
  const [grace, setGrace] = useState(String(attendanceRules.gracePeriodMins));
  const [lateRules, setLateRules] = useState(attendanceRules);
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
        <LateArrivalRulesSettings rules={lateRules} onChange={setLateRules} />
      </div>
      <div className="mt-6 flex justify-end">
        <Button
          onClick={() => updateAttendanceRules({ ...lateRules, shiftStartTime: start, gracePeriodMins: Number(grace) })}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
}
