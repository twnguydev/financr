"use client";

import React, { useState, useEffect } from 'react';
import { Link } from '@i18n/routing';
import axios from 'axios';
import { ArrowRight, Mail, Lock, User, Calendar, MapPin, LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

const apiUrl: string | undefined = process.env.NEXT_PUBLIC_FINANCR_API_URL;

const fetchCityFromZipcode = async (zipcode: string, country: string) => {
  const response = await fetch(`https://api.zippopotam.us/${country}/${zipcode}`);
  if (!response.ok) {
    return '';
  }
  const data: any = await response.json();
  return data.places[0]?.['place name'] || '';
};

interface FormErrors {
  email?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  birthdate?: string;
  zipcode?: string;
  country?: string;
  general?: string;
}

export default function SignupPage(): JSX.Element {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    birthdate: '',
    zipcode: '',
    country: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const t = useTranslations('signup');

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = t('errors.email.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('errors.email.invalid')
    }

    if (!formData.password) {
      newErrors.password = t('errors.password.required');
    } else if (formData.password.length < 8) {
      newErrors.password = t('errors.password.minLength');
    }

    if (!formData.firstname) {
      newErrors.firstname = t('errors.firstname.required');
    }

    if (!formData.lastname) {
      newErrors.lastname = t('errors.lastname.required');
    }

    if (!formData.birthdate) {
      newErrors.birthdate = t('errors.birthdate.required');
    } else {
      const birthdate = new Date(formData.birthdate);
      const now = new Date();
      let age: number = now.getFullYear() - birthdate.getFullYear();
      if (now.getMonth() < birthdate.getMonth() || (now.getMonth() === birthdate.getMonth() && now.getDate() < birthdate.getDate())) {
        age--;
      }
      if (age < 18) {
        newErrors.birthdate = t('errors.birthdate.underage');
      }
    }

    if (!formData.country) {
      newErrors.country = t('errors.country.required');
    }

    if (!formData.zipcode) {
      newErrors.zipcode = t('errors.zipcode.required');
    } else if (isNaN(Number(formData.zipcode))) {
      newErrors.zipcode = t('errors.zipcode.invalid');
    }

    if (!city) {
      newErrors.zipcode = t('errors.zipcode.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const sendRequest = async (): Promise<void> => {
    const newErrors: FormErrors = {};

    const data = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      birthdate: formData.birthdate,
      password: formData.password,
      email: formData.email,
      address: {
        address: '',
        zipcode: formData.zipcode,
        city,
        country: formData.country,
      },
    }

    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}/auth/register`, data);

      if (response.status === 201) {
        setSuccess(t('messages.success'));
      } else {
        newErrors.general = t('errors.general');
        setErrors(newErrors);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data.status === 409) {
        newErrors.general = t('errors.accountAlreadyExists');
      } else {
        newErrors.general = t('errors.general');
      }
      setErrors(newErrors);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCity = async () => {
      if (formData.zipcode.length >= 5 && formData.country) {
        const fetchedCity = await fetchCityFromZipcode(formData.zipcode, formData.country);
        setCity(fetchedCity);
      }
    };
    fetchCity();
  }, [formData.zipcode, formData.country]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      sendRequest();
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
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">{t('labels.email')}</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                id="email"
                name="email"
                className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
                placeholder={t('placeholders.email')}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">{t('labels.password')}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                id="password"
                name="password"
                className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
                placeholder={t('placeholders.password')}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <div className="mb-6 flex space-x-4">
            <div className="flex-1">
              <label htmlFor="firstname" className="block text-gray-700 text-sm font-bold mb-2">{t('labels.firstname')}</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.firstname ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
                  placeholder={t('placeholders.firstname')}
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.firstname && <p className="text-red-500 text-xs mt-1">{errors.firstname}</p>}
            </div>
            <div className="flex-1">
              <label htmlFor="lastname" className="block text-gray-700 text-sm font-bold mb-2">{t('labels.lastname')}</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.lastname ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
                  placeholder={t('placeholders.lastname')}
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.lastname && <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>}
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="birthdate" className="block text-gray-700 text-sm font-bold mb-2">{t('labels.birthdate')}</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.birthdate ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
                value={formData.birthdate}
                onChange={handleChange}
                required
              />
            </div>
            {errors.birthdate && <p className="text-red-500 text-xs mt-1">{errors.birthdate}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">{t('labels.country')}</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                id="country"
                name="country"
                className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.country ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="">{t('placeholders.country')}</option>
                <option value="US">United States</option>
                <option value="FR">France</option>
                {/* Add more countries as needed */}
              </select>
            </div>
            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="zipcode" className="block text-gray-700 text-sm font-bold mb-2">{t('labels.zipcode')}</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                id="zipcode"
                name="zipcode"
                className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.zipcode ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
                placeholder={t('placeholders.zipcode')}
                value={formData.zipcode}
                onChange={handleChange}
                required
              />
            </div>
            {errors.zipcode && <p className="text-red-500 text-xs mt-1">{errors.zipcode}</p>}
          </div>
          {city && (
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">{t('labels.city')}</label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-100"
                value={city}
                readOnly
              />
            </div>
          )}
          {errors.general && <p className="text-red-500 text-sm my-4">{errors.general}</p>}
          {success && <p className="text-green-500 text-sm my-4">{success}</p>}
          <button
            type="submit"
            className={`w-full flex justify-center items-center bg-black text-white font-bold py-3 px-4 rounded-full hover:bg-gray-800 transition duration-300`}
            disabled={loading}
          >
            {loading ? (
              <LoaderCircle className="animate-spin w-5 h-5 text-white" />
            ) : 
              t('buttons.createAccount')
            }
          </button>
        </form>

        <p className="mt-8 text-center font-mono text-gray-600">
          {t('messages.alreadyHaveAccount')}{' '}
          <Link href="/auth/login" className="text-blue-600 hover:text-blue-800 font-semibold">
            {t('buttons.loginHere')}
          </Link>
        </p>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-lg font-semibold text-blue-600 hover:text-blue-800"
          >
            {t('messages.backToHome')} <ArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}