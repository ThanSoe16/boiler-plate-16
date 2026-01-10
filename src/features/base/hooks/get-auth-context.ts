'use client';
import { useMemo } from 'react';
import { useGetMe } from '../services/queries';

export type AuthContextType = {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isError: boolean;
  logout: () => void;
};

export async function getAuthContextData(): Promise<AuthContextType> {
  const { data, isLoading, isError } = useGetMe();

  const value = useMemo(
    () => ({
      user: data ?? null,
      isAuthenticated: !isLoading && !isError && !!data,
      isLoading,
      isError,
      logout: () => {
        document.cookie = 'accessToken=; Max-Age=0; path=/';
        document.cookie = 'refreshToken=; Max-Age=0; path=/';
        window.location.href = '/login';
      },
    }),
    [data, isLoading, isError],
  );

  return value;
}
