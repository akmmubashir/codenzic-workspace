import { Download } from 'lucide-react';
import { PageHeader, Button } from '../components/ui/Primitives';
import { ReportCharts } from '../components/reports/ReportCharts';

export function Reports() {
  return <div><PageHeader title="Reports & Analytics" subtitle="Attendance, leave, tasks and headcount insights" action={<Button variant="outline"><Download size={16} /> Export CSV</Button>} /><ReportCharts /></div>;
}
