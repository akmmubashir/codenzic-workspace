import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Legend } from 'recharts';
import { Card } from '../ui/Primitives';

const employmentTypes = [{ name: 'Full-time', value: 11 }, { name: 'Intern', value: 2 }, { name: 'Contract', value: 1 }];
const leaveUsage = [{ m: 'Casual', used: 34 }, { m: 'Sick', used: 21 }, { m: 'Earned', used: 48 }, { m: 'WFH', used: 60 }];
const colors = ['rgb(30 58 138)', 'rgb(6 182 212)', 'rgb(37 99 235)'];

export function ReportCharts() {
  return <div className="grid gap-6 md:grid-cols-2"><Card className="p-5"><h3 className="mb-4 text-sm font-semibold text-content">Employment type distribution</h3><ResponsiveContainer width="100%" height={220}><PieChart><Pie data={employmentTypes} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>{employmentTypes.map((_, index) => <Cell key={index} fill={colors[index % colors.length]} />)}</Pie><Legend /><Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} /></PieChart></ResponsiveContainer></Card><Card className="p-5"><h3 className="mb-4 text-sm font-semibold text-content">Leave usage this year</h3><ResponsiveContainer width="100%" height={220}><BarChart data={leaveUsage}><XAxis dataKey="m" tick={{ fontSize: 11, fill: 'rgb(100 116 139)' }} axisLine={false} tickLine={false} /><Tooltip cursor={{ fill: 'rgba(37,99,235,0.08)' }} contentStyle={{ borderRadius: 8, fontSize: 12 }} /><Bar dataKey="used" fill="rgb(6 182 212)" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></Card></div>;
}
