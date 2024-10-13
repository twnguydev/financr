"use client";

import React, { useState, ReactNode, useEffect } from 'react';
import { 
  Home, TrendingUp, LayoutGrid, PieChart, 
  Bell, Search, FileText, Settings
} from 'lucide-react';

interface MenuItem {
  icon: React.ReactNode;
  titleDesktop: string;
  titleMobile: string;
}

const menuItems: MenuItem[] = [
  { icon: <Home size={24} />, titleDesktop: 'Dashboard', titleMobile: 'Accueil' },
  { icon: <LayoutGrid size={24} />, titleDesktop: 'Mes tableaux', titleMobile: 'Tableaux' },
  { icon: <PieChart size={24} />, titleDesktop: 'Analyse des tableaux', titleMobile: 'Analyses' },
  { icon: <TrendingUp size={24} />, titleDesktop: 'Analyse des marchés', titleMobile: 'Marché' },
  { icon: <FileText size={24} />, titleDesktop: 'Mes rapports', titleMobile: 'Rapports' },
];

interface SidebarProps {
  isMobile: boolean;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile, isExpanded, setIsExpanded }) => {
  return (
    <nav 
      className={`bg-white transition-all duration-300 ease-in-out ${
        isMobile 
          ? 'fixed bottom-0 left-0 right-0 shadow-lg' 
          : `fixed top-16 bottom-0 ${isExpanded ? 'w-64' : 'w-16'} shadow-lg`
      }`}
      onMouseEnter={() => !isMobile && setIsExpanded(true)}
      onMouseLeave={() => !isMobile && setIsExpanded(false)}
    >
      <ul className={`flex ${isMobile ? 'justify-around py-2' : 'flex-col py-4'}`}>
        {menuItems.map((item, index) => (
          <li key={index} className={`${isMobile ? 'text-center' : 'mb-2'}`}>
            <a
              href="#"
              className={`flex ${isMobile ? 'flex-col items-center' : 'items-center'} p-2 py-4 text-gray-700 hover:bg-gray-100 ${
                !isMobile && isExpanded ? 'px-4' : 'justify-center'
              }`}
            >
              <span>{item.icon}</span>
              {(isMobile || isExpanded) && (
                <span className={`${isMobile ? 'text-xs mt-1' : 'ml-4 text-sm'}`}>
                  {isMobile ? item.titleMobile : item.titleDesktop}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
      {!isMobile && (
        <div className="absolute bottom-4 left-0 right-0">
          <a
            href="#"
            className={`flex items-center p-2 py-4 text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
              isExpanded ? 'px-4' : 'justify-center'
            }`}
          >
            <Settings size={24} />
            {isExpanded && <span className="ml-4 text-sm">Paramètres</span>}
          </a>
        </div>
      )}
    </nav>
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

const Navbar: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  return (
    <nav className="bg-white shadow-md h-16 flex items-center justify-between space-x-4 px-4 fixed top-0 left-0 right-0 z-10">
      {!isMobile && (
        <div className="flex items-center">
          <span className="font-bold text-3xl text-gray-800 mr-6">Financr</span>
        </div>
      )}
      <div className="flex-grow flex items-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full relative">
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
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar isMobile={isMobile} />
      <div className="flex flex-1 pt-16">
        {!isMobile && (
          <Sidebar 
            isMobile={false} 
            isExpanded={isSidebarExpanded} 
            setIsExpanded={setIsSidebarExpanded} 
          />
        )}
        <main className={`flex-1 p-6 overflow-auto transition-all duration-300 ease-in-out ${isMobile ? 'pb-20' : ''} ${
          !isMobile ? (isSidebarExpanded ? 'ml-64' : 'ml-16') : ''
        }`}>
          {children}
        </main>
      </div>
      {isMobile && (
        <Sidebar 
          isMobile={true} 
          isExpanded={false} 
          setIsExpanded={() => {}} 
        />
      )}
    </div>
  );
};

export default DashboardLayout;