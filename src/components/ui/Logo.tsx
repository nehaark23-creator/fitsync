import { Link } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 group ${className}`}>
      <div className="relative">
        <div className="w-9 h-9 rounded-xl bg-red-500 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <Dumbbell size={20} className="text-ink-950" strokeWidth={2.5} />
        </div>
        <div className="absolute inset-0 rounded-xl bg-red-500 blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
      </div>
      <span className="text-xl font-bold font-display text-white tracking-tight">
        Fit<span className="text-red-500">Sync</span>
      </span>
    </Link>
  );
}
