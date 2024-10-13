// src/app/page.tsx
"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Subscriptions from '@/components/landing-page/Subscriptions';

export default function Home(): JSX.Element {
  return (
    <>
      <Navbar />
      <Subscriptions />
      <Footer />
    </>
  );
}