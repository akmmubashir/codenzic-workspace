

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, LogOut, Coffee, MapPin } from 'lucide-react';
import { useApp } from '../../lib/store';
import { Card, Button } from '../ui/Primitives';
import { cn } from '../../lib/ui';

export function CheckInWidget({ compact = false }: {compact?: boolean;}) {
  const { session, checkIn, checkOut, toggleBreak } = useApp();
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <Card className={cn('overflow-hidden', compact ? 'p-5' : 'p-6')}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            {session.checkedIn ? session.onBreak ? 'On break' : 'Checked in' : 'Not checked in'}
          </p>
          <p className="mt-1 text-3xl font-bold tabular-nums text-content">
            {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </p>
          {session.checkedIn &&
          <p className="mt-1 flex items-center gap-1 text-xs text-muted">
              <MapPin size={12} /> {session.mode} · since {session.checkInAt}
            </p>
          }
        </div>
        <motion.span
          animate={{ scale: session.checkedIn && !session.onBreak ? [1, 1.15, 1] : 1 }}
          transition={{ repeat: Infinity, duration: 2 }}
          className={cn(
            'h-3 w-3 rounded-full',
            !session.checkedIn ? 'bg-slate-300' : session.onBreak ? 'bg-amber-400' : 'bg-emerald-500'
          )} />
        
      </div>

      <div className="mt-5 flex gap-2">
        {!session.checkedIn ?
        <Button onClick={checkIn} className="flex-1">
            <LogIn size={16} /> Check in
          </Button> :

        <>
            <Button onClick={checkOut} variant="danger" className="flex-1">
              <LogOut size={16} /> Check out
            </Button>
            <Button onClick={toggleBreak} variant="outline">
              <Coffee size={16} /> {session.onBreak ? 'End break' : 'Break'}
            </Button>
          </>
        }
      </div>
      <p className="mt-3 text-[11px] text-muted">
        Location is captured only at check-in/out — never continuously.
      </p>
    </Card>);

}