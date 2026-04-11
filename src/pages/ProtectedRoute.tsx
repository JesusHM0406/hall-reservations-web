import type { UserRole } from "@/api/schemas/user.schemas";
import { useAuth } from "@/hooks/useAuth";
import { PATHS } from "@/paths";
import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
  allowTo: 'auth' | UserRole[];
}

export const ProtectedRoute = ({ allowTo }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={`/${PATHS.auth.root}/${PATHS.auth.login}`} replace />;
  }

  if (allowTo === 'auth') return <Outlet />;

  if (!allowTo.includes(user.role)) {
    return <Navigate to={`/${PATHS.halls.root}/${PATHS.halls.search}`} replace />;
  }

  return <Outlet />;
};