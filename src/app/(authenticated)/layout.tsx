import { getAuthContextData } from '@/features/base/hooks/get-auth-context';
import { AuthenticatedProvider } from '@/providers/authenticated-provider';
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  try {
    const data = await getAuthContextData();
    return <AuthenticatedProvider value={data}>{children}</AuthenticatedProvider>;
  } catch (error) {
    redirect('/login');
  }
}
