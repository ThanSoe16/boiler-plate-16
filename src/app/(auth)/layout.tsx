'use client';

import { useGetMe } from '@/features/base/services/queries';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useGetMe();
  const router = useRouter();

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // Not authenticated → show auth pages
  if (!data) {
    return <>{children}</>;
  }

  // Authenticated but redirecting
  return null;
}
