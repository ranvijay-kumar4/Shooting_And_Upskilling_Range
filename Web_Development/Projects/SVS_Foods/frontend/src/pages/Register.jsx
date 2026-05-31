import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User as UserIcon, Mail, Lock, UserCheck, Loader2 } from 'lucide-react';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // default is user, dropdown makes testing roles easy!
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all credentials.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await register(name, email, password, role);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-brand-bg text-brand-text p-6">
      <div className="w-full max-w-md glass border border-white/5 p-8 rounded-3xl space-y-6 relative overflow-hidden">
        
        <div className="absolute -top-10 -right-10 h-28 w-28 bg-brand-orange/10 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center space-y-1">
          <h2 className="font-heading text-2xl font-bold text-white">Create Account</h2>
          <p className="text-brand-muted text-xs">Join SVS Food Company to unlock culinary masterclasses.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs font-semibold text-left">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-brand-muted tracking-widest uppercase flex items-center gap-1">
              <UserIcon size={12} className="text-brand-gold" /> Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              className="w-full bg-brand-bg text-slate-100 placeholder-slate-500 rounded-xl px-4 py-2.5 text-xs border border-white/5 focus:outline-none focus:border-brand-gold/50 transition-colors"
            />
          </div>

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

          {/* Role selection dropdown */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-brand-muted tracking-widest uppercase flex items-center gap-1">
              <UserCheck size={12} className="text-brand-gold" /> Account Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-brand-bg text-slate-100 rounded-xl px-4 py-2.5 text-xs border border-white/5 focus:outline-none focus:border-brand-gold/50 transition-colors cursor-pointer"
            >
              <option value="user">User (Order & View deliveries)</option>
              <option value="admin">Admin (Manage Menu & Orders)</option>
              <option value="delivery">Delivery Agent (Update order dispatch status)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full py-2.5 text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 mt-2"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : 'REGISTER'}
          </button>
        </form>

        <div className="text-center text-xs text-brand-muted mt-4">
          Already registered?{' '}
          <Link to="/login" className="text-brand-gold hover:underline">
            Log in here
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Register;
