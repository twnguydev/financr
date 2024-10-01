import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: `Financr - Personal Finance Manager`,
  description: "Financr is a personal finance manager for investments and savings, permitting you to track your financial goals and investments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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