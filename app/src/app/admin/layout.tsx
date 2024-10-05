// /app/[lang]/layout.tsx
import { ReactNode } from "react";
import "../globals.css";
import { routing } from '@i18n/routing';
import { AuthProvider } from '@providers/auth';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export function generateMetadata() {
  return {
    title: "Financr for Administrator",
    description: "Financr for Administrator",
    icons: {
      icon: '/favicon.ico',
    },
    keywords: "Financr for Administrator",
    author: "Financr for Administrator",
    robots: "Financr for Administrator",
  };
}

export default function RootLayout({
  children
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen antialiased font-sans">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}