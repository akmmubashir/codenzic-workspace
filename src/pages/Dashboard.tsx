

import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, LineChart, Line, CartesianGrid } from
'recharts';
import { useApp } from '../lib/store';
import { empById, employees, attendance, projects } from '../lib/seed';
import { Card, Stat, PageHeader, Badge, Avatar, Button } from '../components/ui/Primitives';
import { CheckInWidget } from '../components/my-attendance/CheckInWidget';
import { ROLE_LABELS } from '../lib/types';

const stagger = { animate: { transition: { staggerChildren: 0.05 } } };
const item = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } };

const deptData = [
{ name: 'Frontend', present: 4 }, { name: 'Backend', present: 5 },
{ name: 'Design', present: 3 }, { name: 'QA', present: 2 }, { name: 'Sales', present: 3 }];

const trend = [
{ d: 'Mon', v: 92 }, { d: 'Tue', v: 88 }, { d: 'Wed', v: 95 }, { d: 'Thu', v: 90 }, { d: 'Fri', v: 86 }];


export function Dashboard() {
  const { role, currentUserId, leaveRequests, tasks } = useApp();
  const me = empById(currentUserId())!;
  const pendingLeave = leaveRequests.filter((l) => l.status === 'Pending');
  const overdue = tasks.filter((t) => new Date(t.dueDate) < new Date() && t.status !== 'Completed');
  const staff = role === 'super_admin' || role === 'hr_admin' || role === 'manager';

  return (
    <motion.div variants={stagger} initial="initial" animate="animate">
      <PageHeader
        title={`Good to see you, ${me.name.split(' ')[0]}`}
        subtitle={`${ROLE_LABELS[role]} · ${new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}`} />
      

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {staff ?
          <motion.div variants={item} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat label="Total Employees" value={employees.length} hint="+2 this quarter" />
              <Stat label="Present Today" value={11} tone="text-emerald-600" hint="79% attendance" />
              <Stat label="On Leave" value={1} tone="text-violet-600" />
              <Stat label="Pending Leave" value={pendingLeave.length} tone="text-amber-600" hint="awaiting approval" />
            </motion.div> :

          <motion.div variants={item}>
              <CheckInWidget />
            </motion.div>
          }

          <motion.div variants={item} className="grid gap-6 md:grid-cols-2">
            <Card className="p-5">
              <h3 className="mb-4 text-sm font-semibold text-content">Department attendance today</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={deptData}>
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'rgb(100 116 139)' }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: 'rgba(37,99,235,0.08)' }} contentStyle={{ borderRadius: 8, border: '1px solid rgb(226 232 240)', fontSize: 12 }} />
                  <Bar dataKey="present" fill="rgb(37 99 235)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card className="p-5">
              <h3 className="mb-4 text-sm font-semibold text-content">Weekly attendance trend</h3>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={trend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgb(226 232 240)" vertical={false} />
                  <XAxis dataKey="d" tick={{ fontSize: 11, fill: 'rgb(100 116 139)' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid rgb(226 232 240)', fontSize: 12 }} />
                  <Line type="monotone" dataKey="v" stroke="rgb(6 182 212)" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-content">Active projects</h3>
                <Button variant="ghost" size="sm">View all</Button>
              </div>
              <div className="space-y-3">
                {projects.filter((p) => p.status !== 'Archived').slice(0, 3).map((p) =>
                <div key={p.id} className="flex items-center gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium text-content">{p.name}</p>
                        <Badge label={p.status} />
                      </div>
                      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${p.progress}%` }} />
                      </div>
                    </div>
                    <span className="w-10 text-right text-sm font-semibold text-content">{p.progress}%</span>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          {staff &&
          <motion.div variants={item}>
              <CheckInWidget compact />
            </motion.div>
          }
          <motion.div variants={item}>
            <Card className="p-5">
              <h3 className="mb-3 text-sm font-semibold text-content">Overdue tasks</h3>
              {overdue.length === 0 ?
              <p className="text-sm text-muted">Nothing overdue. Great job! 🎉</p> :

              <div className="space-y-2">
                  {overdue.slice(0, 4).map((t) =>
                <div key={t.id} className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm text-content">{t.title}</p>
                      <Badge label={t.priority} />
                    </div>
                )}
                </div>
              }
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="p-5">
              <h3 className="mb-3 text-sm font-semibold text-content">Upcoming birthdays</h3>
              <div className="space-y-3">
                {employees.slice(2, 5).map((e) =>
                <div key={e.id} className="flex items-center gap-3">
                    <Avatar src={e.avatar} alt={e.name} size={32} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-content">{e.name}</p>
                      <p className="text-xs text-muted">{new Date(e.dob).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>);

}