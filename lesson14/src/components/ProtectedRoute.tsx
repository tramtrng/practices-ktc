import React from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "../auth.store";
import { isAuthenticated } from "../auth.store";

/**
 * Protect multi children Components
 */
interface ProtectedRouteProps {
  children: React.ReactNode;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { loggedInUser } = useAuthStore();

if (!isAuthenticated() || !loggedInUser) {
  return <Navigate to="/login" replace />;
}

return <>{children}</>;
  // const location = useLocation();
  // useEffect(()=>{
  //   const fetchProfile = async()=>{
  //     const response = await getProfile();
  //     if(response.status === 200){
  //       refreshUser({
  //         id: response.data.data.id,
  //         name: response.data.data.name,
  //         email: response.data.data.email,
  //         avatar: response.data.data.avatar,
  //         roles: response.data.data.roles,
  //         permissions: response.data.data.permissions
  //       })
  //     }
  //   }
  //   if(location.pathname !== '/dashboard'){
  //     fetchProfile();
  //   }
  // }, [location, refreshUser])
}
      
export default ProtectedRoute;