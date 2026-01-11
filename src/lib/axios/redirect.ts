import { resetAllStores } from '@/stores/reset-store';

export const isBrowser = typeof window !== 'undefined';

export const redirect = (path: string) => {
  if (isBrowser) {
    window.location.href = path;
  }
};

export const handleErrorRedirect = (status?: number) => {
  if (!status || !isBrowser) return;

  switch (status) {
    case 503:
      redirect('/503');
      break;

    case 401:
      // ✅ Clear Zustand stores
      // resetAllStores();

      // // ✅ Redirect to login
      // redirect('/login');
      break;

    case 429:
      // optional
      break;

    default:
      break;
  }
};
