import React from 'react';
import { useCart } from '../context/CartContext';
import { Plus, ShoppingBag } from 'lucide-react';
import LazyImage from './LazyImage';

const MenuCard = ({ item }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(item);
  };

  return (
    <div className="group glass glass-hover rounded-2xl overflow-hidden flex flex-col h-full animate-slide-up">
      {/* Food Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-bg">
        <LazyImage 
          src={item.imageUrl} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-card/90 via-transparent to-transparent opacity-80" />
        
        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-brand-bg/85 backdrop-blur-md text-[10px] text-brand-gold uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full border border-white/5">
          {item.category}
        </span>

        {/* Availability Badge */}
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex items-center justify-center">
            <span className="text-white text-xs font-semibold tracking-wider bg-red-600/90 px-3 py-1.5 rounded-md uppercase">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Food Item Details */}
      <div className="p-5 flex flex-col flex-grow justify-between gap-4">
        <div className="space-y-2">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-heading font-semibold text-lg text-white group-hover:text-brand-gold transition-colors duration-200 line-clamp-1">
              {item.name}
            </h3>
            <span className="text-brand-gold font-heading font-semibold whitespace-nowrap">
              ₹{item.price.toFixed(2)}
            </span>
          </div>
          <p className="text-brand-muted text-xs leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleAddToCart}
          disabled={!item.isAvailable}
          className={`
            w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold tracking-wider transition-all duration-300
            ${item.isAvailable 
              ? 'bg-white/5 text-slate-200 border border-white/5 hover:bg-brand-gold hover:text-brand-bg hover:border-brand-gold hover:shadow-lg hover:shadow-brand-gold/10' 
              : 'bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed'}
          `}
        >
          {item.isAvailable ? (
            <>
              <Plus size={14} />
              <span>ADD TO CART</span>
            </>
          ) : (
            <>
              <ShoppingBag size={14} />
              <span>UNAVAILABLE</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
