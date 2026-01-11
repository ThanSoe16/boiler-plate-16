'use client';

import { createContext, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGetMe } from '@/features/base/services/queries';
import { useAuthStore } from '@/stores/auth-store';

export type AuthContextType = {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthenticatedProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetMe();
  const resetAuth = useAuthStore((s) => s.reset);

  useEffect(() => {
    if (!isLoading && (isError || !data)) {
      router.replace('/login');
    }
  }, [isLoading, isError, data, router]);

  const logout = () => {
    resetAuth();
    router.replace('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user: data?.body?.data ?? null,
        isAuthenticated: !!data,
        isLoading,
        logout,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthenticatedProvider');
  }
  return ctx;
};
