
import React from 'react';
import { cn, tone } from '../../lib/ui';

export function Card({ className, children }: {className?: string;children: React.ReactNode;}) {
  return (
    <div className={cn('rounded-xl border border-border bg-surface shadow-card', className)}>{children}</div>);

}

export function Badge({ label, className }: {label: string;className?: string;}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        tone(label),
        className
      )}>
      
      {label}
    </span>);

}

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md';
};
export function Button({ variant = 'primary', size = 'md', className, children, ...rest }: BtnProps) {
  const variants = {
    primary: 'bg-primary text-white hover:bg-secondary',
    ghost: 'text-muted hover:bg-black/5 dark:hover:bg-white/5',
    outline: 'border border-border text-content hover:bg-black/5 dark:hover:bg-white/5',
    danger: 'bg-rose-600 text-white hover:bg-rose-700'
  };
  const sizes = { sm: 'h-8 px-3 text-sm', md: 'h-10 px-4 text-sm' };
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...rest}>
      
      {children}
    </button>);

}

export function Avatar({ src, alt, size = 36 }: {src: string;alt: string;size?: number;}) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="rounded-full object-cover ring-1 ring-border"
      style={{ width: size, height: size }} />);


}

export function PageHeader({ title, subtitle, action }: {title: string;subtitle?: string;action?: React.ReactNode;}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3 sm:mb-6 sm:gap-4">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-content sm:text-2xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {action && <div className="w-full sm:w-auto">{action}</div>}
    </div>);

}

export function EmptyState({ icon, title, hint }: {icon: React.ReactNode;title: string;hint?: string;}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-14 text-center">
      <div className="mb-3 text-muted">{icon}</div>
      <p className="font-medium text-content">{title}</p>
      {hint && <p className="mt-1 max-w-sm text-sm text-muted">{hint}</p>}
    </div>);

}

export function Stat({
  label, value, hint, tone: t = 'text-content'
}: {label: string;value: React.ReactNode;hint?: string;tone?: string;}) {
  return (
    <Card className="p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
      <p className={cn('mt-2 text-2xl font-bold', t)}>{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </Card>);

}
