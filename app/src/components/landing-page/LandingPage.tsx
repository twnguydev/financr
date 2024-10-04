"use client";

import React from 'react';
import Image from 'next/image';
import { Megaphone, Search, MousePointer, Mail, ArrowRight, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@i18n/routing';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isDark: boolean;
}

interface CaseStudyCardProps {
  title: string;
  description: string;
}

interface SubscriptionCardProps {
  title: string;
  price: string;
  features: string[];
  isPopular: boolean;
}

export default function LandingPage(): JSX.Element {
  const t = useTranslations('landingPage');

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t('heroTitle')}</h1>
            <p className="font-mono text-lg sm:text-xl text-gray-600 mb-8">
              {t('heroDescription')}
            </p>
            <button className="w-full sm:w-auto bg-black font-bold text-white px-6 py-3 rounded-full hover:bg-gray-800">
              {t('heroButton')}
            </button>
          </div>
          <div className="flex justify-center">
            <Image
              src="/assets/hero_banner.png"
              width={500}
              height={500}
              alt="Illustration"
              className="max-w-full h-auto" 
              loading="lazy"
              layout="responsive"
              quality={75}
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* <section className="container mx-auto mt-20 px-3 md:px-0">
        <div className="justify-between items-center opacity-50 md:px-20 hidden md:flex">
          {['Amazon', 'Apple', 'Google', 'Microsoft', 'Netflix', 'Tesla'].map((company) => (
            <div key={company} className="text-xl font-bold">{company}</div>
          ))}
        </div>
      </section> */}

      <section className="py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">{t('whatWeOfferTitle')}</h2>
        <p className="font-mono text-lg sm:text-xl text-gray-600 mb-8">
          {t('whatWeOfferDescription')}
        </p>
        <div className="grid gap-4 lg:gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <ServiceCard
            icon={<Search />}
            title={t('portfolioTracking.title')}
            description={t('portfolioTracking.description')}
            isDark={false}
          />
          <ServiceCard
            icon={<MousePointer />}
            title={t('riskAnalysis.title')}
            description={t('riskAnalysis.description')}
            isDark={true}
          />
          <ServiceCard
            icon={<Mail />}
            title={t('performanceOptimization.title')}
            description={t('performanceOptimization.description')}
            isDark={true}
          />
          <ServiceCard
            icon={<Megaphone />}
            title={t('marketInsights.title')}
            description={t('marketInsights.description')}
            isDark={false}
          />
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('subscriptionsTitle')}</h2>
        <p className="font-mono text-lg sm:text-xl text-gray-600 mb-8">
          {t('subscriptionsDescription')}
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <SubscriptionCard
            title={t('subscriptionStarter.title')}
            price={t('subscriptionStarter.price')}
            features={t.raw('subscriptionStarter.features')}
            isPopular={false}
          />
          <SubscriptionCard
            title={t('subscriptionProfessional.title')}
            price={t('subscriptionProfessional.price')}
            features={t.raw('subscriptionProfessional.features')}
            isPopular={true}
          />
          <SubscriptionCard
            title={t('subscriptionEnterprise.title')}
            price={t('subscriptionEnterprise.price')}
            features={t.raw('subscriptionEnterprise.features')}
            isPopular={false}
          />
        </div>
      </section>

      <section className="bg-gray-200 p-8 sm:p-12 rounded-lg my-12 sm:my-16">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="w-full lg:w-2/3">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('callToActionTitle')}</h2>
            <p className="font-mono text-lg sm:text-xl text-gray-600">
              {t('callToActionDescription')}
            </p>
          </div>
          <button className="w-full lg:w-auto bg-black font-bold text-white px-6 py-3 rounded-full hover:bg-gray-800">
            {t('callToActionButton')}
          </button>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">{t('caseStudyTitle')}</h2>
        <div className="bg-black text-white p-6 sm:p-8 rounded-lg">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <CaseStudyCard
              title={t('caseStudyHedgeFund.title')}
              description={t('caseStudyHedgeFund.description')}
            />
            <CaseStudyCard
              title={t('caseStudyRetailInvestor.title')}
              description={t('caseStudyRetailInvestor.description')}
            />
            <CaseStudyCard
              title={t('caseStudyPensionFund.title')}
              description={t('caseStudyPensionFund.description')}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, isDark }): JSX.Element => {
  const t = useTranslations('landingPage');

  return (
    <div className={`p-6 rounded-lg flex flex-col h-full ${isDark ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}>
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 h-14 flex items-center">{title}</h3>
      <p className={`font-mono ${isDark ? 'text-gray-300' : 'text-gray-600'} flex-grow mb-4 h-24 overflow-y-auto`}>
        {description}
      </p>
      <Link href="/services" className="inline-flex items-center mt-auto font-bold">
        {t('learnMore')}
        <ArrowRight className="ml-2" size={16} />
      </Link>
    </div>
  );
};

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ title, description }): JSX.Element => {
  const t = useTranslations('landingPage');

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="font-mono text-gray-300 mb-4">{description}</p>
      <Link href="/use-cases" className="inline-flex items-center font-bold text-white">
        {t('learnMore')}
        <ArrowRight className="ml-2" size={16} />
      </Link>
    </div>
  );
};

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ title, price, features, isPopular }): JSX.Element => {
  const t = useTranslations('landingPage');

  return (
    <div className={`p-6 rounded-lg shadow-lg flex flex-col justify-between ${isPopular ? 'bg-black text-white' : 'bg-white'}`}>
      <div className="flex-grow">
        {isPopular && (
          <span className="bg-yellow-400 text-black text-xs uppercase font-bold mr-2 px-2.5 py-0.5 rounded-full mb-2 inline-block">
            {t('subscriptionsBadge')}
          </span>
        )}
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="font-mono text-3xl font-bold mb-6">
          {price}<span className="text-sm font-normal">/{t('subscriptionPricePeriod')}</span>
        </p>
        <ul className="font-mono mb-8 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <div className="flex-shrink-0 w-6 h-6 mr-2">
                <Check className="w-6 h-6" />
              </div>
              <span className="flex-grow">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link href="/plans"
        className={`w-full py-2 px-4 mt-4 rounded-full font-bold flex items-center justify-center ${isPopular ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
      >
        {t('learnMore')} <ArrowRight className="ml-2" size={16} />
      </Link>
    </div>
  );
};