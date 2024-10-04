/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://financr-flame.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  },
  alternateRefs: [
    { hrefLang: 'en', href: 'https://financr-flame.vercel.app/en' },
    { hrefLang: 'fr', href: 'https://financr-flame.vercel.app/fr' },
  ],
};
