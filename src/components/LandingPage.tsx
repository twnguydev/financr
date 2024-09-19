import React from 'react';
import Image from 'next/image';
import { Megaphone, Search, MousePointer, Mail, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';

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

export default function LandingPage() {
  return (
    <>
      <section className="container mx-auto mt-20 flex justify-between items-center flex-col md:flex-row px-3 md:px-0">
        <div className="w-full md:w-1/2">
          <h1 className="text-5xl font-bold mb-4">Navigating the financial landscape for success</h1>
          <p className="text-xl text-gray-600 mb-8">
            Our investment management platform helps businesses grow and succeed through a range of
            services including portfolio tracking, risk analysis, and performance optimization.
          </p>
          <button className="bg-black font-bold text-white px-6 py-3 rounded-full hover:bg-gray-800">
            Book a consultation
          </button>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          {/* Replace with your own illustration or use an SVG here */}
          {/* <div className="w-64 h-64 bg-gray-200 rounded-full flex items-center justify-center">
            <Megaphone size={80} className="text-black" />
          </div> */}
          <Image src="/assets/hero_banner.png" width={500} height={500} alt="Illustration" />
        </div>
      </section>

      <section className="container mx-auto mt-20 px-3 md:px-0">
        <div className="justify-between items-center opacity-50 md:px-20 hidden md:flex">
          {['Amazon', 'Apple', 'Google', 'Microsoft', 'Netflix', 'Tesla'].map((company) => (
            <div key={company} className="text-xl font-bold">{company}</div>
          ))}
        </div>
      </section>

      <section className="container mx-auto mt-20 px-3 md:px-0">
        <h2 className="text-3xl font-bold mb-8">Services</h2>
        <p className="text-xl text-gray-600 mb-8">
          Our investment platform offers a range of services to help businesses grow and succeed financially. These services include :
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8">
          <ServiceCard
            icon={<Search />}
            title="Portfolio Tracking"
            description="Real-time monitoring of your investments across multiple asset classes."
            isDark={false}
          />
          <ServiceCard
            icon={<MousePointer />}
            title="Risk Analysis"
            description="Advanced algorithms to assess and mitigate potential investment risks."
            isDark={true}
          />
          <ServiceCard
            icon={<Mail />}
            title="Performance Optimization"
            description="AI-driven suggestions to optimize your investment portfolio performance."
            isDark={true}
          />
          <ServiceCard
            icon={<Megaphone />}
            title="Market Insights"
            description="Curated financial news and analysis to inform your investment decisions."
            isDark={false}
          />
        </div>
      </section>

      <section className="md:container mt-20 bg-gray-200 p-12 rounded-lg mx-3 md:mx-auto">
        <div className="flex justify-between items-center flex-col lg:flex-row gap-6">
          <div className="w-full">
            <h2 className="text-3xl font-bold mb-4">Let's make things happen</h2>
            <p className="text-xl text-gray-600">
              Contact us today to learn more about how our investment management services can help your business grow and succeed financially.
            </p>
          </div>
          <button className="bg-black font-bold w-full md:w-1/3 text-white px-6 py-3 rounded-full hover:bg-gray-800">
            Get your free proposal
          </button>
        </div>
      </section>

      <section className="container mx-auto mt-20 mb-20 px-3 md:px-0">
        <h2 className="text-3xl font-bold mb-8">Case study</h2>
        <div className="bg-black text-white p-8 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CaseStudyCard
              title="For a hedge fund"
              description="We implemented a risk analysis strategy that resulted in a 30% reduction in portfolio volatility and a 15% increase in annual returns."
            />
            <CaseStudyCard
              title="For a retail investor"
              description="Our portfolio optimization tool helped achieve a 25% increase in overall portfolio performance within the first year of use."
            />
            <CaseStudyCard
              title="For a pension fund"
              description="Our market insights and performance tracking led to a more diversified portfolio, resulting in stable 8% year-over-year growth."
            />
          </div>
        </div>
      </section>
    </>
  );
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, isDark }) => (
  <div className={`p-6 rounded-lg ${isDark ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}>
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{description}</p>
    <a href="#" className="inline-flex items-center mt-4 font-bold">
      Learn more <ArrowRight className="ml-2" size={16} />
    </a>
  </div>
);

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ title, description }) => (
  <div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-300 mb-4">{description}</p>
    <a href="#" className="inline-flex items-center font-bold text-white">
      Learn more <ArrowRight className="ml-2" size={16} />
    </a>
  </div>
);