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
import { useDarkMode } from '../../hooks/useDarkMode.js';
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
  Moon,
  Sun,
} from 'lucide-react';

export default function Dashboard() {
  const user = getCurrentUser();
  const { darkMode, setDarkMode, toggleDarkMode } = useDarkMode();
  const [leads, setLeads] = useState<any[]>([]);
  const [leadStats, setLeadStats] = useState<any>(null);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    // Actualizar el body con el modo oscuro
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Simular carga de datos
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generar datos falsos realistas
      const mockAnalyticsData = {
        traffic: [
          { date: 'Lun', visitors: 245 },
          { date: 'Mar', visitors: 312 },
          { date: 'Mié', visitors: 289 },
          { date: 'Jue', visitors: 367 },
          { date: 'Vie', visitors: 423 },
          { date: 'Sáb', visitors: 198 },
          { date: 'Dom', visitors: 156 }
        ],
        leadsByService: [
          { service: 'Consulta', count: 23 },
          { service: 'Vacunación', count: 18 },
          { service: 'Cirugía', count: 12 },
          { service: 'Emergencia', count: 8 }
        ],
        devices: [
          { name: 'Desktop', value: 45 },
          { name: 'Mobile', value: 38 },
          { name: 'Tablet', value: 17 }
        ],
        sources: [
          { name: 'Directo', value: 35 },
          { name: 'Google', value: 28 },
          { name: 'Facebook', value: 22 },
          { name: 'Instagram', value: 15 }
        ]
      };
      
      const mockLeadStats = {
        total: 61,
        thisMonth: 23,
        lastMonth: 18,
        growth: '+27%'
      };
      
      const mockLeads = [
        {
          id: '1',
          fields: {
            Name: 'María González',
            Email: 'maria@email.com',
            Service: 'Consulta General',
            Message: 'Necesito una consulta para mi perro'
          },
          createdTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          fields: {
            Name: 'Carlos Rodríguez',
            Email: 'carlos@email.com',
            Service: 'Vacunación',
            Message: 'Quiero vacunar a mi gato'
          },
          createdTime: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '3',
          fields: {
            Name: 'Ana Martínez',
            Email: 'ana@email.com',
            Service: 'Cirugía',
            Message: 'Mi mascota necesita una cirugía'
          },
          createdTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      
      setAnalyticsData(mockAnalyticsData);
      setLeadStats(mockLeadStats);
      setLeads(mockLeads);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada');
  };

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
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Panel de Administración
              </h1>
              <p className={`text-sm mt-1 transition-colors duration-300 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {config.businessName} &#x2022; {user}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                  darkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Home className="size-4" />
                <span className="hidden sm:inline">Ver sitio</span>
              </Link>
              <button
                onClick={loadDashboardData}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                  darkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <RefreshCw className="size-4" />
                <span className="hidden sm:inline">Actualizar</span>
              </button>
              <button
                onClick={handleLogout}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                  darkMode 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Users className="w-6 h-6" />}
            title="Total Leads"
            value={leadStats?.total || 0}
            change="+12%"
            color="text-blue-600"
            darkMode={darkMode}
          />
          <StatCard
            icon={<Eye className="w-6 h-6" />}
            title="Visitas"
            value="2,543"
            change="+8%"
            color="text-green-600"
            darkMode={darkMode}
          />
          <StatCard
            icon={<MousePointerClick className="w-6 h-6" />}
            title="Conversion"
            value="3.2%"
            change="-2%"
            color="text-orange-600"
            isNegativeGood={true}
            darkMode={darkMode}
          />
          <StatCard
            icon={<Target className="w-6 h-6" />}
            title="Tasa Clic"
            value="1.8%"
            change="+5%"
            color="text-purple-600"
            darkMode={darkMode}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard title="Tráfico del Sitio" darkMode={darkMode}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData?.traffic || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke={config.theme.primary} 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Leads por Servicio" darkMode={darkMode}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData?.leadsByService || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="service" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill={config.theme.secondary} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Dispositivos" darkMode={darkMode}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData?.devices || []}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {(analyticsData?.devices || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Fuentes de Tráfico" darkMode={darkMode}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData?.sources || []}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {(analyticsData?.sources || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Recent Leads Table */}
        <div className={`rounded-xl shadow-sm border p-6 transition-colors duration-300 ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Leads Recientes</h2>
            <span className={`text-sm transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>{leads.length} total</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <th className={`text-left py-3 px-4 text-sm font-semibold transition-colors duration-300 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Nombre</th>
                  <th className={`text-left py-3 px-4 text-sm font-semibold transition-colors duration-300 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Contacto</th>
                  <th className={`text-left py-3 px-4 text-sm font-semibold transition-colors duration-300 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Servicio</th>
                  <th className={`text-left py-3 px-4 text-sm font-semibold transition-colors duration-300 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Mensaje</th>
                  <th className={`text-left py-3 px-4 text-sm font-semibold transition-colors duration-300 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className={`text-center py-8 transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      No hay leads registrados aún
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className={`border-b hover:bg-gray-50 transition-colors duration-300 ${
                      darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100'
                    }`}>
                      <td className={`py-3 px-4 text-sm font-medium transition-colors duration-300 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {lead.fields.Name}
                      </td>
                      <td className={`py-3 px-4 text-sm transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 cursor-pointer" />
                          {lead.fields.Email}
                        </div>
                      </td>
                      <td className={`py-3 px-4 text-sm transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {lead.fields.Service}
                      </td>
                      <td className={`py-3 px-4 text-sm transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {lead.fields.Message?.substring(0, 50)}...
                      </td>
                      <td className={`py-3 px-4 text-sm transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {formatDistanceToNow(new Date(lead.createdTime), { 
                          addSuffix: true, 
                          locale: es 
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Dark Mode Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleDarkMode}
        className={`fixed bottom-8 right-8 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all z-50 cursor-pointer ${
          darkMode 
            ? 'bg-gradient-to-br from-yellow-400 to-orange-500 hover:shadow-yellow-500/50' 
            : 'bg-gradient-to-br from-gray-800 to-gray-900 hover:shadow-gray-700/50'
        }`}
      >
        {darkMode ? (
          <Sun className="w-6 h-6 text-white" />
        ) : (
          <Moon className="w-6 h-6 text-white" />
        )}
      </motion.button>
    </div>
  );
}

// Componente de tarjeta de estadística
function StatCard({ icon, title, value, change, color, isNegativeGood = false, darkMode }: any) {
  const isPositive = change?.startsWith('+');
  const showPositive = isNegativeGood ? !isPositive : isPositive;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl shadow-sm border p-6 transition-colors duration-300 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          {icon}
        </div>
        <div className={`text-sm font-medium px-2 py-1 rounded ${
          showPositive 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {change}
        </div>
      </div>
      <h3 className={`text-gray-600 text-sm mt-4 transition-colors duration-300 ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>{title}</h3>
      <p className={`text-3xl font-bold mt-1 transition-colors duration-300 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}>{value}</p>
    </motion.div>
  );
}

// Componente de tarjeta de gráfico
function ChartCard({ title, children, darkMode }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl shadow-sm border p-6 transition-colors duration-300 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}
    >
      <h3 className={`text-lg font-bold mb-4 transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>{title}</h3>
      {children}
    </motion.div>
  );
}
