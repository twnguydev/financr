// src/app/page.tsx
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import VerifyEmail from '@/components/auth/VerifyEmail';

export default function Home(): JSX.Element {
  return <VerifyEmail />;
}