import { useAuthStore } from "./useAuthStore";
import type { PermissionCheckMode } from "./auth.type";
import { ROLES } from "./auth.type";

// Kiểm tra user có role cụ thể không
export const hasAnyRoles = (roles: string[]): boolean => {
  const { loggedInUser } = useAuthStore.getState();
  
  if (!loggedInUser?.roles) return false;
  
  return loggedInUser.roles.some(role => roles.includes(role.name));
};

// Kiểm tra có quyền Administrator không
export const isAdmin = (): boolean => {
  return hasAnyRoles([ROLES.ADMINISTRATORS]);
};

// Kiểm tra đã đăng nhập chưa
export const isAuthenticated = (): boolean => {
  const { loggedInUser, access_token } = useAuthStore.getState();
  return !!(loggedInUser && access_token);
};

// Kiểm tra role user có được phép truy cập không
export const isAllowAccessForRoles = (
  userRoles: Array<{id: string | number, name: string}>, 
  allowedRoles: string[]
): boolean => {
  return userRoles.some(role => allowedRoles.includes(role.name));
};

// Kiểm tra quyền hạn cụ thể
export const hasPermissions = (
  permissions: string[], 
  mode: PermissionCheckMode = "any"
): boolean => {
  const { loggedInUser } = useAuthStore.getState();
  
  if (!loggedInUser?.roles) return false;
  
  // Admin có tất cả quyền
  if (isAdmin()) return true;
  
  // Thu thập tất cả permissions từ roles
  const userPermissions: string[] = [];
  
  loggedInUser.roles.forEach(role => {
    // Nếu role có field permissions
    if ('permissions' in role && Array.isArray((role as any).permissions)) {
      userPermissions.push(...(role as any).permissions);
    }
    
    // Map role name thành permissions
    switch (role.name) {
      case ROLES.ADMINISTRATORS:
        userPermissions.push('task.create', 'task.update', 'task.delete', 'task.read', 'user.manage');
        break;
      case ROLES.MANAGERS:
        userPermissions.push('task.create', 'task.update', 'task.read');
        break;
      case ROLES.USERS:
        userPermissions.push('task.read');
        break;
      default:
        break;
    }
  });
  
  // Loại bỏ trùng lặp
  const uniquePermissions = [...new Set(userPermissions)];
  
  // Kiểm tra theo mode
  if (mode === "all") {
    return permissions.every(permission => uniquePermissions.includes(permission));
  }
  
  return permissions.some(permission => uniquePermissions.includes(permission));
};

export const getCurrentUser = () => {
  const { loggedInUser } = useAuthStore.getState();
  return loggedInUser;
};

// Debug thông tin auth (chỉ console.log)
export const debugAuthInfo = () => {
  if (process.env.NODE_ENV === 'development') {
    const { loggedInUser, access_token } = useAuthStore.getState();
    console.group('🔐 Thông tin Auth');
    console.log('User:', loggedInUser?.email);
    console.log('Có Token:', !!access_token);
    console.log('Roles:', loggedInUser?.roles.map(r => r.name));
    console.log('Là Admin:', isAdmin());
    console.log('Quyền:', hasPermissions(['task.create', 'task.update']));
    console.groupEnd();
  }
};