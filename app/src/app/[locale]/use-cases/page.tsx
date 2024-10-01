// src/app/page.tsx
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import UseCases from '@/components/landing-page/UseCases';

export default function Home(): JSX.Element {
  return <UseCases />;
}