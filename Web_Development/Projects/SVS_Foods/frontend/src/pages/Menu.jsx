import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MenuCard from '../components/MenuCard';
import { 
  Search, Loader2, ArrowLeft, ArrowRight, SlidersHorizontal, 
  X, Sparkles, ChefHat, Timer, Flame, Dumbbell 
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'BURGERS', label: 'Burgers' },
  { id: 'SIDES', label: 'Sides & Fries' },
  { id: 'BEVERAGES', label: 'Beverages' },
  { id: 'NAAN & ROLLS', label: 'Naan & Rolls' },
  { id: 'DIPS', label: 'Dips & Sauces' },
  { id: 'DESSERTS', label: 'Desserts' },
  { id: 'PARTY COMBOS', label: 'Party Combos' }
];

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const activeCategory = searchParams.get('category') || 'all';
  const searchTerm = searchParams.get('search') || '';
  const [searchInput, setSearchInput] = useState(searchTerm);

  const [priceRange, setPriceRange] = useState(180); // ₹60 - ₹180 slider
  const [spicyLevel, setSpicyLevel] = useState('All'); // All, Mild, Medium, Hot
  const [vegOnly, setVegOnly] = useState(true); // Default Veg Only since SVS is veg-only!
  
  // Performance pagination (Load More)
  const [itemsLimit, setItemsLimit] = useState(8); // Start by listing 8 items

  // Quick View State
  const [quickViewItem, setQuickViewItem] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, [activeCategory, searchTerm]);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      let url = `/api/menu?limit=100&availableOnly=false`; // fetch full active list to filter locally
      
      if (activeCategory !== 'all') {
        url += `&category=${encodeURIComponent(activeCategory)}`;
      }
      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      
      if (res.ok && data.success) {
        setItems(data.data);
      }
    } catch (err) {
      console.error('Failed to load menu list:', err);
    } finally {
      setLoading(false);
    }
  };

  // Performance optimization: Memoize filtered items computation (prevents redundant calculations)
  const filteredItems = React.useMemo(() => {
    let result = [...items];

    // 1. Price slider (price <= priceRange)
    result = result.filter(item => item.price <= priceRange);

    // 2. Spicy Level Filter
    if (spicyLevel !== 'All') {
      result = result.filter(item => item.spicyLevel === spicyLevel);
    }

    // 3. Veg Only check (matches 100% since SVS is pure vegetarian)
    if (vegOnly) {
      result = result.filter(item => true);
    }

    return result;
  }, [items, priceRange, spicyLevel, vegOnly]);

  // Memoize visible slice based on Load More pagination limit
  const visibleItems = React.useMemo(() => {
    return filteredItems.slice(0, itemsLimit);
  }, [filteredItems, itemsLimit]);

  const totalFilteredCount = filteredItems.length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({
      category: activeCategory,
      search: searchInput
    });
  };

  // useCallback to prevent children re-renders
  const handleCategorySelect = React.useCallback((categoryId) => {
    setSearchParams({
      category: categoryId,
      search: searchInput
    });
    setItemsLimit(8); // Reset limit
  }, [searchInput, activeCategory, setSearchParams]);

  const handleLoadMore = React.useCallback(() => {
    setItemsLimit(prev => prev + 8);
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text py-12 px-4 lg:px-8 text-left">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Page Header */}
        <div className="text-center space-y-2">
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white">Our Gourmet Menu</h1>
          <p className="text-brand-muted text-sm sm:text-base max-w-xl mx-auto">
            Gourmet double cheese burgers, tandoor butter naans, and fiery dips priced between ₹60 and ₹180.
          </p>
        </div>

        {/* Categories Pills bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-thin border-b border-white/5">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`
                whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-200 border cursor-pointer
                ${activeCategory === cat.id 
                  ? 'bg-brand-gold text-brand-bg border-brand-gold shadow-md' 
                  : 'bg-white/5 text-slate-400 border-white/5 hover:border-slate-500 hover:text-white'}
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main Columns Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Side Column: Filters panel */}
          <div className="glass p-6 rounded-2xl border border-white/5 space-y-6 lg:sticky lg:top-24">
            <h3 className="font-heading font-bold text-sm text-slate-200 flex items-center gap-2 border-b border-white/5 pb-2">
              <SlidersHorizontal size={16} className="text-brand-gold" /> Filter Choices
            </h3>

            {/* Price range filter */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between font-semibold text-brand-muted">
                <span>Price Limit</span>
                <span className="text-brand-gold font-bold">Max: ₹{priceRange}</span>
              </div>
              <input
                type="range"
                min="60"
                max="180"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-brand-gold"
              />
              <div className="flex justify-between text-[9px] text-brand-muted font-bold">
                <span>₹60</span>
                <span>₹120</span>
                <span>₹180</span>
              </div>
            </div>

            {/* Spicy Level filter */}
            <div className="space-y-2 text-xs">
              <label className="text-brand-muted font-semibold block">Spicy level</label>
              <div className="grid grid-cols-2 gap-2">
                {['All', 'Mild', 'Medium', 'Hot'].map(level => (
                  <button
                    key={level}
                    onClick={() => setSpicyLevel(level)}
                    className={`
                      py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-all duration-200 border cursor-pointer
                      ${spicyLevel === level 
                        ? 'bg-brand-gold text-brand-bg border-brand-gold' 
                        : 'bg-white/5 text-slate-400 border-white/5 hover:border-slate-500 hover:text-white'}
                    `}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Veg check */}
            <div className="flex items-center gap-2 select-none text-xs">
              <input
                type="checkbox"
                id="vegOnly"
                checked={vegOnly}
                onChange={(e) => setVegOnly(e.target.checked)}
                className="rounded bg-brand-bg border-white/5 text-green-500 focus:ring-green-500"
              />
              <label htmlFor="vegOnly" className="text-brand-muted font-semibold cursor-pointer">
                🌱 100% Pure Vegetarian only
              </label>
            </div>
          </div>

          {/* Right Column: Menu inventory cards */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Search Input bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-brand-card/30 p-4 rounded-2xl border border-white/5">
              <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search item name..."
                  className="w-full bg-brand-bg text-slate-100 placeholder-slate-500 rounded-xl pl-11 pr-4 py-2.5 text-xs border border-white/5 focus:outline-none focus:border-brand-gold/50 transition-colors"
                />
                <Search className="absolute left-4 top-3 text-slate-500" size={16} />
                <button 
                  type="submit"
                  className="absolute right-2 top-2 bg-brand-gold text-brand-bg px-3 py-1 rounded-lg text-[10px] font-bold uppercase hover:bg-brand-goldhover transition-colors cursor-pointer"
                >
                  Search
                </button>
              </form>
              <div className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">
                Showing {visibleItems.length} of {totalFilteredCount} matches
              </div>
            </div>

            {/* Grid lists */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, idx) => (
                  <div key={idx} className="glass rounded-2xl overflow-hidden flex flex-col h-full animate-pulse border border-white/5">
                    <div className="aspect-[4/3] bg-white/5 relative" />
                    <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="h-4 bg-white/10 rounded w-2/3 animate-pulse" />
                        <div className="h-3 bg-white/5 rounded w-full animate-pulse" />
                        <div className="h-3 bg-white/5 rounded w-5/6 animate-pulse" />
                      </div>
                      <div className="h-8 bg-white/10 rounded-xl w-full animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : visibleItems.length > 0 ? (
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleItems.map(item => (
                    <div key={item._id} className="relative group">
                      <MenuCard item={item} />
                      {/* Floating Quick View button on card hover */}
                      <button
                        onClick={() => setQuickViewItem(item)}
                        className="absolute top-3 left-3 bg-brand-bg/90 opacity-0 group-hover:opacity-100 p-2 rounded-xl text-brand-gold hover:text-white border border-white/10 hover:border-brand-gold transition-all duration-300 z-20 cursor-pointer shadow-lg"
                        title="Quick View Nutrition"
                      >
                        <ChefHat size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Performance Load More trigger */}
                {totalFilteredCount > visibleItems.length && (
                  <div className="text-center pt-4">
                    <button
                      onClick={handleLoadMore}
                      className="btn-gold px-8 py-2.5 text-xs uppercase font-bold tracking-wider inline-flex items-center gap-2"
                    >
                      Load More Items
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-20 bg-brand-card/10 rounded-2xl border border-white/5 space-y-2">
                <span className="text-base font-bold text-slate-300">No matching dishes</span>
                <p className="text-brand-muted text-xs">Try adjusting your pricing sliders or category filters.</p>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* QUICK VIEW NUTRITION MODAL */}
      {quickViewItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-2xl glass border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-slide-up relative flex flex-col md:flex-row">
            
            {/* Close Button */}
            <button 
              onClick={() => setQuickViewItem(null)}
              className="absolute top-4 right-4 bg-brand-bg/85 border border-white/5 hover:border-brand-gold text-slate-400 hover:text-white p-2 rounded-full z-30 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            {/* Left Image Column */}
            <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto md:h-full relative overflow-hidden bg-brand-bg">
              <img 
                src={quickViewItem.imageUrl} 
                alt={quickViewItem.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-brand-card/90 via-transparent to-transparent opacity-80" />
              
              {/* Category */}
              <span className="absolute top-4 left-4 bg-brand-bg/85 border border-brand-gold/20 text-[9px] text-brand-gold font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                {quickViewItem.category}
              </span>
            </div>

            {/* Right Information Column */}
            <div className="w-full md:w-1/2 p-6 md:p-8 space-y-6 text-left flex flex-col justify-between">
              <div className="space-y-4">
                <div className="space-y-1">
                  {quickViewItem.isBestseller && (
                    <span className="inline-block bg-brand-orange text-white text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full mb-1">
                      Bestseller
                    </span>
                  )}
                  <h3 className="font-heading font-bold text-xl text-white">{quickViewItem.name}</h3>
                  <span className="text-brand-gold font-heading font-extrabold text-lg block">₹{quickViewItem.price.toFixed(2)}</span>
                </div>

                <p className="text-brand-muted text-xs leading-relaxed">{quickViewItem.description}</p>

                {/* Spicy & Prep timing parameters */}
                <div className="flex gap-4 text-xs font-semibold text-slate-300">
                  <div className="flex items-center gap-1">
                    <Timer size={14} className="text-brand-gold" />
                    <span>Prep: {quickViewItem.preparationTime || 12} mins</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame size={14} className="text-brand-orange" />
                    <span>Spice: {quickViewItem.spicyLevel || 'Mild'}</span>
                  </div>
                </div>

                {/* NUTRITION CHARTS PROGRESS BARS */}
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] font-bold text-brand-muted tracking-widest uppercase flex items-center gap-1.5">
                    <Dumbbell size={12} className="text-brand-gold" /> Nutrition Information
                  </span>
                  
                  {/* Calories */}
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between font-semibold text-slate-300">
                      <span>Calories</span>
                      <span className="font-mono">{quickViewItem.nutrition?.calories || 280} kcal</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="bg-brand-gold h-full rounded-full" style={{ width: `${Math.min(100, ((quickViewItem.nutrition?.calories || 280) / 600) * 100)}%` }} />
                    </div>
                  </div>

                  {/* Protein */}
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between font-semibold text-slate-300">
                      <span>Protein</span>
                      <span className="font-mono">{quickViewItem.nutrition?.protein || 8} g</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full rounded-full" style={{ width: `${Math.min(100, ((quickViewItem.nutrition?.protein || 8) / 30) * 100)}%` }} />
                    </div>
                  </div>

                  {/* Carbs */}
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between font-semibold text-slate-300">
                      <span>Carbs</span>
                      <span className="font-mono">{quickViewItem.nutrition?.carbs || 36} g</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: `${Math.min(100, ((quickViewItem.nutrition?.carbs || 36) / 80) * 100)}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => { addItem({ ...quickViewItem, image: quickViewItem.imageUrl }); setQuickViewItem(null); }}
                className="btn-gold w-full py-2.5 text-xs font-bold uppercase tracking-wider mt-4"
              >
                Add To Cart
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Menu;
