import axios from 'axios';

let refreshTokenPromise: Promise<string | null> | null = null;

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('No refresh token');

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/admin/token-revalidate`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );

  const { accessToken, refreshToken: newRefreshToken } = response.data?.body?.data ?? {};

  if (!accessToken || !newRefreshToken) {
    throw new Error('Invalid refresh token response');
  }

  localStorage.setItem('token', accessToken);
  localStorage.setItem('refreshToken', newRefreshToken);

  return accessToken;
};

export const getRefreshPromise = () => refreshTokenPromise;
export const setRefreshPromise = (promise: Promise<string | null> | null) => {
  refreshTokenPromise = promise;
};
