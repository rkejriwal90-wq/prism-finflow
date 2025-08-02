import { UserRole } from '@/config/navigation';

export const permissions = {
  deals: {
    create: ['pm', 'admin', 'owner'] as UserRole[],
    edit: ['pm', 'admin', 'owner'] as UserRole[],
    delete: ['admin', 'owner'] as UserRole[],
    view: ['pm', 'fa', 'reviewer', 'admin', 'owner'] as UserRole[],
  },
  clients: {
    create: ['admin', 'owner'] as UserRole[],
    edit: ['pm', 'admin', 'owner'] as UserRole[],
    delete: ['owner'] as UserRole[],
    view: ['pm', 'admin', 'owner'] as UserRole[],
  },
  users: {
    create: ['admin', 'owner'] as UserRole[],
    edit: ['admin', 'owner'] as UserRole[],
    delete: ['owner'] as UserRole[],
    view: ['admin', 'owner'] as UserRole[],
  },
  reports: {
    create: ['pm', 'admin', 'owner'] as UserRole[],
    view: ['pm', 'fa', 'reviewer', 'admin', 'owner'] as UserRole[],
  },
  billing: {
    view: ['admin', 'owner', 'client'] as UserRole[],
    edit: ['owner'] as UserRole[],
  }
};

export function hasPermission(userRole: UserRole, resource: keyof typeof permissions, action: string): boolean {
  const resourcePermissions = permissions[resource];
  const allowedRoles = resourcePermissions[action as keyof typeof resourcePermissions];
  return allowedRoles ? allowedRoles.includes(userRole) : false;
}
