'use client';

import { cn } from '@/lib/utils';
import Avatar from '@/components/ui/Avatar';
import type { Profile } from '@/types';

interface ParticipantSelectorProps {
  members: Profile[];
  selected: string[];
  onChange: (ids: string[]) => void;
}

export default function ParticipantSelector({ members, selected, onChange }: ParticipantSelectorProps) {
  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="space-y-2">
      <label
        className="block text-xs font-medium uppercase tracking-wider text-text-muted"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Participants
      </label>
      <div className="space-y-1">
        {members.map((member) => (
          <button
            key={member.id}
            type="button"
            onClick={() => toggle(member.id)}
            className={cn(
              'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-all duration-150',
              selected.includes(member.id)
                ? 'bg-accent-soft border border-accent-border'
                : 'bg-bg-primary border border-border-default hover:bg-bg-hover'
            )}
          >
            <Avatar name={member.full_name} src={member.avatar_url} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-text-primary truncate">{member.full_name}</p>
              <p className="text-xs text-text-muted truncate">{member.email}</p>
            </div>
            {selected.includes(member.id) && (
              <svg className="w-4 h-4 text-accent shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
