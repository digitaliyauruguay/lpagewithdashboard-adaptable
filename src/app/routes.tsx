// ============================================
// ROUTES CONFIGURATION
// ============================================
// React Router setup con Landing, Login y Dashboard

import { createBrowserRouter, Navigate } from 'react-router';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import ExperimentalLanding from './components/ExperimentalLanding.jsx';
import OptimizedExperimental from './components/OptimizedExperimental.jsx';
import UltraOptimized from './components/UltraOptimized.jsx';
import ParadigmShifter from './components/ParadigmShifter.jsx';
import EnterpriseLanding from './components/EnterpriseLanding.jsx';
import VetGroomingLanding from './components/VetGroomingLanding.jsx';
import IntegratedVetGrooming from './components/IntegratedVetGrooming.jsx';
import ProductionReadyVetGrooming from './components/ProductionReadyVetGrooming.jsx';
import { isAuthenticated } from '../lib/auth';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductionReadyVetGrooming />,
  },
  {
    path: "/experimental",
    element: <ExperimentalLanding />,
  },
  {
    path: "/optimized",
    element: <OptimizedExperimental />,
  },
  {
    path: "/ultra",
    element: <UltraOptimized />,
  },
  {
    path: "/paradigm",
    element: <ParadigmShifter />,
  },
  {
    path: "/enterprise",
    element: <EnterpriseLanding />,
  },
  {
    path: "/vetgrooming",
    element: <VetGroomingLanding />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
