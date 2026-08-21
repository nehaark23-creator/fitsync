import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeFromCart, totalPrice, totalItems, clearCart } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[90] bg-ink-950/80 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[91] w-full max-w-md glass-strong border-l border-white/10 shadow-2xl transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={20} className="text-red-500" />
            <h3 className="text-lg font-bold text-white">
              Cart {totalItems > 0 && <span className="text-red-500">({totalItems})</span>}
            </h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-ink-300 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center">
                <ShoppingBag size={32} className="text-ink-500" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">Your cart is empty</p>
                <p className="text-sm text-ink-400 mt-1">Browse the shop and add your favorite gear.</p>
              </div>
              <Link
                to="/shop"
                onClick={() => setIsOpen(false)}
                className="btn-primary mt-2"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 glass rounded-xl p-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{item.product.name}</h4>
                    <p className="text-sm text-red-500 font-semibold mt-0.5">${item.product.price.toFixed(2)}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg glass flex items-center justify-center text-ink-200 hover:text-red-500 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-bold text-white w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg glass flex items-center justify-center text-ink-200 hover:text-red-500 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-ink-400 hover:text-red-400 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/10 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink-300">Subtotal</span>
              <span className="text-xl font-bold text-white">${totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-xs text-ink-400">Shipping and taxes calculated at checkout.</p>
            <button className="btn-primary w-full" disabled>
              Checkout (Coming Soon)
            </button>
            <button
              onClick={clearCart}
              className="btn-ghost w-full text-ink-400 hover:text-red-400"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
