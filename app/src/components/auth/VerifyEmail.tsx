"use client";

import React, { useEffect, useState, useRef } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useApi } from '@hooks/api';
import { usePathname } from 'next/navigation';
import Toast, { ToastMessage } from '@components/layout/Toast';

export default function VerifyEmailPage(): JSX.Element {
  const [showToast, setShowToast] = useState(false);
  const requestSentRef = useRef(false);
  const { api } = useApi();
  const pathname: string = usePathname();
  const lang: string = pathname.split('/')[1];
  const router = useRouter();
  const [message, setMessage] = useState('');

  const t = useTranslations('verify-email');
  
  const [toastMessage, setToastMessage] = useState<ToastMessage>({
    title: '',
    message: '',
    type: 'error',
  });

  useEffect(() => {
    const verifyEmail = async (): Promise<void> => {
      if (requestSentRef.current) return;
      requestSentRef.current = true;

      setMessage(t('verifying'));

      const params = new URLSearchParams(window.location.search);
      const token: string | null = params.get('token');

      if (!token) {
        setToastMessage({
          title: t('error-title'),
          message: t('error-no-token'),
          type: 'error',
        });
        setShowToast(true);
        setTimeout(() => {
          router.push(`/${lang}`);
        }, 10000);
        return;
      }

      try {
        const response = await api.get(`/auth/verify-email?token=${token}`);

        if (response.status === 200) {
          setMessage(t('setting-up'));

          setToastMessage({
            title: t('success-title'),
            message: t('success-message'),
            type: 'success',
          });
          setShowToast(true);

          setTimeout(() => {
            router.push(`/${lang}/auth/login`);
          }, 10000);
        } else {
          throw new Error(t('error-verification-failed'));
        }
      } catch (error) {
        setToastMessage({
          title: t('error-title'),
          message: error instanceof Error ? error.message : t('error-verification-failed'),
          type: 'error',
        });
        setShowToast(true);

        setTimeout(() => {
          router.push(`/${lang}`);
        }, 10000);
      }
    };

    verifyEmail();
  }, [router, t, api]);

  return (
    <div className="container flex items-center justify-center mx-auto h-screen px-3 md:px-0">
      <div className="max-w-md mx-auto text-center">
        <LoaderCircle className="animate-spin mx-auto" size={48} />
        <h1 className="text-xl font-bold mb-8 mt-3">{message}</h1>
        <p className="text-gray-600">
          {t('redirect-message')}
        </p>
      </div>

      {showToast && (
        <Toast
          title={toastMessage.title}
          message={toastMessage.message}
          type={toastMessage.type}
          duration={5000}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}