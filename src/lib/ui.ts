import { twMerge } from 'tailwind-merge';
export const cn = (...c: (string | false | null | undefined)[]) => twMerge(c.filter(Boolean).join(' '));

export const statusTone: Record<string, string> = {
  Present: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  Active: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  Approved: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  Completed: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  Acknowledged: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  Late: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  Pending: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  'At Risk': 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  Probation: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  Onboarding: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  Submitted: 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400',
  Reviewed: 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400',
  'Work From Home': 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400',
  Planning: 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400',
  'On Leave': 'bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400',
  Absent: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
  Rejected: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
  Blocked: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
  Urgent: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
  Missed: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
};

export const tone = (s: string) => statusTone[s] || 'bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-300';
