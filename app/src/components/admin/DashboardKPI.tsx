"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Bell, ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import Sidebar from '@components/admin/Sidebar';
import { useApi } from '@hooks/api';

interface KPIData {
  id: string;
  limit: number;
  name: string;
  description_fr: string;
  value: number;
  trend: number;
  color: string;
}

const DashboardKPI: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('kpi');
  const { api } = useApi();
  const [kpiData, setKpiData] = useState<KPIData[]>([]);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchKPIData = useCallback(async (): Promise<void> => {
    try {
      const response = await api.get('/admin/kpi');
      setKpiData(response.data);
    } catch (err) {
      setError('Erreur lors du chargement des KPI');
    }
  }, [api]);

  const fetchTrendData = useCallback(async (): Promise<void> => {
    try {
      const response = await api.get('/admin/kpi/trends');
      setTrendData(response.data);
    } catch (err) {
      setError('Erreur lors du chargement des tendances');
    }
  }, [api]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchKPIData(), fetchTrendData()]);
      setLoading(false);
    };

    fetchData();
  }, [fetchKPIData, fetchTrendData]);

  const handleAlertChange = async (id: string, limit: string) => {
    try {
      await api.put(`/admin/kpi/${id}/limit`, { limit });
      await fetchKPIData();
    } catch (err) {
      setError('Erreur lors de la mise à jour de la limite');
    }
  };

  const TrendIndicator: React.FC<{ value: number }> = ({ value }) => (
    <span className={`flex items-center gap-1 font-bold ${value >= 0 ? 'text-green-500' : 'text-red-500'}`}>
      {value >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
      {Math.abs(value).toFixed(2)}%
    </span>
  );

  const renderContent = () => {
    if (loading) {
      return <div className="flex justify-center items-center h-full">Chargement...</div>;
    }

    if (error) {
      return <div className="bg-red-500 text-white p-4 rounded-lg m-8">{error}</div>;
    }

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {kpiData.map((kpi) => (
            <div key={kpi.id} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">{kpi.name}</h3>
              <p className="text-3xl font-bold mb-2">{kpi.value.toLocaleString()}</p>
              <TrendIndicator value={kpi.trend} />
              <div className="h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
                <div
                  className={`h-full rounded-full ${kpi.value > kpi.limit ? 'bg-red-500' : 'bg-blue-500'}`}
                  style={{ width: `${Math.min((kpi.value / kpi.limit) * 100, 100)}%` }}
                />
              </div>
              <p className="text-sm text-justify text-gray-600 mt-4">{kpi.description_fr}</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Tendances des KPI clés</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {kpiData.map((kpi) => (
                <Line key={kpi.id} type="monotone" dataKey={kpi.name} stroke={kpi.color} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Comparaison avec les limites</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={kpiData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3B82F6" name="Valeur actuelle" />
              <Bar dataKey="limit" fill="#9CA3AF" name="Limite" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Paramètres d'alerte</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
            {kpiData.map((kpi) => (
              <div key={kpi.id} className="mb-4">
                <label htmlFor={kpi.id} className="block text-gray-700 text-sm font-bold mb-2">{kpi.name}</label>
                <div className="relative">
                  <Bell className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="number"
                    id={kpi.id}
                    value={kpi.limit}
                    onChange={(e) => handleAlertChange(kpi.id, e.target.value)}
                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            ))}
            <div className="col-span-full flex items-center justify-end mt-4">
              <button
                type="submit"
                className="flex items-center bg-black text-white font-bold py-3 px-4 rounded-full hover:bg-gray-800 transition duration-300"
              >
                Sauvegarder
                <ArrowRight className="ml-2" size={20} />
              </button>
            </div>
          </form>
        </div>
      </>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar tab={activeTab} setTab={setActiveTab} />

      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-8">Tableau de bord KPI</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardKPI;