// src/app/page.tsx
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Signup from '@/components/auth/Signup';

export default function Home(): JSX.Element {
  return <Signup />;
}