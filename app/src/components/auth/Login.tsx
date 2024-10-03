"use client";

import React, { useState } from 'react';
import { Link } from '@i18n/routing';
import { ArrowRight, Mail, Lock } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function LoginPage(): JSX.Element {
  const t = useTranslations('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted', { email, password });
  };

  return (
    <div className="container mx-auto my-20 px-3 md:px-0">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">{t('title')}</h1>
        <p className="font-mono text-xl text-gray-600 mb-12 text-center">
          {t('subtitle')}
        </p>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">{t('emailLabel')}</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                id="email"
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder={t('emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">{t('passwordLabel')}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                id="password"
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder={t('passwordPlaceholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white font-bold py-3 px-4 rounded-full hover:bg-gray-800 transition duration-300"
          >
            {t('loginButton')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/forgot-password" className="text-blue-600 hover:text-blue-800 font-semibold">
            {t('forgotPassword')}
          </Link>
        </div>

        <p className="mt-8 text-center font-mono text-gray-600">
          {t('noAccount')}{' '}
          <Link href="/auth/signup" className="text-blue-600 hover:text-blue-800 font-semibold">
            {t('signupHere')}
          </Link>
        </p>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-lg font-semibold text-blue-600 hover:text-blue-800"
          >
            {t('backToHome')} <ArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}