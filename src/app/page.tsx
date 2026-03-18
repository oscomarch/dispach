import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            dispach
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-all duration-150"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="max-w-[880px] mx-auto px-8 pt-24 pb-32">
        <div className="space-y-6">
          <p
            className="text-xs font-medium uppercase tracking-wider text-accent"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Async decision platform
          </p>
          <h2
            className="text-5xl leading-[1.15] text-text-primary"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Stop meeting.<br />
            Start deciding.
          </h2>
          <p className="text-lg text-text-secondary max-w-[600px] leading-relaxed">
            Dispach replaces meetings with structured async flows. Share context, collect input on everyone&apos;s schedule, and let AI synthesize decisions — no calendar invite needed.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <Link
              href="/signup"
              className="inline-flex items-center px-6 py-3 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-all duration-150"
            >
              Start for free
            </Link>
            <span className="text-sm text-text-muted">No credit card required</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-24 pt-12 border-t border-border-light">
          {[
            { value: '$375B', label: 'Lost yearly to unproductive meetings' },
            { value: '71%', label: 'Of managers say meetings are unproductive' },
            { value: '31h', label: 'Per month per employee in bad meetings' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl text-text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
                {stat.value}
              </div>
              <p className="text-sm text-text-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="mt-24">
          <p
            className="text-xs font-medium uppercase tracking-wider text-text-muted mb-8"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            How it works
          </p>
          <div className="grid grid-cols-2 gap-6">
            {[
              {
                step: '01',
                title: 'Brief',
                desc: 'The organizer writes context using a template adapted to the meeting type.',
              },
              {
                step: '02',
                title: 'Respond',
                desc: 'Participants contribute on their schedule — text, votes, attachments.',
              },
              {
                step: '03',
                title: 'Synthesize',
                desc: 'AI analyzes all responses: consensus, disagreements, next steps.',
              },
              {
                step: '04',
                title: 'Decide',
                desc: 'The flow closes with an explicit decision and action items.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-bg-card border border-border-default rounded-xl p-6"
              >
                <span
                  className="text-xs text-accent font-medium"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {item.step}
                </span>
                <h3
                  className="text-xl text-text-primary mt-2 mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Flow types */}
        <div className="mt-24">
          <p
            className="text-xs font-medium uppercase tracking-wider text-text-muted mb-8"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Replace any meeting type
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: '📊', label: 'Status Updates', color: '#2B6CB0' },
              { icon: '⚖️', label: 'Decisions', color: '#E8612D' },
              { icon: '🔍', label: 'Reviews', color: '#6B46C1' },
              { icon: '💡', label: 'Brainstorms', color: '#B7791F' },
              { icon: '🔄', label: 'Retrospectives', color: '#2F855A' },
              { icon: '🏃', label: 'Standups', color: '#C53030' },
            ].map((type) => (
              <div
                key={type.label}
                className="flex items-center gap-3 bg-bg-card border border-border-default rounded-lg px-4 py-3"
              >
                <span className="text-xl">{type.icon}</span>
                <span className="text-sm font-medium text-text-primary">{type.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <h3
            className="text-3xl text-text-primary mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Ready to kill the meeting?
          </h3>
          <p className="text-text-secondary mb-8">
            Join teams who replaced 80% of their meetings with async flows.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center px-6 py-3 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-all duration-150"
          >
            Get started for free
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-light py-8 px-8">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <span className="text-sm text-text-muted" style={{ fontFamily: 'var(--font-heading)' }}>
            dispach
          </span>
          <span className="text-xs text-text-muted" style={{ fontFamily: 'var(--font-mono)' }}>
            Kill the meeting.
          </span>
        </div>
      </footer>
    </div>
  );
}
