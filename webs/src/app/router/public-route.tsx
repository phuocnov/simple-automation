import type { JSX } from "react/jsx-dev-runtime"
import { useAppSelector } from "../store/hooks"
import { selectIsAuthenticated } from "../../features/auth/auth.selector"
import { Navigate } from "react-router";

export function PublicRoute({ children }: {
  children: JSX.Element
}) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to='/dashboard' replace />;
  }

  return children;
}
