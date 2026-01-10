'use client';

import { AuthContextType } from '@/features/base/hooks/get-auth-context';
import { createContext, useContext, ReactNode } from 'react';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthenticatedProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: AuthContextType;
}) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthenticatedProvider');
  }
  return ctx;
};
