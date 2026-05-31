import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, Loader2, Sparkles } from 'lucide-react';

const Login = () => {
  const { login, forgotPassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Forgot password sub-state
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter all credentials');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await login(email, password, rememberMe);
      navigate(redirect);
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (!forgotEmail) return;

    try {
      setForgotLoading(true);
      setForgotSuccess(null);
      await forgotPassword(forgotEmail);
      setForgotSuccess('A secure password reset link has been dispatched to your email address!');
    } catch (err) {
      setError(err.message || 'Forgot password failed');
    } finally {
      setForgotLoading(false);
    }
  };

  // Helper shortcuts to autofill credentials for tester convenience
  const fillCredentials = (role) => {
    if (role === 'admin') {
      setEmail('admin@svsfoods.com');
      setPassword('admin123');
    } else if (role === 'delivery') {
      setEmail('delivery@svsfoods.com');
      setPassword('delivery123');
    } else {
      setEmail('user@svsfoods.com');
      setPassword('user123');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-brand-bg text-brand-text p-6">
      <div className="w-full max-w-md glass border border-white/5 p-8 rounded-3xl space-y-6 relative overflow-hidden">
        
        {/* Banner blur background */}
        <div className="absolute -top-10 -right-10 h-28 w-28 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />

        {/* Normal Login Mode */}
        {!forgotOpen ? (
          <>
            <div className="text-center space-y-1">
              <h2 className="font-heading text-2xl font-bold text-white">Welcome Back</h2>
              <p className="text-brand-muted text-xs">Log in to check out your cart and track orders.</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs font-semibold text-left">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-brand-muted tracking-widest uppercase flex items-center gap-1">
                  <Mail size={12} className="text-brand-gold" /> Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  required
                  className="w-full bg-brand-bg text-slate-100 placeholder-slate-500 rounded-xl px-4 py-2.5 text-xs border border-white/5 focus:outline-none focus:border-brand-gold/50 transition-colors"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-brand-muted tracking-widest uppercase flex items-center gap-1">
                  <Lock size={12} className="text-brand-gold" /> Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-brand-bg text-slate-100 placeholder-slate-500 rounded-xl px-4 py-2.5 text-xs border border-white/5 focus:outline-none focus:border-brand-gold/50 transition-colors"
                />
              </div>

              {/* Remember Me and Forgot Password links */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-brand-muted cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-white/5 bg-brand-bg text-brand-gold focus:ring-brand-gold focus:ring-offset-brand-bg"
                  />
                  <span>Remember me (7 days)</span>
                </label>
                <button
                  type="button"
                  onClick={() => setForgotOpen(true)}
                  className="text-brand-gold hover:text-brand-orange transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full py-2.5 text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 mt-2"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : 'LOG IN'}
              </button>
            </form>

            {/* Test Shortcut Credentials */}
            <div className="border-t border-white/5 pt-4 space-y-2 text-left">
              <span className="text-[10px] font-bold text-brand-muted tracking-widest uppercase flex items-center gap-1.5">
                <Sparkles size={12} className="text-brand-gold" /> Quick testing login presets:
              </span>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => fillCredentials('user')}
                  className="text-[9px] font-semibold bg-white/5 border border-white/10 hover:border-brand-gold text-slate-300 px-2 py-1 rounded-md transition-colors"
                >
                  User Preset
                </button>
                <button 
                  onClick={() => fillCredentials('admin')}
                  className="text-[9px] font-semibold bg-white/5 border border-white/10 hover:border-brand-gold text-slate-300 px-2 py-1 rounded-md transition-colors"
                >
                  Admin Preset
                </button>
                <button 
                  onClick={() => fillCredentials('delivery')}
                  className="text-[9px] font-semibold bg-white/5 border border-white/10 hover:border-brand-gold text-slate-300 px-2 py-1 rounded-md transition-colors"
                >
                  Delivery Preset
                </button>
              </div>
            </div>

            <div className="text-center text-xs text-brand-muted mt-4">
              Don't have an account?{' '}
              <Link to="/register" className="text-brand-gold hover:underline">
                Create one
              </Link>
            </div>
          </>
        ) : (
          /* Forgot Password Panel Mode */
          <>
            <div className="text-center space-y-1">
              <h2 className="font-heading text-2xl font-bold text-white">Reset Password</h2>
              <p className="text-brand-muted text-xs">Enter your email and we'll send you a recovery link.</p>
            </div>

            {forgotSuccess && (
              <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-3 rounded-xl text-xs font-semibold text-left">
                {forgotSuccess}
              </div>
            )}

            <form onSubmit={handleForgotSubmit} className="space-y-4 text-left">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-brand-muted tracking-widest uppercase flex items-center gap-1">
                  <Mail size={12} className="text-brand-gold" /> Email Address
                </label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="name@email.com"
                  required
                  className="w-full bg-brand-bg text-slate-100 placeholder-slate-500 rounded-xl px-4 py-2.5 text-xs border border-white/5 focus:outline-none focus:border-brand-gold/50 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={forgotLoading}
                className="btn-gold w-full py-2.5 text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 mt-2"
              >
                {forgotLoading ? <Loader2 size={14} className="animate-spin" /> : 'SEND LINK'}
              </button>

              <button
                type="button"
                onClick={() => { setForgotOpen(false); setForgotSuccess(null); }}
                className="w-full bg-white/5 hover:bg-white/10 text-slate-300 py-2.5 rounded-xl text-xs font-bold uppercase transition-colors"
              >
                Back to Login
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
};

export default Login;
