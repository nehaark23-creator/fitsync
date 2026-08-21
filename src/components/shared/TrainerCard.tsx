import { Star, Award, Users, ChevronRight } from 'lucide-react';
import type { Trainer } from '@/data/mockData';
import Rating from '@/components/ui/Rating';

interface TrainerCardProps {
  trainer: Trainer;
  onViewProfile: (trainer: Trainer) => void;
}

export default function TrainerCard({ trainer, onViewProfile }: TrainerCardProps) {
  return (
    <div className="group glass rounded-2xl overflow-hidden card-hover">
      <div className="relative h-80 overflow-hidden">
        <img
          src={trainer.image}
          alt={trainer.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/20 to-transparent" />
        <div className="absolute top-4 right-4 glass-strong rounded-full px-3 py-1.5 flex items-center gap-1.5">
          <Star size={14} className="fill-red-500 text-red-500" />
          <span className="text-xs font-bold text-white">{trainer.rating}</span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <span className="badge bg-red-500/20 text-red-400 border border-red-500/20">
            {trainer.specialization}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-white">{trainer.name}</h3>
        <div className="flex items-center gap-4 mt-2 text-xs text-ink-300">
          <span className="flex items-center gap-1.5">
            <Award size={14} className="text-red-500" />
            {trainer.experience}
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={14} className="text-red-500" />
            {trainer.clients} clients
          </span>
        </div>
        <p className="text-sm text-ink-300 mt-3 line-clamp-2 leading-relaxed">{trainer.bio}</p>
        <button
          onClick={() => onViewProfile(trainer)}
          className="mt-4 w-full flex items-center justify-center gap-1.5 rounded-xl border border-white/10 py-2.5 text-sm font-bold text-white transition-all hover:border-red-500/50 hover:text-red-400 group/btn"
        >
          View Profile
          <ChevronRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
