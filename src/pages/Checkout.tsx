import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Check, CheckCircle2, ShoppingBag, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    name: '', email: '', phone: '', address: '', payment: 'card',
  });

  const shipping = totalPrice > 75 ? 0 : 5.99;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shipping + tax;

  const handlePlaceOrder = () => {
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="container-x max-w-lg">
          <div className="glass rounded-3xl p-10 md:p-16 text-center">
            <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-white">Order Confirmed!</h1>
            <p className="text-ink-300 mt-4">
              Thank you, {orderInfo.name.split(' ')[0] || 'friend'}! Your order has been placed successfully. A confirmation email will be sent to {orderInfo.email || 'your email'} shortly.
            </p>
            <div className="mt-6 glass rounded-2xl p-5 text-left">
              <div className="flex items-center gap-2 text-sm text-ink-300">
                <Truck size={16} className="text-red-500" />
                Estimated delivery: 3-5 business days
              </div>
              <div className="flex items-center gap-2 text-sm text-ink-300 mt-2">
                <CreditCard size={16} className="text-red-500" />
                Payment method: {orderInfo.payment === 'card' ? 'Credit/Debit Card' : orderInfo.payment === 'paypal' ? 'PayPal' : 'Cash on Delivery'}
              </div>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => navigate('/shop')} className="btn-primary w-full sm:w-auto justify-center">
                Continue Shopping
              </button>
              <button onClick={() => navigate('/')} className="btn-outline w-full sm:w-auto justify-center">
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="glass rounded-2xl p-10 text-center max-w-md">
          <ShoppingBag size={48} className="text-ink-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white">Your Cart is Empty</h1>
          <p className="text-ink-300 mt-2 text-sm">Add some products before checking out.</p>
          <button onClick={() => navigate('/shop')} className="btn-primary mt-6">
            Browse Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="container-x max-w-5xl">
        <button onClick={() => navigate('/shop')} className="flex items-center gap-2 text-sm font-bold text-ink-300 hover:text-white transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Shop
        </button>

        <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="glass rounded-2xl p-6 md:p-8 space-y-5">
            <h2 className="text-lg font-bold text-white">Shipping & Payment Details</h2>

            <div>
              <label className="text-sm font-bold text-white mb-1.5 block">Full Name</label>
              <input
                type="text"
                value={orderInfo.name}
                onChange={(e) => setOrderInfo({ ...orderInfo, name: e.target.value })}
                className="input-field"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-white mb-1.5 block">Email</label>
              <input
                type="email"
                value={orderInfo.email}
                onChange={(e) => setOrderInfo({ ...orderInfo, email: e.target.value })}
                className="input-field"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-white mb-1.5 block">Phone</label>
              <input
                type="tel"
                value={orderInfo.phone}
                onChange={(e) => setOrderInfo({ ...orderInfo, phone: e.target.value })}
                className="input-field"
                placeholder="+1 555 000 0000"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-white mb-1.5 block">Shipping Address</label>
              <textarea
                value={orderInfo.address}
                onChange={(e) => setOrderInfo({ ...orderInfo, address: e.target.value })}
                className="input-field min-h-[80px] resize-none"
                placeholder="Street address, city, state, zip code"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-white mb-1.5 block">Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'card', label: 'Credit Card' },
                  { value: 'paypal', label: 'PayPal' },
                  { value: 'cod', label: 'Cash on Delivery' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setOrderInfo({ ...orderInfo, payment: opt.value })}
                    className={`rounded-xl px-3 py-3 text-xs font-bold transition-all ${
                      orderInfo.payment === opt.value
                        ? 'bg-red-500 text-white'
                        : 'glass text-ink-200 hover:border-red-500/30'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {orderInfo.payment === 'card' && (
                <div className="mt-3 space-y-3">
                  <input className="input-field" placeholder="Card number (0000 0000 0000 0000)" />
                  <div className="grid grid-cols-2 gap-3">
                    <input className="input-field" placeholder="MM/YY" />
                    <input className="input-field" placeholder="CVV" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="glass rounded-2xl p-6 md:p-8 h-fit lg:sticky lg:top-24">
            <h2 className="text-lg font-bold text-white mb-5">Order Summary</h2>
            <div className="space-y-3 mb-5">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{item.product.name}</p>
                    <p className="text-xs text-ink-400">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-bold text-white">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/5 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-ink-300">
                <span>Subtotal</span>
                <span className="text-white font-semibold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-ink-300">
                <span>Shipping</span>
                <span className="text-white font-semibold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-ink-300">
                <span>Tax (8%)</span>
                <span className="text-white font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/5">
                <span className="text-white">Total</span>
                <span className="text-red-500">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handlePlaceOrder}
              disabled={!orderInfo.name || !orderInfo.email || !orderInfo.phone || !orderInfo.address}
              className="btn-primary w-full mt-6 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Check size={16} /> Place Order
            </button>
            <p className="text-xs text-ink-400 text-center mt-3">
              {shipping === 0 ? 'You qualified for free shipping!' : `Add $${(75 - totalPrice).toFixed(2)} more for free shipping`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
