import React from 'react';
import { TrendingUp, ShieldCheck, PieChart, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { t } from 'i18next';

interface CaseStudyProps {
  title: string;
  description: string;
  challenge: string;
  solution: string[];
  results: string[];
  impact: string;
  icon: React.ReactNode;
}

export default function UseCases(): JSX.Element {
  const t = useTranslations('caseStudies');

  return (
    <div className="container mx-auto my-20 px-3 md:px-0">
      <h1 className="text-5xl font-bold mb-8">{t('title')}</h1>
      <p className="font-mono text-xl text-gray-600 mb-12">
        {t('description')}
      </p>

      <div className="space-y-16">
        <CaseStudy
          title={t('studies.hedgeFund.title')}
          description={t('studies.hedgeFund.description')}
          challenge={t('studies.hedgeFund.challenge')}
          solution={t.raw('studies.hedgeFund.solution')}
          results={t.raw('studies.hedgeFund.results')}
          impact={t('studies.hedgeFund.impact')}
          icon={<ShieldCheck size={48} />}
        />

        <CaseStudy
          title={t('studies.retailInvestor.title')}
          description={t('studies.retailInvestor.description')}
          challenge={t('studies.retailInvestor.challenge')}
          solution={t.raw('studies.retailInvestor.solution')}
          results={t.raw('studies.retailInvestor.results')}
          impact={t('studies.retailInvestor.impact')}
          icon={<TrendingUp size={48} />}
        />

        <CaseStudy
          title={t('studies.pensionFund.title')}
          description={t('studies.pensionFund.description')}
          challenge={t('studies.pensionFund.challenge')}
          solution={t.raw('studies.pensionFund.solution')}
          results={t.raw('studies.pensionFund.results')}
          impact={t('studies.pensionFund.impact')}
          icon={<PieChart size={48} />}
        />
      </div>
    </div>
  );
}

const CaseStudy: React.FC<CaseStudyProps> = ({ title, description, challenge, solution, results, impact, icon }) => {
  const t = useTranslations('caseStudies');

  return (
    <div className="bg-black text-white p-8 rounded-lg">
      <div className="flex items-center mb-6">
        <div className="mr-4 text-white">{icon}</div>
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
      <p className="font-mono text-xl mb-6">{description}</p>
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">{t('challengeTitle')}</h3>
        <p className="text-gray-300">{challenge}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">{t('ourSolutionsTitle')}</h3>
        <ul className="space-y-2">
          {solution.map((item, index) => (
            <li key={index} className="flex items-center">
              <ChevronRight className="mr-2 flex-shrink-0 text-green-400" size={20} />
              <span className="text-gray-300">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">{t('ourResultsTitle')}</h3>
        <ul className="list-disc pl-6">
          {results.map((result, index) => (
            <li key={index} className="text-gray-300 mb-2">{result}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-2">{t('ourImpactTitle')}</h3>
        <p className="text-gray-300">{impact}</p>
      </div>
    </div>
  );
};