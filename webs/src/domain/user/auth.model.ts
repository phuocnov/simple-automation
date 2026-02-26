import type { User } from "./user.model"

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface AuthSession {
  user: User
  tokens: AuthTokens
}
