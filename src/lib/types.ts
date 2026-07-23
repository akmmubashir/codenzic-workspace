export type Role = 'super_admin' | 'hr_admin' | 'manager' | 'team_lead' | 'employee' | 'intern';

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: 'Super Admin',
  hr_admin: 'HR Admin',
  manager: 'Department Manager',
  team_lead: 'Team Lead',
  employee: 'Employee',
  intern: 'Intern',
};

export type EmploymentType =
  'Full-time' | 'Part-time' | 'Intern' | 'Contract' | 'Consultant' | 'Freelancer' | 'Probation' | 'Temporary';

export type EmployeeStatus =
  | 'Active'
  | 'Onboarding'
  | 'Probation'
  | 'On Leave'
  | 'Notice Period'
  | 'Suspended'
  | 'Resigned'
  | 'Terminated'
  | 'Inactive';

export interface Employee {
  id: string;
  code: string;
  name: string;
  avatar: string;
  companyEmail: string;
  phone: string;
  role: Role;
  jobTitle: string;
  department: string;
  team: string;
  reportingManager: string;
  employmentType: EmploymentType;
  status: EmployeeStatus;
  workLocation: 'Office' | 'Remote' | 'Hybrid';
  joiningDate: string; // ISO
  dob: string; // ISO
  skills: string[];
  salary?: number;
  scheduledCheckInTime?: string;
  workingDays?: string[];
  documents?: string[];
}

export type AttendanceStatus =
  | 'Present'
  | 'Absent'
  | 'Late'
  | 'Half Day'
  | 'On Leave'
  | 'Work From Home'
  | 'Holiday'
  | 'Weekend'
  | 'Missing Check-Out'
  | 'Field Work'
  | 'Regularized'
  | 'Excused Late';

export type LateReasonCategory =
  | 'Traffic Delay'
  | 'Public Transport Delay'
  | 'Medical Reason'
  | 'Personal Emergency'
  | 'Weather Conditions'
  | 'Client Meeting'
  | 'Work-Related Travel'
  | 'Technical Issue'
  | 'Manager Approved'
  | 'Other';

export type LateReasonReviewStatus = 'Pending Review' | 'Accepted' | 'Rejected' | 'Excused' | 'No Review Required';

export interface LateCheckInRecord {
  id: string;
  employeeId: string;
  attendanceRecordId: string;
  scheduledCheckInTime: string;
  actualCheckInTime: string;
  lateDurationMins: number;
  reasonCategory: LateReasonCategory;
  explanation: string;
  attachmentName?: string;
  submittedAt: string;
  reviewStatus: LateReasonReviewStatus;
  reviewedBy?: string;
  reviewerComment?: string;
  reviewedAt?: string;
}

export interface AttendanceRules {
  shiftStartTime: string;
  gracePeriodMins: number;
  minimumDelayForReasonMins: number;
  exemptEmployeeIds: string[];
  exemptDepartments: string[];
  attachmentRequiredFor: LateReasonCategory[];
  managerApprovalRequired: boolean;
  repeatedLateAlertThreshold: number;
  notificationRecipients: ('Manager' | 'HR')[];
  acceptedReasonExcusesLate: boolean;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string; // ISO date
  checkIn: string | null; // HH:mm
  checkOut: string | null;
  workedHours: number;
  breakMins: number;
  mode: 'Office' | 'Remote' | 'Client' | 'Field';
  status: AttendanceStatus;
}

export type AttendanceUpdateRequestStatus = 'Pending' | 'Approved' | 'Rejected';

export interface AttendanceUpdateRequest {
  id: string;
  employeeId: string;
  attendanceRecordId: string;
  requestedCheckIn: string;
  requestedCheckOut: string;
  reason: string;
  submittedAt: string;
  status: AttendanceUpdateRequestStatus;
}

export type LeaveType =
  | 'Casual Leave'
  | 'Sick Leave'
  | 'Earned Leave'
  | 'Paid Leave'
  | 'Unpaid Leave'
  | 'Emergency Leave'
  | 'Work From Home'
  | 'Compensatory Leave'
  | 'Bereavement Leave';

export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: LeaveType;
  from: string;
  to: string;
  days: number;
  halfDay: boolean;
  reason: string;
  status: LeaveStatus;
  appliedOn: string;
}

export type ProjectStatus = 'Planning' | 'Active' | 'On Hold' | 'At Risk' | 'Completed' | 'Cancelled' | 'Archived';

export interface Project {
  id: string;
  name: string;
  client: string;
  managerId: string;
  status: ProjectStatus;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  progress: number;
  memberIds: string[];
  startDate: string;
  dueDate: string;
  description: string;
  documents?: string[];
  resources?: string[];
}

export type TaskStatus = 'Backlog' | 'To Do' | 'In Progress' | 'In Review' | 'Testing' | 'Blocked' | 'Completed';
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface Task {
  id: string;
  title: string;
  projectId: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string;
  dueDate: string;
  labels: string[];
  progress: number;
}

export type EODStatus = 'Draft' | 'Submitted' | 'Reviewed' | 'Clarification Requested' | 'Acknowledged' | 'Missed';

export interface EODReport {
  id: string;
  employeeId: string;
  date: string;
  summary: string;
  completed: string[];
  inProgress: string[];
  blockers: string;
  plan: string;
  status: EODStatus;
}

export interface ChatChannel {
  id: string;
  name: string;
  type: 'company' | 'department' | 'project' | 'private' | 'dm';
  unread: number;
}

export interface ChatMessage {
  id: string;
  channelId: string;
  senderId: string;
  text: string;
  time: string;
}

export type AnnouncementCategory =
  'General' | 'HR' | 'Policy' | 'Holiday' | 'Event' | 'Project' | 'Urgent' | 'Birthday' | 'Work Anniversary';

export interface Announcement {
  id: string;
  title: string;
  body: string;
  category: AnnouncementCategory;
  authorId: string;
  date: string;
  pinned: boolean;
}

export interface AppNotification {
  id: string;
  icon: string;
  title: string;
  detail: string;
  time: string;
  read: boolean;
}
