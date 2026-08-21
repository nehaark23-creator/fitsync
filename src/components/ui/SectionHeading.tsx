import type { ReactNode } from 'react';

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  center = true,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`${center ? 'text-center mx-auto' : 'text-left'} max-w-3xl ${className}`}>
      {label && <span className="section-label mb-4">{label}</span>}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-ink-300 mt-4 text-base md:text-lg leading-relaxed ${center ? 'mx-auto' : ''} max-w-2xl`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

interface RevealProps {
  children: ReactNode;
  delay?: string;
  className?: string;
}

export function Reveal({ children, delay = '', className = '' }: RevealProps) {
  return (
    <div className={`animate-fade-up ${delay} ${className}`}>
      {children}
    </div>
  );
}
