// src/app/page.tsx
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Services from '@/components/landing-page/Services';

export default function Home(): JSX.Element {
  return <Services />;
}