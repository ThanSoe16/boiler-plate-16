'use client';

import { ReactNode } from 'react';
import { AuthenticatedProvider } from '@/providers/authenticated-provider';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return <AuthenticatedProvider>{children}</AuthenticatedProvider>;
}
