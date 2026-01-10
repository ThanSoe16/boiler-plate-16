'use client';

import { AppThemeProvider } from './app-theme-provider';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return <AppThemeProvider>{children}</AppThemeProvider>;
}
