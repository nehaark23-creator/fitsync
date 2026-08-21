import type { Facility } from '@/data/mockData';
import * as Icons from 'lucide-react';

export default function FacilityCard({ facility }: { facility: Facility }) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[facility.icon] || Icons.Dumbbell;

  return (
    <div className="group relative rounded-2xl overflow-hidden card-hover border border-white/5">
      <div className="relative h-64 overflow-hidden">
        <img
          src={facility.image}
          alt={facility.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="w-11 h-11 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center mb-3 backdrop-blur-sm">
          <Icon size={20} className="text-red-500" />
        </div>
        <h3 className="text-lg font-bold text-white">{facility.name}</h3>
        <p className="text-sm text-ink-300 mt-1 leading-relaxed line-clamp-2">{facility.description}</p>
      </div>
    </div>
  );
}
