import { hasPermissions, isAllowAccessForRoles } from "../auth.util";
import { useAuthStore } from "../auth.store";
import type { PermissionCheckMode } from "../auth.type";

/**
 * UI Components for permission-based rendering
 * Protect multi children Components
 * @param param
 * @returns
 */
const PermissionsGuard: React.FC<{
  permissions: string[];
  mode?: PermissionCheckMode;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}> = ({ permissions, mode = "any", fallback = null, children }) => {
  const { loggedInUser } = useAuthStore();

  if (!loggedInUser) {
    return <>{fallback}</>;
  }

  // Root and admin users bypass role checks
  if (isAllowAccessForRoles(loggedInUser.roles, ["root", "admin"])) {
    return <>{children}</>;
  }

  const hasAccess = hasPermissions(permissions, mode);

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default PermissionsGuard;