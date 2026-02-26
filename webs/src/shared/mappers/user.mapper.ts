import type { User } from "../../domain/user/user.model";
import type { UserDto } from "../api/auth.types";
import { autoMap } from "./auto-map";


export function mapperUserFromDto(dto: UserDto): User {
  return {
    ...autoMap<User>(dto),
    role: dto.role as User['role'],
    isActive: true
  }
}
