import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  accent?: boolean;
  accentColor?: string;
}

export default function Card({ className, accent, accentColor, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-bg-card border border-border-default rounded-xl p-6',
        'shadow-[var(--shadow-warm)]',
        accent && 'border-l-[3px]',
        className
      )}
      style={accent && accentColor ? { borderLeftColor: accentColor } : undefined}
      {...props}
    >
      {children}
    </div>
  );
}
