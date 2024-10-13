// src/app/page.tsx
"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Login from '@/components/auth/Login';

export default function Home(): JSX.Element {
  return (
    <>
      <Navbar />
      <Login />
      <Footer />
    </>
  );
}