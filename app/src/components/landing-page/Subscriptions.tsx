import React from 'react';
import Image from 'next/image';
import { Link } from '@i18n/routing';
import { Check, ArrowRight, Zap, Shield, BarChart } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface PlanFeature {
  text: string;
  available: boolean;
}

interface SubscriptionPlan {
  name: string;
  price: string;
  description: string;
  features: PlanFeature[];
  cta: string;
  popular?: boolean;
}

const SubscriptionsPage: React.FC = () => {
  const t = useTranslations('subscriptions');

  const subscriptionPlans = [
    {
      name: t('plans.starter.name'),
      price: t('plans.starter.price'),
      description: t('plans.starter.description'),
      features: [
        { text: t('plans.starter.features.portfolio_tracking'), available: true },
        { text: t('plans.starter.features.basic_risk_analysis'), available: true },
        { text: t('plans.starter.features.market_news'), available: true },
        { text: t('plans.starter.features.email_support'), available: true },
        { text: t('plans.starter.features.performance_optimization'), available: false },
        { text: t('plans.starter.features.ai_predictions'), available: false },
      ],
      cta: t('plans.starter.cta'),
    },
    {
      name: t('plans.professional.name'),
      price: t('plans.professional.price'),
      description: t('plans.professional.description'),
      features: [
        { text: t('plans.professional.features.unlimited_portfolio'), available: true },
        { text: t('plans.professional.features.advanced_risk_analysis'), available: true },
        { text: t('plans.professional.features.ai_optimization'), available: true },
        { text: t('plans.professional.features.market_predictions'), available: true },
        { text: t('plans.professional.features.priority_support'), available: true },
        { text: t('plans.professional.features.custom_api'), available: false },
      ],
      cta: t('plans.professional.cta'),
      popular: true,
    },
    {
      name: t('plans.enterprise.name'),
      price: t('plans.enterprise.price'),
      description: t('plans.enterprise.description'),
      features: [
        { text: t('plans.enterprise.features.all_professional_features'), available: true },
        { text: t('plans.enterprise.features.custom_api'), available: true },
        { text: t('plans.enterprise.features.account_manager'), available: true },
        { text: t('plans.enterprise.features.tailored_ai_models'), available: true },
        { text: t('plans.enterprise.features.multi_user_access'), available: true },
        { text: t('plans.enterprise.features.compliance_reporting'), available: true },
      ],
      cta: t('plans.enterprise.cta'),
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <section className="py-12 sm:py-16 lg:py-20">
        <h1 className="text-5xl font-bold mb-8">{t('title')}</h1>
        <p className="font-mono text-xl text-gray-600 mb-12">
          {t('description')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {subscriptionPlans.map((plan) => (
            <SubscriptionCard key={plan.name} plan={plan} />
          ))}
        </div>

        <section className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6">{t('why_choose_us.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-12 h-12 text-yellow-500" />}
              title={t('why_choose_us.features.analytics.title')}
              description={t('why_choose_us.features.analytics.description')}
            />
            <FeatureCard
              icon={<Shield className="w-12 h-12 text-green-500" />}
              title={t('why_choose_us.features.security.title')}
              description={t('why_choose_us.features.security.description')}
            />
            <FeatureCard
              icon={<BarChart className="w-12 h-12 text-blue-500" />}
              title={t('why_choose_us.features.predictions.title')}
              description={t('why_choose_us.features.predictions.description')}
            />
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{t('not_sure_yet.title')}</h2>
          <p className="font-mono text-xl text-gray-600 mb-8">
            {t('not_sure_yet.description')}
          </p>
          <Link
            href="/use-cases"
            className="inline-flex items-center text-lg font-semibold text-blue-600 hover:text-blue-800"
          >
            {t('not_sure_yet.cta')} <ArrowRight className="ml-2" />
          </Link>
        </section>

        <section className="bg-black text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('cta.title')}</h2>
          <p className="font-mono text-xl mb-8">
            {t('cta.description')}
          </p>
          <Link
            href="/auth/signup"
            className="bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-gray-200 transition duration-300"
          >
            {t('cta.cta')}
          </Link>
        </section>
      </section>
    </div>
  );
};

const SubscriptionCard: React.FC<{ plan: SubscriptionPlan }> = ({ plan }) => {
  const t = useTranslations('subscriptions');

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 flex flex-col ${plan.popular ? 'border-2 border-black' : ''}`}>
      {plan.popular && (
        <span className="bg-black text-white uppercase text-xs font-bold px-3 py-1 rounded-full self-start mb-4">
          {t('plans.professional.popular')}
        </span>
      )}
      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
      <p className="font-mono text-4xl font-bold mb-4">{plan.price}<span className="text-lg font-normal">/{t('month')}</span></p>
      <p className="font-mono text-gray-600 mb-6">{plan.description}</p>
      <ul className="mb-8 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center mb-2">
            <Check className={`mr-2 ${feature.available ? 'text-green-500' : 'text-gray-400'}`} />
            <span className={feature.available ? 'text-gray-800' : 'text-gray-400'}>{feature.text}</span>
          </li>
        ))}
      </ul>
      <Link
        href={plan.name === 'Enterprise' ? '/contact' : '/signup'}
        className={`w-full py-2 px-4 rounded-full font-bold text-center ${plan.popular
          ? 'bg-black text-white hover:bg-gray-800'
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
      >
        {plan.cta}
      </Link>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({
  icon,
  title,
  description,
}) => (
  <div className="flex flex-col items-center text-center">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="font-mono text-gray-600">{description}</p>
  </div>
);

export default SubscriptionsPage;
