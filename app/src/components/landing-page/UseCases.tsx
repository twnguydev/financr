import React from 'react';
import { TrendingUp, ShieldCheck, PieChart, ChevronRight } from 'lucide-react';

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
  return (
    <div className="container mx-auto my-20 px-3 md:px-0">
      <h1 className="text-5xl font-bold mb-8">Inspiring success stories</h1>
      <p className="font-mono text-xl text-gray-600 mb-12">
        Discover how our investment management platform has transformed the financial journeys of our clients. These impactful case studies highlight the real-world benefits and success achieved through our tailored services.
      </p>

      <div className="space-y-16">
        <CaseStudy
          title="Hedge Fund Risk Management"
          description="We implemented a risk analysis strategy that resulted in a 30% reduction in portfolio volatility and a 15% increase in annual returns."
          challenge="A prominent hedge fund was grappling with high portfolio volatility and inconsistent returns, causing significant investor concern and threatening to reduce assets under management."
          solution={[
            "Deployed our state-of-the-art risk analysis engine, providing real-time insights and predictive alerts",
            "Implemented AI-driven scenario analysis and stress testing, simulating thousands of market conditions",
            "Utilized our proprietary portfolio rebalancing algorithm, optimizing asset allocation daily",
            "Integrated a custom dashboard for fund managers, offering instant access to critical risk metrics"
          ]}
          results={[
            "30% reduction in portfolio volatility",
            "15% increase in annual returns",
            "20% growth in assets under management",
            "Improved investor confidence, leading to easier fundraising"
          ]}
          impact="The hedge fund not only stabilized its performance but also attracted new investors, growing its AUM by 20% in the following year. The fund manager reported increased confidence in decision-making and a more proactive approach to risk management."
          icon={<ShieldCheck size={48} />}
        />

        <CaseStudy
          title="Retail Investor Portfolio Optimization"
          description="Our portfolio optimization tool helped achieve a 25% increase in overall portfolio performance within the first year of use."
          challenge="A retail investor with a mid-sized portfolio was struggling to balance their investments effectively. They lacked the tools and insights to make informed decisions, resulting in suboptimal returns and missed opportunities."
          solution={[
            "Implemented a personalized portfolio tracking dashboard with real-time updates and alerts",
            "Deployed our AI-driven performance optimization engine, providing tailored investment suggestions",
            "Integrated a curated market insights feed, delivering relevant news and analysis",
            "Provided access to our proprietary asset allocation tool, ensuring optimal portfolio diversification"
          ]}
          results={[
            "25% increase in overall portfolio performance",
            "More diversified and balanced portfolio across multiple asset classes",
            "50% reduction in time spent on portfolio management",
            "Increased confidence in investment decisions"
          ]}
          impact="The retail investor not only saw significant financial gains but also reported feeling more in control of their financial future. They were able to make more informed decisions quickly, taking advantage of market opportunities they previously would have missed."
          icon={<TrendingUp size={48} />}
        />

        <CaseStudy
          title="Pension Fund Long-Term Growth Strategy"
          description="Our market insights and performance tracking led to a more diversified portfolio, resulting in stable 8% year-over-year growth."
          challenge="A large pension fund was facing pressure to deliver consistent returns while managing long-term risks for their beneficiaries. They needed a solution that could balance growth with stability over a multi-decade horizon."
          solution={[
            "Implemented our comprehensive risk analysis suite, providing long-term forecasting and risk assessment",
            "Deployed our AI-powered performance optimization tool, focusing on steady, long-term growth",
            "Integrated our advanced market insights platform, offering real-time economic indicator tracking",
            "Developed a custom reporting system, enhancing stakeholder transparency and communication"
          ]}
          results={[
            "Stable 8% year-over-year growth, outperforming the market average",
            "30% improvement in long-term risk management metrics",
            "15% increase in beneficiary satisfaction scores",
            "Enhanced reporting and transparency for all stakeholders"
          ]}
          impact="The pension fund achieved its goal of stable, long-term growth while significantly improving its risk management. The enhanced transparency and consistent performance led to increased trust from beneficiaries and regulators alike, solidifying the fund's reputation in the industry."
          icon={<PieChart size={48} />}
        />
      </div>
    </div>
  );
}

const CaseStudy: React.FC<CaseStudyProps> = ({ title, description, challenge, solution, results, impact, icon }) => (
  <div className="bg-black text-white p-8 rounded-lg">
    <div className="flex items-center mb-6">
      <div className="mr-4 text-white">{icon}</div>
      <h2 className="text-3xl font-bold">{title}</h2>
    </div>
    <p className="font-mono text-xl mb-6">{description}</p>
    <div className="mb-6">
      <h3 className="text-2xl font-bold mb-2">Challenge</h3>
      <p className="text-gray-300">{challenge}</p>
    </div>
    <div className="mb-6">
      <h3 className="text-2xl font-bold mb-2">Our Solution</h3>
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
      <h3 className="text-2xl font-bold mb-2">Results</h3>
      <ul className="list-disc pl-6">
        {results.map((result, index) => (
          <li key={index} className="text-gray-300 mb-2">{result}</li>
        ))}
      </ul>
    </div>
    <div>
      <h3 className="text-2xl font-bold mb-2">Long-term Impact</h3>
      <p className="text-gray-300">{impact}</p>
    </div>
  </div>
);