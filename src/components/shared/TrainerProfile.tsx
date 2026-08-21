import { Award, Users, Star, CheckCircle2, Calendar, Phone } from 'lucide-react';
import type { Trainer } from '@/data/mockData';
import Rating from '@/components/ui/Rating';
import Button from '@/components/ui/Button';

export default function TrainerProfile({ trainer }: { trainer: Trainer }) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="relative w-full sm:w-48 h-56 sm:h-64 rounded-2xl overflow-hidden shrink-0">
          <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
        </div>
        <div className="flex-1">
          <span className="badge bg-red-500/20 text-red-400 border border-red-500/20">
            {trainer.specialization}
          </span>
          <h2 className="text-2xl font-bold text-white mt-3">{trainer.name}</h2>
          <div className="flex items-center gap-3 mt-2">
            <Rating value={trainer.rating} size="md" />
            <span className="text-xs text-ink-400">{trainer.clients} active clients</span>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="glass rounded-xl p-3">
              <div className="flex items-center gap-2 text-xs text-ink-400">
                <Award size={14} className="text-red-500" />
                Experience
              </div>
              <p className="text-sm font-bold text-white mt-1">{trainer.experience}</p>
            </div>
            <div className="glass rounded-xl p-3">
              <div className="flex items-center gap-2 text-xs text-ink-400">
                <Star size={14} className="text-red-500" />
                Rating
              </div>
              <p className="text-sm font-bold text-white mt-1">{trainer.rating} / 5.0</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">About</h4>
        <p className="text-sm text-ink-300 leading-relaxed">{trainer.bio}</p>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Certifications</h4>
        <div className="flex flex-wrap gap-2">
          {trainer.certifications.map((cert) => (
            <span key={cert} className="badge bg-white/5 text-ink-200 border border-white/10">
              <CheckCircle2 size={14} className="text-red-500" />
              {cert}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Button to="/free-trial" className="flex-1">
          <Calendar size={16} />
          Book a Session
        </Button>
        <Button variant="outline" to="/contact" className="flex-1">
          <Phone size={16} />
          Contact
        </Button>
      </div>
    </div>
  );
}
