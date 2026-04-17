import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { getMockAnalyticsData } from '../../lib/analytics';
import { config } from '../../config/activePreset';
import { getCurrentUser, logout } from '../../lib/auth';
import { getLeads, getLeadStats } from '../../lib/airtable';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { LoadingSpinner } from '../components/LoadingSpinner';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { motion } from 'framer-motion';
import {
  Users,
  Eye,
  MousePointerClick,
  Target,
  Home,
  RefreshCw,
  LogOut,
  Phone,
  Mail,
} from 'lucide-react';

export default function Dashboard() {
  const user = getCurrentUser();
  const [leads, setLeads] = useState<any[]>([]);
  const [leadStats, setLeadStats] = useState<any>(null);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [leadsData, statsData, analytics] = await Promise.all([
        getLeads(),
        getLeadStats(),
        getMockAnalyticsData(),
      ]);

      setLeads(leadsData);
      setLeadStats(statsData);
      setAnalyticsData(analytics);
    } catch (error) {
      console.error('Error loading dashboard:', error);
      toast.error('Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada');
    window.location.href = '/';
  };

  // Conversión de datos para gráficos
  const leadsChartData = leadStats?.leadsByDay 
    ? Object.entries(leadStats.leadsByDay).map(([day, count]) => ({
        day,
        leads: count,
      }))
    : [];

  const servicesChartData = leadStats?.leadsByService
    ? Object.entries(leadStats.leadsByService).map(([service, count]) => ({
        name: service,
        value: count as number,
      }))
    : [];

  const sourcesChartData = leadStats?.leadsBySource
    ? Object.entries(leadStats.leadsBySource).map(([source, count]) => ({
        name: source,
        value: count as number,
      }))
    : [];

  const COLORS = [config.theme.primary, config.theme.secondary, config.theme.accent, '#6366f1', '#8b5cf6'];

  if (loading) {
    return (
      <LoadingSpinner 
        size="xl" 
        text="Cargando dashboard..." 
        fullScreen 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Panel de Administración
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {config.businessName} • {user}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Home className="size-4" />
                <span className="hidden sm:inline">Ver sitio</span>
              </Link>
              <button
                onClick={loadDashboardData}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RefreshCw className="size-4" />
                <span className="hidden sm:inline">Actualizar</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Users className="size-6" />}
            title="Total Leads"
            value={leadStats?.totalLeads || 0}
            change="+12%"
            color={config.theme.primary}
          />
          <StatCard
            icon={<Eye className="size-6" />}
            title="Visitantes"
            value={analyticsData?.metrics.totalVisitors || 0}
            change="+8%"
            color={config.theme.secondary}
          />
          <StatCard
            icon={<MousePointerClick className="size-6" />}
            title="Conversión"
            value="5.3%"
            change="+0.8%"
            color={config.theme.accent}
          />
          <StatCard
            icon={<Target className="size-6" />}
            title="Bounce Rate"
            value={analyticsData?.metrics.bounceRate || '0%'}
            change="-5%"
            color="#10b981"
            isNegativeGood
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Leads por día */}
          <ChartCard title="Leads por día (últimos 7 días)">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={leadsChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="leads" 
                  stroke={config.theme.primary} 
                  strokeWidth={3}
                  dot={{ fill: config.theme.primary, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Visitantes por día */}
          <ChartCard title="Visitantes por día">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData?.visitors || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Bar dataKey="visitors" fill={config.theme.secondary} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Pie Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Leads por servicio */}
          <ChartCard title="Leads por servicio">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={servicesChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {servicesChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Fuentes de tráfico */}
          <ChartCard title="Fuentes de tráfico">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={analyticsData?.sources || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {(analyticsData?.sources || []).map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Dispositivos */}
          <ChartCard title="Dispositivos">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={analyticsData?.devices || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {(analyticsData?.devices || []).map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Recent Leads Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Leads Recientes</h2>
            <span className="text-sm text-gray-600">{leads.length} total</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nombre</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Contacto</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Servicio</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Mensaje</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Fuente</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      No hay leads registrados aún
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">
                        {lead.fields.Name}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        <div className="flex flex-col gap-1">
                          <span className="flex items-center gap-1">
                            <Phone className="size-3" />
                            {lead.fields.Phone}
                          </span>
                          {lead.fields.Email && (
                            <span className="flex items-center gap-1 text-xs">
                              <Mail className="size-3" />
                              {lead.fields.Email}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span 
                          className="inline-block px-2 py-1 text-xs font-medium rounded-full"
                          style={{
                            backgroundColor: config.theme.primary + '20',
                            color: config.theme.primary,
                          }}
                        >
                          {lead.fields.Service}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate">
                        {lead.fields.Message}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {lead.fields.Source || 'Website'}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {lead.fields.Created ? formatDistanceToNow(new Date(lead.fields.Created), { addSuffix: true, locale: es }) : 'N/A'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente de tarjeta de estadística
function StatCard({ icon, title, value, change, color, isNegativeGood = false }: any) {
  const isPositive = change?.startsWith('+');
  const showPositive = isNegativeGood ? !isPositive : isPositive;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between">
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: color + '20' }}
        >
          <div style={{ color }}>{icon}</div>
        </div>
        {change && (
          <span className={`text-sm font-medium ${showPositive ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </span>
        )}
      </div>
      <h3 className="text-gray-600 text-sm mt-4">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
    </motion.div>
  );
}

// Componente de tarjeta de gráfico
function ChartCard({ title, children }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      {children}
    </motion.div>
  );
}