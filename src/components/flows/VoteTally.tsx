import type { Response } from '@/types';

interface VoteTallyProps {
  responses: Response[];
}

const voteColors: Record<string, string> = {
  A: '#E8612D',
  B: '#2B6CB0',
  C: '#6B46C1',
  D: '#2F855A',
  E: '#B7791F',
};

export default function VoteTally({ responses }: VoteTallyProps) {
  const votes = responses.filter((r) => r.vote);
  if (votes.length === 0) return null;

  const tally: Record<string, number> = {};
  votes.forEach((r) => {
    if (r.vote) {
      tally[r.vote] = (tally[r.vote] || 0) + 1;
    }
  });

  const maxVotes = Math.max(...Object.values(tally));

  return (
    <div className="space-y-2">
      <p
        className="text-xs font-medium uppercase tracking-wider text-text-muted"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Vote tally
      </p>
      <div className="space-y-2">
        {Object.entries(tally)
          .sort(([, a], [, b]) => b - a)
          .map(([option, count]) => (
            <div key={option} className="flex items-center gap-3">
              <span
                className="text-xs font-bold w-6 text-center"
                style={{ color: voteColors[option] || '#5C5A55' }}
              >
                {option}
              </span>
              <div className="flex-1 h-6 bg-border-light rounded overflow-hidden">
                <div
                  className="h-full rounded transition-all duration-500"
                  style={{
                    width: `${(count / maxVotes) * 100}%`,
                    backgroundColor: voteColors[option] || '#5C5A55',
                    opacity: 0.8,
                  }}
                />
              </div>
              <span
                className="text-xs text-text-muted w-4 text-right"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {count}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
