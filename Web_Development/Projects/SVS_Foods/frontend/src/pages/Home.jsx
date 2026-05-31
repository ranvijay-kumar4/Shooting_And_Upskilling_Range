import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import MenuCard from '../components/MenuCard';
import { 
  ArrowRight, Flame, ShieldCheck, Truck, Star, Award, 
  Sparkles, ShieldAlert, Heart, Calendar, Compass, Cookie, CupSoda, Droplet,
  ChevronRight
} from 'lucide-react';

const CATEGORY_ITEMS = [
  { id: 'BURGERS', label: 'Burgers', icon: <Flame size={18} /> },
  { id: 'SIDES', label: 'Sides & Fries', icon: <Compass size={18} /> },
  { id: 'BEVERAGES', label: 'Beverages', icon: <CupSoda size={18} /> },
  { id: 'NAAN & ROLLS', label: 'Naan & Rolls', icon: <Sparkles size={18} /> },
  { id: 'DIPS', label: 'Dips & Sauces', icon: <Droplet size={18} /> },
  { id: 'DESSERTS', label: 'Desserts', icon: <Cookie size={18} /> },
  { id: 'PARTY COMBOS', label: 'Party Combos', icon: <Award size={18} /> },
];

const Home = () => {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const [bestsellers, setBestsellers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Animated counters state
  const [years, setYears] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [orders, setOrders] = useState(0);
  const [partners, setPartners] = useState(0);

  useEffect(() => {
    fetchBestsellers();
    animateCounters();
  }, []);

  const fetchBestsellers = async () => {
    try {
      setLoading(true);
      // Fetch menu items and filter for bestsellers
      const res = await fetch('/api/menu?limit=100');
      const data = await res.json();
      if (res.ok && data.success) {
        // filter or slice first 6 items
        const list = data.data.filter(item => item.isBestseller).slice(0, 6);
        // fallback if none marked bestseller
        setBestsellers(list.length > 0 ? list : data.data.slice(0, 6));
      }
    } catch (err) {
      console.error('Failed to load bestsellers:', err);
    } finally {
      setLoading(false);
    }
  };

  const animateCounters = () => {
    // Years to 8
    let yCount = 0;
    const yTimer = setInterval(() => {
      yCount += 1;
      setYears(yCount);
      if (yCount >= 8) clearInterval(yTimer);
    }, 150);

    // Customers to 50
    let cCount = 0;
    const cTimer = setInterval(() => {
      cCount += 2;
      setCustomers(cCount);
      if (cCount >= 50) clearInterval(cTimer);
    }, 50);

    // Orders to 800
    let oCount = 0;
    const oTimer = setInterval(() => {
      oCount += 40;
      setOrders(oCount);
      if (oCount >= 800) clearInterval(oTimer);
    }, 50);

    // Partners to 40
    let pCount = 0;
    const pTimer = setInterval(() => {
      pCount += 2;
      setPartners(pCount);
      if (pCount >= 40) clearInterval(pTimer);
    }, 60);
  };

  const handleCategoryClick = (catId) => {
    navigate(`/menu?category=${encodeURIComponent(catId)}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-text">
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] overflow-hidden flex items-center bg-black">
        {/* Full-width Background Image overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.25] scale-105 transform transition-transform duration-[10s]"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg via-brand-bg/80 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-brand-bg to-transparent" />

        <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full relative z-10 text-left py-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-brand-gold/25 mb-6">
            <Flame size={14} className="text-brand-orange animate-bounce" />
            <span className="text-xs font-bold text-brand-gold font-mono tracking-widest uppercase">Gourmet QSR Masterclass</span>
          </div>

          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7.5xl tracking-tight leading-none text-white max-w-3xl mb-6">
            Elite Taste.<br />
            <span className="bg-gradient-to-r from-brand-gold via-brand-orange to-brand-gold bg-clip-text text-transparent">
              Speedy Service.
            </span>
          </h1>

          <p className="text-brand-muted text-sm sm:text-base max-w-xl leading-relaxed mb-10">
            SVS Food Company orchestrates pure tandoor charcoals, hand-pressed double cheese patties, and thermodynamic express deliveries in under 30 minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center w-full">
            <Link to="/menu" className="btn-gold w-full sm:w-auto flex items-center justify-center gap-2 group py-3 px-8 text-sm font-bold uppercase tracking-wider">
              <span>Order Now</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-200" />
            </Link>
            <Link to="/menu?category=PARTY COMBOS" className="w-full sm:w-auto text-slate-300 hover:text-white glass py-3 px-8 rounded-lg border border-white/5 hover:bg-white/5 transition-all duration-200 text-sm font-bold uppercase tracking-wider text-center">
              Explore Combos
            </Link>
          </div>
        </div>
      </section>

      {/* Category Slider section */}
      <section className="py-12 border-b border-brand-border bg-brand-card/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full space-y-6">
          <div className="text-left space-y-1">
            <span className="text-[10px] font-bold text-brand-gold tracking-widest uppercase font-mono">What are you craving?</span>
            <h2 className="font-heading font-bold text-xl text-white">Browse Categories</h2>
          </div>

          {/* Slider Layout (Pills on desktop, scroll on mobile) */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-thin lg:grid lg:grid-cols-7 lg:gap-4 lg:overflow-visible lg:pb-0 lg:mx-0 lg:px-0">
            {CATEGORY_ITEMS.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="
                  flex items-center lg:flex-col lg:justify-center gap-3 lg:gap-2.5 bg-brand-card/50 hover:bg-brand-card/90 border border-white/5 hover:border-brand-gold/30 p-3.5 lg:py-6 rounded-2xl transition-all duration-300 min-w-[140px] lg:min-w-0 group hover:-translate-y-1
                "
              >
                <div className="bg-brand-gold/10 text-brand-gold p-2 rounded-xl group-hover:bg-brand-gold group-hover:text-brand-bg transition-colors duration-300">
                  {cat.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 group-hover:text-white transition-colors">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers Grid */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 lg:px-8 w-full space-y-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-white/5 pb-4">
          <div className="text-left space-y-1">
            <span className="text-[10px] font-bold text-brand-gold tracking-widest uppercase font-mono">Signature Mastercrafts</span>
            <h2 className="font-heading font-bold text-3xl text-white">Popular Bestsellers</h2>
          </div>
          <Link to="/menu" className="text-brand-gold hover:text-brand-orange flex items-center gap-1 text-xs font-bold uppercase tracking-wider transition-colors duration-200">
            See Entire Catalog <ChevronRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="glass h-[360px] rounded-3xl animate-pulse bg-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestsellers.map(item => (
              <div key={item._id} className="group glass rounded-3xl overflow-hidden flex flex-col h-full hover:border-brand-gold/20 transition-all duration-300 relative">
                
                {/* Bestseller Badge */}
                <span className="absolute top-3 right-3 bg-brand-orange text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full z-10 shadow-lg shadow-brand-orange/20">
                  Bestseller
                </span>

                {/* Card image container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-brand-bg">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-card/90 via-transparent to-transparent opacity-80" />
                  
                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 bg-brand-bg/85 backdrop-blur-md text-[9px] text-brand-gold uppercase tracking-widest font-bold px-2.5 py-1 rounded-full border border-white/5">
                    {item.category}
                  </span>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col flex-grow justify-between gap-5">
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-heading font-bold text-lg text-white group-hover:text-brand-gold transition-colors duration-200 line-clamp-1">
                        {item.name}
                      </h3>
                      <span className="text-brand-gold font-heading font-extrabold text-lg whitespace-nowrap">
                        ₹{item.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Star ratings */}
                    <div className="flex items-center gap-1 text-brand-gold pt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill="#e0a96d" strokeWidth={0} />
                      ))}
                      <span className="text-[10px] text-brand-muted font-bold ml-1 font-mono">(4.9/5)</span>
                    </div>

                    <p className="text-brand-muted text-xs leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Add Button */}
                  <button
                    onClick={() => addItem({ ...item, image: item.imageUrl })}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs font-bold tracking-wider transition-all duration-300 bg-white/5 text-slate-200 border border-white/5 hover:bg-brand-gold hover:text-brand-bg hover:border-brand-gold hover:shadow-lg hover:shadow-brand-gold/15"
                  >
                    <span>ADD TO CART</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Static Coupon / Exclusive Offer Banner */}
      <section className="py-8 max-w-7xl mx-auto px-4 lg:px-8 w-full">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 bg-gradient-to-r from-brand-orange via-brand-gold to-brand-orange border border-white/10 text-brand-bg text-center flex flex-col items-center justify-center gap-4 shadow-xl shadow-brand-gold/5">
          <div className="absolute inset-0 bg-cover opacity-[0.05] mix-blend-overlay bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500')` }} />
          
          <span className="text-[10px] font-extrabold font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-brand-bg text-brand-gold border border-brand-gold/20">Exclusive Deal</span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-brand-bg leading-none tracking-tight">SAVE 20% ON GOURMET FEASTS</h2>
          <p className="text-brand-bg/85 text-xs max-w-lg leading-relaxed font-medium">
            Lock in delicious crusts and tandoors! Apply the promo discount code below during checkout to save an instant flat 20% on any order.
          </p>

          <div className="inline-flex items-center gap-3 bg-brand-bg text-slate-100 rounded-2xl border border-brand-gold/30 px-6 py-2.5 mt-2 shadow-lg shadow-black/20 animate-pulse">
            <span className="text-xs font-mono font-bold tracking-widest text-brand-muted">CODE:</span>
            <span className="text-base font-heading font-extrabold text-brand-gold tracking-widest">SVS20</span>
          </div>
        </div>
      </section>

      {/* About Us section with animated stats */}
      <section className="py-20 lg:py-28 bg-brand-card/25 border-y border-brand-border w-full">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text */}
          <div className="text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-brand-gold/15">
              <Calendar size={12} className="text-brand-gold" />
              <span className="text-[9px] font-bold text-brand-gold font-mono tracking-widest uppercase">Since 2018 Legacy</span>
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white leading-tight">
              A Legacy of Clay Clay-Ovens and Gourmet Mastercraft
            </h2>
            <p className="text-brand-muted text-xs sm:text-sm leading-relaxed">
              Founded in 2018 under the promise of pure, natural spices, SVS Foods started as a singular clay tandoor kitchen. Over 8 years, our culinary team developed the crunchiest organic potato tikki burgers, softest garlic butter naans, and fiery hot ghost pepper dipping sauces.
            </p>
            <p className="text-brand-muted text-xs sm:text-sm leading-relaxed">
              Today, we operate double- thermodynamic insulated kitchens designed to preserve flavor profiles and steam from chef griddle to your doorstep in 30 minutes flat.
            </p>
            <Link to="/menu" className="btn-gold py-2.5 px-6 text-xs font-bold uppercase inline-flex items-center gap-2 group">
              Explore Our Masterpieces <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Animated Stats Counters */}
          <div className="grid grid-cols-2 gap-6">
            {/* Stat 1 */}
            <div className="glass p-6 rounded-3xl border border-white/5 text-center space-y-1">
              <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-gold">{years}+</h3>
              <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block">Years of Legacy</span>
            </div>
            {/* Stat 2 */}
            <div className="glass p-6 rounded-3xl border border-white/5 text-center space-y-1">
              <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-gold">{customers}K+</h3>
              <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block">Happy Customers</span>
            </div>
            {/* Stat 3 */}
            <div className="glass p-6 rounded-3xl border border-white/5 text-center space-y-1">
              <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-gold">{orders}+</h3>
              <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block">Daily Orders</span>
            </div>
            {/* Stat 4 */}
            <div className="glass p-6 rounded-3xl border border-white/5 text-center space-y-1">
              <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-gold">{partners}+</h3>
              <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block">Delivery Heroes</span>
            </div>
          </div>

        </div>
      </section>

      {/* Trust Badges Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 lg:px-8 w-full space-y-12 text-center">
        <div className="max-w-lg mx-auto space-y-2">
          <span className="text-[10px] font-bold text-brand-gold tracking-widest uppercase font-mono">Our Quality Promise</span>
          <h2 className="font-heading font-bold text-2xl text-white">Eat Safe, Eat Premium</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass p-8 rounded-3xl border border-white/5 space-y-4 hover:border-green-500/25 transition-all duration-300">
            <div className="h-14 w-14 mx-auto rounded-2xl bg-green-500/10 text-green-500 flex items-center justify-center border border-green-500/25">
              <Heart size={24} fill="#22c55e" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-white">100% Pure Vegetarian</h3>
            <p className="text-brand-muted text-xs leading-relaxed">
              We operate strict vegetarian kitchens. Zero cross-contamination, pure plant oils, and Grade-A dairy milk cheese exclusively.
            </p>
          </div>

          <div className="glass p-8 rounded-3xl border border-white/5 space-y-4 hover:border-brand-gold/25 transition-all duration-300">
            <div className="h-14 w-14 mx-auto rounded-2xl bg-brand-gold/10 text-brand-gold flex items-center justify-center border border-brand-gold/25">
              <ShieldAlert size={24} />
            </div>
            <h3 className="font-heading font-semibold text-lg text-white">Zero Touch Hygiene</h3>
            <p className="text-brand-muted text-xs leading-relaxed">
              Strict sanitizer routines. Kitchen staff prep using food-grade gloves, surgical masks, and steel containers washed at 120°C.
            </p>
          </div>

          <div className="glass p-8 rounded-3xl border border-white/5 space-y-4 hover:border-brand-orange/25 transition-all duration-300">
            <div className="h-14 w-14 mx-auto rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center border border-brand-orange/25">
              <Truck size={24} />
            </div>
            <h3 className="font-heading font-semibold text-lg text-white">Free Hot Delivery Above ₹299</h3>
            <p className="text-brand-muted text-xs leading-relaxed">
              Insulated thermodynamics bags locking in heat. Standard free courier dispatches for orders over ₹299. Fast, hot, and secure.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;
