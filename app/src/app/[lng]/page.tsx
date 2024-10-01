// src/app/page.tsx
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import LandingPage from '@/components/landing-page/LandingPage';

export default function Home(): JSX.Element {
  return <LandingPage />;
}