import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { 
  Trash2, Plus, Minus, ShoppingBag, MapPin, CreditCard, CheckCircle, 
  Ticket, ShieldCheck, QrCode, ArrowLeft, Loader2, Sparkles 
} from 'lucide-react';

const Cart = () => {
  const { cart, updateQty, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Address State
  const [street, setStreet] = useState(user?.address?.street || '');
  const [city, setCity] = useState(user?.address?.city || '');
  const [pincode, setPincode] = useState(user?.address?.pincode || '');
  const [fetchingGeo, setFetchingGeo] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState('cod'); // cod, card, upi
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponError, setCouponError] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0); // 20% off SVS20

  // Razorpay Overlay State
  const [showRazorpay, setShowRazorpay] = useState(false);
  const [payingState, setPayingState] = useState(false);
  const [razorpaySuccess, setRazorpaySuccess] = useState(false);
  const [cardNo, setCardNo] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiId, setUpiId] = useState('');

  const handleQtyChange = (itemId, currentQty, increment) => {
    const newQty = increment ? currentQty + 1 : currentQty - 1;
    if (newQty < 1) return;
    updateQty(itemId, newQty);
  };

  // Browser Geolocation API
  const handleGeolocationAutofill = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setFetchingGeo(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(5);
        const lon = pos.coords.longitude.toFixed(5);
        setStreet(`Sector 62, GPS Coords: [${lat}, ${lon}]`);
        setCity('Noida');
        setPincode('201301');
        setFetchingGeo(false);
      },
      (err) => {
        console.error(err);
        // Fallback default coordinates
        setStreet('Gourmet Lane, GPS [28.6139, 77.2090]');
        setCity('Delhi NCR');
        setPincode('110001');
        setFetchingGeo(false);
      }
    );
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError(null);
    if (couponCode.trim().toUpperCase() === 'SVS20') {
      setAppliedCoupon('SVS20');
      setCouponDiscount(0.20); // 20% off
    } else {
      setCouponError('Invalid coupon code. Try SVS20!');
    }
  };

  // Financial calculations
  const subtotal = cart.totalAmount;
  const discountAmount = subtotal * couponDiscount;
  const totalAfterDiscount = subtotal - discountAmount;
  const gstTax = totalAfterDiscount * 0.05; // 5% GST
  const deliveryFee = totalAfterDiscount >= 299 ? 0 : 30; // Free above ₹299, else ₹30
  const grandTotal = totalAfterDiscount + gstTax + deliveryFee;

  const handlePlaceOrderClick = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login?redirect=cart');
      return;
    }

    if (!street || !city || !pincode) {
      setError('Please fill in your shipping address details.');
      return;
    }

    if (paymentMethod === 'card' || paymentMethod === 'upi') {
      setShowRazorpay(true);
    } else {
      // Direct checkout for COD
      executeOrderCheckout();
    }
  };

  const executeOrderCheckout = async () => {
    try {
      setLoading(true);
      setError(null);

      const itemsPayload = cart.items.map(item => ({
        menuItemId: item.menuItem,
        priceAtOrder: item.price,
        quantity: item.quantity,
        specialInstructions: ''
      }));

      const payload = {
        items: itemsPayload,
        deliveryAddress: { street, city, pincode },
        paymentMethod,
        totalAmount: grandTotal
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setOrderSuccess(data.data);
        clearCart();
      } else {
        throw new Error(data.message || 'Place order failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setShowRazorpay(false);
      setPayingState(false);
    }
  };

  // Razorpay Test Mode checkout simulation
  const handleRazorpayPayment = (e) => {
    e.preventDefault();
    setPayingState(true);
    
    // Simulate Razorpay processing authorization
    setTimeout(() => {
      setRazorpaySuccess(true);
      setTimeout(() => {
        executeOrderCheckout();
      }, 1000);
    }, 1500);
  };

  if (orderSuccess) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-brand-bg text-brand-text p-6 text-center">
        <div className="max-w-md w-full glass border border-green-500/20 p-8 rounded-3xl space-y-6 animate-slide-up">
          <div className="mx-auto h-16 w-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center border border-green-500/30">
            <CheckCircle size={36} />
          </div>
          <div className="space-y-2">
            <h2 className="font-heading text-2xl font-bold text-white">Order Confirmed!</h2>
            <p className="text-brand-muted text-xs leading-relaxed">
              Thank you for ordering with SVS Foods! Your order ID is <strong className="text-slate-200">#{orderSuccess._id.slice(-8)}</strong>. Our culinary team is preparing your veggie delicacies.
            </p>
          </div>

          <div className="border-t border-white/5 pt-4 text-left space-y-2.5 text-xs">
            <div className="flex justify-between"><span className="text-brand-muted">Payment:</span> <span className="text-slate-200 font-semibold">{orderSuccess.paymentMethod?.toUpperCase()} ({orderSuccess.paymentStatus?.toUpperCase()})</span></div>
            <div className="flex justify-between"><span className="text-brand-muted">Amount Paid:</span> <span className="text-brand-gold font-semibold">₹{orderSuccess.totalAmount.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-brand-muted">Address:</span> <span className="text-slate-200 truncate max-w-[220px]">{orderSuccess.deliveryAddress?.street}, {orderSuccess.deliveryAddress?.city}</span></div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button 
              onClick={() => navigate('/menu')}
              className="btn-gold py-2 text-xs uppercase font-bold"
            >
              Order More
            </button>
            <p className="text-[10px] text-brand-gold font-semibold mt-2 animate-pulse">
              💡 Track your food visual steppers inside your User Dashboard account tab!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text py-12 px-4 lg:px-8 text-left">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <h1 className="font-heading text-3xl font-bold text-white border-b border-white/5 pb-4">Your Shopping Cart</h1>

        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-brand-card/20 border border-white/5 rounded-2xl space-y-6">
            <div className="bg-white/5 p-4 rounded-full text-slate-500">
              <ShoppingBag size={48} />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-semibold text-white">Your cart is empty</h3>
              <p className="text-brand-muted text-xs">Explore SVS Foods to add delicious burgers and flatbreads.</p>
            </div>
            <Link to="/menu" className="btn-gold text-xs font-semibold py-2 px-6">
              Go To Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left side items checklist column */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map(item => (
                <div key={item.menuItem} className="glass rounded-2xl p-4 flex gap-4 items-center justify-between border border-white/5 hover:border-brand-gold/15 transition-all duration-300">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 rounded-xl object-cover bg-brand-bg"
                  />
                  
                  <div className="flex-grow text-left space-y-1">
                    <h3 className="text-sm font-semibold text-slate-100 line-clamp-1">{item.name}</h3>
                    <span className="text-brand-gold text-xs font-semibold">₹{item.price.toFixed(2)}</span>
                  </div>

                  {/* Quantity adjustments */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQtyChange(item.menuItem, item.quantity, false)}
                      className="p-1 rounded bg-white/5 text-slate-400 hover:text-white border border-white/5 cursor-pointer"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-xs font-bold text-slate-200 w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQtyChange(item.menuItem, item.quantity, true)}
                      className="p-1 rounded bg-white/5 text-slate-400 hover:text-white border border-white/5 cursor-pointer"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <span className="text-xs font-bold text-slate-200 w-16 text-right">₹{(item.price * item.quantity).toFixed(2)}</span>

                  <button
                    onClick={() => removeItem(item.menuItem)}
                    className="text-slate-500 hover:text-red-400 transition-colors p-1 cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Right side invoices and details column */}
            <div className="space-y-6">
              
              {/* Promo code drawer */}
              <div className="glass rounded-2xl p-5 border border-white/5 space-y-3">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5"><Ticket size={14} className="text-brand-gold" /> Have a Coupon?</h4>
                <form onSubmit={handleApplyCoupon} className="flex gap-2 text-xs">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter SVS20"
                    className="flex-grow bg-brand-bg text-slate-100 placeholder-slate-500 rounded-lg px-3 py-1.5 border border-white/5 focus:outline-none"
                  />
                  <button 
                    type="submit"
                    className="bg-brand-gold text-brand-bg px-4 py-1.5 rounded-lg font-bold hover:bg-brand-goldhover cursor-pointer uppercase text-[10px]"
                  >
                    Apply
                  </button>
                </form>
                {couponError && <span className="text-[10px] text-red-400 block font-semibold">{couponError}</span>}
                {appliedCoupon && (
                  <span className="text-[10px] text-green-400 block font-semibold flex items-center gap-1">
                    <CheckCircle size={10} /> Coupon SVS20 applied (20% Savings!)
                  </span>
                )}
              </div>

              {/* Billing totals */}
              <div className="glass rounded-2xl p-6 border border-white/5 space-y-6">
                <h3 className="font-heading text-lg font-bold text-white border-b border-white/5 pb-2">Billing Invoice</h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-brand-muted">
                    <span>Items Subtotal</span>
                    <span className="text-slate-200 font-semibold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-green-500 font-semibold">
                      <span>Promo (SVS20 20% off)</span>
                      <span>-₹{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-brand-muted">
                    <span>GST Tax (5%)</span>
                    <span className="text-slate-200 font-semibold">₹{gstTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-brand-muted">
                    <span>Delivery Charges</span>
                    <span className={deliveryFee === 0 ? 'text-green-500 font-bold' : 'text-slate-200 font-semibold'}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  
                  {deliveryFee > 0 && (
                    <span className="text-[9px] text-brand-gold font-medium block">
                      💡 Tip: Add ₹{(299 - totalAfterDiscount).toFixed(0)} more of food to unlock FREE delivery!
                    </span>
                  )}

                  <div className="border-t border-white/5 pt-3 flex justify-between font-bold text-sm">
                    <span className="text-white">Total Amount</span>
                    <span className="text-brand-gold">₹{grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout forms */}
                {user ? (
                  <form onSubmit={handlePlaceOrderClick} className="space-y-4 pt-4 border-t border-white/5 text-left text-xs">
                    {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-2.5 rounded-lg text-xs font-semibold">{error}</div>}

                    {/* Shipping Address with Geolocation */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold text-brand-muted tracking-widest uppercase flex items-center gap-1">
                          <MapPin size={12} className="text-brand-gold" /> Shipping Address
                        </label>
                        <button
                          type="button"
                          onClick={handleGeolocationAutofill}
                          disabled={fetchingGeo}
                          className="text-[9px] font-bold text-brand-gold hover:text-brand-orange flex items-center gap-1 transition-colors cursor-pointer bg-brand-gold/10 px-2 py-0.5 rounded border border-brand-gold/20"
                        >
                          {fetchingGeo ? <Loader2 size={10} className="animate-spin" /> : '📍 Auto GPS'}
                        </button>
                      </div>
                      <input
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="Flat #, Street address"
                        required
                        className="w-full bg-brand-bg text-slate-100 placeholder-slate-500 rounded-lg px-3 py-2 border border-white/5 focus:outline-none focus:border-brand-gold/50"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="City"
                          required
                          className="w-full bg-brand-bg text-slate-100 placeholder-slate-500 rounded-lg px-3 py-2 border border-white/5 focus:outline-none focus:border-brand-gold/50"
                        />
                        <input
                          type="text"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          placeholder="Pincode"
                          required
                          className="w-full bg-brand-bg text-slate-100 placeholder-slate-500 rounded-lg px-3 py-2 border border-white/5 focus:outline-none focus:border-brand-gold/50"
                        />
                      </div>
                    </div>

                    {/* Payment selects */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-brand-muted tracking-widest uppercase flex items-center gap-1">
                        <CreditCard size={12} className="text-brand-gold" /> Settlement Mode
                      </label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full bg-brand-bg text-slate-100 rounded-lg px-3 py-2 border border-white/5 focus:outline-none focus:border-brand-gold/50 cursor-pointer"
                      >
                        <option value="cod">Cash on Delivery (COD)</option>
                        <option value="card">Razorpay Cards Checkout</option>
                        <option value="upi">Razorpay UPI Checkout</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-gold w-full py-3 text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 mt-4"
                    >
                      {loading ? 'Processing...' : 'Place Order'}
                    </button>
                  </form>
                ) : (
                  <div className="pt-4 border-t border-white/5 space-y-4">
                    <p className="text-xs text-brand-muted leading-relaxed">
                      Please log in to specify your shipping profile address and checkout this order.
                    </p>
                    <Link
                      to="/login?redirect=cart"
                      className="btn-gold w-full text-center block text-xs py-2.5 font-bold uppercase tracking-wider"
                    >
                      Log In to Checkout
                    </Link>
                  </div>
                )}
              </div>

            </div>

          </div>
        )}
      </div>

      {/* RAZORPAY TEST MODE CHECKOUT MODAL POPUP */}
      {showRazorpay && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 animate-fade-in text-slate-800">
          <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl relative animate-slide-up flex flex-col font-sans">
            
            {/* Header */}
            <div className="bg-slate-900 text-white p-5 flex justify-between items-center">
              <div>
                <span className="text-[10px] text-sky-400 font-extrabold uppercase font-mono tracking-widest">Razorpay Checkout</span>
                <h4 className="font-bold text-sm text-slate-100">SVS Food Company</h4>
              </div>
              <button 
                onClick={() => { setShowRazorpay(false); setPayingState(false); }}
                className="text-slate-400 hover:text-white p-1 rounded-full cursor-pointer transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Test Mode warning bar */}
            <div className="bg-amber-500 text-slate-900 text-[10px] font-bold text-center py-1 uppercase tracking-wider flex items-center justify-center gap-1">
              <ShieldCheck size={12} /> Razorpay Sandbox Mode (Dev Environment)
            </div>

            {/* Payment options sheet */}
            <div className="p-6 space-y-5 text-left flex-grow">
              <div className="flex justify-between items-center text-xs border-b border-slate-100 pb-3">
                <span className="text-slate-500">Amount Due:</span>
                <span className="text-base font-extrabold text-slate-900">₹{grandTotal.toFixed(2)}</span>
              </div>

              {payingState ? (
                /* Processing overlay dialog */
                <div className="flex flex-col items-center justify-center py-10 space-y-4">
                  {razorpaySuccess ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-12 w-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center border border-green-200 animate-bounce">
                        <Check size={24} strokeWidth={3} />
                      </div>
                      <span className="text-xs font-bold text-slate-800">Payment Authorized!</span>
                    </div>
                  ) : (
                    <>
                      <Loader2 size={36} className="animate-spin text-sky-600" />
                      <span className="text-xs font-bold text-slate-600">Simulating payment gateway authorization...</span>
                    </>
                  )}
                </div>
              ) : (
                /* Payment form inputs sheet */
                <form onSubmit={handleRazorpayPayment} className="space-y-4 text-xs">
                  {paymentMethod === 'card' ? (
                    /* Card inputs */
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-slate-500 font-bold uppercase text-[9px] tracking-wider">Card Number</label>
                        <input
                          type="text"
                          required
                          value={cardNo}
                          onChange={(e) => setCardNo(e.target.value)}
                          placeholder="4111 1111 1111 1111"
                          maxLength="19"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-sky-500 font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-slate-500 font-bold uppercase text-[9px] tracking-wider">Expiry</label>
                          <input
                            type="text"
                            required
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/YY"
                            maxLength="5"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-sky-500 font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-slate-500 font-bold uppercase text-[9px] tracking-wider">CVV</label>
                          <input
                            type="password"
                            required
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="•••"
                            maxLength="3"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-sky-500 font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* UPI Input or QR code */
                    <div className="space-y-4 text-center flex flex-col items-center">
                      <div className="space-y-1 text-left w-full">
                        <label className="text-slate-500 font-bold uppercase text-[9px] tracking-wider block">Virtual Payment Address (VPA)</label>
                        <input
                          type="text"
                          required
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="e.g. user@paytm"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-sky-500 font-mono"
                        />
                      </div>
                      <div className="border-t border-slate-100 pt-3 w-full flex flex-col items-center gap-2">
                        <span className="text-[10px] text-slate-400 font-semibold block">Or Scan Test QR Code:</span>
                        <div className="h-28 w-28 border border-slate-200 rounded-2xl flex items-center justify-center bg-slate-50 text-slate-700 shadow-inner">
                          <QrCode size={64} className="stroke-1 text-slate-900" />
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors mt-2"
                  >
                    Simulate Payment (₹{grandTotal.toFixed(2)})
                  </button>
                </form>
              )}
            </div>

            {/* Secure Footer */}
            <div className="bg-slate-50 border-t border-slate-100 p-4 text-[10px] text-slate-400 flex items-center justify-center gap-1 font-semibold">
              <ShieldCheck size={14} className="text-green-500" /> 128-bit SSL Secure Checkout powered by Razorpay
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Cart;
