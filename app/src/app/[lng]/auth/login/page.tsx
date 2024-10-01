// src/app/page.tsx
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Login from '@/components/auth/Login';

export default function Home(): JSX.Element {
  return <Login />;
}