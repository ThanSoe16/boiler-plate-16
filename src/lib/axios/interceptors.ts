import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { refreshAccessToken, getRefreshPromise, setRefreshPromise } from './refresh-token';
import { handleErrorRedirect, isBrowser } from './redirect';
import appAxios from './app-axios';
import Cookies from 'js-cookie';

export const setupInterceptors = () => {
  appAxios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (!isBrowser) return config;

      const token = Cookies.get('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  appAxios.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const status = error.response?.status;
      const originalRequest = error.config as
        | (InternalAxiosRequestConfig & { _retry?: boolean })
        | undefined;

      if (!originalRequest) return Promise.reject(error);

      if (status === 401 && !originalRequest._retry && isBrowser) {
        originalRequest._retry = true;

        try {
          if (!getRefreshPromise()) {
            setRefreshPromise(refreshAccessToken());
          }

          const newToken = await getRefreshPromise();
          setRefreshPromise(null);

          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return appAxios(originalRequest);
          }
        } catch (err) {
          setRefreshPromise(null);
          localStorage.clear();
          handleErrorRedirect(403);
          return Promise.reject(err);
        }
      }

      handleErrorRedirect(status);
      return Promise.reject(error);
    },
  );
};
