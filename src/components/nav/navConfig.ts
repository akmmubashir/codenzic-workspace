
import type { Role } from '../../lib/types';

export interface NavItem {
  label: string;
  to: string;
  icon: string;
  roles?: Role[]; // if omitted, visible to all
}
export interface NavGroup {
  label: string;
  items: NavItem[];
}

const all: Role[] = ['super_admin', 'hr_admin', 'manager', 'team_lead', 'employee', 'intern'];
const staff: Role[] = ['super_admin', 'hr_admin', 'manager'];

export const navGroups: NavGroup[] = [
{
  label: 'Home',
  items: [
  { label: 'Dashboard', to: '/', icon: 'LayoutDashboard' }]

},
{
  label: 'My Workspace',
  items: [
  { label: 'My Attendance', to: '/my-attendance', icon: 'Clock' },
  { label: 'My Tasks', to: '/my-tasks', icon: 'CheckSquare' },
  { label: 'My EOD Reports', to: '/eod', icon: 'FileText' },
  { label: 'My Leave', to: '/leave', icon: 'Plane' }]

},
{
  label: 'People',
  items: [
  { label: 'Employee Directory', to: '/employees', icon: 'Users', roles: staff },
  { label: 'Attendance Monitor', to: '/attendance-monitor', icon: 'ScanLine', roles: [...staff, 'team_lead'] }]

},
{
  label: 'Work',
  items: [
  { label: 'Projects', to: '/projects', icon: 'FolderKanban' },
  { label: 'Task Board', to: '/board', icon: 'Trello' },
  { label: 'Team EOD', to: '/team-eod', icon: 'ClipboardList', roles: [...staff, 'team_lead'] }]

},
{
  label: 'Communicate',
  items: [
  { label: 'Chat', to: '/chat', icon: 'MessageSquare' },
  { label: 'Announcements', to: '/announcements', icon: 'Megaphone' }]

},
{
  label: 'Insights',
  items: [
  { label: 'Reports', to: '/reports', icon: 'BarChart3', roles: staff },
  { label: 'Roles & Permissions', to: '/roles', icon: 'ShieldCheck', roles: ['super_admin'] },
  { label: 'Company Settings', to: '/settings', icon: 'Settings', roles: ['super_admin'] }]

}];


export function visibleGroups(role: Role): NavGroup[] {
  return navGroups.
  map((g) => ({ ...g, items: g.items.filter((i) => !i.roles || i.roles.includes(role)) })).
  filter((g) => g.items.length > 0);
}

export const mobileNav: NavItem[] = [
{ label: 'Home', to: '/', icon: 'LayoutDashboard' },
{ label: 'Attend', to: '/my-attendance', icon: 'Clock' },
{ label: 'Tasks', to: '/my-tasks', icon: 'CheckSquare' },
{ label: 'Chat', to: '/chat', icon: 'MessageSquare' },
{ label: 'EOD', to: '/eod', icon: 'FileText' }];