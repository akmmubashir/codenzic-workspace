import { useState, type FormEvent } from 'react';
import { useApp } from '../lib/store';
import { PageHeader } from '../components/ui/Primitives';
import { EODReportForm } from '../components/eod/EODReportForm';
import { EODHistory } from '../components/eod/EODHistory';

export function EOD() {
  const { currentUserId, eodReports, submitEOD } = useApp();
  const [summary, setSummary] = useState('');
  const [blockers, setBlockers] = useState('');
  const [plan, setPlan] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    submitEOD({
      employeeId: currentUserId(),
      date: new Date().toISOString().slice(0, 10),
      summary,
      completed: summary ? [summary.slice(0, 40)] : [],
      inProgress: [],
      blockers,
      plan,
    });
    setSummary('');
    setBlockers('');
    setPlan('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };
  const reports = eodReports.filter((report) => report.employeeId === currentUserId());
  return (
    <div>
      <PageHeader title="My EOD Reports" subtitle="Share what you got done and any blockers" />
      <div className="grid gap-6 lg:grid-cols-2">
        <EODReportForm
          summary={summary}
          blockers={blockers}
          plan={plan}
          submitted={submitted}
          onSummaryChange={setSummary}
          onBlockersChange={setBlockers}
          onPlanChange={setPlan}
          onSubmit={submit}
        />
        <EODHistory reports={reports} />
      </div>
    </div>
  );
}
