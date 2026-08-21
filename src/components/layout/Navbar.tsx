import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Zap, User } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Plans', to: '/plans' },
  { label: 'Nutrition', to: '/nutrition' },
  { label: 'At Home', to: '/at-home' },
  { label: 'Shop', to: '/shop' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { totalItems, setIsOpen } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-ink-950/90 backdrop-blur-xl border-b border-white/5 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <nav className="container-x flex items-center justify-between">
          <Logo />

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    active
                      ? 'text-red-500'
                      : 'text-ink-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="relative w-10 h-10 rounded-xl glass flex items-center justify-center text-ink-200 hover:text-red-500 transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {isAuthenticated ? (
              <Link
                to="/profile"
                className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-red-500 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-red-600 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] active:scale-95"
              >
                <User size={16} />
                Profile
              </Link>
            ) : (
              <Link
                to="/register"
                className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-red-500 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-red-600 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] active:scale-95"
              >
                <Zap size={16} />
                Login / Register
              </Link>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 rounded-xl glass flex items-center justify-center text-white"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="absolute inset-0 bg-ink-950/95 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
        <div className={`relative flex flex-col pt-24 px-6 gap-2 transition-transform duration-300 ${mobileOpen ? 'translate-y-0' : '-translate-y-8'}`}>
          {navLinks.map((link, i) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-3.5 text-lg font-semibold rounded-xl transition-all ${
                  active ? 'text-red-500 bg-red-500/10' : 'text-ink-200 hover:text-white hover:bg-white/5'
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {link.label}
              </Link>
            );
          })}
          {isAuthenticated ? (
            <Link to="/profile" className="mt-4 btn-primary justify-center">
              <User size={16} />
              Profile
            </Link>
          ) : (
            <Link to="/register" className="mt-4 btn-primary justify-center">
              <Zap size={16} />
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
