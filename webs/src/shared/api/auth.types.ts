import type { UserDto } from "./user.types"

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponseDto {
  access_token: string
  refresh_token: string
  user: UserDto
}
