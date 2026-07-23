import { create } from 'zustand';
import type {
  Role,
  LeaveRequest,
  Task,
  TaskStatus,
  EODReport,
  Announcement,
  ChatMessage,
  AppNotification,
  AttendanceRecord,
  AttendanceRules,
  LateCheckInRecord,
  LateReasonReviewStatus,
  AttendanceUpdateRequest,
  Employee,
  Project,
} from './types';
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
  attendanceRecords: AttendanceRecord[];
  lateCheckInRecords: LateCheckInRecord[];
  attendanceRules: AttendanceRules;
  attendanceUpdateRequests: AttendanceUpdateRequest[];
  employees: Employee[];
  projects: Project[];

  setRole: (r: Role) => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  currentUserId: () => string;

  checkIn: (lateReason?: Pick<LateCheckInRecord, 'reasonCategory' | 'explanation' | 'attachmentName'>) => void;
  checkOut: () => void;
  toggleBreak: () => void;

  applyLeave: (l: Omit<LeaveRequest, 'id' | 'status' | 'appliedOn'>) => void;
  setLeaveStatus: (id: string, status: LeaveRequest['status']) => void;

  moveTask: (id: string, status: TaskStatus) => void;

  submitEOD: (e: Omit<EODReport, 'id' | 'status'>) => void;

  sendMessage: (channelId: string, text: string) => void;
  markAllRead: () => void;
  updateAttendanceRules: (rules: AttendanceRules) => void;
  reviewLateCheckIn: (id: string, status: LateReasonReviewStatus, comment: string) => void;
  submitAttendanceUpdateRequest: (
    request: Omit<AttendanceUpdateRequest, 'id' | 'submittedAt' | 'status' | 'employeeId'>
  ) => void;
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, employee: Omit<Employee, 'id'>) => void;
  deleteEmployee: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Omit<Project, 'id'>) => void;
  deleteProject: (id: string) => void;
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
  attendanceRecords: [...seed.attendance],
  lateCheckInRecords: [],
  attendanceUpdateRequests: [],
  employees: [...seed.employees],
  projects: [...seed.projects],
  attendanceRules: {
    shiftStartTime: '09:00',
    gracePeriodMins: 15,
    minimumDelayForReasonMins: 1,
    exemptEmployeeIds: [],
    exemptDepartments: [],
    attachmentRequiredFor: ['Medical Reason'],
    managerApprovalRequired: true,
    repeatedLateAlertThreshold: 3,
    notificationRecipients: ['Manager', 'HR'],
    acceptedReasonExcusesLate: true,
  },

  setRole: (role) => set({ role }),
  toggleTheme: () =>
    set((s) => {
      const theme = s.theme === 'light' ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', theme === 'dark');
      return { theme };
    }),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  currentUserId: () => meByRole[get().role],

  checkIn: (lateReason) =>
    set((state) => {
      const now = new Date();
      const actualCheckInTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      const scheduledCheckInTime =
        empById(get().currentUserId())?.scheduledCheckInTime ?? state.attendanceRules.shiftStartTime;
      const [shiftHours, shiftMinutes] = scheduledCheckInTime.split(':').map(Number);
      const lateStart = shiftHours * 60 + shiftMinutes + state.attendanceRules.gracePeriodMins;
      const currentMins = now.getHours() * 60 + now.getMinutes();
      const lateDurationMins = Math.max(0, currentMins - lateStart);
      const employeeId = get().currentUserId();
      const employee = empById(employeeId);
      const isExempt =
        state.attendanceRules.exemptEmployeeIds.includes(employeeId) ||
        (employee && state.attendanceRules.exemptDepartments.includes(employee.department));
      const isLate = !isExempt && lateDurationMins >= state.attendanceRules.minimumDelayForReasonMins;
      if (isLate && !lateReason) return state;
      const attendanceRecord: AttendanceRecord = {
        id: `att-${Date.now()}`,
        employeeId,
        date: now.toISOString().slice(0, 10),
        checkIn: actualCheckInTime,
        checkOut: null,
        workedHours: 0,
        breakMins: 0,
        mode: 'Office',
        status: isLate ? 'Late' : 'Present',
      };
      const lateCheckIn =
        isLate && lateReason
          ? ({
              id: `late-${Date.now()}`,
              employeeId,
              attendanceRecordId: attendanceRecord.id,
              scheduledCheckInTime,
              actualCheckInTime,
              lateDurationMins,
              ...lateReason,
              submittedAt: now.toISOString(),
              reviewStatus: state.attendanceRules.managerApprovalRequired ? 'Pending Review' : 'No Review Required',
            } satisfies LateCheckInRecord)
          : null;
      return {
        session: {
          checkedIn: true,
          checkInAt: actualCheckInTime,
          onBreak: false,
          breakMins: 0,
          mode: 'Office',
        },
        attendanceRecords: [
          attendanceRecord,
          ...state.attendanceRecords.filter(
            (record) => !(record.employeeId === employeeId && record.date === attendanceRecord.date)
          ),
        ],
        lateCheckInRecords: lateCheckIn ? [lateCheckIn, ...state.lateCheckInRecords] : state.lateCheckInRecords,
        notifications: lateCheckIn
          ? [
              {
                id: `n-${Date.now()}`,
                icon: 'Clock',
                title: 'Late check-in reason submitted',
                detail: `${lateCheckIn.reasonCategory} · pending review`,
                time: 'Now',
                read: false,
              },
              ...state.notifications,
            ]
          : state.notifications,
      };
    }),
  checkOut: () =>
    set(() => ({ session: { checkedIn: false, checkInAt: null, onBreak: false, breakMins: 0, mode: 'Office' } })),
  toggleBreak: () => set((s) => ({ session: { ...s.session, onBreak: !s.session.onBreak } })),

  applyLeave: (l) =>
    set((s) => ({
      leaveRequests: [
        { ...l, id: `lr-${Date.now()}`, status: 'Pending', appliedOn: new Date().toISOString().slice(0, 10) },
        ...s.leaveRequests,
      ],
    })),
  setLeaveStatus: (id, status) =>
    set((s) => ({ leaveRequests: s.leaveRequests.map((r) => (r.id === id ? { ...r, status } : r)) })),

  moveTask: (id, status) =>
    set((s) => ({
      tasks: s.tasks.map((t) =>
        t.id === id ? { ...t, status, progress: status === 'Completed' ? 100 : t.progress } : t
      ),
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
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    })),
  markAllRead: () => set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),
  updateAttendanceRules: (attendanceRules) => set({ attendanceRules }),
  reviewLateCheckIn: (id, reviewStatus, reviewerComment) =>
    set((state) => ({
      lateCheckInRecords: state.lateCheckInRecords.map((record) =>
        record.id === id
          ? {
              ...record,
              reviewStatus,
              reviewerComment,
              reviewedBy: get().currentUserId(),
              reviewedAt: new Date().toISOString(),
            }
          : record
      ),
      attendanceRecords: state.attendanceRecords.map((record) => {
        const lateRecord = state.lateCheckInRecords.find((item) => item.id === id);
        const shouldExcuse =
          lateRecord?.attendanceRecordId === record.id &&
          state.attendanceRules.acceptedReasonExcusesLate &&
          (reviewStatus === 'Accepted' || reviewStatus === 'Excused');
        return shouldExcuse ? { ...record, status: 'Excused Late' } : record;
      }),
    })),
  submitAttendanceUpdateRequest: (request) =>
    set((state) => ({
      attendanceUpdateRequests: [
        {
          ...request,
          id: `aur-${Date.now()}`,
          employeeId: get().currentUserId(),
          submittedAt: new Date().toISOString(),
          status: 'Pending',
        },
        ...state.attendanceUpdateRequests,
      ],
    })),
  addEmployee: (employee) =>
    set((state) => {
      const largestCode = state.employees.reduce(
        (largest, item) => Math.max(largest, Number(item.code.replace(/\D/g, '')) || 0),
        0
      );
      return {
        employees: [
          {
            ...employee,
            code: `CZ-${String(largestCode + 1).padStart(3, '0')}`,
            id: `u-${Date.now()}`,
            avatar: employee.avatar || `https://i.pravatar.cc/160?u=employee-${Date.now()}`,
          },
          ...state.employees,
        ],
      };
    }),
  updateEmployee: (id, employee) =>
    set((state) => ({
      employees: state.employees.map((item) => (item.id === id ? { ...employee, id } : item)),
    })),
  deleteEmployee: (id) => set((state) => ({ employees: state.employees.filter((employee) => employee.id !== id) })),
  addProject: (project) => set((state) => ({ projects: [{ ...project, id: `p-${Date.now()}` }, ...state.projects] })),
  updateProject: (id, project) =>
    set((state) => ({ projects: state.projects.map((item) => (item.id === id ? { ...project, id } : item)) })),
  deleteProject: (id) => set((state) => ({ projects: state.projects.filter((project) => project.id !== id) })),
}));

export { empById };
