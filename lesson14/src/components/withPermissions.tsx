import React from "react";
import { Navigate } from "react-router";
import { hasPermissions, isAllowAccessForRoles } from "../auth.util";
import { useAuthStore } from "../auth.store";
import type { PermissionCheckMode } from "../auth.type";

/**
 * Permissions-based HOC
 * Protect just one Component
 * @param permissions 
 * @param mode 
 * @returns 
 */
const withPermissions = (
  permissions: string[],
  mode: PermissionCheckMode = 'any'
) => {
  return function <P extends object>(Component: React.ComponentType<P>) {
    return function WithPermissionComponent(props: P) {
      const { loggedInUser } = useAuthStore();
      if (!loggedInUser) {
        return <Navigate to="/login" replace />;
      }
      // Root, admin users bypass permission checks
      if (isAllowAccessForRoles(loggedInUser.roles, ['root', 'admin'])) {
        return <Component {...props} />;
      }
      const hasRequiredPermissions = hasPermissions(permissions, mode);

      if (!hasRequiredPermissions) {
        return <Navigate to="/unauthorized" replace />;
      }
      return <Component {...props} />;
    };
  };
};

export default withPermissions