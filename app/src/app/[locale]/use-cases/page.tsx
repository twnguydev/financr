// src/app/page.tsx
"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import UseCases from '@/components/landing-page/UseCases';

export default function Home(): JSX.Element {
  return (
    <>
      <Navbar />
      <UseCases />
      <Footer />
    </>
  );
}