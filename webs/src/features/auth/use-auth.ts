import { useSelector } from "react-redux";
import { selectCurrentUser, selectIsAuthenticated } from "./auth.selector";
import { useLogin, useLogout } from "./auth.queries";

export function useAuth() {
  const user = useSelector(selectCurrentUser)
  const isAuthenticated = useSelector(
    selectIsAuthenticated
  )

  const login = useLogin()
  const logout = useLogout()

  return {
    user,
    isAuthenticated,
    login,
    logout
  }
}
