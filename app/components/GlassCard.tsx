import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div className={`bg-white/10 backdrop-blur-md border border-white/20 shadow-xl ${className}`}>
      {children}
    </div>
  );
}