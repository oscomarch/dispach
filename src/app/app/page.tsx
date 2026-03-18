import { redirect } from 'next/navigation';
import FlowCard from '@/components/flows/FlowCard';
import { createClient } from '@/lib/supabase/server';
import type { Flow } from '@/types';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: membership } = await supabase
    .from('team_members')
    .select('team_id')
    .eq('user_id', user.id)
    .limit(1)
    .single();

  const teamId = membership?.team_id;

  // Fetch flows with author profiles and response/synthesis counts
  const { data: rawFlows } = teamId
    ? await supabase
        .from('flows')
        .select(`
          *,
          author:profiles!author_id(*),
          responses(id, author_id),
          synthesis:syntheses(id)
        `)
        .eq('team_id', teamId)
        .order('created_at', { ascending: false })
    : { data: [] };

  const flows = (rawFlows || []) as (Flow & {
    responses: { id: string; author_id: string }[];
    synthesis: { id: string }[] | { id: string } | null;
  })[];

  // Categorize flows
  const awaitingResponse = flows.filter(
    (f) =>
      f.status === 'active' &&
      f.participant_ids.includes(user.id) &&
      !f.responses?.some((r) => r.author_id === user.id)
  );

  const readyToSynthesize = flows.filter(
    (f) =>
      f.status === 'active' &&
      f.author_id === user.id &&
      (f.responses?.length ?? 0) > 0 &&
      (!f.synthesis || (Array.isArray(f.synthesis) && f.synthesis.length === 0))
  );

  const completedFlows = flows
    .filter((f) => f.status === 'completed')
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 5);

  // Stats
  const totalFlows = flows.length;
  const hoursSaved = Math.round(totalFlows * 0.75 * 4.2);
  const totalExpected = flows.reduce((sum, f) => sum + (f.participant_ids?.length || 0), 0);
  const totalResponded = flows.reduce((sum, f) => sum + (f.responses?.length || 0), 0);
  const responseRate = totalExpected > 0 ? Math.round((totalResponded / totalExpected) * 100) : 0;

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-8">
      {/* Stats bar */}
      <div className="flex items-center gap-8 mb-10">
        {[
          { label: 'Hours saved this week', value: `${hoursSaved}h` },
          { label: 'Meetings converted', value: `${totalFlows}` },
          { label: 'Response rate', value: `${responseRate}%` },
        ].map((stat) => (
          <div key={stat.label} className="flex items-baseline gap-2">
            <span className="text-2xl text-text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
              {stat.value}
            </span>
            <span
              className="text-xs uppercase tracking-wider text-text-muted"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Awaiting your response */}
      {awaitingResponse.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-accent rounded-full" />
            <h2
              className="text-xs font-medium uppercase tracking-wider text-text-muted"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Awaiting your response
            </h2>
            <span
              className="text-xs bg-accent-soft text-accent px-2 py-0.5 rounded-md font-medium"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {awaitingResponse.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {awaitingResponse.map((flow) => (
              <FlowCard key={flow.id} flow={flow} accentColor="#E8612D" />
            ))}
          </div>
        </section>
      )}

      {/* Ready to synthesize */}
      {readyToSynthesize.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-success rounded-full" />
            <h2
              className="text-xs font-medium uppercase tracking-wider text-text-muted"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Ready to synthesize
            </h2>
            <span
              className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-md font-medium"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {readyToSynthesize.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {readyToSynthesize.map((flow) => (
              <FlowCard key={flow.id} flow={flow} accentColor="#2F855A" />
            ))}
          </div>
        </section>
      )}

      {/* Recently completed */}
      {completedFlows.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2
              className="text-xs font-medium uppercase tracking-wider text-text-muted"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Recently completed
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedFlows.map((flow) => (
              <FlowCard key={flow.id} flow={flow} />
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {awaitingResponse.length === 0 && readyToSynthesize.length === 0 && completedFlows.length === 0 && (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🎉</p>
          <h2
            className="text-xl text-text-primary mb-2"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            You&apos;re all caught up
          </h2>
          <p className="text-sm text-text-muted">No flows need your attention right now.</p>
        </div>
      )}
    </div>
  );
}
