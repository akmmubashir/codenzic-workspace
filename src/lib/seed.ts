
import type {
  Employee, AttendanceRecord, LeaveRequest, Project, Task, EODReport,
  ChatChannel, ChatMessage, Announcement, AppNotification, Role } from
'./types';

const today = new Date();
const iso = (d: Date) => d.toISOString().slice(0, 10);
const daysAgo = (n: number) => {const d = new Date(today);d.setDate(d.getDate() - n);return iso(d);};
const daysAhead = (n: number) => {const d = new Date(today);d.setDate(d.getDate() + n);return iso(d);};
const av = (seed: string) => `https://i.pravatar.cc/160?u=codenzic-${seed}`;

export const DEPARTMENTS = [
'Management', 'Human Resources', 'Frontend Development', 'Backend Development',
'UI/UX Design', 'Quality Assurance', 'Sales and Business Development', 'Digital Marketing'];


export const employees: Employee[] = [
{ id: 'u1', code: 'CZ-001', name: 'Aarav Mehta', avatar: av('aarav'), companyEmail: 'aarav@codenzic.com', phone: '+91 98100 11111', role: 'super_admin', jobTitle: 'Founder & CEO', department: 'Management', team: 'Leadership', reportingManager: '-', employmentType: 'Full-time', status: 'Active', workLocation: 'Office', joiningDate: '2019-04-01', dob: '1988-06-12', skills: ['Strategy', 'Product', 'Leadership'] },
{ id: 'u2', code: 'CZ-002', name: 'Priya Nair', avatar: av('priya'), companyEmail: 'priya@codenzic.com', phone: '+91 98100 22222', role: 'hr_admin', jobTitle: 'Head of People', department: 'Human Resources', team: 'HR Ops', reportingManager: 'Aarav Mehta', employmentType: 'Full-time', status: 'Active', workLocation: 'Office', joiningDate: '2020-01-15', dob: '1991-03-22', skills: ['Recruiting', 'Policy', 'Onboarding'] },
{ id: 'u3', code: 'CZ-010', name: 'Rohan Verma', avatar: av('rohan'), companyEmail: 'rohan@codenzic.com', phone: '+91 98100 33333', role: 'manager', jobTitle: 'Engineering Manager', department: 'Backend Development', team: 'Core Platform', reportingManager: 'Aarav Mehta', employmentType: 'Full-time', status: 'Active', workLocation: 'Hybrid', joiningDate: '2020-08-03', dob: '1989-11-05', skills: ['Node.js', 'Architecture', 'Mentoring'] },
{ id: 'u4', code: 'CZ-011', name: 'Sneha Kulkarni', avatar: av('sneha'), companyEmail: 'sneha@codenzic.com', phone: '+91 98100 44444', role: 'manager', jobTitle: 'Design Manager', department: 'UI/UX Design', team: 'Design Studio', reportingManager: 'Aarav Mehta', employmentType: 'Full-time', status: 'Active', workLocation: 'Office', joiningDate: '2021-02-11', dob: '1990-07-19', skills: ['Design Systems', 'Research'] },
{ id: 'u5', code: 'CZ-020', name: 'Karan Joshi', avatar: av('karan'), companyEmail: 'karan@codenzic.com', phone: '+91 98100 55555', role: 'team_lead', jobTitle: 'Frontend Lead', department: 'Frontend Development', team: 'Web App', reportingManager: 'Rohan Verma', employmentType: 'Full-time', status: 'Active', workLocation: 'Hybrid', joiningDate: '2021-06-01', dob: '1993-01-30', skills: ['React', 'TypeScript', 'Tailwind'] },
{ id: 'u6', code: 'CZ-021', name: 'Ananya Reddy', avatar: av('ananya'), companyEmail: 'ananya@codenzic.com', phone: '+91 98100 66666', role: 'team_lead', jobTitle: 'QA Lead', department: 'Quality Assurance', team: 'Automation', reportingManager: 'Rohan Verma', employmentType: 'Full-time', status: 'Active', workLocation: 'Office', joiningDate: '2021-09-14', dob: '1992-05-08', skills: ['Cypress', 'Playwright'] },
{ id: 'u7', code: 'CZ-030', name: 'Vikram Singh', avatar: av('vikram'), companyEmail: 'vikram@codenzic.com', phone: '+91 98100 77777', role: 'employee', jobTitle: 'Backend Engineer', department: 'Backend Development', team: 'Core Platform', reportingManager: 'Rohan Verma', employmentType: 'Full-time', status: 'Active', workLocation: 'Remote', joiningDate: '2022-03-21', dob: '1995-09-17', skills: ['NestJS', 'PostgreSQL', 'Redis'] },
{ id: 'u8', code: 'CZ-031', name: 'Meera Iyer', avatar: av('meera'), companyEmail: 'meera@codenzic.com', phone: '+91 98100 88888', role: 'employee', jobTitle: 'Frontend Engineer', department: 'Frontend Development', team: 'Web App', reportingManager: 'Karan Joshi', employmentType: 'Full-time', status: 'Active', workLocation: 'Hybrid', joiningDate: '2022-07-04', dob: '1996-12-01', skills: ['React', 'Next.js'] },
{ id: 'u9', code: 'CZ-032', name: 'Arjun Das', avatar: av('arjun'), companyEmail: 'arjun@codenzic.com', phone: '+91 98100 99999', role: 'employee', jobTitle: 'Product Designer', department: 'UI/UX Design', team: 'Design Studio', reportingManager: 'Sneha Kulkarni', employmentType: 'Full-time', status: 'On Leave', workLocation: 'Office', joiningDate: '2022-10-10', dob: '1994-04-25', skills: ['Figma', 'Prototyping'] },
{ id: 'u10', code: 'CZ-033', name: 'Fatima Sheikh', avatar: av('fatima'), companyEmail: 'fatima@codenzic.com', phone: '+91 98101 00000', role: 'employee', jobTitle: 'QA Engineer', department: 'Quality Assurance', team: 'Automation', reportingManager: 'Ananya Reddy', employmentType: 'Full-time', status: 'Active', workLocation: 'Office', joiningDate: '2023-01-09', dob: '1997-08-14', skills: ['Manual QA', 'Jest'] },
{ id: 'u11', code: 'CZ-034', name: 'Nikhil Rao', avatar: av('nikhil'), companyEmail: 'nikhil@codenzic.com', phone: '+91 98101 11111', role: 'employee', jobTitle: 'Sales Executive', department: 'Sales and Business Development', team: 'Enterprise', reportingManager: 'Aarav Mehta', employmentType: 'Full-time', status: 'Active', workLocation: 'Office', joiningDate: '2023-04-18', dob: '1993-02-28', skills: ['CRM', 'Negotiation'] },
{ id: 'u12', code: 'CZ-035', name: 'Divya Menon', avatar: av('divya'), companyEmail: 'divya@codenzic.com', phone: '+91 98101 22222', role: 'employee', jobTitle: 'Marketing Specialist', department: 'Digital Marketing', team: 'Growth', reportingManager: 'Aarav Mehta', employmentType: 'Full-time', status: 'Active', workLocation: 'Remote', joiningDate: '2023-06-27', dob: '1995-10-11', skills: ['SEO', 'Content'] },
{ id: 'u13', code: 'CZ-050', name: 'Aditya Kapoor', avatar: av('aditya'), companyEmail: 'aditya@codenzic.com', phone: '+91 98101 33333', role: 'intern', jobTitle: 'Frontend Intern', department: 'Frontend Development', team: 'Web App', reportingManager: 'Karan Joshi', employmentType: 'Intern', status: 'Probation', workLocation: 'Office', joiningDate: '2024-11-01', dob: '2002-03-15', skills: ['HTML', 'CSS', 'JavaScript'] },
{ id: 'u14', code: 'CZ-051', name: 'Ishita Bose', avatar: av('ishita'), companyEmail: 'ishita@codenzic.com', phone: '+91 98101 44444', role: 'intern', jobTitle: 'Design Intern', department: 'UI/UX Design', team: 'Design Studio', reportingManager: 'Sneha Kulkarni', employmentType: 'Intern', status: 'Onboarding', workLocation: 'Office', joiningDate: '2025-01-06', dob: '2003-07-22', skills: ['Figma'] }];


