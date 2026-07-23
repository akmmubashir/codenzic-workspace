import React from 'react';
import { useApp } from '../lib/store';
import { PageHeader } from '../components/ui/Primitives';
import { TeamEODSummary } from '../components/team-eod/TeamEODSummary';
import { TeamEODList } from '../components/team-eod/TeamEODList';

export function TeamEOD() {
  const { eodReports } = useApp();
  return (
    <div>
      <PageHeader title="Team EOD" subtitle="Daily reports and blockers across your team" />
      <TeamEODSummary reports={eodReports} />
      <TeamEODList reports={eodReports} />
    </div>
  );
}
