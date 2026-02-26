import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../../features/auth/auth.slice.ts'

export const rootReducer = combineReducers({
  auth: authReducer
})
