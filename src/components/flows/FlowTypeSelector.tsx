'use client';

import { cn } from '@/lib/utils';
import { FLOW_TYPES, type FlowType } from '@/lib/config/flow-types';

interface FlowTypeSelectorProps {
  selected: FlowType | null;
  onSelect: (type: FlowType) => void;
}

export default function FlowTypeSelector({ selected, onSelect }: FlowTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {(Object.entries(FLOW_TYPES) as [FlowType, typeof FLOW_TYPES[FlowType]][]).map(
        ([type, config]) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className={cn(
              'text-left bg-bg-card border rounded-xl p-5 transition-all duration-150',
              'hover:shadow-[var(--shadow-warm-md)]',
              selected === type
                ? 'border-accent shadow-[var(--shadow-warm-md)]'
                : 'border-border-default'
            )}
          >
            <span className="text-2xl block mb-2">{config.icon}</span>
            <h3 className="text-sm font-semibold text-text-primary mb-1">
              {config.label}
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              {config.description}
            </p>
          </button>
        )
      )}
    </div>
  );
}
