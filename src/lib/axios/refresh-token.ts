import axios from 'axios';
import { useAuthStore } from '@/stores/auth-store';

let refreshPromise: Promise<string | null> | null = null;

export const refreshAccessToken = async (): Promise<string | null> => {
  const { refreshToken } = useAuthStore.getState();

  if (!refreshToken) {
    throw new Error('No refresh token');
  }

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/admin/token-revalidate`,
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );

  const { accessToken, refreshToken: newRefreshToken } = res.data?.body?.data ?? {};

  if (!accessToken || !newRefreshToken) {
    throw new Error('Invalid refresh response');
  }

  // ✅ update zustand (persist will handle storage)
  useAuthStore.getState().setTokens(accessToken, newRefreshToken);

  return accessToken;
};

export const getRefreshPromise = () => refreshPromise;

export const setRefreshPromise = (promise: Promise<string | null> | null) => {
  refreshPromise = promise;
};
