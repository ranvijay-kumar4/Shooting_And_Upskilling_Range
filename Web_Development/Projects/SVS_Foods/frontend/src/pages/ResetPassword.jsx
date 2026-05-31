import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Loader2, CheckCircle2 } from 'lucide-react';

const ResetPassword = () => {
  const { token } = useParams();
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await resetPassword(token, password);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to reset password. The link may have expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-brand-bg text-brand-text p-6">
      <div className="w-full max-w-md glass border border-white/5 p-8 rounded-3xl space-y-6 relative overflow-hidden text-left">
        
        {success ? (
          <div className="space-y-6 text-center">
            <div className="mx-auto h-12 w-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
              <CheckCircle2 size={28} />
            </div>
            <div className="space-y-2">
              <h2 className="font-heading text-xl font-bold text-white">Password Updated</h2>
              <p className="text-brand-muted text-xs leading-relaxed">
                Your credentials have been successfully updated. You can now log in using your new password.
              </p>
            </div>
            <Link
              to="/login"
              className="btn-gold w-full text-center block text-xs py-2.5 font-bold uppercase tracking-wider"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center space-y-1">
              <h2 className="font-heading text-2xl font-bold text-white">Create New Password</h2>
              <p className="text-brand-muted text-xs">Enter your new secure password below to finalize recovery.</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-brand-muted tracking-widest uppercase flex items-center gap-1">
                  <Lock size={12} className="text-brand-gold" /> New Password
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

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-brand-muted tracking-widest uppercase flex items-center gap-1">
                  <Lock size={12} className="text-brand-gold" /> Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-brand-bg text-slate-100 placeholder-slate-500 rounded-xl px-4 py-2.5 text-xs border border-white/5 focus:outline-none focus:border-brand-gold/50 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full py-2.5 text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 mt-2"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : 'RESET PASSWORD'}
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
};

export default ResetPassword;
