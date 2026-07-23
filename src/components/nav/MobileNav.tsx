import React from 'react';
import { NavLink } from 'react-router-dom';
import { mobileNav } from './navConfig';
import { Icon } from './Icon';
import { cn } from '../../lib/ui';

export function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-surface/95 backdrop-blur md:hidden">
      {mobileNav.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            cn(
              'flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium transition-colors',
              isActive ? 'text-primary' : 'text-muted'
            )
          }
        >
          <Icon name={item.icon} size={20} />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
