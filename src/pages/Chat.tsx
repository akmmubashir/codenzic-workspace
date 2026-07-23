

import React, { useMemo, useState } from 'react';
import { Hash, Lock, Send, AtSign } from 'lucide-react';
import { useApp } from '../lib/store';
import { channels, empById } from '../lib/seed';
import { Avatar } from '../components/ui/Primitives';
import { cn } from '../lib/ui';

export function Chat() {
  const { messages, sendMessage, currentUserId } = useApp();
  const [active, setActive] = useState(channels[2].id);
  const [text, setText] = useState('');
  const activeCh = channels.find((c) => c.id === active)!;
  const thread = useMemo(() => messages.filter((m) => m.channelId === active), [messages, active]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(active, text.trim());
    setText('');
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-xl border border-border bg-surface">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border sm:flex">
        <div className="p-3 text-xs font-semibold uppercase tracking-wider text-muted">Channels</div>
        <div className="flex-1 overflow-y-auto px-2">
          {channels.map((c) =>
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className={cn(
              'flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm',
              active === c.id ? 'bg-primary/10 font-medium text-primary' : 'text-muted hover:bg-black/5 dark:hover:bg-white/5'
            )}>
            
              {c.type === 'dm' ? <AtSign size={15} /> : c.type === 'private' ? <Lock size={15} /> : <Hash size={15} />}
              <span className="flex-1 truncate text-left">{c.name}</span>
              {c.unread > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">{c.unread}</span>}
            </button>
          )}
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-14 items-center gap-2 border-b border-border px-4">
          <Hash size={18} className="text-muted" />
          <p className="font-semibold text-content">{activeCh.name}</p>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {thread.map((m) => {
            const s = empById(m.senderId);
            const mine = m.senderId === currentUserId();
            return (
              <div key={m.id} className="flex gap-3">
                {s && <Avatar src={s.avatar} alt={s.name} size={34} />}
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-content">{mine ? 'You' : s?.name ?? 'Unknown'}</span>
                    <span className="text-xs text-muted">{m.time}</span>
                  </div>
                  <p className="text-sm text-content">{m.text}</p>
                </div>
              </div>);

          })}
          {thread.length === 0 && <p className="pt-10 text-center text-sm text-muted">No messages yet. Start the conversation!</p>}
        </div>
        <form onSubmit={send} className="flex gap-2 border-t border-border p-3">
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder={`Message #${activeCh.name}`} className="h-10 flex-1 rounded-lg border border-border bg-bg px-3 text-sm text-content focus:border-secondary focus:outline-none" />
          <button type="submit" className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-white hover:bg-secondary">
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>);

}