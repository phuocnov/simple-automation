import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { mapAuthSessionFromDto } from "../../shared/mappers/auth.mapper";
import { clearSession, setSession } from "./auth.slice";
import { authApi } from "../../shared/api/auth.api";

export function useLogin() {
  const dispatch = useDispatch()

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      const session = mapAuthSessionFromDto(response.data)
      dispatch(setSession(session))
    }
  })
}

export function useLogout() {
  const dispatch = useDispatch()

  return useMutation({
    onSuccess: () => {
      dispatch(clearSession())
    }
  })
}
