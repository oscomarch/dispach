'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { saveSynthesis } from '@/app/actions';
import type { Synthesis, Flow, Response as FlowResponse, ActionItem } from '@/types';

interface SynthesisBoxProps {
  synthesis: Synthesis | null | undefined;
  responseCount: number;
  flowId: string;
  flow: Flow;
  responses: FlowResponse[];
}

function parseSynthesisText(text: string): {
  summary: string;
  consensus: string | null;
  disagreements: string | null;
  open_questions: string | null;
  action_items: ActionItem[];
} {
  const sections: Record<string, string> = {};
  const sectionNames = ['Summary', 'Consensus', 'Disagreements', 'Open Questions', 'Recommended Next Steps'];

  for (const name of sectionNames) {
    const regex = new RegExp(`\\*\\*${name}\\*\\*[:\\s]*([\\s\\S]*?)(?=\\*\\*(?:${sectionNames.join('|')})\\*\\*|$)`, 'i');
    const match = text.match(regex);
    if (match) {
      sections[name] = match[1].trim();
    }
  }

  // Parse action items from "Recommended Next Steps" as a list
  const actionItems: ActionItem[] = [];
  const stepsText = sections['Recommended Next Steps'] || '';
  const lines = stepsText.split('\n').filter((l) => l.trim().startsWith('-') || l.trim().startsWith('*') || /^\d+\./.test(l.trim()));
  for (const line of lines) {
    const task = line.replace(/^[\s\-*\d.]+/, '').trim();
    if (task) {
      actionItems.push({ task, owner_id: null, due_date: null });
    }
  }

  return {
    summary: sections['Summary'] || text.slice(0, 500),
    consensus: sections['Consensus'] || null,
    disagreements: sections['Disagreements'] || null,
    open_questions: sections['Open Questions'] || null,
    action_items: actionItems,
  };
}

export default function SynthesisBox({ synthesis, responseCount, flowId, flow, responses }: SynthesisBoxProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [streamedText, setStreamedText] = useState('');
  const [error, setError] = useState('');

  const handleSynthesize = async () => {
    setLoading(true);
    setStreamedText('');
    setError('');

    try {
      const res = await fetch('/api/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flow, responses }),
      });

      if (!res.ok) {
        throw new Error('Failed to start synthesis');
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(Boolean);

        for (const line of lines) {
          // AI SDK data stream format: 0:"text chunk"
          if (line.startsWith('0:')) {
            try {
              const text = JSON.parse(line.slice(2));
              fullText += text;
              setStreamedText(fullText);
            } catch {
              // Skip malformed lines
            }
          }
        }
      }

      // Parse the completed text into structured synthesis
      const parsed = parseSynthesisText(fullText);

      // Save to database
      await saveSynthesis(flowId, parsed);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Synthesis failed');
    } finally {
      setLoading(false);
    }
  };

  if (!synthesis && responseCount === 0 && !streamedText) return null;

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

      {!synthesis && !loading && !streamedText && (
        <div className="text-center py-4">
          <p className="text-sm text-text-muted mb-4">
            {responseCount} response{responseCount !== 1 ? 's' : ''} ready to analyze
          </p>
          <Button onClick={handleSynthesize}>
            Synthesize responses
          </Button>
          {error && <p className="text-sm text-error mt-3">{error}</p>}
        </div>
      )}

      {loading && (
        <div className="py-4">
          <div className="flex items-center gap-3 mb-4">
            <svg className="animate-spin h-5 w-5 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-sm text-text-secondary">
              Analyzing {responseCount} responses...
            </span>
          </div>
          {streamedText && (
            <div className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
              {streamedText}
            </div>
          )}
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
