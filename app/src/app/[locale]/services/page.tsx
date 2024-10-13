// src/app/page.tsx
"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Services from '@/components/landing-page/Services';
import Footer from '@/components/layout/Footer';

export default function Home(): JSX.Element {
  return (
    <>
      <Navbar />
      <Services />
      <Footer />
    </>
  );
}