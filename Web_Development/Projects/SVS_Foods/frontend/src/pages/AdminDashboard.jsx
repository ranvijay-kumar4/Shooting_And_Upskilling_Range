import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  DollarSign, ShoppingCart, Utensils, Loader2, Plus, 
  Edit, Trash2, Check, X, RefreshCw, Layers, Upload, FileImage, 
  LineChart, Users, TrendingUp, Sparkles 
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not admin
  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/');
    }
  }, [user]);

  const [activeTab, setActiveTab] = useState('overview'); // overview, menu, orders, users
  
  // Data lists
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  
  // Loaders
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Form State for Menu CRUD
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formCategory, setFormCategory] = useState('BURGERS');
  const [formImage, setFormImage] = useState('');
  const [formAvailable, setFormAvailable] = useState(true);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  // Cloudinary Mock Uploader State
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Users List State
  const [usersList, setUsersList] = useState([
    { email: 'admin@svsfoods.com', name: 'SVS Admin', role: 'admin', ordersCount: 4 },
    { email: 'delivery@svsfoods.com', name: 'Rohan Sharma', role: 'delivery', ordersCount: 0 },
    { email: 'user@svsfoods.com', name: 'Aarav Mehta', role: 'user', ordersCount: 12 },
    { email: '0201it221092@gmail.com', name: 'Ranvijay Kumar', role: 'user', ordersCount: 8 }
  ]);

  useEffect(() => {
    fetchMenuItems();
    fetchOrdersList();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoadingMenu(true);
      const res = await fetch('/api/menu?limit=100'); // Load all for administration list
      const data = await res.json();
      if (res.ok && data.success) {
        setMenuItems(data.data);
      }
    } catch (err) {
      console.error('Admin menu load error:', err);
    } finally {
      setLoadingMenu(false);
    }
  };

  const fetchOrdersList = async () => {
    try {
      setLoadingOrders(true);
      const res = await fetch('/api/orders?limit=100');
      const data = await res.json();
      if (res.ok && data.success) {
        setOrders(data.data);
      }
    } catch (err) {
      console.error('Admin orders load error:', err);
    } finally {
      setLoadingOrders(false);
    }
  };

  // Mock Cloudinary File Upload handler
  const handleCloudinaryMockUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);

    // Simulate Cloudinary upload ticks
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          // Set a premium high-quality mock Unsplash image
          const mockImages = [
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
            'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500',
            'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500',
            'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500'
          ];
          const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
          setFormImage(randomImage);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  // Menu Form Submissions
  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    const payload = {
      name: formName,
      description: formDescription,
      price: parseFloat(formPrice),
      category: formCategory,
      imageUrl: formImage || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
      isAvailable: formAvailable,
      preparationTime: 12
    };

    try {
      let res;
      if (isEditing) {
        res = await fetch(`/api/menu/${currentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch('/api/menu', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      const data = await res.json();
      if (res.ok && data.success) {
        setFormSuccess(isEditing ? 'Item updated successfully!' : 'New item created successfully!');
        resetForm();
        fetchMenuItems();
      } else {
        throw new Error(data.message || 'Operation failed');
      }
    } catch (err) {
      setFormError(err.message);
    }
  };

  const startEdit = (item) => {
    setIsEditing(true);
    setCurrentId(item._id);
    setFormName(item.name);
    setFormDescription(item.description);
    setFormPrice(item.price.toString());
    setFormCategory(item.category);
    setFormImage(item.imageUrl || '');
    setFormAvailable(item.isAvailable);
    setFormError(null);
    setFormSuccess(null);
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormName('');
    setFormDescription('');
    setFormPrice('');
    setFormCategory('BURGERS');
    setFormImage('');
    setFormAvailable(true);
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this gourmet item?')) return;
    try {
      const res = await fetch(`/api/menu/${itemId}`, { method: 'DELETE' });
      if (res.ok) {
        fetchMenuItems();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchOrdersList();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Compute stats
  const totalSales = orders
    .filter(o => o.status === 'delivered')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  // Modern High-End pure SVG Sales Chart Data Plotting
  const last7DaysSales = [
    { day: 'Mon', amount: 8400 },
    { day: 'Tue', amount: 9600 },
    { day: 'Wed', amount: 7200 },
    { day: 'Thu', amount: 11400 },
    { day: 'Fri', amount: 13900 },
    { day: 'Sat', amount: 18200 },
    { day: 'Sun', amount: 16800 }
  ];

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text py-12 px-4 lg:px-8 text-left">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
          <div>
            <h1 className="font-heading text-3xl font-bold text-white flex items-center gap-2">
              <Layers className="text-brand-gold animate-pulse" /> SVS Admin Center
            </h1>
            <p className="text-brand-muted text-xs mt-1">Configure gourmet menus, upload assets to Cloudinary, track client rosters, and monitor SVG charts.</p>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2">
            {['overview', 'menu', 'orders', 'users'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${activeTab === tab ? 'bg-brand-gold text-brand-bg shadow-md' : 'bg-white/5 text-slate-400 hover:text-white'}`}
              >
                {tab === 'menu' ? 'Menu CRUD' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Overview Panel */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              <div className="glass p-6 rounded-2xl border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Delivered Sales</span>
                  <h3 className="font-heading font-bold text-2xl text-white mt-1">₹{totalSales.toFixed(2)}</h3>
                </div>
                <div className="h-10 w-10 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center">
                  <DollarSign size={20} />
                </div>
              </div>

              <div className="glass p-6 rounded-2xl border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Invoices</span>
                  <h3 className="font-heading font-bold text-2xl text-white mt-1">{orders.length}</h3>
                </div>
                <div className="h-10 w-10 bg-brand-gold/10 text-brand-gold rounded-xl flex items-center justify-center">
                  <ShoppingCart size={20} />
                </div>
              </div>

              <div className="glass p-6 rounded-2xl border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Pending dispatches</span>
                  <h3 className="font-heading font-bold text-2xl text-brand-orange mt-1">{pendingOrders}</h3>
                </div>
                <div className="h-10 w-10 bg-brand-orange/10 text-brand-orange rounded-xl flex items-center justify-center">
                  <RefreshCw size={20} className="animate-spin" />
                </div>
              </div>

              <div className="glass p-6 rounded-2xl border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Client database</span>
                  <h3 className="font-heading font-bold text-2xl text-white mt-1">{usersList.length}</h3>
                </div>
                <div className="h-10 w-10 bg-slate-500/10 text-slate-300 rounded-xl flex items-center justify-center">
                  <Users size={20} />
                </div>
              </div>

            </div>

            {/* SVG SALES CHART & TRANSACTION LOGS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Responsive SVG 7-Day Sales Chart */}
              <div className="lg:col-span-2 glass p-6 rounded-3xl border border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-heading font-bold text-sm text-slate-200 flex items-center gap-1.5"><LineChart size={16} className="text-brand-gold" /> Weekly Sales Chart (last 7 days)</h3>
                  <span className="text-[10px] font-semibold text-green-400 flex items-center gap-1"><TrendingUp size={12} /> +18.4% Up</span>
                </div>
                
                {/* SVG Chart Plotting */}
                <div className="relative w-full aspect-[21/9] bg-brand-bg/50 rounded-2xl p-4 border border-white/5 overflow-hidden flex items-end">
                  <svg className="w-full h-full" viewBox="0 0 600 220" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="glowGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#e0a96d" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#e0a96d" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Y-axis gridlines */}
                    <line x1="0" y1="30" x2="600" y2="30" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
                    <line x1="0" y1="80" x2="600" y2="80" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
                    <line x1="0" y1="130" x2="600" y2="130" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
                    <line x1="0" y1="180" x2="600" y2="180" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />

                    {/* Gradient filled area path under curves */}
                    <path 
                      d="M 50 180 Q 130 160, 130 160 Q 210 175, 210 175 Q 290 145, 290 145 Q 370 120, 370 120 Q 450 65, 450 65 Q 530 85, 530 85 L 530 180 L 50 180 Z" 
                      fill="url(#glowGrad)" 
                    />

                    {/* Curve Line path */}
                    <path 
                      d="M 50 180 Q 130 160, 130 160 Q 210 175, 210 175 Q 290 145, 290 145 Q 370 120, 370 120 Q 450 65, 450 65 Q 530 85, 530 85" 
                      fill="none" 
                      stroke="#e0a96d" 
                      strokeWidth="3.5" 
                      strokeLinecap="round"
                    />

                    {/* Data Circles plot */}
                    <circle cx="50" cy="180" r="5" fill="#0a0a0d" stroke="#e0a96d" strokeWidth="2.5" />
                    <circle cx="130" cy="160" r="5" fill="#0a0a0d" stroke="#e0a96d" strokeWidth="2.5" />
                    <circle cx="210" cy="175" r="5" fill="#0a0a0d" stroke="#e0a96d" strokeWidth="2.5" />
                    <circle cx="290" cy="145" r="5" fill="#0a0a0d" stroke="#e0a96d" strokeWidth="2.5" />
                    <circle cx="370" cy="120" r="5" fill="#0a0a0d" stroke="#e0a96d" strokeWidth="2.5" />
                    <circle cx="450" cy="65" r="6" fill="#ff6b35" stroke="#fff" strokeWidth="2.5" />
                    <circle cx="530" cy="85" r="5" fill="#0a0a0d" stroke="#e0a96d" strokeWidth="2.5" />
                  </svg>
                  
                  {/* Axis values labels overlay */}
                  <div className="absolute bottom-2 left-0 w-full flex justify-between px-10 text-[9px] font-bold text-brand-muted uppercase font-mono">
                    <span>Mon (₹8.4k)</span>
                    <span>Tue (₹9.6k)</span>
                    <span>Wed (₹7.2k)</span>
                    <span>Thu (₹11.4k)</span>
                    <span>Fri (₹13.9k)</span>
                    <span>Sat (₹18.2k)</span>
                    <span>Sun (₹16.8k)</span>
                  </div>
                </div>
              </div>

              {/* Transactions logs lists */}
              <div className="glass p-6 rounded-3xl border border-white/5 space-y-4">
                <h3 className="font-heading font-bold text-sm text-slate-200">Recent dispatches</h3>
                <div className="divide-y divide-white/5 overflow-y-auto max-h-[220px] scrollbar-none pr-1">
                  {orders.slice(0, 5).map(order => (
                    <div key={order._id} className="py-2.5 flex justify-between items-center text-xs text-left">
                      <div>
                        <div className="font-semibold text-slate-200">Order #{order._id.slice(-8)}</div>
                        <span className="text-[10px] text-brand-muted">{order.userId?.name || 'Guest'} - {new Date(order.orderDate).toLocaleDateString()}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-brand-gold font-bold block">₹{order.totalAmount.toFixed(2)}</span>
                        <span className="text-[9px] text-slate-400 capitalize">{order.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: Menu CRUD Panel (incorporating Cloudinary upload mock) */}
        {activeTab === 'menu' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-fade-in">
            {/* Create/Edit Form */}
            <div className="glass p-6 rounded-2xl border border-white/5 space-y-4">
              <h3 className="font-heading font-bold text-base text-white border-b border-white/5 pb-2">
                {isEditing ? 'Edit Menu Item' : 'Add Gourmet Dish'}
              </h3>
              
              {formError && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-2.5 rounded-lg text-xs font-semibold">{formError}</div>}
              {formSuccess && <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-2.5 rounded-lg text-xs font-semibold">{formSuccess}</div>}

              <form onSubmit={handleMenuSubmit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-brand-muted font-semibold">Dish Name</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. SVS Ultimate Burger"
                    required
                    className="w-full bg-brand-bg text-slate-100 rounded-lg px-3 py-2 border border-white/5 focus:outline-none focus:border-brand-gold/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-brand-muted font-semibold">Description</label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Enter gourmet toppings..."
                    rows={3}
                    required
                    className="w-full bg-brand-bg text-slate-100 rounded-lg px-3 py-2 border border-white/5 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-brand-muted font-semibold">Price (₹)</label>
                    <input
                      type="number"
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      placeholder="e.g. 149"
                      required
                      className="w-full bg-brand-bg text-slate-100 rounded-lg px-3 py-2 border border-white/5 focus:outline-none focus:border-brand-gold/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-brand-muted font-semibold">Category</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full bg-brand-bg text-slate-100 rounded-lg px-3 py-2 border border-white/5 focus:outline-none focus:border-brand-gold/50 cursor-pointer"
                    >
                      <option value="BURGERS">Burgers</option>
                      <option value="SIDES">Sides & Fries</option>
                      <option value="BEVERAGES">Beverages</option>
                      <option value="NAAN & ROLLS">Naan & Rolls</option>
                      <option value="DIPS">Dips & Sauces</option>
                      <option value="DESSERTS">Desserts</option>
                      <option value="PARTY COMBOS">Party Combos</option>
                    </select>
                  </div>
                </div>

                {/* Cloudinary Mock image uploader */}
                <div className="space-y-2">
                  <label className="text-brand-muted font-semibold block">Dish Image Asset</label>
                  
                  {uploading ? (
                    <div className="border border-dashed border-brand-gold/30 rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-brand-gold/5">
                      <Loader2 className="animate-spin text-brand-gold" size={24} />
                      <span className="font-bold text-[10px] text-slate-300">Cloudinary Uploading: {uploadProgress}%</span>
                      <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                        <div className="bg-brand-gold h-full" style={{ width: `${uploadProgress}%` }} />
                      </div>
                    </div>
                  ) : formImage ? (
                    <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-[16/9]">
                      <img src={formImage} alt="Uploaded" className="w-full h-full object-cover" />
                      <button 
                        type="button" 
                        onClick={() => setFormImage('')}
                        className="absolute top-2 right-2 bg-black/85 p-1 rounded-full text-slate-400 hover:text-white"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <label className="border border-dashed border-white/10 hover:border-brand-gold/40 rounded-xl p-6 flex flex-col items-center justify-center gap-1.5 bg-white/[0.02] cursor-pointer transition-colors">
                      <Upload size={18} className="text-slate-400" />
                      <span className="font-bold text-[10px] text-slate-300">Upload asset to Cloudinary (free tier)</span>
                      <span className="text-[9px] text-brand-muted">PNG, JPG up to 5MB</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCloudinaryMockUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-2 select-none">
                  <input
                    type="checkbox"
                    id="isAvailable"
                    checked={formAvailable}
                    onChange={(e) => setFormAvailable(e.target.checked)}
                    className="rounded bg-brand-bg border-white/5 text-brand-gold focus:ring-brand-gold"
                  />
                  <label htmlFor="isAvailable" className="text-brand-muted font-semibold cursor-pointer">Available for order</label>
                </div>

                <div className="flex gap-2 pt-2">
                  <button type="submit" className="btn-gold flex-grow py-2 text-xs font-bold uppercase">
                    {isEditing ? 'Save Changes' : 'Create Dish'}
                  </button>
                  {isEditing && (
                    <button 
                      type="button" 
                      onClick={resetForm}
                      className="bg-white/5 hover:bg-white/10 text-slate-300 px-4 py-2.5 rounded-lg text-xs font-bold uppercase transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Dishes Inventory List */}
            <div className="lg:col-span-2 glass p-6 rounded-2xl border border-white/5 space-y-4">
              <h3 className="font-heading font-bold text-base text-white border-b border-white/5 pb-2">Menu Inventory ({menuItems.length} items)</h3>
              
              {loadingMenu ? (
                <div className="flex justify-center py-20"><Loader2 className="animate-spin text-brand-gold" size={24} /></div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-brand-muted pb-2 uppercase tracking-wider font-semibold">
                        <th className="py-2.5">Dish</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {menuItems.map(item => (
                        <tr key={item._id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3 font-semibold text-slate-200">{item.name}</td>
                          <td className="capitalize text-brand-muted">{item.category}</td>
                          <td className="text-brand-gold font-bold">₹{item.price.toFixed(2)}</td>
                          <td>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold ${item.isAvailable ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                              {item.isAvailable ? <Check size={10} /> : <X size={10} />}
                              {item.isAvailable ? 'Active' : 'Draft'}
                            </span>
                          </td>
                          <td className="text-right space-x-2">
                            <button 
                              onClick={() => startEdit(item)}
                              className="p-1.5 rounded bg-white/5 hover:bg-brand-gold/20 hover:text-brand-gold text-slate-400 transition-colors cursor-pointer"
                              title="Edit item"
                            >
                              <Edit size={12} />
                            </button>
                            <button 
                              onClick={() => handleDeleteItem(item._id)}
                              className="p-1.5 rounded bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-slate-400 transition-colors cursor-pointer"
                              title="Delete item"
                            >
                              <Trash2 size={12} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Order Controller Panel */}
        {activeTab === 'orders' && (
          <div className="glass p-6 rounded-2xl border border-white/5 space-y-4 animate-fade-in">
            <h3 className="font-heading font-bold text-base text-white border-b border-white/5 pb-2">Active Order Dispatches</h3>
            
            {loadingOrders ? (
              <div className="flex justify-center py-20"><Loader2 className="animate-spin text-brand-gold" size={24} /></div>
            ) : orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-brand-muted pb-2 uppercase tracking-wider font-semibold">
                      <th className="py-2.5">Order ID</th>
                      <th>Customer</th>
                      <th>Items Ordered</th>
                      <th>Delivery Address</th>
                      <th>Total Billing</th>
                      <th>Status State</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {orders.map(order => (
                      <tr key={order._id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 font-mono font-bold text-slate-300">#{order._id.slice(-8)}</td>
                        <td>
                          <div className="font-semibold text-slate-200">{order.userId?.name || 'Guest'}</div>
                          <span className="text-[10px] text-brand-muted">{order.userId?.email}</span>
                        </td>
                        <td>
                          <div className="max-w-[200px] truncate space-y-0.5">
                            {order.items.map((i, idx) => (
                              <span key={idx} className="block text-slate-300 font-medium">
                                {i.menuItemId?.name || i.name || 'Gourmet Dish'} (x{i.quantity})
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="max-w-[200px] truncate text-brand-muted" title={typeof order.deliveryAddress === 'object' ? `${order.deliveryAddress.street}, ${order.deliveryAddress.city}` : order.deliveryAddress}>
                          {typeof order.deliveryAddress === 'object' ? `${order.deliveryAddress.street}, ${order.deliveryAddress.city}` : order.deliveryAddress}
                        </td>
                        <td>
                          <span className="text-brand-gold font-bold block">₹{order.totalAmount.toFixed(2)}</span>
                          <span className="text-[10px] text-brand-muted">{order.paymentMethod?.toUpperCase()}</span>
                        </td>
                        <td>
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                            className="bg-brand-bg text-slate-100 rounded-lg px-2.5 py-1.5 border border-white/5 focus:outline-none font-semibold text-[11px] cursor-pointer"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="preparing">Preparing</option>
                            <option value="out-for-delivery">Out for Delivery</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-20 text-brand-muted text-xs">No customer orders have been logged yet.</div>
            )}
          </div>
        )}

        {/* Tab 4: Users database */}
        {activeTab === 'users' && (
          <div className="glass p-6 rounded-2xl border border-white/5 space-y-4 animate-fade-in text-left">
            <h3 className="font-heading font-bold text-base text-white border-b border-white/5 pb-2">Registered Accounts</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-brand-muted pb-2 uppercase tracking-wider font-semibold">
                    <th className="py-2.5">Name</th>
                    <th>Email Address</th>
                    <th>Account Role</th>
                    <th>Total Orders Checked</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {usersList.map((usr, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 font-semibold text-slate-200">{usr.name}</td>
                      <td className="text-slate-300 font-mono">{usr.email}</td>
                      <td>
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase font-mono tracking-widest ${usr.role === 'admin' ? 'bg-brand-gold/15 text-brand-gold border border-brand-gold/25' : usr.role === 'delivery' ? 'bg-brand-orange/15 text-brand-orange border border-brand-orange/25' : 'bg-white/5 text-slate-300 border border-white/5'}`}>
                          {usr.role}
                        </span>
                      </td>
                      <td className="font-bold text-slate-200 pl-4">{usr.ordersCount} orders</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
