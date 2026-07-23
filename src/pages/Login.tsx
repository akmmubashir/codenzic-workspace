

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layers, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Primitives';

export function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState('aarav@codenzic.com');
  const [pw, setPw] = useState('codenzic123');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => nav('/'), 700);
  };

  return (
    <div className="flex min-h-screen w-full bg-bg">
      <div className="hidden w-1/2 flex-col justify-between bg-primary p-12 text-white lg:flex">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/15">
            <Layers size={20} />
          </div>
          <span className="text-lg font-bold">Codenzic Workspace</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold leading-tight">One workspace for your entire team.</h1>
          <p className="mt-4 max-w-md text-white/80">
            Attendance, leave, projects, tasks, EOD reports, chat and announcements — unified for Codenzic Innovations.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
            {['Attendance', 'Projects & Tasks', 'Team Chat'].map((f) =>
            <div key={f} className="rounded-lg bg-white/10 px-3 py-2 font-medium">{f}</div>
            )}
          </div>
        </div>
        <p className="text-sm text-white/60">© 2026 Codenzic Innovations</p>
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm">
          
          <div className="mb-8 lg:hidden">
            <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-primary text-white">
              <Layers size={22} />
            </div>
            <p className="text-lg font-bold text-content">Codenzic Workspace</p>
          </div>

          <h2 className="text-2xl font-bold text-content">Sign in</h2>
          <p className="mt-1 text-sm text-muted">Welcome back. Use your company credentials.</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-content">Email or mobile</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  required
                  className="h-11 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-sm text-content focus:border-secondary focus:outline-none" />
                
              </div>
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-sm font-medium text-content">Password</label>
                <button type="button" className="text-xs font-medium text-primary hover:underline">Forgot?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                <input
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  type={show ? 'text' : 'password'}
                  required
                  className="h-11 w-full rounded-lg border border-border bg-surface pl-9 pr-10 text-sm text-content focus:border-secondary focus:outline-none" />
                
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-content">
                  
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-11">
              {loading ? <Loader2 className="animate-spin" size={16} /> : 'Sign in'}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted">
            Protected by role-based access control. Login history and failed attempts are recorded.
          </p>
        </motion.div>
      </div>
    </div>);

}