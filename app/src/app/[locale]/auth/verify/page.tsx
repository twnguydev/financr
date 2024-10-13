// src/app/page.tsx
"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VerifyEmail from '@/components/auth/VerifyEmail';

export default function Home(): JSX.Element {
  return (
    <>
      <Navbar />
      <VerifyEmail />
      <Footer />
    </>
  );
}