// current signed-in user per role (for the demo role switcher)
export const meByRole: Record<Role, string> = {
  super_admin: 'u1', hr_admin: 'u2', manager: 'u3', team_lead: 'u5', employee: 'u8', intern: 'u13'
};

export const empById = (id: string) => employees.find((e) => e.id === id);

export const attendance: AttendanceRecord[] = employees.flatMap((e, ei) =>
Array.from({ length: 5 }).map((_, di) => {
  const wfh = e.workLocation === 'Remote';
  const late = (ei + di) % 7 === 0;
  const leave = e.status === 'On Leave' && di === 0;
  return {
    id: `att-${e.id}-${di}`,
    employeeId: e.id,
    date: daysAgo(di),
    checkIn: leave ? null : late ? '09:41' : '09:12',
    checkOut: leave ? null : di === 0 ? null : '18:24',
    workedHours: leave ? 0 : di === 0 ? 5.6 : 8.4,
    breakMins: leave ? 0 : 42,
    mode: wfh ? 'Remote' : 'Office',
    status: leave ? 'On Leave' : late ? 'Late' : wfh ? 'Work From Home' : di === 0 ? 'Present' : 'Present'
  } as AttendanceRecord;
})
);

export const leaveRequests: LeaveRequest[] = [
{ id: 'lr1', employeeId: 'u9', type: 'Sick Leave', from: daysAgo(1), to: daysAhead(1), days: 3, halfDay: false, reason: 'Viral fever, doctor advised rest.', status: 'Approved', appliedOn: daysAgo(2) },
{ id: 'lr2', employeeId: 'u8', type: 'Casual Leave', from: daysAhead(4), to: daysAhead(4), days: 1, halfDay: false, reason: 'Family function.', status: 'Pending', appliedOn: daysAgo(0) },
{ id: 'lr3', employeeId: 'u7', type: 'Work From Home', from: daysAhead(1), to: daysAhead(2), days: 2, halfDay: false, reason: 'Home internet upgrade.', status: 'Pending', appliedOn: daysAgo(0) },
{ id: 'lr4', employeeId: 'u10', type: 'Earned Leave', from: daysAhead(10), to: daysAhead(14), days: 5, halfDay: false, reason: 'Annual vacation.', status: 'Pending', appliedOn: daysAgo(1) },
{ id: 'lr5', employeeId: 'u12', type: 'Casual Leave', from: daysAgo(6), to: daysAgo(6), days: 0.5, halfDay: true, reason: 'Bank work.', status: 'Rejected', appliedOn: daysAgo(8) }];


