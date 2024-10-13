// src/app/page.tsx

"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LandingPage from '@/components/landing-page/LandingPage';

export default function Home(): JSX.Element {
  return (
    <>
      <Navbar />
      <LandingPage />
      <Footer />
    </>
  );
}