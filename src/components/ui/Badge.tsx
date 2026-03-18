import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export default function Badge({ children, color, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium uppercase tracking-wider',
        className
      )}
      style={{
        fontFamily: 'var(--font-mono)',
        backgroundColor: color ? `${color}15` : undefined,
        color: color || undefined,
      }}
    >
      {children}
    </span>
  );
}
