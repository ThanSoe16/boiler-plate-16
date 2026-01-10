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
      localStorage.clear();
      redirect('/login');
      break;
    case 429:
      break;
    default:
      break;
  }
};
