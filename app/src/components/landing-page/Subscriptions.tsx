import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ArrowRight, Zap, Shield, BarChart } from 'lucide-react';

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

const subscriptionPlans: SubscriptionPlan[] = [
  {
    name: 'Starter',
    price: '$29',
    description: 'Kickstart your investment journey with essential tools for individuals and small businesses. Enjoy a 14-day free trial to explore all features!',
    features: [
      { text: 'Portfolio tracking (up to 3 portfolios)', available: true },
      { text: 'Basic risk analysis', available: true },
      { text: 'Market news and insights', available: true },
      { text: 'Email support', available: true },
      { text: 'Performance optimization', available: false },
      { text: 'Advanced AI predictions', available: false },
    ],
    cta: 'Start free trial',
  },
  {
    name: 'Professional',
    price: '$99',
    description: 'Designed for ambitious businesses and serious investors ready to scale their success. Start with a 14-day free trial to experience premium features!',
    features: [
      { text: 'Unlimited portfolio tracking', available: true },
      { text: 'Advanced risk analysis', available: true },
      { text: 'AI-driven performance optimization', available: true },
      { text: 'Market predictions powered by AI', available: true },
      { text: '24/7 priority support', available: true },
      { text: 'Custom API access', available: false },
    ],
    cta: 'Upgrade to Pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$499',
    description: 'Comprehensive, tailored solutions for large organizations with complex investment requirements. Get started with a 14-day free trial to discover our full potential.',
    features: [
      { text: 'All features in Professional plan', available: true },
      { text: 'Custom API access', available: true },
      { text: 'Dedicated account manager', available: true },
      { text: 'Tailored AI models', available: true },
      { text: 'Multi-user access (up to 10 users)', available: true },
      { text: 'Compliance and regulatory reporting', available: true },
    ],
    cta: 'Contact sales',
  },
];

export default function SubscriptionsPage(): JSX.Element {
  return (
    <>
      <div className="container mx-auto my-20 px-3 md:px-0">
        <h1 className="text-5xl font-bold mb-8">Select your path to investment success</h1>
        <p className="font-mono text-xl text-gray-600 mb-12">
          Unlock the true potential of your investments with our tailored subscription plans designed to elevate your financial strategy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {subscriptionPlans.map((plan) => (
            <SubscriptionCard key={plan.name} plan={plan} />
          ))}
        </div>

        <section className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6">Why choose Financr?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-12 h-12 text-yellow-500" />}
              title="Instant Analytics"
              description="Make swift, informed decisions with our lightning-fast data processing."
            />
            <FeatureCard
              icon={<Shield className="w-12 h-12 text-green-500" />}
              title="Top-tier Security"
              description="Your data’s safety is our priority, protected by industry-leading encryption."
            />
            <FeatureCard
              icon={<BarChart className="w-12 h-12 text-blue-500" />}
              title="Smart Predictions"
              description="Leverage advanced AI algorithms to stay ahead of market trends and opportunities."
            />
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Not sure yet?</h2>
          <p className="font-mono text-xl text-gray-600 mb-8">
            Explore our success stories and see how <strong>Financr</strong> has empowered clients just like you to achieve remarkable results.
          </p>
          <Link
            href="/en/use-cases"
            className="inline-flex items-center text-lg font-semibold text-blue-600 hover:text-blue-800"
          >
            View case studies <ArrowRight className="ml-2" />
          </Link>
        </section>

        <section className="bg-black text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to elevate your investment game?</h2>
          <p className="font-mono text-xl mb-8">
            Start your 14-day free trial today and witness firsthand how <strong>Financr</strong> can transform your investment strategy.
          </p>
          <Link
            href="/signup"
            className="bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-gray-200 transition duration-300"
          >
            Start free trial
          </Link>
        </section>
      </div>
    </>
  );
}

const SubscriptionCard: React.FC<{ plan: SubscriptionPlan }> = ({ plan }) => (
  <div className={`bg-white rounded-lg shadow-lg p-6 flex flex-col ${plan.popular ? 'border-2 border-black' : ''}`}>
    {plan.popular && (
      <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full self-start mb-4">
        MOST POPULAR
      </span>
    )}
    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
    <p className="font-mono text-4xl font-bold mb-4">{plan.price}<span className="text-lg font-normal">/month</span></p>
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
