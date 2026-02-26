import type { AuthSession } from "../../domain/user/auth.model";
import type { LoginResponseDto } from "../api/auth.types";
import { mapperUserFromDto } from "./user.mapper";

export function mapAuthSessionFromDto(
  dto: LoginResponseDto
): AuthSession {
  return {
    tokens: {
      accessToken: dto.access_token,
      refreshToken: dto.refresh_token
    },
    user: mapperUserFromDto(dto.user),
  }
}