export const projects: Project[] = [
{ id: 'p1', name: 'Codenzic Workspace', client: 'Internal', managerId: 'u3', status: 'Active', priority: 'High', progress: 62, memberIds: ['u5', 'u7', 'u8', 'u13'], startDate: daysAgo(40), dueDate: daysAhead(30), description: 'Unified internal HR + collaboration platform.' },
{ id: 'p2', name: 'Aurora Banking App', client: 'Aurora Fintech', managerId: 'u3', status: 'At Risk', priority: 'Urgent', progress: 38, memberIds: ['u7', 'u8', 'u10'], startDate: daysAgo(60), dueDate: daysAhead(12), description: 'Mobile banking redesign and API layer.' },
{ id: 'p3', name: 'Brand Refresh 2026', client: 'Nimbus Retail', managerId: 'u4', status: 'Planning', priority: 'Medium', progress: 15, memberIds: ['u4', 'u9', 'u14'], startDate: daysAgo(10), dueDate: daysAhead(45), description: 'Visual identity and marketing site.' },
{ id: 'p4', name: 'QA Automation Suite', client: 'Internal', managerId: 'u3', status: 'Completed', priority: 'Low', progress: 100, memberIds: ['u6', 'u10'], startDate: daysAgo(90), dueDate: daysAgo(5), description: 'End-to-end automated regression suite.' }];


export const tasks: Task[] = [
{ id: 't1', title: 'Build role-aware sidebar navigation', projectId: 'p1', status: 'Completed', priority: 'High', assigneeId: 'u5', dueDate: daysAgo(2), labels: ['frontend'], progress: 100 },
{ id: 't2', title: 'Attendance check-in geolocation flow', projectId: 'p1', status: 'In Progress', priority: 'High', assigneeId: 'u8', dueDate: daysAhead(2), labels: ['frontend', 'attendance'], progress: 55 },
{ id: 't3', title: 'Leave approval multi-level workflow', projectId: 'p1', status: 'To Do', priority: 'Medium', assigneeId: 'u7', dueDate: daysAhead(5), labels: ['backend'], progress: 0 },
{ id: 't4', title: 'EOD auto-fill from task logs', projectId: 'p1', status: 'In Review', priority: 'Medium', assigneeId: 'u8', dueDate: daysAhead(1), labels: ['frontend'], progress: 80 },
{ id: 't5', title: 'Kanban drag and drop', projectId: 'p1', status: 'Testing', priority: 'High', assigneeId: 'u13', dueDate: daysAhead(3), labels: ['frontend'], progress: 90 },
{ id: 't6', title: 'Payment API rate limiting', projectId: 'p2', status: 'Blocked', priority: 'Urgent', assigneeId: 'u7', dueDate: daysAgo(1), labels: ['backend', 'security'], progress: 30 },
{ id: 't7', title: 'Transaction list virtualization', projectId: 'p2', status: 'In Progress', priority: 'High', assigneeId: 'u8', dueDate: daysAhead(4), labels: ['frontend'], progress: 45 },
{ id: 't8', title: 'Design new statement layout', projectId: 'p2', status: 'To Do', priority: 'Medium', assigneeId: 'u9', dueDate: daysAhead(6), labels: ['design'], progress: 0 },
{ id: 't9', title: 'Moodboard for brand refresh', projectId: 'p3', status: 'In Progress', priority: 'Medium', assigneeId: 'u14', dueDate: daysAhead(7), labels: ['design'], progress: 40 },
{ id: 't10', title: 'Backlog grooming session notes', projectId: 'p1', status: 'Backlog', priority: 'Low', assigneeId: 'u5', dueDate: daysAhead(9), labels: ['planning'], progress: 0 }];


