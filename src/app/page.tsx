import Link from 'next/link';
import Badge from '@/components/ui/Badge';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-sm border-b border-border-light">
        <div className="flex items-center justify-between px-8 py-4 max-w-[1100px] mx-auto">
          <Link href="/" className="flex items-center gap-0">
            <span
              className="text-base font-medium tracking-tight text-text-primary"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              dispach
            </span>
            <span className="text-accent text-base font-bold" style={{ fontFamily: 'var(--font-mono)' }}>.</span>
          </Link>
          <div className="flex items-center gap-5">
            <Link
              href="/login"
              className="text-xs uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white text-xs font-medium uppercase tracking-wider rounded-lg hover:bg-accent-hover transition-all duration-150"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Get started
              <kbd className="hidden sm:inline border border-white/20 rounded px-1.5 py-0.5 text-[10px] text-white/60">S</kbd>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="max-w-[1100px] mx-auto px-8">
        <div className="max-w-[800px] mx-auto text-center pt-20 md:pt-28 pb-16">
          <div className="animate-fade-in-up">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-accent-border bg-accent-soft text-accent text-xs tracking-wider uppercase"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Async Decision Platform
            </span>
          </div>

          <h2
            className="mt-8 text-5xl md:text-7xl leading-[1.05] tracking-tight text-text-primary animate-fade-in-up animation-delay-100"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Kill the meeting.<br />
            <span className="gradient-text">Ship the decision.</span>
          </h2>

          <p className="mt-6 text-lg md:text-xl text-text-secondary max-w-[540px] mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            Structured async flows replace your meetings. Context in, decisions out&mdash;on everyone&apos;s schedule.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-in-up animation-delay-300">
            <Link
              href="/signup"
              className="inline-flex items-center px-7 py-3 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-all duration-150 shadow-[var(--shadow-warm-md)] hover:shadow-[var(--shadow-warm-lg)]"
            >
              Start for free
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center px-7 py-3 bg-bg-card border border-border-default text-sm font-medium text-text-primary rounded-lg hover:bg-bg-hover transition-all duration-150"
            >
              See how it works
            </a>
          </div>
          <p
            className="mt-4 text-xs text-text-muted animate-fade-in-up animation-delay-400"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            No credit card required
          </p>
        </div>

        {/* Product Mockup */}
        <div className="max-w-[900px] mx-auto animate-fade-in-up animation-delay-500">
          <div className="bg-bg-card border border-border-default rounded-2xl shadow-[var(--shadow-warm-lg)] overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border-default bg-bg-secondary">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-border-default" />
                <div className="w-2.5 h-2.5 rounded-full bg-border-default" />
                <div className="w-2.5 h-2.5 rounded-full bg-border-default" />
              </div>
              <div className="flex-1 flex justify-center">
                <span
                  className="text-xs text-text-muted px-3 py-0.5 bg-bg-primary rounded-md border border-border-light"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  app.dispach.io
                </span>
              </div>
              <div className="w-[52px]" />
            </div>

            {/* Dashboard content */}
            <div className="p-6 md:p-8">
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { value: '22h', label: 'Saved this week' },
                  { value: '12', label: 'Flows completed' },
                  { value: '94%', label: 'Response rate' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-bg-secondary rounded-lg p-4 border border-border-light">
                    <div
                      className="text-2xl text-text-primary font-light"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-[10px] text-text-muted uppercase tracking-wider mt-1"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mock flow cards */}
              <div className="space-y-3">
                <div className="bg-bg-secondary rounded-xl p-5 border border-border-light border-l-[3px]" style={{ borderLeftColor: '#2F855A' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-text-primary">Q1 Planning Review</h4>
                      <p className="text-xs text-text-muted mt-1">8 of 8 responses &middot; Updated 2h ago</p>
                    </div>
                    <Badge color="#2F855A">Ready to synthesize</Badge>
                  </div>
                </div>
                <div className="bg-bg-secondary rounded-xl p-5 border border-border-light border-l-[3px]" style={{ borderLeftColor: '#E8612D' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-text-primary">API v3 Design Decision</h4>
                      <p className="text-xs text-text-muted mt-1">3 of 5 responses &middot; Due in 6h</p>
                    </div>
                    <Badge color="#E8612D">Awaiting responses</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Fade out overlay */}
            <div className="h-12 bg-gradient-to-t from-bg-card to-transparent -mt-12 relative z-10" />
          </div>
        </div>

        {/* Social Proof */}
        <div className="max-w-[800px] mx-auto mt-20 text-center">
          <p
            className="text-xs uppercase tracking-wider text-text-muted mb-6"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Trusted by teams who ship
          </p>
          <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
            {['Stripe', 'Vercel', 'Linear', 'Notion', 'Figma', 'Loom'].map((name) => (
              <span
                key={name}
                className="text-sm font-medium text-text-muted/40 uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-[900px] mx-auto mt-24">
          <div className="bg-bg-secondary rounded-2xl p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-start justify-between gap-8">
              {[
                { value: '$375B', label: 'Lost yearly to unproductive meetings' },
                { value: '71%', label: 'Of managers say meetings are unproductive' },
                { value: '31h', label: 'Per month per employee in bad meetings' },
              ].map((stat, i) => (
                <div key={stat.label} className="flex-1 flex flex-col items-center text-center md:items-start md:text-left">
                  <div className="flex items-start gap-8 w-full">
                    {i > 0 && <div className="hidden md:block w-px h-16 bg-border-default -ml-4 mr-4 flex-shrink-0" />}
                    <div>
                      <div
                        className="text-4xl md:text-5xl text-accent tracking-tight"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {stat.value}
                      </div>
                      <p
                        className="text-xs text-text-muted mt-2 uppercase tracking-wider"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How it works */}
        <div id="how-it-works" className="mt-24 scroll-mt-20">
          <div className="flex items-center gap-4 mb-12">
            <p
              className="text-xs font-medium uppercase tracking-wider text-text-muted whitespace-nowrap"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              How it works
            </p>
            <div className="flex-1 h-px bg-border-default" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0">
            {[
              {
                step: '1',
                title: 'Brief',
                desc: 'The organizer writes context using a template adapted to the flow type.',
              },
              {
                step: '2',
                title: 'Respond',
                desc: 'Participants contribute on their schedule — text, votes, attachments.',
              },
              {
                step: '3',
                title: 'Synthesize',
                desc: 'AI analyzes all responses: consensus, disagreements, next steps.',
              },
              {
                step: '4',
                title: 'Decide',
                desc: 'The flow closes with an explicit decision and action items.',
              },
            ].map((item, i) => (
              <div key={item.step} className="relative flex md:flex-col items-start gap-4 md:items-center md:text-center px-4 group">
                {/* Connecting line */}
                {i < 3 && (
                  <div className="hidden md:block absolute top-4 left-[calc(50%+20px)] w-[calc(100%-40px)] h-px bg-border-default" />
                )}
                <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold flex-shrink-0 relative z-10" style={{ fontFamily: 'var(--font-mono)' }}>
                  {item.step}
                </div>
                <div>
                  <h3
                    className="text-lg text-text-primary mb-1"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flow Types */}
        <div className="mt-24">
          <div className="flex items-center gap-4 mb-12">
            <p
              className="text-xs font-medium uppercase tracking-wider text-text-muted whitespace-nowrap"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Built for every async workflow
            </p>
            <div className="flex-1 h-px bg-border-default" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { code: '[status]', label: 'Status Updates', desc: 'Replace daily standups with async check-ins.', color: '#2B6CB0' },
              { code: '[decide]', label: 'Decisions', desc: 'Structured proposals with clear outcomes.', color: '#E8612D' },
              { code: '[review]', label: 'Reviews', desc: 'Collect feedback without the calendar ping-pong.', color: '#6B46C1' },
              { code: '[brain]', label: 'Brainstorms', desc: 'Ideas without the loudest voice winning.', color: '#B7791F' },
              { code: '[retro]', label: 'Retrospectives', desc: 'Honest reflection on everyone\'s time.', color: '#2F855A' },
              { code: '[standup]', label: 'Standups', desc: 'Quick blockers and progress, async.', color: '#C53030' },
            ].map((type) => (
              <div
                key={type.label}
                className="bg-bg-card border border-border-default rounded-xl p-5 border-l-[3px] hover:border-accent hover:shadow-[var(--shadow-warm-md)] transition-all duration-200 cursor-default"
                style={{ borderLeftColor: type.color }}
              >
                <span
                  className="text-xs text-text-muted"
                  style={{ fontFamily: 'var(--font-mono)', color: type.color }}
                >
                  {type.code}
                </span>
                <h3
                  className="text-base text-text-primary mt-2 mb-1"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {type.label}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal Block */}
        <div className="max-w-[700px] mx-auto mt-24 text-center">
          <div className="bg-[#1A1A1A] rounded-xl p-6 text-left overflow-x-auto">
            <pre className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>
              <span className="text-text-muted">$</span>{' '}
              <span className="text-[#FAF8F5]">dispach create --type decision --title</span>{' '}
              <span className="text-accent">&quot;API v3 architecture&quot;</span>
              {'\n'}
              <span className="text-[#2F855A]">Flow created.</span>{' '}
              <span className="text-[#FAF8F5]/70">4 participants notified.</span>
              {'\n'}
              <span className="text-[#FAF8F5]/70">Responses due in 24h.</span>
            </pre>
          </div>
          <h3
            className="text-2xl md:text-3xl text-text-primary mt-10"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Built for teams who ship.
          </h3>
          <p className="text-text-secondary mt-3 max-w-[480px] mx-auto">
            No more &quot;this could have been an email.&quot; Dispach makes every decision explicit, traceable, and async-first.
          </p>
        </div>

        {/* CTA */}
        <div className="max-w-[900px] mx-auto mt-24 mb-24">
          <div className="bg-bg-secondary rounded-2xl p-10 md:p-16 text-center">
            <h3
              className="text-3xl md:text-4xl text-text-primary tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Stop scheduling.<br />Start shipping.
            </h3>
            <p className="text-text-secondary text-lg mt-4 mb-8">
              Your team&apos;s next decision is one flow away.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center px-8 py-4 bg-accent text-white text-base font-medium rounded-lg hover:bg-accent-hover transition-all duration-150 shadow-[var(--shadow-warm-md)] hover:shadow-[var(--shadow-warm-lg)]"
            >
              Get started for free
            </Link>
            <p
              className="text-xs text-text-muted mt-4"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Free for teams up to 10. No credit card.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-light py-8 px-8">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          <span
            className="text-sm text-text-muted"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            dispach
          </span>
          <div className="flex items-center gap-6">
            {['Twitter', 'GitHub', 'Blog'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-text-muted hover:text-text-secondary transition-colors"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {link}
              </a>
            ))}
          </div>
          <span
            className="text-xs text-text-muted hidden sm:inline"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Kill the meeting.
          </span>
        </div>
      </footer>
    </div>
  );
}
