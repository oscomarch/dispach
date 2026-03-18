'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FlowTypeSelector from '@/components/flows/FlowTypeSelector';
import BriefEditor from '@/components/flows/BriefEditor';
import ParticipantSelector from '@/components/flows/ParticipantSelector';
import DeadlinePicker from '@/components/flows/DeadlinePicker';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { FLOW_TYPES, type FlowType } from '@/lib/config/flow-types';
import { createFlow } from '@/app/actions';
import type { Profile } from '@/types';

interface NewFlowFormProps {
  members: Profile[];
  teamId: string;
}

export default function NewFlowForm({ members, teamId }: NewFlowFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [flowType, setFlowType] = useState<FlowType | null>(null);
  const [title, setTitle] = useState('');
  const [briefContent, setBriefContent] = useState<Record<string, string>>({});
  const [participantIds, setParticipantIds] = useState<string[]>([]);
  const [deadline, setDeadline] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTypeSelect = (type: FlowType) => {
    setFlowType(type);
    setBriefContent({});
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!flowType) return;
    setLoading(true);
    setError('');

    try {
      const result = await createFlow({
        team_id: teamId,
        type: flowType,
        title,
        brief_content: briefContent,
        participant_ids: participantIds,
        deadline: deadline || null,
      });

      if (result.id) {
        router.push(`/app/flow/${result.id}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create flow');
      setLoading(false);
    }
  };

  const canProceedToStep3 = flowType && title.trim().length > 0;
  const canSubmit = participantIds.length > 0;

  return (
    <div className="max-w-[880px] mx-auto px-8 py-8">
      <div className="mb-8">
        <p
          className="text-xs font-medium uppercase tracking-wider text-accent mb-2"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          New async flow
        </p>
        <h1
          className="text-[28px] text-text-primary"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Replace a meeting
        </h1>
      </div>

      {/* Step 1: Pick type */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white text-xs font-bold">
            1
          </span>
          <h2 className="text-sm font-medium text-text-primary">Choose flow type</h2>
        </div>
        <FlowTypeSelector selected={flowType} onSelect={handleTypeSelect} />
      </section>

      {/* Step 2: Fill brief */}
      {step >= 2 && flowType && (
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white text-xs font-bold">
              2
            </span>
            <h2 className="text-sm font-medium text-text-primary">Write the brief</h2>
          </div>

          <div className="space-y-5">
            <Input
              id="title"
              label="Flow title"
              placeholder={`e.g. "${FLOW_TYPES[flowType].label} — ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}"`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <BriefEditor
              flowType={flowType}
              content={briefContent}
              onChange={setBriefContent}
            />
          </div>

          {canProceedToStep3 && step < 3 && (
            <Button
              onClick={() => setStep(3)}
              className="mt-6"
            >
              Continue
            </Button>
          )}
        </section>
      )}

      {/* Step 3: Participants + deadline */}
      {step >= 3 && flowType && (
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white text-xs font-bold">
              3
            </span>
            <h2 className="text-sm font-medium text-text-primary">Set participants & deadline</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ParticipantSelector
              members={members}
              selected={participantIds}
              onChange={setParticipantIds}
            />
            <DeadlinePicker value={deadline} onChange={setDeadline} />
          </div>

          {/* Preview */}
          {canSubmit && (
            <div className="mt-8">
              <p
                className="text-xs font-medium uppercase tracking-wider text-text-muted mb-3"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Preview
              </p>
              <Card>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{FLOW_TYPES[flowType].icon}</span>
                  <Badge color={FLOW_TYPES[flowType].color}>
                    {FLOW_TYPES[flowType].label}
                  </Badge>
                </div>
                <h3 className="text-base font-semibold text-text-primary mb-2">
                  {title}
                </h3>
                <p className="text-xs text-text-muted">
                  {participantIds.length} participant{participantIds.length !== 1 ? 's' : ''}
                  {deadline && ` · Due ${new Date(deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}`}
                </p>
              </Card>
            </div>
          )}

          {error && (
            <p className="text-sm text-error mt-4">{error}</p>
          )}

          <Button
            onClick={handleSubmit}
            loading={loading}
            disabled={!canSubmit}
            className="mt-6"
            size="lg"
          >
            Launch flow →
          </Button>
        </section>
      )}
    </div>
  );
}
