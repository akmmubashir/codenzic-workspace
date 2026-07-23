

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Bell, Sun, Moon, ChevronDown, LogOut, UserCog } from 'lucide-react';
import { useApp } from '../../lib/store';
import { empById } from '../../lib/seed';
import { ROLE_LABELS, type Role } from '../../lib/types';
import { Icon } from './Icon';
import { Avatar } from '../ui/Primitives';
import { cn } from '../../lib/ui';

const ROLES: Role[] = ['super_admin', 'hr_admin', 'manager', 'team_lead', 'employee', 'intern'];

export function Topbar() {
  const { role, setRole, theme, toggleTheme, notifications, markAllRead, currentUserId } = useApp();
  const me = empById(currentUserId())!;
  const [openNotif, setOpenNotif] = useState(false);
  const [openRole, setOpenRole] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-end gap-1.5 border-b border-border bg-surface/90 px-3 backdrop-blur sm:h-16 sm:justify-start sm:gap-3 sm:px-4">
      <div className="relative hidden min-w-0 flex-1 max-w-md sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
        <input
          placeholder="Search employees, projects, tasks…"
          className="h-9 w-full rounded-lg border border-border bg-bg pl-9 pr-3 text-sm text-content placeholder:text-muted focus:border-secondary focus:outline-none" />
        
      </div>

      {/* Role switcher (demo control) */}
      <div className="relative shrink-0 ms-auto">
        <button
          onClick={() => {setOpenRole((v) => !v);setOpenNotif(false);}}
          className="flex h-9 items-center gap-1.5 rounded-lg border border-border px-2.5 text-sm font-medium text-content hover:bg-black/5 dark:hover:bg-white/5 sm:gap-2 sm:px-3">
          
          <UserCog size={16} className="text-primary" />
          <span className="hidden md:inline">{ROLE_LABELS[role]}</span>
          <ChevronDown size={14} className="hidden text-muted sm:block" />
        </button>
        <AnimatePresence>
          {openRole &&
          <Dropdown onClose={() => setOpenRole(false)}>
              <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-muted">View as role</p>
              {ROLES.map((r) =>
            <button
              key={r}
              onClick={() => {setRole(r);setOpenRole(false);}}
              className={cn(
                'flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5',
                r === role ? 'font-semibold text-primary' : 'text-content'
              )}>
              
                  {ROLE_LABELS[r]}
                  {r === role && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                </button>
            )}
            </Dropdown>
          }
        </AnimatePresence>
      </div>

      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border text-muted hover:text-content">
        
        {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
      </button>

      <div className="relative shrink-0">
        <button
          onClick={() => {setOpenNotif((v) => !v);setOpenRole(false);}}
          aria-label="Notifications"
          className="relative grid h-9 w-9 place-items-center rounded-lg border border-border text-muted hover:text-content">
          
          <Bell size={16} />
          {unread > 0 &&
          <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
              {unread}
            </span>
          }
        </button>
        <AnimatePresence>
          {openNotif &&
          <Dropdown onClose={() => setOpenNotif(false)} width={340}>
              <div className="flex items-center justify-between px-3 py-2">
                <p className="text-sm font-semibold text-content">Notifications</p>
                <button onClick={markAllRead} className="text-xs font-medium text-primary hover:underline">
                  Mark all read
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((n) =>
              <div key={n.id} className={cn('flex gap-3 px-3 py-2.5', !n.read && 'bg-primary/5')}>
                    <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Icon name={n.icon} size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-content">{n.title}</p>
                      <p className="truncate text-xs text-muted">{n.detail}</p>
                      <p className="mt-0.5 text-[11px] text-muted">{n.time}</p>
                    </div>
                  </div>
              )}
              </div>
            </Dropdown>
          }
        </AnimatePresence>
      </div>

      <div className="flex shrink-0 items-center gap-2 pl-1">
        <Avatar src={me.avatar} alt={me.name} size={34} />
        <div className="hidden leading-tight sm:block">
          <p className="text-sm font-semibold text-content">{me.name}</p>
          <p className="text-xs text-muted">{me.jobTitle}</p>
        </div>
      </div>
    </header>);

}

function Dropdown({ children, onClose, width = 220 }: {children: React.ReactNode;onClose: () => void;width?: number;}) {
  return (
    <>
      <div className="fixed inset-0 z-10" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 6, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 6, scale: 0.98 }}
        transition={{ duration: 0.14 }}
        style={{ width: `min(${width}px, calc(100vw - 1.5rem))` }}
        className="absolute right-0 top-11 z-20 overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-lg">
        
        {children}
      </motion.div>
    </>);

}
