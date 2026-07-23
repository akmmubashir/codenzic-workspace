import { PageHeader } from '../components/ui/Primitives';
import { PermissionMatrix } from '../components/roles/PermissionMatrix';

export function Roles() {
  return <div><PageHeader title="Roles & Permissions" subtitle="Permission matrix enforced across every module" /><PermissionMatrix /></div>;
}
