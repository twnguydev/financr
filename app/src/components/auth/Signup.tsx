"use client";

import React, { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Mail, Lock, User, Calendar, MapPin } from 'lucide-react';

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
  const [city, setCity] = useState('');

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (!formData.firstname) {
      newErrors.firstname = 'First name is required';
    }

    if (!formData.lastname) {
      newErrors.lastname = 'Last name is required';
    }

    if (!formData.birthdate) {
      newErrors.birthdate = 'Date of birth is required';
    } else {
      const birthdate = new Date(formData.birthdate);
      const now = new Date();
      let age: number = now.getFullYear() - birthdate.getFullYear();
      if (now.getMonth() < birthdate.getMonth() || (now.getMonth() === birthdate.getMonth() && now.getDate() < birthdate.getDate())) {
        age--;
      }
      if (age < 18) {
        newErrors.birthdate = 'You must be at least 18 years old';
      }
    }

    if (!formData.country) {
      newErrors.country = 'Country is required';
    }

    if (!formData.zipcode) {
      newErrors.zipcode = 'Zip code is required';
    } else if (isNaN(Number(formData.zipcode))) {
      newErrors.zipcode = 'Zip code must be a number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const sendRequest = () => {
    fetch(`${apiUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, city }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
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
        <h1 className="text-4xl font-bold mb-8 text-center">Join Financr Today</h1>
        <p className="font-mono text-xl text-gray-600 mb-12 text-center">
          Start your journey to smarter investments with our 14-day free trial.
        </p>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                id="email"
                name="email"
                className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                id="password"
                name="password"
                className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <div className="mb-6 flex space-x-4">
            <div className="flex-1">
              <label htmlFor="firstname" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.firstname ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
                  placeholder="John"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.firstname && <p className="text-red-500 text-xs mt-1">{errors.firstname}</p>}
            </div>
            <div className="flex-1">
              <label htmlFor="lastname" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.lastname ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
                  placeholder="Doe"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.lastname && <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>}
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="birthdate" className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
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
            <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">Country</label>
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
                <option value="">Select a country</option>
                <option value="US">United States</option>
                <option value="FR">France</option>
                {/* Add more countries as needed */}
              </select>
            </div>
            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="zipcode" className="block text-gray-700 text-sm font-bold mb-2">Zip Code</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                id="zipcode"
                name="zipcode"
                className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.zipcode ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
                placeholder="90210"
                value={formData.zipcode}
                onChange={handleChange}
                required
              />
            </div>
            {errors.zipcode && <p className="text-red-500 text-xs mt-1">{errors.zipcode}</p>}
          </div>
          {city && (
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-100"
                value={city}
                readOnly
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-black text-white font-bold py-3 px-4 rounded-full hover:bg-gray-800 transition duration-300"
          >
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center font-mono text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:text-blue-800 font-semibold">
            Log in here
          </Link>
        </p>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-lg font-semibold text-blue-600 hover:text-blue-800"
          >
            Back to home <ArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}