import { useAppSelector } from "../store/hooks"
import { selectIsAuthenticated } from "../../features/auth/auth.selector"
import { Navigate, Outlet } from "react-router";

export function ProtectedRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
}

