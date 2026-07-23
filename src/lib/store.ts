
import { create } from 'zustand';
import type {
  Role, LeaveRequest, Task, TaskStatus, EODReport, Announcement, ChatMessage, AppNotification } from
'./types';
import { meByRole, empById } from './seed';
import * as seed from './seed';

interface Session {
  checkedIn: boolean;
  checkInAt: string | null;
  onBreak: boolean;
  breakMins: number;
  mode: 'Office' | 'Remote' | 'Client' | 'Field';
}

interface AppState {
  companyName: string;
  role: Role;
  theme: 'light' | 'dark';
  sidebarCollapsed: boolean;
  session: Session;

  leaveRequests: LeaveRequest[];
  tasks: Task[];
  eodReports: EODReport[];
  announcements: Announcement[];
  messages: ChatMessage[];
  notifications: AppNotification[];

  setRole: (r: Role) => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  currentUserId: () => string;

  checkIn: () => void;
  checkOut: () => void;
  toggleBreak: () => void;

  applyLeave: (l: Omit<LeaveRequest, 'id' | 'status' | 'appliedOn'>) => void;
  setLeaveStatus: (id: string, status: LeaveRequest['status']) => void;

  moveTask: (id: string, status: TaskStatus) => void;

  submitEOD: (e: Omit<EODReport, 'id' | 'status'>) => void;

  sendMessage: (channelId: string, text: string) => void;
  markAllRead: () => void;
}

export const useApp = create<AppState>((set, get) => ({
  companyName: 'Codenzic Workspace',
  role: 'super_admin',
  theme: 'light',
  sidebarCollapsed: false,
  session: { checkedIn: false, checkInAt: null, onBreak: false, breakMins: 0, mode: 'Office' },

  leaveRequests: [...seed.leaveRequests],
  tasks: [...seed.tasks],
  eodReports: [...seed.eodReports],
  announcements: [...seed.announcements],
  messages: [...seed.messages],
  notifications: [...seed.notifications],

  setRole: (role) => set({ role }),
  toggleTheme: () =>
  set((s) => {
    const theme = s.theme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', theme === 'dark');
    return { theme };
  }),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  currentUserId: () => meByRole[get().role],

  checkIn: () =>
  set(() => ({
    session: {
      checkedIn: true,
      checkInAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      onBreak: false,
      breakMins: 0,
      mode: 'Office'
    }
  })),
  checkOut: () =>
  set(() => ({ session: { checkedIn: false, checkInAt: null, onBreak: false, breakMins: 0, mode: 'Office' } })),
  toggleBreak: () => set((s) => ({ session: { ...s.session, onBreak: !s.session.onBreak } })),

  applyLeave: (l) =>
  set((s) => ({
    leaveRequests: [
    { ...l, id: `lr-${Date.now()}`, status: 'Pending', appliedOn: new Date().toISOString().slice(0, 10) },
    ...s.leaveRequests]

  })),
  setLeaveStatus: (id, status) =>
  set((s) => ({ leaveRequests: s.leaveRequests.map((r) => r.id === id ? { ...r, status } : r) })),

  moveTask: (id, status) =>
  set((s) => ({
    tasks: s.tasks.map((t) =>
    t.id === id ? { ...t, status, progress: status === 'Completed' ? 100 : t.progress } : t
    )
  })),

  submitEOD: (e) =>
  set((s) => ({ eodReports: [{ ...e, id: `e-${Date.now()}`, status: 'Submitted' }, ...s.eodReports] })),

  sendMessage: (channelId, text) =>
  set((s) => ({
    messages: [
    ...s.messages,
    {
      id: `m-${Date.now()}`,
      channelId,
      senderId: get().currentUserId(),
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]

  })),
  markAllRead: () => set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) }))
}));

export { empById };