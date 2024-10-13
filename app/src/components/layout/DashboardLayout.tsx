"use client";

import React, { useState, ReactNode } from 'react';
import { 
  Home, TrendingUp, LayoutGrid, PieChart, User, 
  Bell, Search, Download, FileText, Settings, LogOut
} from 'lucide-react';

interface MenuItem {
  icon: React.ReactNode;
  title: string;
}

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, setIsExpanded }) => {
  const menuItems: MenuItem[] = [
    { icon: <Home size={24} />, title: 'Dashboard' },
    { icon: <LayoutGrid size={24} />, title: 'Mes tableaux' },
    { icon: <PieChart size={24} />, title: 'Analyse de tableaux' },
    { icon: <TrendingUp size={24} />, title: 'Analyse du marché' },
    { icon: <FileText size={24} />, title: 'Rapports' },
    { icon: <Download size={24} />, title: 'Téléchargements' },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-white shadow-lg transition-all duration-300 ease-in-out flex flex-col ${
        isExpanded ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="p-4 flex h-16">
        <span className={`font-bold text-4xl text-gray-800 ${isExpanded ? '' : 'hidden'}`}>Financr</span>
      </div>
      <nav className="flex-grow">
        <ul className="py-4">
          {menuItems.map((item, index) => (
            <li key={index} className="mb-2">
              <a
                href="#"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                <span className="mr-4">{item.icon}</span>
                <span className={`${isExpanded ? '' : 'hidden'}`}>{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4">
        <a
          href="#"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
        >
          <span className="mr-4"><Settings size={24} /></span>
          <span className={`${isExpanded ? '' : 'hidden'}`}>Paramètres</span>
        </a>
      </div>
    </div>
  );
};

const ProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      />
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mon compte</a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Déconnexion</a>
        </div>
      )}
    </div>
  );
};

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md h-16 flex items-center justify-between px-4">
      <div className="flex items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher..."
            className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full relative mr-5">
          <Bell size={20} />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            1
          </span>
        </button>
        <ProfileDropdown />
      </div>
    </nav>
  );
};

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'ml-64' : 'ml-16'}`}>
        <Navbar />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;