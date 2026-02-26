import type { RootState } from "../../app/store/store";

export const selectAuthSession = (state: RootState) => state.auth.session;

export const selectCurrentUser = (state: RootState) =>
  state.auth.session?.user ?? null

export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth.session)

