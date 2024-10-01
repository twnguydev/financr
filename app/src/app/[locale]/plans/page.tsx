// src/app/page.tsx
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Subscriptions from '@/components/landing-page/Subscriptions';

export default function Home(): JSX.Element {
  return <Subscriptions />;
}