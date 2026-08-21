import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  reviews?: number;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = { sm: 14, md: 16, lg: 20 };

export default function Rating({ value, reviews, size = 'sm' }: RatingProps) {
  const px = sizeMap[size];
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={px}
            className={i <= Math.round(value) ? 'fill-red-500 text-red-500' : 'fill-ink-700 text-ink-700'}
          />
        ))}
      </div>
      <span className="text-xs font-semibold text-ink-300">{value.toFixed(1)}</span>
      {reviews !== undefined && (
        <span className="text-xs text-ink-400">({reviews})</span>
      )}
    </div>
  );
}
