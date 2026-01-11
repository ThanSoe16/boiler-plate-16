import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import appAxios from './app-axios';
import { useAuthStore } from '@/stores/auth-store';
import { handleErrorRedirect, isBrowser } from './redirect';
import { getRefreshPromise, refreshAccessToken, setRefreshPromise } from './refresh-token';

let initialized = false;

export const setupInterceptors = () => {
  if (initialized) return;
  initialized = true;

  // REQUEST
  appAxios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = useAuthStore.getState().accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // RESPONSE
  appAxios.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const status = error.response?.status;
      const originalRequest = error.config as
        | (InternalAxiosRequestConfig & { _retry?: boolean })
        | undefined;

      if (!originalRequest || !isBrowser) {
        return Promise.reject(error);
      }

      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          if (!getRefreshPromise()) {
            setRefreshPromise(refreshAccessToken());
          }

          const newToken = await getRefreshPromise();
          setRefreshPromise(null);

          if (newToken) {
            useAuthStore.getState().setTokens(newToken, null);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return appAxios(originalRequest);
          }
        } catch {
          setRefreshPromise(null);
          useAuthStore.getState().reset();
          handleErrorRedirect(401);
        }
      }

      return Promise.reject(error);
    },
  );
};
