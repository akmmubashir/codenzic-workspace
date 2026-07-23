import { Check, Minus } from 'lucide-react';
import { ROLE_LABELS, type Role } from '../../lib/types';
import { Card } from '../ui/Primitives';

const roles: Role[] = ['super_admin', 'hr_admin', 'manager', 'team_lead', 'employee', 'intern'];
const permissions = ['View employees', 'Create / edit employees', 'View salary', 'Manage attendance', 'Approve leave', 'Create projects', 'Assign tasks', 'Review EOD', 'View reports', 'Manage settings', 'View audit logs'];
const matrix: Record<Role, number[]> = { super_admin: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], hr_admin: [1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0], manager: [1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0], team_lead: [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0], employee: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], intern: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] };

export function PermissionMatrix() {
  return <><Card className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-border"><th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted">Permission</th>{roles.map((role) => <th key={role} className="px-3 py-3 text-center text-xs font-medium text-muted">{ROLE_LABELS[role].split(' ')[0]}</th>)}</tr></thead><tbody>{permissions.map((permission, index) => <tr key={permission} className="border-b border-border last:border-0"><td className="px-4 py-3 font-medium text-content">{permission}</td>{roles.map((role) => <td key={role} className="px-3 py-3 text-center">{matrix[role][index] ? <Check size={16} className="mx-auto text-emerald-600" /> : <Minus size={16} className="mx-auto text-slate-300 dark:text-slate-600" />}</td>)}</tr>)}</tbody></table></Card><p className="mt-3 text-xs text-muted">Permissions must also be enforced in the backend - never trust frontend checks alone.</p></>;
}
