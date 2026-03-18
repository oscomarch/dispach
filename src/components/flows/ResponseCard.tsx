import Card from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import { formatRelativeTime } from '@/lib/utils';
import type { Response } from '@/types';

interface ResponseCardProps {
  response: Response;
}

export default function ResponseCard({ response }: ResponseCardProps) {
  const { author, vote, content, sections, created_at } = response;

  return (
    <Card>
      <div className="flex items-start gap-3">
        <Avatar
          name={author?.full_name || 'Unknown'}
          src={author?.avatar_url}
          size="md"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-text-primary">
              {author?.full_name || 'Unknown'}
            </span>
            {vote && (
              <Badge color="#E8612D">
                Vote: {vote}
              </Badge>
            )}
            <span className="text-xs text-text-muted ml-auto" style={{ fontFamily: 'var(--font-mono)' }}>
              {formatRelativeTime(created_at)}
            </span>
          </div>

          {content && (
            <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
              {content}
            </p>
          )}

          {sections && (
            <div className="space-y-3 mt-2">
              {Object.entries(sections).map(([key, value]) => (
                <div key={key}>
                  <p
                    className="text-[10px] font-medium uppercase tracking-wider text-text-muted mb-0.5"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {key}
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {response.video_url && (
            <div className="mt-3 flex items-center gap-2 text-xs text-accent">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Video note attached
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
