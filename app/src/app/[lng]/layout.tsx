// /app/[lang]/layout.tsx

import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}