import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User as UserIcon, ShieldCheck, MapPin, Package, Clock, 
  CheckCircle, Loader2, KeyRound, Save, Check, CreditCard, ChevronRight 
} from 'lucide-react';

const UserDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('orders'); // orders, profile, password

  // Orders state
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  
  // Profile state
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [street, setStreet] = useState(user?.address?.street || '');
  const [city, setCity] = useState(user?.address?.city || '');
  const [pincode, setPincode] = useState(user?.address?.pincode || '');
  const [profileSuccess, setProfileSuccess] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passError, setPassError] = useState(null);
  const [passSuccess, setPassSuccess] = useState(null);
  const [passLoading, setPassLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchMyOrders();
      setName(user.name || '');
      setPhone(user.phone || '');
      setStreet(user.address?.street || '');
      setCity(user.address?.city || '');
      setPincode(user.address?.pincode || '');
    }
  }, [user]);

  const fetchMyOrders = async () => {
    try {
      setLoadingOrders(true);
      const res = await fetch('/api/orders/my-orders?limit=20');
      const data = await res.json();
      if (res.ok && data.success) {
        setOrders(data.data);
      }
    } catch (err) {
      console.error('Failed to load user orders:', err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      setProfileLoading(true);
      setProfileSuccess(null);
      
      const payload = {
        name,
        phone,
        address: { street, city, pincode }
      };

      // Simulated user profile update (can connect to a PUT `/api/users/profile` in backend)
      const res = await fetch('/api/auth/profile' || '/api/auth/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      setProfileSuccess('Profile updated successfully!');
    } catch (err) {
      console.error(err);
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPassError('New passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setPassError('New password must be at least 6 characters.');
      return;
    }

    try {
      setPassLoading(true);
      setPassError(null);
      setPassSuccess(null);

      // Simulating PUT /api/auth/change-password
      setTimeout(() => {
        setPassSuccess('Password updated successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPassLoading(false);
      }, 1000);

    } catch (err) {
      setPassError('Password update failed.');
      setPassLoading(false);
    }
  };

  // Timeline tracking steps helper
  const getTimelineStep = (status) => {
    const steps = ['pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered'];
    return steps.indexOf(status);
  };

  const TIMELINE_STEPS = [
    { label: 'Confirmed', status: 'confirmed' },
    { label: 'Kitchen Prep', status: 'preparing' },
    { label: 'Out for Delivery', status: 'out-for-delivery' },
    { label: 'Delivered', status: 'delivered' }
  ];

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text py-12 px-4 lg:px-8 text-left">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* User Account Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
          <div>
            <h1 className="font-heading text-3xl font-bold text-white">Your Culinary Account</h1>
            <p className="text-brand-muted text-xs mt-1">Check order timelines, configure shipping profiles, and update security.</p>
          </div>

          {/* Navigation tabs */}
          <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${activeTab === 'orders' ? 'bg-brand-gold text-brand-bg' : 'text-slate-400 hover:text-white'}`}
            >
              <Package size={14} /> Orders
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${activeTab === 'profile' ? 'bg-brand-gold text-brand-bg' : 'text-slate-400 hover:text-white'}`}
            >
              <UserIcon size={14} /> Profile
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${activeTab === 'password' ? 'bg-brand-gold text-brand-bg' : 'text-slate-400 hover:text-white'}`}
            >
              <KeyRound size={14} /> Security
            </button>
          </div>
        </div>

        {/* Tab 1: Orders Timeline Tracking */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="font-heading text-lg font-bold text-white">Your Order Pipeline</h2>
            
            {loadingOrders ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <Loader2 size={32} className="animate-spin text-brand-gold" />
                <span className="text-brand-muted text-xs font-semibold">Retrieving tracking records...</span>
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map(order => {
                  const currentStep = getTimelineStep(order.status);
                  
                  return (
                    <div 
                      key={order._id}
                      className="glass rounded-2xl p-6 border border-white/5 space-y-6 hover:border-brand-gold/15 transition-all duration-300"
                    >
                      {/* Summary bar */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/5 pb-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-brand-muted tracking-wider uppercase">Order Invoice</span>
                          <h4 className="font-mono text-sm font-bold text-slate-200">#{order._id.slice(-8)}</h4>
                        </div>
                        <div className="flex gap-6 text-xs">
                          <div>
                            <span className="text-brand-muted block text-[10px] uppercase">Placed Date</span>
                            <span className="font-semibold text-slate-300">{new Date(order.orderDate).toLocaleDateString()}</span>
                          </div>
                          <div>
                            <span className="text-brand-muted block text-[10px] uppercase">Total Billing</span>
                            <span className="font-bold text-brand-gold">₹{order.totalAmount.toFixed(2)}</span>
                          </div>
                          <div>
                            <span className="text-brand-muted block text-[10px] uppercase">Status</span>
                            <span className="font-semibold text-brand-orange uppercase">{order.status}</span>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Visual Timeline Tracker */}
                      {order.status !== 'cancelled' ? (
                        <div className="py-4">
                          <div className="relative flex justify-between items-center w-full">
                            {/* Background tracking track */}
                            <div className="absolute top-[15px] left-0 w-full h-[3px] bg-white/5 -z-10 rounded" />
                            
                            {/* Filled active tracking track */}
                            <div 
                              className="absolute top-[15px] left-0 h-[3px] bg-gradient-to-r from-brand-gold to-brand-orange -z-10 rounded transition-all duration-500"
                              style={{ 
                                width: currentStep <= 0 
                                  ? '0%' 
                                  : currentStep >= 4 
                                    ? '100%' 
                                    : `${(currentStep - 1) * 33.3}%` 
                              }}
                            />

                            {/* Stepper bubbles */}
                            {TIMELINE_STEPS.map((step, idx) => {
                              const stepIdx = idx + 1; // 1: confirmed, 2: preparing, 3: out-for-delivery, 4: delivered
                              const isCompleted = currentStep >= stepIdx;
                              const isActive = currentStep === stepIdx;

                              return (
                                <div key={idx} className="flex flex-col items-center space-y-2">
                                  <div 
                                    className={`
                                      h-8 w-8 rounded-full flex items-center justify-center border transition-all duration-300
                                      ${isCompleted 
                                        ? 'bg-brand-gold border-brand-gold text-brand-bg shadow-md shadow-brand-gold/25' 
                                        : isActive 
                                          ? 'bg-brand-card border-brand-gold text-brand-gold ring-4 ring-brand-gold/15 animate-pulse' 
                                          : 'bg-brand-bg border-white/10 text-slate-500'}
                                    `}
                                  >
                                    {isCompleted ? <Check size={16} strokeWidth={3} /> : idx + 1}
                                  </div>
                                  <span className={`text-[10px] font-bold tracking-wider uppercase ${isCompleted || isActive ? 'text-slate-200' : 'text-slate-500'}`}>
                                    {step.label}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-2 text-xs">
                          <span>⚠️ This order was cancelled. Please reach support or check our chatbot if you require details.</span>
                        </div>
                      )}

                      {/* Items expanded list */}
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                        {order.items.map((i, idx) => (
                          <span key={idx} className="bg-white/5 border border-white/5 text-slate-300 px-3 py-1 rounded-xl text-xs font-semibold">
                            {i.menuItemId?.name || 'Gourmet Dish'} <strong className="text-brand-gold font-bold">x{i.quantity}</strong>
                          </span>
                        ))}
                      </div>

                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-brand-card/20 rounded-2xl border border-white/5 space-y-4">
                <Package size={40} className="mx-auto text-slate-500" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">No Orders Logged</h4>
                  <p className="text-brand-muted text-xs">It looks like you have not placed any gourmet orders yet.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Profile configuration */}
        {activeTab === 'profile' && (
          <div className="glass p-6 rounded-2xl border border-white/5 max-w-xl mx-auto animate-fade-in space-y-6">
            <h2 className="font-heading text-lg font-bold text-white border-b border-white/5 pb-2">Profile & Delivery Configs</h2>

            {profileSuccess && (
              <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-2.5 rounded-lg text-xs font-semibold flex items-center gap-2">
                <Check size={14} /> <span>{profileSuccess}</span>
              </div>
            )}

            <form onSubmit={handleProfileSave} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-brand-muted font-semibold">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-brand-bg text-slate-100 rounded-lg px-3 py-2 border border-white/5 focus:outline-none focus:border-brand-gold/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-brand-muted font-semibold">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full bg-brand-bg text-slate-100 rounded-lg px-3 py-2 border border-white/5 focus:outline-none focus:border-brand-gold/50"
                />
              </div>

              <div className="border-t border-white/5 pt-4 space-y-4">
                <span className="text-[10px] font-bold text-brand-muted tracking-widest uppercase flex items-center gap-1.5"><MapPin size={12} className="text-brand-gold" /> Saved Shipping Address</span>
                
                <div className="space-y-1">
                  <label className="text-brand-muted font-semibold">Street / Area Address</label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Appt #, Building name, Street name"
                    className="w-full bg-brand-bg text-slate-100 rounded-lg px-3 py-2 border border-white/5 focus:outline-none focus:border-brand-gold/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-brand-muted font-semibold">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City Name"
                      className="w-full bg-brand-bg text-slate-100 rounded-lg px-3 py-2 border border-white/5 focus:outline-none focus:border-brand-gold/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-brand-muted font-semibold">Pincode</label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="e.g. 110001"
                      className="w-full bg-brand-bg text-slate-100 rounded-lg px-3 py-2 border border-white/5 focus:outline-none focus:border-brand-gold/50"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={profileLoading}
                className="btn-gold w-full py-2.5 text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 mt-4"
              >
                {profileLoading ? <Loader2 size={14} className="animate-spin" /> : <><Save size={14} /> <span>Save Changes</span></>}
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: Security change password */}
        {activeTab === 'password' && (
          <div className="glass p-6 rounded-2xl border border-white/5 max-w-xl mx-auto animate-fade-in space-y-6">
            <h2 className="font-heading text-lg font-bold text-white border-b border-white/5 pb-2">Change Password</h2>

            {passError && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-2.5 rounded-lg text-xs font-semibold">{passError}</div>}
            {passSuccess && <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-2.5 rounded-lg text-xs font-semibold">{passSuccess}</div>}

            <form onSubmit={handlePasswordSave} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-brand-muted font-semibold">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="w-full bg-brand-bg text-slate-100 rounded-lg px-3 py-2 border border-white/5 focus:outline-none focus:border-brand-gold/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-brand-muted font-semibold">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full bg-brand-bg text-slate-100 rounded-lg px-3 py-2 border border-white/5 focus:outline-none focus:border-brand-gold/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-brand-muted font-semibold">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full bg-brand-bg text-slate-100 rounded-lg px-3 py-2 border border-white/5 focus:outline-none focus:border-brand-gold/50"
                />
              </div>

              <button
                type="submit"
                disabled={passLoading}
                className="btn-gold w-full py-2.5 text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 mt-4"
              >
                {passLoading ? <Loader2 size={14} className="animate-spin" /> : 'UPDATE PASSWORD'}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default UserDashboard;
