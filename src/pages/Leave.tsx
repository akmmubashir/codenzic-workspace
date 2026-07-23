

import React, { useState } from 'react';
import { Plus, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../lib/store';
import { empById } from '../lib/seed';
import type { LeaveType } from '../lib/types';
import { PageHeader, Card, Badge, Button, Avatar, Stat, EmptyState } from '../components/ui/Primitives';

const TYPES: LeaveType[] = ['Casual Leave', 'Sick Leave', 'Earned Leave', 'Paid Leave', 'Emergency Leave', 'Work From Home'];

export function Leave() {
  const { role, currentUserId, leaveRequests, applyLeave, setLeaveStatus } = useApp();
  const [open, setOpen] = useState(false);
  const canApprove = role === 'super_admin' || role === 'hr_admin' || role === 'manager';
  const list = canApprove ? leaveRequests : leaveRequests.filter((l) => l.employeeId === currentUserId());

  return (
    <div>
      <PageHeader
        title={canApprove ? 'Leave Requests' : 'My Leave'}
        subtitle={canApprove ? 'Review and approve your team’s leave' : 'Apply and track your time off'}
        action={<Button onClick={() => setOpen(true)}><Plus size={16} /> Apply for leave</Button>} />
      

      {!canApprove &&
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat label="Casual balance" value="8" hint="of 12 days" tone="text-primary" />
          <Stat label="Sick balance" value="5" hint="of 8 days" tone="text-emerald-600" />
          <Stat label="Earned balance" value="14" hint="of 18 days" tone="text-sky-600" />
        </div>
      }

      {list.length === 0 ?
      <EmptyState icon={<Plus size={28} />} title="No leave requests yet" hint="Apply for leave to see it here." /> :

      <div className="space-y-3">
          {list.map((l) => {
          const emp = empById(l.employeeId)!;
          return (
            <Card key={l.id} className="flex flex-wrap items-center gap-4 p-4">
                <Avatar src={emp.avatar} alt={emp.name} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-content">{emp.name}</p>
                    <Badge label={l.type} />
                    <Badge label={l.status} />
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    {new Date(l.from).toLocaleDateString()} → {new Date(l.to).toLocaleDateString()} · {l.days} day{l.days !== 1 && 's'}
                    {l.halfDay && ' (half day)'} · {l.reason}
                  </p>
                </div>
                {canApprove && l.status === 'Pending' &&
              <div className="flex w-full gap-2 sm:w-auto">
                    <Button size="sm" onClick={() => setLeaveStatus(l.id, 'Approved')}><Check size={14} /> Approve</Button>
                    <Button size="sm" variant="outline" onClick={() => setLeaveStatus(l.id, 'Rejected')}><X size={14} /> Reject</Button>
                  </div>
              }
              </Card>);

        })}
        </div>
      }

      <AnimatePresence>
        {open && <ApplyModal onClose={() => setOpen(false)} onSubmit={(d) => {applyLeave({ ...d, employeeId: currentUserId() });setOpen(false);}} />}
      </AnimatePresence>
    </div>);

}

function ApplyModal({ onClose, onSubmit }: {onClose: () => void;onSubmit: (d: any) => void;}) {
  const [type, setType] = useState<LeaveType>('Casual Leave');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [halfDay, setHalfDay] = useState(false);
  const [reason, setReason] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const days = halfDay ? 0.5 : Math.max(1, Math.round((+new Date(to || from) - +new Date(from)) / 86400000) + 1);
    onSubmit({ type, from, to: to || from, days, halfDay, reason });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <motion.form
        initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
        onClick={(e) => e.stopPropagation()} onSubmit={submit}
        className="max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-border bg-surface p-4 sm:p-6">
        
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-content">Apply for leave</h3>
          <button type="button" onClick={onClose} className="text-muted hover:text-content"><X size={18} /></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-content">Leave type</label>
            <select value={type} onChange={(e) => setType(e.target.value as LeaveType)} className="h-10 w-full rounded-lg border border-border bg-bg px-3 text-sm text-content focus:border-secondary focus:outline-none">
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-content">From</label>
              <input required type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="h-10 w-full rounded-lg border border-border bg-bg px-3 text-sm text-content focus:border-secondary focus:outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-content">To</label>
              <input type="date" value={to} onChange={(e) => setTo(e.target.value)} disabled={halfDay} className="h-10 w-full rounded-lg border border-border bg-bg px-3 text-sm text-content focus:border-secondary focus:outline-none disabled:opacity-50" />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-content">
            <input type="checkbox" checked={halfDay} onChange={(e) => setHalfDay(e.target.checked)} className="h-4 w-4 rounded border-border text-primary" />
            Half day
          </label>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-content">Reason</label>
            <textarea required value={reason} onChange={(e) => setReason(e.target.value)} rows={3} className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-content focus:border-secondary focus:outline-none" />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">Submit request</Button>
        </div>
      </motion.form>
    </div>);

}
