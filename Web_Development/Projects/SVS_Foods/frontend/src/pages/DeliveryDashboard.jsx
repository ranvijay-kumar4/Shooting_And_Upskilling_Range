import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Loader2, Truck, Package, CheckCircle, MapPin, RefreshCw, AlertCircle, CalendarRange } from 'lucide-react';

const DeliveryDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not delivery role
  useEffect(() => {
    if (user && user.role !== 'delivery') {
      navigate('/');
    }
  }, [user]);

  const [activeTab, setActiveTab] = useState('assigned'); // assigned, completed
  const [activeOrders, setActiveOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDeliveries();
  }, [activeTab]);

  const fetchDeliveries = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (activeTab === 'assigned') {
        // Request active orders only
        const res = await fetch('/api/orders?activeOnly=true');
        const data = await res.json();
        if (res.ok && data.success) {
          setActiveOrders(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch deliveries.');
        }
      } else {
        // Fetch historical delivered orders (simulate or query from database)
        const res = await fetch('/api/orders?status=delivered');
        const data = await res.json();
        if (res.ok && data.success) {
          setCompletedOrders(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch delivered logs.');
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        // Refresh delivery list
        fetchDeliveries();
      } else {
        alert(data.message || 'Status transition denied.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text py-12 px-4 lg:px-8 text-left">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Truck size={28} className="text-brand-gold animate-bounce" /> Delivery Rider Station
            </h1>
            <p className="text-brand-muted text-xs mt-1">Access routing sheets, check customer PIN codes, and dispatch cargo deliveries.</p>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('assigned')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${activeTab === 'assigned' ? 'bg-brand-gold text-brand-bg' : 'bg-white/5 text-slate-400 hover:text-white'}`}
            >
              Assigned Route ({activeOrders.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${activeTab === 'completed' ? 'bg-brand-gold text-brand-bg' : 'bg-white/5 text-slate-400 hover:text-white'}`}
            >
              Today's Completed
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="animate-spin text-brand-gold" size={32} />
            <span className="text-brand-muted text-xs font-semibold">Aligning maps and cargo manifests...</span>
          </div>
        ) : activeTab === 'assigned' ? (
          /* ASSIGNED ORDERS */
          activeOrders.length > 0 ? (
            <div className="space-y-6 animate-fade-in">
              {activeOrders.map(order => (
                <div 
                  key={order._id} 
                  className="glass rounded-2xl p-6 border border-white/5 flex flex-col md:flex-row justify-between gap-6 items-start md:items-center hover:border-brand-gold/15 transition-all duration-300 animate-slide-up"
                >
                  {/* Details Column */}
                  <div className="space-y-4 text-left flex-grow">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-sm text-slate-300">#{order._id.slice(-8)}</span>
                      <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider
                        ${order.status === 'preparing' ? 'bg-orange-500/15 text-brand-orange border border-brand-orange/20' : 'bg-blue-500/15 text-blue-400 border border-blue-400/20'}
                      `}>
                        {order.status}
                      </span>
                    </div>

                    {/* Address */}
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-brand-muted tracking-widest uppercase flex items-center gap-1">
                        <MapPin size={12} className="text-brand-gold" /> Delivery Destination
                      </div>
                      <p className="text-slate-200 text-sm font-semibold">
                        {typeof order.deliveryAddress === 'object' ? `${order.deliveryAddress.street}, ${order.deliveryAddress.city} - ${order.deliveryAddress.pincode}` : order.deliveryAddress}
                      </p>
                      <span className="text-xs text-brand-muted block">Client: {order.userId?.name || 'Guest'} ({order.userId?.email})</span>
                    </div>

                    {/* Items Summary */}
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-brand-muted tracking-widest uppercase flex items-center gap-1">
                        <Package size={12} className="text-brand-gold" /> Cargo Contents
                      </div>
                      <div className="flex flex-wrap gap-2 pt-0.5">
                        {order.items.map((item, idx) => (
                          <span key={idx} className="bg-white/5 border border-white/5 text-slate-300 px-2.5 py-1 rounded-lg text-xs font-semibold">
                            {item.menuItemId?.name || item.name || 'Gourmet Dish'} <strong className="text-brand-gold font-bold">x{item.quantity}</strong>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-brand-muted">
                      Billing Amount: <strong className="text-brand-gold font-bold">₹{order.totalAmount.toFixed(2)}</strong> ({order.paymentMethod?.toUpperCase()})
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 w-full md:w-auto justify-end">
                    {order.status === 'preparing' || order.status === 'confirmed' || order.status === 'pending' ? (
                      <button
                        onClick={() => handleUpdateStatus(order._id, 'out-for-delivery')}
                        className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold py-2.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-colors duration-200 w-full md:w-44 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-orange/15 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Truck size={14} />
                        Start Delivery
                      </button>
                    ) : order.status === 'out-for-delivery' ? (
                      <button
                        onClick={() => handleUpdateStatus(order._id, 'delivered')}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-colors duration-200 w-full md:w-44 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-green-600/15 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <CheckCircle size={14} />
                        Mark Delivered
                      </button>
                    ) : null}
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-brand-card/10 rounded-2xl border border-white/5 space-y-3 animate-fade-in">
              <Truck size={36} className="mx-auto text-slate-500" />
              <div>
                <span className="text-slate-300 font-bold text-base block">All caught up!</span>
                <p className="text-brand-muted text-xs">There are no active assigned deliveries currently scheduled.</p>
              </div>
            </div>
          )
        ) : (
          /* COMPLETED DELIVERIES */
          completedOrders.length > 0 ? (
            <div className="space-y-6 animate-fade-in">
              {completedOrders.map(order => (
                <div 
                  key={order._id} 
                  className="glass rounded-2xl p-6 border border-white/5 flex flex-col md:flex-row justify-between gap-6 items-start md:items-center hover:border-brand-gold/10 transition-all duration-300"
                >
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-sm text-slate-300">#{order._id.slice(-8)}</span>
                      <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase bg-green-500/15 text-green-500 border border-green-500/20">
                        Delivered
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <div className="text-[9px] font-bold text-brand-muted uppercase tracking-widest flex items-center gap-1">
                        <MapPin size={10} className="text-brand-gold" /> Destination
                      </div>
                      <p className="text-slate-300 text-xs font-semibold">
                        {typeof order.deliveryAddress === 'object' ? `${order.deliveryAddress.street}, ${order.deliveryAddress.city}` : order.deliveryAddress}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {order.items.map((item, idx) => (
                        <span key={idx} className="bg-white/5 border border-white/5 text-slate-400 px-2 py-0.5 rounded text-[10px]">
                          {item.menuItemId?.name || item.name} (x{item.quantity})
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-right text-xs">
                    <span className="text-brand-gold font-extrabold block">₹{order.totalAmount.toFixed(2)}</span>
                    <span className="text-[9px] text-brand-muted uppercase font-mono block">Paid via {order.paymentMethod?.toUpperCase()}</span>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-brand-card/10 rounded-2xl border border-white/5 space-y-3 animate-fade-in">
              <CalendarRange size={36} className="mx-auto text-slate-500" />
              <div>
                <span className="text-slate-300 font-bold text-base block">No completed routes</span>
                <p className="text-brand-muted text-xs">Riders have not registered completed delivered routes today.</p>
              </div>
            </div>
          )
        )}

      </div>
    </div>
  );
};

export default DeliveryDashboard;
