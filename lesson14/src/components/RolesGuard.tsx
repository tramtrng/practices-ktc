import { hasAnyRoles, isAllowAccessForRoles } from "../auth.util";
import { useAuthStore } from "../auth.store";

/**
 * Protect multi children Components
 * @param param0 
 * @returns 
 */
export const RolesGuard: React.FC<{
  roles: string[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
}> = ({ roles, fallback = null, children }) => {
  
  const { loggedInUser } = useAuthStore();

  if (!loggedInUser) {
    return <>{fallback}</>;
  }

  // Root users bypass role checks
  if (isAllowAccessForRoles(loggedInUser.roles, ['root', 'admin'])) {
    return <>{children}</>;
  }

  const hasAccess = hasAnyRoles(roles);

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default RolesGuard