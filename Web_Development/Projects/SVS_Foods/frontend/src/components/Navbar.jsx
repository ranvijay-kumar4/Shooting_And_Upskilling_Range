import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User as UserIcon, LogOut, Menu, X, UtensilsCrossed } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) => `
    relative py-2 text-sm font-medium transition-colors duration-200
    ${isActive(path) ? 'text-brand-gold' : 'text-slate-300 hover:text-white'}
  `;

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-white/5 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-brand-gold/15 p-2 rounded-lg text-brand-gold group-hover:bg-brand-gold/25 transition-all duration-300">
            <UtensilsCrossed size={20} className="group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <span className="font-heading text-lg font-bold tracking-wider bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            SVS <span className="text-brand-gold">FOODS</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={linkClass('/')}>
            Home
            {isActive('/') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-gold rounded-full" />}
          </Link>
          <Link to="/menu" className={linkClass('/menu')}>
            Menu
            {isActive('/menu') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-gold rounded-full" />}
          </Link>
          
          {/* Role specific links */}
          {user && user.role === 'user' && (
            <Link to="/dashboard" className={linkClass('/dashboard')}>
              Dashboard
              {isActive('/dashboard') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-gold rounded-full" />}
            </Link>
          )}

          {user && user.role === 'admin' && (
            <Link to="/admin" className={linkClass('/admin')}>
              Admin Panel
              {isActive('/admin') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-gold rounded-full" />}
            </Link>
          )}

          {user && user.role === 'delivery' && (
            <Link to="/delivery" className={linkClass('/delivery')}>
              Delivery Panel
              {isActive('/delivery') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-gold rounded-full" />}
            </Link>
          )}
        </div>

        {/* Desktop Auth and Cart Actions */}
        <div className="hidden md:flex items-center gap-6">
          {/* Cart Icon */}
          <Link to="/cart" className="relative p-2 text-slate-300 hover:text-brand-gold transition-colors duration-200">
            <ShoppingCart size={22} />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-orange text-[10px] font-bold text-white ring-2 ring-brand-bg">
                {cartItemsCount}
              </span>
            )}
          </Link>

          {/* User profile / Login */}
          {user ? (
            <div className="flex items-center gap-4 pl-4 border-l border-white/10">
              <Link to="/dashboard" className="flex items-center gap-2 group cursor-pointer hover:opacity-90">
                <div className="h-8 w-8 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold ring-1 ring-brand-gold/30 group-hover:bg-brand-gold group-hover:text-brand-bg transition-all duration-300">
                  <UserIcon size={16} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-semibold text-slate-200 max-w-[120px] truncate group-hover:text-brand-gold transition-colors">{user.name}</span>
                  <span className="text-[10px] text-brand-gold font-mono uppercase tracking-widest">{user.role}</span>
                </div>
              </Link>
              <button 
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-400 transition-colors duration-200"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4 pl-4 border-l border-white/10">
              <Link to="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200">
                Log In
              </Link>
              <Link to="/register" className="btn-gold text-sm py-1.5 px-4 font-semibold">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <Link to="/cart" className="relative p-2 text-slate-300 hover:text-brand-gold transition-colors duration-200">
            <ShoppingCart size={20} />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-brand-orange text-[9px] font-bold text-white">
                {cartItemsCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white transition-colors duration-200"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[65px] left-0 w-full glass border-b border-white/5 py-4 px-6 flex flex-col gap-4 animate-fade-in">
          <Link 
            to="/" 
            className={`text-base font-medium py-2 ${isActive('/') ? 'text-brand-gold' : 'text-slate-300'}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/menu" 
            className={`text-base font-medium py-2 ${isActive('/menu') ? 'text-brand-gold' : 'text-slate-300'}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Menu
          </Link>
          
          {user && user.role === 'admin' && (
            <Link 
              to="/admin" 
              className={`text-base font-medium py-2 ${isActive('/admin') ? 'text-brand-gold' : 'text-slate-300'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin Panel
            </Link>
          )}

          {user && user.role === 'delivery' && (
            <Link 
              to="/delivery" 
              className={`text-base font-medium py-2 ${isActive('/delivery') ? 'text-brand-gold' : 'text-slate-300'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Delivery Panel
            </Link>
          )}

          {user ? (
            <div className="border-t border-white/5 pt-4 mt-2 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold">
                  <UserIcon size={18} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-200">{user.name}</div>
                  <div className="text-[10px] text-brand-gold font-mono uppercase tracking-widest">{user.role}</div>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 py-2 text-sm text-red-400 font-semibold text-left"
              >
                <LogOut size={16} />
                Log Out
              </button>
            </div>
          ) : (
            <div className="border-t border-white/5 pt-4 mt-2 flex flex-col gap-3">
              <Link 
                to="/login" 
                className="text-center text-sm font-semibold text-slate-300 hover:text-white py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log In
              </Link>
              <Link 
                to="/register" 
                className="btn-gold text-center text-sm font-semibold py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
