export type PermissionCheckMode = "any" | "all";

export type { LoggedInUser, AuthState } from "./useAuthStore";

export const ROLES = {
  ADMINISTRATORS: 'Administrators',
  MANAGERS: 'Managers',
  USERS: 'Users'
} as const;

export const PERMISSIONS = {
  TASK_CREATE: 'task.create',
  TASK_UPDATE: 'task.update', 
  TASK_DELETE: 'task.delete',
  TASK_READ: 'task.read'
} as const;