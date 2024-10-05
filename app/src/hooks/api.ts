"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL: string | undefined = process.env.NEXT_PUBLIC_FINANCR_API_URL;

export const useApi = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken: string | null = window.localStorage.getItem('FINANCR_AUTH_TOKEN');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const api = axios.create({
    baseURL: API_URL,
    headers: { Authorization: token ? `Bearer ${token}` : '' }
  });

  const refreshToken = (newToken: string) => {
    window.localStorage.setItem('FINANCR_AUTH_TOKEN', newToken);
    setToken(newToken);
  };

  return { api, refreshToken };
};