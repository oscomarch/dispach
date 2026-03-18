import Link from 'next/link';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import ProgressBar from '@/components/ui/ProgressBar';
import { FLOW_TYPES } from '@/lib/config/flow-types';
import { formatDeadline, formatRelativeTime } from '@/lib/utils';
import type { Flow } from '@/types';

interface FlowCardProps {
  flow: Flow;
  accentColor?: string;
}

export default function FlowCard({ flow, accentColor }: FlowCardProps) {
  const config = FLOW_TYPES[flow.type];
  const responseCount = flow.responses?.length ?? 0;
  const totalParticipants = flow.participant_ids.length;

  return (
    <Link href={`/app/flow/${flow.id}`}>
      <Card
        accent={!!accentColor}
        accentColor={accentColor}
        className="hover:shadow-[var(--shadow-warm-md)] transition-all duration-150 cursor-pointer"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">{config.icon}</span>
            <Badge color={config.color}>{config.label}</Badge>
          </div>
          {flow.deadline && (
            <span
              className="text-xs text-text-muted"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {formatDeadline(flow.deadline)}
            </span>
          )}
        </div>

        <h3 className="text-base font-semibold text-text-primary mb-2" style={{ fontFamily: 'var(--font-body)' }}>
          {flow.title}
        </h3>

        <div className="flex items-center gap-3 mb-3">
          {flow.author && (
            <div className="flex items-center gap-1.5">
              <Avatar name={flow.author.full_name} src={flow.author.avatar_url} size="sm" />
              <span className="text-xs text-text-muted">{flow.author.full_name}</span>
            </div>
          )}
          <span className="text-xs text-text-muted">{formatRelativeTime(flow.created_at)}</span>
        </div>

        <ProgressBar
          current={responseCount}
          total={totalParticipants}
          color={config.color}
        />
      </Card>
    </Link>
  );
}
