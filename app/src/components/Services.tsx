import React from 'react';
import { Megaphone, Search, MousePointer, Mail, ArrowRight, ChevronRight, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

export default function Services(): JSX.Element {
  return (
    <div className="container mx-auto my-20 px-3 md:px-0">
      <h1 className="text-5xl font-bold mb-8">Tailored investment solutions</h1>
      <p className="font-mono text-xl text-gray-600 mb-12">
        We offer a comprehensive range of investment management services designed to fuel your business growth. Discover the right solutions for your financial success.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <ServiceCard
          icon={<Search size={48} />}
          title="Smart Portfolio Tracking"
          description="Get real-time insights across multiple asset classes to stay ahead."
          features={[
            "Real-time updates on portfolio performance",
            "Custom dashboards for quick insights",
            "Multi-asset class support",
            "Historical performance analysis",
            "Automated reporting and alerts"
          ]}
        />
        <ServiceCard
          icon={<MousePointer size={48} />}
          title="Advanced Risk Analysis"
          description="Leverage our algorithms to safeguard your investments with confidence."
          features={[
            "Comprehensive risk assessment reports",
            "Scenario analysis and stress testing",
            "Risk-adjusted performance metrics",
            "Correlation and diversification analysis",
            "Custom risk tolerance settings"
          ]}
        />
        <ServiceCard
          icon={<Mail size={48} />}
          title="Performance Optimization"
          description="Boost your portfolio with AI-driven rebalancing and strategic insights."
          features={[
            "AI-powered portfolio rebalancing suggestions",
            "Tax-loss harvesting recommendations",
            "Asset allocation optimization",
            "Performance attribution analysis",
            "Benchmark comparison and tracking"
          ]}
        />
        <ServiceCard
          icon={<Megaphone size={48} />}
          title="Actionable Market Insights"
          description="Stay informed with curated news and financial analysis tailored to you."
          features={[
            "Real-time market news and updates",
            "Personalized news feed based on your portfolio",
            "Expert analysis and commentary",
            "Economic indicators and forecasts",
            "Industry and sector reports"
          ]}
        />
      </div>

      <section className="bg-gray-200 p-12 rounded-lg mb-20">
        <h2 className="text-3xl font-bold mb-8">The edge you need to succeed</h2>
        <p className="font-mono text-xl text-gray-600 mb-8">
          Our suite of investment services empowers you to navigate the financial landscape with precision. Here’s how we drive tangible results for your business growth :
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <TrendingUp size={48} className="text-black mb-4" />
            <h3 className="text-2xl font-bold mb-2">Accelerated Growth</h3>
            <p className="font-mono text-gray-600">
              AI-driven insights help optimize your portfolio, potentially boosting returns by up to 15%.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <ShieldCheck size={48} className="text-black mb-4" />
            <h3 className="text-2xl font-bold mb-2">Robust Risk Management</h3>
            <p className="font-mono text-gray-600">
              Our tools reduce portfolio volatility by an average of 30%, keeping your investments secure.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Zap size={48} className="text-black mb-4" />
            <h3 className="text-2xl font-bold mb-2">Efficiency & Automation</h3>
            <p className="font-mono text-gray-600">
              Save time with automated processes and actionable insights, freeing up to 20 hours weekly.
            </p>
          </div>
        </div>
        <div className="mt-12 flex justify-center">
          <button className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 text-xl font-bold flex items-center">
            Start optimizing your investments today <ArrowRight className="ml-4" size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, features }): JSX.Element => (
  <div className="bg-white p-8 rounded-lg shadow-lg">
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
    <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 flex items-center">
      Get Started <ArrowRight className="ml-2" size={16} />
    </button>
  </div>
);