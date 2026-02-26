import type { ListUserQuery, UserDto } from "./user.types";
import { api } from "../../config/api";
import { type PaginatedResponse } from "../../shared/types/api-response";

export const userApi = {
  list(
    query: ListUserQuery
  ): Promise<PaginatedResponse<UserDto>> {
    return api.get('/user').then(response => response.data)
  }
}
