// src/app/page.tsx
"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AboutUs from '@/components/landing-page/AboutUs';

export default function Home(): JSX.Element {
  return (
    <>
      <Navbar />
      <AboutUs />
      <Footer />
    </>
  );
}