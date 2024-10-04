import React, { useState } from 'react';
import { Home, Users, DollarSign, TrendingUp, AlertTriangle, Settings, ChartPie } from 'lucide-react';

interface SidebarProps {
  tab: string;
  setTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ tab, setTab }) => {
  const sidebarItems = [
    { icon: <ChartPie size={20} />, title: 'KPIs', id: 'kpi' },
    { icon: <Users size={20} />, title: 'Utilisateurs', id: 'users' },
    { icon: <DollarSign size={20} />, title: 'Revenus', id: 'revenue' },
    { icon: <TrendingUp size={20} />, title: 'Analytics', id: 'analytics' },
    { icon: <AlertTriangle size={20} />, title: 'Alertes', id: 'alerts' },
    { icon: <Settings size={20} />, title: 'Paramètres', id: 'settings' },
  ];

  return (
      <div className="w-64 bg-black text-white p-6">
        <h2 className="text-3xl font-bold">Financr</h2>
        <h3 className="text-xl font-bold mb-8">for administrators</h3>
        <nav>
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              className={`flex items-center w-full py-2 px-4 rounded-lg mb-2 ${tab === item.id ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
              onClick={() => setTab(item.id)}
            >
              {item.icon}
              <span className="ml-3">{item.title}</span>
            </button>
          ))}
        </nav>
      </div>
  );
};

export default Sidebar;