export const eodReports: EODReport[] = [
{ id: 'e1', employeeId: 'u8', date: daysAgo(1), summary: 'Wrapped up the attendance module UI and fixed timezone edge cases.', completed: ['Check-in card', 'Break timer'], inProgress: ['Geolocation validation'], blockers: 'Waiting on office radius config from HR.', plan: 'Finish geolocation + write tests.', status: 'Acknowledged' },
{ id: 'e2', employeeId: 'u7', date: daysAgo(1), summary: 'API rate limiting is blocked on the payment gateway sandbox.', completed: ['Redis setup'], inProgress: ['Rate limit middleware'], blockers: 'Sandbox credentials pending from Aurora.', plan: 'Escalate credentials, mock gateway meanwhile.', status: 'Submitted' },
{ id: 'e3', employeeId: 'u13', date: daysAgo(1), summary: 'Learned drag-and-drop patterns and shipped kanban card interactions.', completed: ['Card drag'], inProgress: ['Column reorder'], blockers: '', plan: 'Polish drop animations.', status: 'Reviewed' }];


export const channels: ChatChannel[] = [
{ id: 'c1', name: 'general', type: 'company', unread: 0 },
{ id: 'c2', name: 'announcements', type: 'company', unread: 2 },
{ id: 'c3', name: 'frontend-dev', type: 'department', unread: 5 },
{ id: 'c4', name: 'proj-workspace', type: 'project', unread: 0 },
{ id: 'c5', name: 'proj-aurora', type: 'project', unread: 3 },
{ id: 'dm1', name: 'Rohan Verma', type: 'dm', unread: 1 },
{ id: 'dm2', name: 'Priya Nair', type: 'dm', unread: 0 }];


export const messages: ChatMessage[] = [
{ id: 'm1', channelId: 'c3', senderId: 'u5', text: 'Morning team! Standup in 10 mins. Please update your kanban cards.', time: '09:02' },
{ id: 'm2', channelId: 'c3', senderId: 'u8', text: 'Attendance UI is ready for review 🎉', time: '09:04' },
{ id: 'm3', channelId: 'c3', senderId: 'u13', text: 'Kanban drag looks buttery smooth now.', time: '09:06' },
{ id: 'm4', channelId: 'c3', senderId: 'u5', text: 'Nice work @Aditya. Let’s demo it at EOD.', time: '09:07' },
{ id: 'm5', channelId: 'c5', senderId: 'u7', text: 'Blocked on Aurora sandbox creds - flagged in my EOD.', time: '10:15' },
{ id: 'm6', channelId: 'c5', senderId: 'u3', text: 'On it, escalating to their PM now.', time: '10:21' }];


export const announcements: Announcement[] = [
{ id: 'a1', title: 'Diwali holiday - office closed', body: 'The office will remain closed on the 20th and 21st for Diwali. Wishing everyone a bright and joyful festival! 🪔', category: 'Holiday', authorId: 'u2', date: daysAgo(0), pinned: true },
{ id: 'a2', title: 'New leave policy effective next month', body: 'Earned leave now carries forward up to 12 days. Full policy is available under Documents › HR Policies.', category: 'Policy', authorId: 'u2', date: daysAgo(1), pinned: true },
{ id: 'a3', title: 'Aurora Banking App demo - Friday 4 PM', body: 'Join the all-hands demo of the Aurora milestone. Great chance to see cross-team progress.', category: 'Project', authorId: 'u3', date: daysAgo(2), pinned: false },
{ id: 'a4', title: 'Happy work anniversary, Rohan! 🎉', body: 'Rohan Verma completes 6 years at Codenzic today. Thank you for building our engineering culture.', category: 'Work Anniversary', authorId: 'u2', date: daysAgo(3), pinned: false }];


export const notifications: AppNotification[] = [
{ id: 'n1', icon: 'CheckSquare', title: 'Task assigned to you', detail: 'Attendance check-in geolocation flow', time: '5m ago', read: false },
{ id: 'n2', icon: 'CalendarClock', title: 'EOD reminder', detail: 'Submit your report before 7:00 PM', time: '1h ago', read: false },
{ id: 'n3', icon: 'Plane', title: 'Leave approved', detail: 'Your sick leave was approved by Priya', time: '3h ago', read: true },
{ id: 'n4', icon: 'MessageSquare', title: 'Mention in #frontend-dev', detail: 'Karan Joshi mentioned you', time: '4h ago', read: true }];