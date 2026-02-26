export interface UserDto {
  id: string
  email: string
  role: string
}

export interface ListUserQuery {
  search: string
}
