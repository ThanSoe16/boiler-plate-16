import type { Metadata } from 'next';

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? 'MMGoalHub';
const APP_DESC = process.env.NEXT_PUBLIC_APP_DESCRIPTION ?? '';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? '';

export const baseMetadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESC,
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: APP_NAME,
    description: APP_DESC,
    images: ['/cover-image.jpeg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: APP_DESC,
    images: ['/cover-image.jpeg'],
  },
};
