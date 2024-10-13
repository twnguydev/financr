import React from 'react';
import DashboardLayout from '@components/layout/DashboardLayout';

const DashboardPage: React.FC = (): JSX.Element => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Tableau de bord</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Performances du portefeuille</h2>
          {/* Contenu du widget */}
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Analyse des risques</h2>
          {/* Contenu du widget */}
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Dernières transactions</h2>
          {/* Contenu du widget */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;