// /app/[lang]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ReactNode } from "react";
import { AuthProvider } from '@providers/auth';
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { routing } from '@i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    locale,
    icons: {
      icon: '/favicon.ico',
    },
    keywords: t('keywords'),
    author: t('author'),
    robots: t('robots'),
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  let messages;
  try {
    messages = (await import(`/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className="min-h-screen antialiased font-sans">
        <AuthProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Navbar />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}