import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthSession } from "../../domain/user/auth.model";

interface AuthState {
  session: AuthSession | null
}

const initialState: AuthState = {
  session: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession(
      state,
      action: PayloadAction<AuthSession>
    ) {
      state.session = action.payload
    },
    clearSession(state) {
      state.session = null
    }
  }
})

export const { setSession, clearSession } = authSlice.actions;
export default authSlice.reducer;
