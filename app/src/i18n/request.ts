import { notFound } from 'next/navigation';
import { getRequestConfig, unstable_setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export default getRequestConfig(async ({ locale }) => {
  if (!routing.locales.includes(locale as any)) notFound();

  unstable_setRequestLocale(locale);

  return {
    messages: (await import(`/messages/${locale}.json`)).default
  };
});