import { api } from "../../config/api";
import type { LoginRequest, LoginResponseDto } from "./auth.types";

export const authApi = {
  async login(
    payload: LoginRequest
  ): Promise<LoginResponseDto> {
    return api.post<LoginResponseDto>('/auth/login', payload).then(response => response.data)
  },
  async logout(): Promise<void> {
    return api.post('/auth/logout')
  }
}
