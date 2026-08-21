import { QrCode } from 'lucide-react';

export default function QRPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-28 h-28 rounded-2xl glass border-2 border-white/10 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative w-20 h-20 grid grid-cols-7 grid-rows-7 gap-0.5">
          {Array.from({ length: 49 }).map((_, i) => {
            const corners = i === 0 || i === 6 || i === 42 || i === 48;
            const edge = i < 7 || i >= 42 || i % 7 === 0 || i % 7 === 6;
            const filled = corners || edge || (i * 7 + 3) % 3 === 0 || (i + 13) % 5 === 0;
            return (
              <div
                key={i}
                className={`rounded-[1px] ${filled ? 'bg-red-500' : 'bg-transparent'}`}
              />
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-xs font-semibold text-ink-200">
        <QrCode size={14} className="text-red-500" />
        {label}
      </div>
    </div>
  );
}
