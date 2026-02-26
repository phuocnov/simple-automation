import axios, { AxiosError, HttpStatusCode, type AxiosRequestConfig } from 'axios';
import { env } from './env';
import { store } from '../app/store/store.ts';
import { clearSession, setSession } from '../features/auth/auth.slice.ts';
import type { AuthSession } from '../domain/user/auth.model.ts';

export const api = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.session?.tokens.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

let isRefreshing = false;

type FailedRequest = {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
  config: AxiosRequestConfig;
}

let failedQueue: FailedRequest[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error)
    } else {
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        }
      }
      resolve(api(config))
    }
  })

  failedQueue = []
}

async function refreshToken(): Promise<string> {
  const response = await axios.post(
    `${env.API_BASE_URL}/auth/refresh`,
    {},
    { withCredentials: true }
  )

  const newSession = response.data as AuthSession

  store.dispatch(setSession(newSession))
  return newSession.tokens.accessToken
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean
    }

    if (
      error.response?.status === HttpStatusCode.Unauthorized &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push(({
            resolve,
            reject,
            config: originalRequest
          }))
        })
      }

      isRefreshing = true

      try {
        const newToken = await refreshToken()
        processQueue(null, newToken)
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null);
        store.dispatch(clearSession());
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error)
  }
)
