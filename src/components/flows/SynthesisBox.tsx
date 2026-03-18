'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import type { Synthesis } from '@/types';

interface SynthesisBoxProps {
  synthesis: Synthesis | null | undefined;
  responseCount: number;
  onSynthesize?: () => void;
}

export default function SynthesisBox({ synthesis, responseCount, onSynthesize }: SynthesisBoxProps) {
  const [loading, setLoading] = useState(false);

  const handleSynthesize = async () => {
    setLoading(true);
    onSynthesize?.();
    // Simulate AI processing
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
  };

  if (!synthesis && responseCount === 0) return null;

  return (
    <div
      className="rounded-xl p-6 border border-border-default"
      style={{
        background: 'linear-gradient(135deg, #FAF8F5 0%, #F6F3EE 50%, #EFEBE4 100%)',
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-accent text-lg">✦</span>
        <h3
          className="text-xs font-medium uppercase tracking-wider text-accent"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          AI Synthesis
        </h3>
      </div>

      {!synthesis && !loading && (
        <div className="text-center py-4">
          <p className="text-sm text-text-muted mb-4">
            {responseCount} response{responseCount !== 1 ? 's' : ''} ready to analyze
          </p>
          <Button onClick={handleSynthesize}>
            Synthesize responses
          </Button>
        </div>
      )}

      {loading && (
        <div className="flex items-center gap-3 py-4">
          <svg className="animate-spin h-5 w-5 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-sm text-text-secondary">
            Analyzing {responseCount} responses...
          </span>
        </div>
      )}

      {synthesis && (
        <div className="space-y-5 text-sm leading-relaxed">
          {synthesis.summary && (
            <div>
              <p className="font-semibold text-text-primary mb-1">Summary</p>
              <p className="text-text-secondary whitespace-pre-wrap">{synthesis.summary}</p>
            </div>
          )}
          {synthesis.consensus && (
            <div>
              <p className="font-semibold text-text-primary mb-1">Consensus</p>
              <p className="text-text-secondary whitespace-pre-wrap">{synthesis.consensus}</p>
            </div>
          )}
          {synthesis.disagreements && (
            <div>
              <p className="font-semibold text-text-primary mb-1">Disagreements</p>
              <p className="text-text-secondary whitespace-pre-wrap">{synthesis.disagreements}</p>
            </div>
          )}
          {synthesis.open_questions && (
            <div>
              <p className="font-semibold text-text-primary mb-1">Open Questions</p>
              <p className="text-text-secondary whitespace-pre-wrap">{synthesis.open_questions}</p>
            </div>
          )}
          {synthesis.action_items && synthesis.action_items.length > 0 && (
            <div>
              <p className="font-semibold text-text-primary mb-2">Action Items</p>
              <ul className="space-y-1.5">
                {synthesis.action_items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span className="text-text-secondary">{item.task}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
