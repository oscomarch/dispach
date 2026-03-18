import FlowCard from '@/components/flows/FlowCard';
import {
  currentUser,
  getFlowsAwaitingResponse,
  getFlowsReadyToSynthesize,
  getCompletedFlows,
  mockFlows,
} from '@/lib/mock-data';

export default function DashboardPage() {
  const awaitingResponse = getFlowsAwaitingResponse(currentUser.id);
  const readyToSynthesize = getFlowsReadyToSynthesize(currentUser.id);
  const completedFlows = getCompletedFlows();

  const totalFlows = mockFlows.length;
  const hoursPerMeeting = 0.75;
  const hoursSaved = Math.round(totalFlows * hoursPerMeeting * 4.2);
  const responseRate = 78;

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
