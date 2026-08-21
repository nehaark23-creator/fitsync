import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, MessageCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import QRPlaceholder from '@/components/ui/QRPlaceholder';
import { gymTimings } from '@/data/mockData';

const footerLinks = [
  {
    title: 'Explore',
    links: [
      { label: 'Home', to: '/' },
      { label: 'About Us', to: '/about' },
      { label: 'Plans', to: '/plans' },
      { label: 'Nutrition', to: '/nutrition' },
    ],
  },
  {
    title: 'Train',
    links: [
      { label: 'At Home', to: '/at-home' },
      { label: 'Shop', to: '/shop' },
      { label: 'Contact', to: '/contact' },
      { label: 'Free Trial', to: '/free-trial' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Login / Register', to: '/register' },
      { label: 'Feedback', to: '/feedback' },
      { label: 'Trainers', to: '/about' },
      { label: 'Facilities', to: '/about' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-ink-900">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="relative container-x py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand + description */}
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 text-sm text-ink-300 leading-relaxed max-w-sm">
              FitSync is a premium fitness platform combining world-class gym facilities, elite nutrition coaching, and smart home workout technology. Train anywhere, anytime.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Youtube, label: 'YouTube' },
                { Icon: MessageCircle, label: 'WhatsApp' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-ink-300 hover:text-red-500 hover:border-red-500/30 transition-all hover:scale-110"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="lg:col-span-2">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-ink-300 hover:text-red-500 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-ink-300">
                <MapPin size={16} className="text-red-500 shrink-0 mt-0.5" />
                <span>247 Iron Street, Downtown, NY 10001</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-ink-300">
                <Phone size={16} className="text-red-500 shrink-0" />
                <span>+1 (555) 348-7890</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-ink-300">
                <Mail size={16} className="text-red-500 shrink-0" />
                <span>hello@fitsync.com</span>
              </li>
            </ul>
            <div className="mt-4 space-y-1.5">
              {gymTimings.slice(0, 2).map((t) => (
                <div key={t.day} className="flex items-center gap-2 text-xs text-ink-400">
                  <Clock size={12} className="text-red-500" />
                  <span>{t.day}: {t.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* App download */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h4 className="text-lg font-bold text-white mb-1">Download the FitSync App</h4>
              <p className="text-sm text-ink-300">Track workouts, book classes, and train at home — all from your phone.</p>
            </div>
            <div className="flex items-center gap-6">
              <QRPlaceholder label="App Store" />
              <QRPlaceholder label="Google Play" />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-400">
            © {new Date().getFullYear()} FitSync. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-ink-400 hover:text-red-500 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-ink-400 hover:text-red-500 transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-ink-400 hover:text-red-500 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
