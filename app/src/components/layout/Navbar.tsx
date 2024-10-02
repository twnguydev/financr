"use client";

import React, { useState } from 'react';
import { Menu, X, ChevronDown, Check, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@i18n/routing';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const t = useTranslations('navbar');
  const pathname = usePathname();
  const currentLang = pathname.split('/')[1];
  const cleanedPathname = pathname.substring(currentLang.length + 1) || '/';

  const navLinks = [
    { href: '#', label: t('aboutUs') },
    { href: '/services', label: t('services') },
    { href: '/use-cases', label: t('useCases') },
    { href: '/plans', label: t('pricing') },
  ];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSubmenu = () => setIsSubmenuOpen(!isSubmenuOpen);

  return (
    <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
      <div className="flex justify-between items-center py-4">
        <Link href="/" className="font-bold text-4xl text-gray-800">
          {t('home')}
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="relative group">
            <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors">
              <span>{currentLang === 'fr' ? 'Français' : 'English'}</span>
              <ChevronDown size={16} />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
              {languages.map((lang, index) => (
                <Link
                  key={lang.code}
                  href={cleanedPathname}
                  locale={lang.code as any}
                  className={`flex items-center justify-between px-4 py-2 ${index === 0 ? 'rounded-t-md' : 'rounded-b-md'} ${currentLang === lang.code ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} hover:bg-gray-200 transition-colors`}
                >
                  {lang.label}
                  {currentLang === lang.code && <Check size={16} />}
                </Link>
              ))}
            </div>
          </div>
          <button className="inline-flex items-center bg-black text-white font-bold px-4 py-2 rounded-full hover:bg-gray-800 transition-colors group">
            {t('requestQuote')}
            <ArrowRight className="ml-3 transition-transform duration-300 ease-in-out transform group-hover:translate-x-2" size={16} />
          </button>
        </div>

        <button className="md:hidden text-gray-600 hover:text-gray-800 transition-colors" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="py-2">
            <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors" onClick={toggleSubmenu}>
              <span>{currentLang === 'fr' ? 'Français' : 'English'}</span>
              <ChevronDown size={16} />
            </button>
            {isSubmenuOpen && (
              <div className="mt-2 w-50 bg-white rounded-md duration-300 ease-in-out">
                {languages.map((lang, index) => (
                  <Link
                    key={lang.code}
                    href={cleanedPathname}
                    locale={lang.code as any}
                    className={`flex items-center justify-between px-4 py-2 ${index === 0 ? 'rounded-t-md' : 'rounded-b-md'} ${currentLang === lang.code ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} hover:bg-gray-200 transition-colors`}
                  >
                    {lang.label}
                    {currentLang === lang.code && <Check size={16} />}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <button className="mt-4 w-full font-bold bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
            {t('requestQuote')}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;