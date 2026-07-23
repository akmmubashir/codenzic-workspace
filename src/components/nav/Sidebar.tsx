

import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../../lib/store';
import { visibleGroups } from './navConfig';
import { Icon } from './Icon';
import { cn } from '../../lib/ui';
import { PanelLeftClose, PanelLeft, Layers } from 'lucide-react';

export function Sidebar() {
  const { role, companyName, sidebarCollapsed, toggleSidebar } = useApp();
  const groups = visibleGroups(role);
  const w = sidebarCollapsed ? 76 : 264;

  return (
    <motion.aside
      animate={{ width: w }}
      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
      className="hidden shrink-0 flex-col border-r border-border bg-surface md:flex">
      
      <div className="flex h-16 items-center gap-3 px-4">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-white">
          <Layers size={18} />
        </div>
        {!sidebarCollapsed &&
        <div className="min-w-0">
            <p className="truncate text-sm font-bold text-content">{companyName}</p>
            <p className="truncate text-xs text-muted">Codenzic Innovations</p>
          </div>
        }
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-2">
        {groups.map((g) =>
        <div key={g.label}>
            {!sidebarCollapsed &&
          <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted">{g.label}</p>
          }
            <div className="space-y-0.5">
              {g.items.map((item) =>
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              title={sidebarCollapsed ? item.label : undefined}
              className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors',
                sidebarCollapsed && 'justify-center',
                isActive ?
                'bg-primary/10 text-primary' :
                'text-muted hover:bg-black/5 hover:text-content dark:hover:bg-white/5'
              )
              }>
              
                  <Icon name={item.icon} size={18} />
                  {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
            )}
            </div>
          </div>
        )}
      </nav>

      <button
        onClick={toggleSidebar}
        className="flex h-12 items-center gap-3 border-t border-border px-4 text-sm font-medium text-muted hover:text-content">
        
        {sidebarCollapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
        {!sidebarCollapsed && 'Collapse'}
      </button>
    </motion.aside>);

}