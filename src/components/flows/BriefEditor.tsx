'use client';

import Textarea from '@/components/ui/Textarea';
import { FLOW_TYPES, type FlowType } from '@/lib/config/flow-types';

interface BriefEditorProps {
  flowType: FlowType;
  content: Record<string, string>;
  onChange: (content: Record<string, string>) => void;
}

export default function BriefEditor({ flowType, content, onChange }: BriefEditorProps) {
  const config = FLOW_TYPES[flowType];

  return (
    <div className="space-y-5">
      {flowType === 'decision' && (
        <div className="bg-accent-soft border border-accent-border rounded-lg px-4 py-3">
          <p className="text-xs text-accent font-medium">
            Tip: List at least 2-3 concrete options for people to vote on.
          </p>
        </div>
      )}
      {config.sections.map((section) => (
        <Textarea
          key={section}
          id={section}
          label={section}
          placeholder={`Write about ${section.toLowerCase()}...`}
          value={content[section] || ''}
          onChange={(e) =>
            onChange({ ...content, [section]: e.target.value })
          }
          rows={4}
        />
      ))}
    </div>
  );
}
