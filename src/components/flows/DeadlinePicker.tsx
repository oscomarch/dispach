'use client';

import { cn } from '@/lib/utils';

interface DeadlinePickerProps {
  value: string;
  onChange: (value: string) => void;
}

const presets = [
  { label: '24h', hours: 24 },
  { label: '48h', hours: 48 },
  { label: '72h', hours: 72 },
  { label: '1 week', hours: 168 },
];

export default function DeadlinePicker({ value, onChange }: DeadlinePickerProps) {
  const handlePreset = (hours: number) => {
    const date = new Date(Date.now() + hours * 3600000);
    onChange(date.toISOString());
  };

  const isPresetSelected = (hours: number) => {
    if (!value) return false;
    const target = new Date(value);
    const now = Date.now();
    const diff = target.getTime() - now;
    const diffHours = diff / 3600000;
    return Math.abs(diffHours - hours) < 1;
  };

  return (
    <div className="space-y-3">
      <label
        className="block text-xs font-medium uppercase tracking-wider text-text-muted"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Deadline
      </label>
      <div className="flex gap-2">
        {presets.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => handlePreset(preset.hours)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150',
              isPresetSelected(preset.hours)
                ? 'bg-accent text-white'
                : 'bg-bg-primary border border-border-default text-text-secondary hover:bg-bg-hover'
            )}
          >
            {preset.label}
          </button>
        ))}
      </div>
      <input
        type="datetime-local"
        value={value ? new Date(value).toISOString().slice(0, 16) : ''}
        onChange={(e) => onChange(new Date(e.target.value).toISOString())}
        className="w-full bg-bg-primary border border-border-default rounded-lg px-4 py-2.5 text-sm text-text-secondary focus:border-accent focus:ring-1 focus:ring-accent-soft focus:outline-none"
      />
    </div>
  );
}
