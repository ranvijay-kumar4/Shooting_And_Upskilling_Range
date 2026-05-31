import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Components
import Navbar from './components/Navbar';
import ChatbotWidget from './components/ChatbotWidget';

// Pages - Dynamic React.lazy route code-splits for optimized chunk performance
const Home = React.lazy(() => import('./pages/Home'));
const Menu = React.lazy(() => import('./pages/Menu'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const ResetPassword = React.lazy(() => import('./pages/ResetPassword'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const DeliveryDashboard = React.lazy(() => import('./pages/DeliveryDashboard'));
const UserDashboard = React.lazy(() => import('./pages/UserDashboard'));

import { Loader2 } from 'lucide-react';

// Route Guard for authenticated roles
const RoleGuard = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-4">
        <Loader2 className="animate-spin text-brand-gold" size={36} />
        <span className="text-brand-muted text-sm font-semibold">Authorizing session...</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col justify-between font-sans selection:bg-brand-gold/30 selection:text-white">
            
            {/* Sticky Header */}
            <Navbar />

            {/* Main Page Layout */}
            <main className="flex-grow">
              <React.Suspense fallback={
                <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-4">
                  <Loader2 className="animate-spin text-brand-gold" size={36} />
                  <span className="text-brand-muted text-xs font-semibold tracking-wider uppercase">Loading gourmet experience...</span>
                </div>
              }>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/reset-password/:token" element={<ResetPassword />} />

                  {/* Role Protected Dashboard Routes */}
                  <Route 
                    path="/dashboard" 
                    element={
                      <RoleGuard allowedRoles={['user', 'admin', 'delivery']}>
                        <UserDashboard />
                      </RoleGuard>
                    } 
                  />

                  <Route 
                    path="/admin" 
                    element={
                      <RoleGuard allowedRoles={['admin']}>
                        <AdminDashboard />
                      </RoleGuard>
                    } 
                  />
                  
                  <Route 
                    path="/delivery" 
                    element={
                      <RoleGuard allowedRoles={['delivery']}>
                        <DeliveryDashboard />
                      </RoleGuard>
                    } 
                  />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </React.Suspense>
            </main>

            {/* Elite Culinary Footer */}
            <footer className="bg-brand-card/50 border-t border-brand-border py-8 px-4 text-center text-xs text-brand-muted">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-1 font-heading font-semibold text-white tracking-wider">
                  <span>SVS</span><span className="text-brand-gold font-bold">FOOD COMPANY</span>
                </div>
                <p>&copy; 2026 SVS Food Company. All rights reserved. Designed for elite culinary experiences.</p>
                <div className="flex gap-4">
                  <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
                  <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
                </div>
              </div>
            </footer>

            {/* Floating Gemini AI Concierge Widget */}
            <ChatbotWidget />

          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
