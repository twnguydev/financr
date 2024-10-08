import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Users, Award, Briefcase, Globe, ArrowRight, CircleUserRound, Circle } from 'lucide-react';
import { Link } from '@i18n/routing';

interface TeamMemberProps {
  name: string;
  role: string;
  imageUrl: string;
}

interface ValueProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function AboutUsPage(): JSX.Element {
  const t = useTranslations('aboutUs');

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t('heroTitle')}</h1>
            <p className="font-mono text-lg sm:text-xl text-gray-600 mb-8">
              {t('heroDescription')}
            </p>
            <Link href="/contact" className="inline-block w-full sm:w-auto bg-black font-bold text-white px-6 py-3 rounded-full hover:bg-gray-800">
              {t('contactUs')}
            </Link>
          </div>
          <div className="flex justify-center">
            <Image
              src="/assets/about_us_banner.jpg"
              width={500}
              height={500}
              alt="Our Team"
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">{t('ourValuesTitle')}</h2>
        <p className="font-mono text-lg sm:text-xl text-gray-600 mb-8">
          {t('ourValuesDescription')}
        </p>
        <div className="grid gap-4 lg:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Value
            icon={<Users />}
            title={t('valueCustomerFirst.title')}
            description={t('valueCustomerFirst.description')}
          />
          <Value
            icon={<Award />}
            title={t('valueExcellence.title')}
            description={t('valueExcellence.description')}
          />
          <Value
            icon={<Briefcase />}
            title={t('valueIntegrity.title')}
            description={t('valueIntegrity.description')}
          />
          <Value
            icon={<Globe />}
            title={t('valueInnovation.title')}
            description={t('valueInnovation.description')}
          />
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">{t('ourStoryTitle')}</h2>
        <div className="bg-gray-200 p-8 sm:p-12 rounded-lg">
          <p className="font-mono text-lg sm:text-xl text-gray-600 mb-4">
            {t('ourStoryParagraph1')}
          </p>
          <p className="font-mono text-lg sm:text-xl text-gray-600 mb-4">
            {t('ourStoryParagraph2')}
          </p>
          <p className="font-mono text-lg sm:text-xl text-gray-600">
            {t('ourStoryParagraph3')}
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">{t('ourTeamTitle')}</h2>
        <p className="font-mono text-lg sm:text-xl text-gray-600 mb-8">
          {t('ourTeamDescription')}
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          <TeamMember
            name={t('teamMember1.name')}
            role={t('teamMember1.role')}
            imageUrl="/assets/team_member_1.jpg"
          />
          <TeamMember
            name={t('teamMember2.name')}
            role={t('teamMember2.role')}
            imageUrl="/assets/team_member_2.jpg"
          />
        </div>
      </section>

      <section className="bg-black text-white p-8 sm:p-12 rounded-lg my-12 sm:my-16">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="w-full lg:w-2/3">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('joinOurTeamTitle')}</h2>
            <p className="font-mono text-lg sm:text-xl text-gray-300">
              {t('joinOurTeamDescription')}
            </p>
          </div>
          <Link href="/careers" className="w-full flex justify-center lg:w-auto bg-white font-bold text-black px-12 py-3 rounded-full hover:bg-gray-200">
            {t('viewOpenings')}
          </Link>
        </div>
      </section>
    </div>
  );
}

const Value: React.FC<ValueProps> = ({ icon, title, description }): JSX.Element => {
  return (
    <div className="p-6 rounded-lg bg-gray-200 flex flex-col justify-between h-full">
      <div>
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="font-mono text-gray-600 mb-4">{description}</p>
      </div>
    </div>
  );
};

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, imageUrl }): JSX.Element => {
  return (
    <div className="p-6 rounded-lg bg-white shadow-lg flex flex-col justify-between h-full">
      <div>
        <div className="mb-4">
          <CircleUserRound />
        </div>
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="font-mono text-gray-600 mb-4">{role}</p>
      </div>
    </div>
  );
};