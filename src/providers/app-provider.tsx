'use client';

import { AppThemeProvider } from './app-theme-provider';
import { QueryProvider } from './query-provider';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AppThemeProvider>
      <QueryProvider>
        <NuqsAdapter>{children}</NuqsAdapter>
      </QueryProvider>
    </AppThemeProvider>
  );
}
