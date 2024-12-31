import React, { forwardRef } from 'react';

type GlassCardProps = {
  className?: string;
  children: React.ReactNode;
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className = '', children }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-black/20 backdrop-blur-lg border border-white/10 rounded-lg p-6 ${className}`}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';
