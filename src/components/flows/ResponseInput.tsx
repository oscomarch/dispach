'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import type { FlowType } from '@/lib/config/flow-types';
import { FLOW_TYPES } from '@/lib/config/flow-types';

interface ResponseInputProps {
  flowType: FlowType;
  onSubmit: (data: { content?: string; vote?: string; sections?: Record<string, string> }) => void;
}

export default function ResponseInput({ flowType, onSubmit }: ResponseInputProps) {
  const config = FLOW_TYPES[flowType];
  const [content, setContent] = useState('');
  const [vote, setVote] = useState('');
  const [sections, setSections] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    onSubmit({
      content: content || undefined,
      vote: vote || undefined,
      sections: Object.keys(sections).length > 0 ? sections : undefined,
    });
    setLoading(false);
  };

  const isStructured = config.responseType === 'structured' || config.responseType === 'quick';

  return (
    <Card>
      <h3
        className="text-xs font-medium uppercase tracking-wider text-text-muted mb-4"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Your response
      </h3>

      <div className="space-y-4">
        {/* Vote selector for decision flows */}
        {config.responseType === 'vote' && (
          <div>
            <p
              className="text-xs font-medium uppercase tracking-wider text-text-muted mb-2"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Your vote
            </p>
            <div className="flex gap-2">
              {['A', 'B', 'C', 'D'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setVote(option)}
                  className={`w-10 h-10 rounded-lg text-sm font-bold transition-all duration-150 ${
                    vote === option
                      ? 'bg-accent text-white'
                      : 'bg-bg-primary border border-border-default text-text-secondary hover:bg-bg-hover'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Structured sections for standup/retro */}
        {isStructured ? (
          config.sections.map((section) => (
            <Textarea
              key={section}
              id={`response-${section}`}
              label={section}
              placeholder={`Write about ${section.toLowerCase()}...`}
              value={sections[section] || ''}
              onChange={(e) => setSections({ ...sections, [section]: e.target.value })}
              rows={2}
            />
          ))
        ) : (
          <Textarea
            id="response-content"
            placeholder="Share your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
          />
        )}

        <div className="flex items-center gap-3">
          <Button onClick={handleSubmit} loading={loading}>
            Submit response
          </Button>
          <button
            type="button"
            className="text-xs text-text-muted hover:text-text-secondary transition-colors"
          >
            Attach file
          </button>
        </div>
      </div>
    </Card>
  );
}
