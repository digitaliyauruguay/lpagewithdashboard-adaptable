// ============================================
// ROUTES CONFIGURATION
// ============================================
// React Router setup con Landing, Login y Dashboard

import { createBrowserRouter, Navigate } from 'react-router';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
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
