"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useApi } from '@hooks/api';
import { useRouter } from 'next/navigation';
import { Link } from '@i18n/routing';
import { useAuth } from '@providers/auth';
import { ArrowRight, Mail, Lock, LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function LoginPage(): JSX.Element {
  const t = useTranslations('login');
  const { login } = useAuth();
  const { api } = useApi();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let newError;

    try {
      setLoading(true);
      const response = await api.post('/auth/login', { email, password });
      console.log('Réponse de connexion:', response);

      if (response.status === 201) {
        setSuccess(t('messages.success'));
        await login(response.data.user, response.data.access_token);

        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        newError = t('errors.general');
        setError(newError);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data.status === 401) {
        newError = t('errors.invalidCredentials');
      } else {
        newError = t('errors.general');
      }
      setError(newError);
    } finally {
      setLoading(false);
    }
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
          {error && <p className="text-red-500 text-sm my-4">{error}</p>}
          {success && <p className="text-green-500 text-sm my-4">{success}</p>}
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-black text-white font-bold py-3 px-4 rounded-full hover:bg-gray-800 transition duration-300"
            disabled={loading}
          >
            {loading ? (
              <LoaderCircle className="animate-spin w-5 h-5 text-white" />
            ) : 
              t('loginButton')
            }
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