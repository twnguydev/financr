import { SetStateAction, useState } from 'react';
import axios from 'axios';

const API_URL: string | undefined = process.env.NEXT_PUBLIC_FINANCR_API_URL;

export const useApi = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const api = axios.create({
    baseURL: API_URL,
    headers: { Authorization: `Bearer ${token}` }
  });

  const refreshToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  return { api, refreshToken };
};