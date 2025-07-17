// src/components/PrivateRoute.tsx
import { Navigate } from 'react-router';
import type { ReactNode } from 'react';
import { useAuthStore } from '../useAuthStore';

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const user = useAuthStore((state) => state.loggedInUser);
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}