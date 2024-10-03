import React from 'react';
import { Megaphone, Search, MousePointer, Mail, ArrowRight, ChevronRight, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

export default function Services(): JSX.Element {
  const t = useTranslations('services');

  return (
    <div className="container mx-auto my-20 px-3 md:px-0">
      <h1 className="text-5xl font-bold mb-8">{t('title')}</h1>
      <p className="font-mono text-xl text-gray-600 mb-12">
        {t('description')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <ServiceCard
          icon={<Search size={48} />}
          title={t('smartPortfolioTracking.title')}
          description={t('smartPortfolioTracking.description')}
          features={t.raw('smartPortfolioTracking.features')}
        />
        <ServiceCard
          icon={<MousePointer size={48} />}
          title={t('advancedRiskAnalysis.title')}
          description={t('advancedRiskAnalysis.description')}
          features={t.raw('advancedRiskAnalysis.features')}
        />
        <ServiceCard
          icon={<Mail size={48} />}
          title={t('performanceOptimization.title')}
          description={t('performanceOptimization.description')}
          features={t.raw('performanceOptimization.features')}
        />
        <ServiceCard
          icon={<Megaphone size={48} />}
          title={t('actionableMarketInsights.title')}
          description={t('actionableMarketInsights.description')}
          features={t.raw('actionableMarketInsights.features')}
        />
      </div>

      <section className="bg-gray-200 p-12 rounded-lg mb-20">
        <h2 className="text-3xl font-bold mb-8">{t('theEdge.title')}</h2>
        <p className="font-mono text-xl text-gray-600 mb-8">
          {t('theEdge.description')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <TrendingUp size={48} className="text-black mb-4" />
            <h3 className="text-2xl font-bold mb-2">{t('theEdge.growth.title')}</h3>
            <p className="font-mono text-gray-600">
              {t('theEdge.growth.description')}
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <ShieldCheck size={48} className="text-black mb-4" />
            <h3 className="text-2xl font-bold mb-2">{t('theEdge.riskManagement.title')}</h3>
            <p className="font-mono text-gray-600">
              {t('theEdge.riskManagement.description')}
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Zap size={48} className="text-black mb-4" />
            <h3 className="text-2xl font-bold mb-2">{t('theEdge.efficiency.title')}</h3>
            <p className="font-mono text-gray-600">
              {t('theEdge.efficiency.description')}
            </p>
          </div>
        </div>
        <div className="mt-12 flex justify-center">
          <button className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 text-xl font-bold flex items-center">
            {t('theEdge.cta')} <ArrowRight className="ml-4" size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, features }): JSX.Element => {
  const t = useTranslations('services');

  return (
    <div className="bg-white h-full p-8 rounded-lg shadow-lg flex flex-col justify-between">
      <div>
        <div className="flex items-center mb-6">
          <div className="mr-4 text-black">{icon}</div>
          <h2 className="text-3xl font-bold">{title}</h2>
        </div>
        <p className="font-mono text-xl text-gray-600 mb-6">{description}</p>
        <div className="mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center mb-2">
              <ChevronRight size={20} className="mr-2 text-black" />
              <span className="text-gray-600">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto">
        <button className="w-full bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 flex justify-center items-center">
          {t('cta')} <ArrowRight className="ml-2" size={16} />
        </button>
      </div>
    </div>
  );
};