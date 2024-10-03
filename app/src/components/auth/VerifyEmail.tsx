"use client";

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Toast from '@components/layout/Toast';

const apiUrl: string | undefined = process.env.NEXT_PUBLIC_FINANCR_API_URL;

export default function VerifyEmailPage(): JSX.Element {
  const [showToast, setShowToast] = useState(false);
  const requestSentRef = useRef(false);

  interface ToastMessage {
    title: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }
  
  const [toastMessage, setToastMessage] = useState<ToastMessage>({
    title: '',
    message: '',
    type: 'error',
  });
  const router = useRouter();

  useEffect(() => {
    const verifyEmail = async (): Promise<void> => {
      if (requestSentRef.current) return;
      requestSentRef.current = true;

      const params = new URLSearchParams(window.location.search);
      const token: string | null = params.get('token');

      if (!token) {
        setToastMessage({
          title: 'Error',
          message: 'No token provided.',
          type: 'error',
        });
        setShowToast(true);
        setTimeout(() => {
          router.push('/fr');
        }, 10000);
        return;
      }

      try {
        console.log('Sending request to verify email...');
        const response = await axios.get(`${apiUrl}/auth/verify-email?token=${token}`);

        console.log('Response received:', response);
        if (response.status === 200) {
          console.log('Email verification success');
          setToastMessage({
            title: 'Success',
            message: 'Your email has been verified successfully!',
            type: 'success',
          });
          setShowToast(true);

          setTimeout(() => {
            router.push('/fr/auth/login');
          }, 10000);
        } else {
          throw new Error('Verification failed with status: ' + response.status);
        }
      } catch (error) {
        console.error('Error during email verification:', error);
        setToastMessage({
          title: 'Error',
          message: error instanceof Error ? error.message : 'Error verifying email.',
          type: 'error',
        });
        setShowToast(true);

        setTimeout(() => {
          router.push('/fr');
        }, 10000);
      }
    };

    verifyEmail();
  }, [router]);

  return (
    <div className="container flex items-center justify-center mx-auto h-screen px-3 md:px-0">
      <div className="max-w-md mx-auto text-center">
        <LoaderCircle className="animate-spin mx-auto" size={48} />
        <h1 className="text-xl font-bold mb-8 mt-3">We are currently verifying your email...</h1>
      </div>

      {showToast && (
        <Toast
          title={toastMessage.title}
          message={toastMessage.message}
          type={toastMessage.type}
          duration={10000}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}