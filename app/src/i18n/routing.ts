import { defineRouting } from 'next-intl/routing';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
 
export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'fr',
  pathnames: {
    '/': '/',
    '/blog': '/blog',
    '/services': '/services',

    '/about': {
      en: '/about',
      fr: '/a-propos'
    },

    '/auth/login': {
      en: '/auth/login',
      fr: '/auth/connexion'
    },

    '/auth/register': {
      en: '/auth/register',
      fr: '/auth/inscription'
    },

    '/auth/forgot-password': {
      en: '/auth/forgot-password',
      fr: '/auth/mot-de-passe-oublie'
    },

    '/auth/reset-password': {
      en: '/auth/reset-password',
      fr: '/auth/reinitialiser-mot-de-passe'
    },

    '/auth/verify-email': {
      en: '/auth/verify-email',
      fr: '/auth/verifier-email'
    },

    '/plans': {
      en: '/plans',
      fr: '/nos-offres'
    },

    '/use-cases': {
      en: '/use-cases',
      fr: '/cas-utilisation'
    },
  }
});

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation(routing);