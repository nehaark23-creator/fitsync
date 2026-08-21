import { Quote } from 'lucide-react';
import Rating from '@/components/ui/Rating';
import type { Testimonial } from '@/data/mockData';

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="glass rounded-2xl p-6 card-hover relative overflow-hidden h-full flex flex-col">
      <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-red-500/5 blur-2xl" />
      <Quote size={32} className="text-red-500/20 mb-3" />
      <Rating value={testimonial.rating} size="md" />
      <p className="text-sm text-ink-200 mt-4 leading-relaxed flex-1">"{testimonial.feedback}"</p>
      <div className="flex items-center gap-3 mt-5 pt-5 border-t border-white/5">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-11 h-11 rounded-full object-cover border-2 border-red-500/20"
        />
        <div>
          <p className="text-sm font-bold text-white">{testimonial.name}</p>
          <p className="text-xs text-ink-400">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
