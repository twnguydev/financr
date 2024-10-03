import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Phone, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@i18n/routing';

export default function Footer(): JSX.Element {
  const t = useTranslations('footer');

  return (
    <footer className="bg-black text-gray-300 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="font-bold text-3xl">Financr</div>
            {/* Social Media Section */}
            <div className="mt-16">
              <h3 className="text-xl font-semibold text-white mb-4">{t('findUs')}</h3>
              <div className="flex space-x-6">
                <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white">
                  <Facebook size={24} />
                </a>
                <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white">
                  <Twitter size={24} />
                </a>
                <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white">
                  <Linkedin size={24} />
                </a>
                <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white">
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">{t('getInTouch')}</h3>
            <ul className="space-y-2">
              <li className="flex items-center mb-2">
                <Phone className="mr-2" /> {t('phone')}
              </li>
              <li className="flex items-center mb-2">
                <Mail className="mr-2" /> {t('email')}
              </li>
              <li>{t('address')}</li>
              <li>{t('cityState')}</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">{t('retrieveWhat')}</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white">{t('links.about')}</Link></li>
              <li><Link href="#" className="hover:text-white">{t('links.services')}</Link></li>
              <li><Link href="#" className="hover:text-white">{t('links.use-cases')}</Link></li>
              <li><Link href="#" className="hover:text-white">{t('links.pricing')}</Link></li>
              <li><Link href="#" className="hover:text-white">{t('links.blog')}</Link></li>
            </ul>
          </div>

          {/* Language Support Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">{t('languagesTitle')}</h3>
            <ul className="space-y-2">
              <li><Link href="/" locale="en" className="hover:text-white">{t('languages.en')}</Link></li>
              <li><Link href="/" locale="fr" className="hover:text-white">{t('languages.fr')}</Link></li>
              {/* Ajoutez d'autres langues ici si nécessaire */}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center">
          <p className="font-mono text-sm">{t('copyright', { currentYear: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
}