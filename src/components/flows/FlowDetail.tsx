'use client';

import { useRouter } from 'next/navigation';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import ProgressBar from '@/components/ui/ProgressBar';
import ResponseCard from '@/components/flows/ResponseCard';
import ResponseInput from '@/components/flows/ResponseInput';
import VoteTally from '@/components/flows/VoteTally';
import SynthesisBox from '@/components/flows/SynthesisBox';
import { FLOW_TYPES } from '@/lib/config/flow-types';
import { submitResponse } from '@/app/actions';
import { formatRelativeTime, formatDeadline } from '@/lib/utils';
import type { Flow } from '@/types';

interface FlowDetailProps {
  flow: Flow;
  userId: string;
}

export default function FlowDetail({ flow, userId }: FlowDetailProps) {
  const router = useRouter();
  const config = FLOW_TYPES[flow.type];
  const responses = flow.responses || [];
  const hasResponded = responses.some((r) => r.author_id === userId);
  const isParticipant = flow.participant_ids.includes(userId);

  const handleResponseSubmit = async (data: { content?: string; vote?: string; sections?: Record<string, string> }) => {
    try {
      await submitResponse(flow.id, data);
      router.refresh();
    } catch (err) {
      console.error('Failed to submit response:', err);
    }
  };

  return (
    <div className="max-w-[880px] mx-auto px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge color={config.color}>
            <span className="mr-1">{config.icon}</span>
            {config.label}
          </Badge>
          {flow.status === 'completed' && (
            <Badge color="#2F855A">Completed</Badge>
          )}
        </div>

        <h1
          className="text-[26px] text-text-primary mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {flow.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-text-muted">
          <div className="flex items-center gap-2">
            {flow.author && (
              <>
                <Avatar name={flow.author.full_name} src={flow.author.avatar_url} size="sm" />
                <span>{flow.author.full_name}</span>
              </>
            )}
          </div>
          <span>{formatRelativeTime(flow.created_at)}</span>
          {flow.deadline && (
            <span
              className="px-2 py-0.5 bg-accent-soft text-accent rounded text-xs font-medium"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {formatDeadline(flow.deadline)}
            </span>
          )}
        </div>

        <div className="mt-4 max-w-[400px]">
          <ProgressBar
            current={responses.length}
            total={flow.participant_ids.length}
            color={config.color}
          />
          <p className="text-xs text-text-muted mt-1">
            {responses.length} of {flow.participant_ids.length} responded
          </p>
        </div>
      </div>

      {/* Brief */}
      <section className="mb-8">
        <h2
          className="text-xs font-medium uppercase tracking-wider text-text-muted mb-4"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Brief
        </h2>
        <div className="space-y-4">
          {Object.entries(flow.brief_content).map(([section, content]) => (
            <div key={section} className="bg-bg-card border border-border-default rounded-xl p-6 shadow-[var(--shadow-warm)]">
              <p
                className="text-[10px] font-medium uppercase tracking-wider text-text-muted mb-2"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {section}
              </p>
              <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                {content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Vote tally (decision flows only) */}
      {flow.type === 'decision' && responses.length > 0 && (
        <section className="mb-8">
          <VoteTally responses={responses} />
        </section>
      )}

      {/* Responses */}
      {responses.length > 0 && (
        <section className="mb-8">
          <h2
            className="text-xs font-medium uppercase tracking-wider text-text-muted mb-4"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Responses ({responses.length})
          </h2>
          <div className="space-y-4">
            {responses.map((response) => (
              <ResponseCard key={response.id} response={response} />
            ))}
          </div>
        </section>
      )}

      {/* AI Synthesis */}
      <section className="mb-8">
        <SynthesisBox
          synthesis={flow.synthesis}
          responseCount={responses.length}
          flowId={flow.id}
          flow={flow}
          responses={responses}
        />
      </section>

      {/* Response input */}
      {flow.status === 'active' && isParticipant && !hasResponded && (
        <section className="mb-8">
          <ResponseInput
            flowType={flow.type}
            onSubmit={handleResponseSubmit}
          />
        </section>
      )}

      {/* Already responded message */}
      {hasResponded && (
        <div className="text-center py-6">
          <p className="text-sm text-text-muted">You&apos;ve already responded to this flow.</p>
        </div>
      )}
    </div>
  );
}
