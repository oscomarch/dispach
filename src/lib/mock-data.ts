import type { Profile, Flow, Synthesis } from '@/types';

export const mockProfiles: Profile[] = [
  { id: '1', full_name: 'Sarah Chen', email: 'sarah@acme.com', avatar_url: null, created_at: '2024-01-01' },
  { id: '2', full_name: 'Marcus Rivera', email: 'marcus@acme.com', avatar_url: null, created_at: '2024-01-02' },
  { id: '3', full_name: 'Emily Watson', email: 'emily@acme.com', avatar_url: null, created_at: '2024-01-03' },
  { id: '4', full_name: 'Alex Kim', email: 'alex@acme.com', avatar_url: null, created_at: '2024-01-04' },
  { id: '5', full_name: 'Jordan Liu', email: 'jordan@acme.com', avatar_url: null, created_at: '2024-01-05' },
];

export const currentUser = mockProfiles[0];

const now = new Date();
const hoursAgo = (h: number) => new Date(now.getTime() - h * 3600000).toISOString();
const hoursFromNow = (h: number) => new Date(now.getTime() + h * 3600000).toISOString();

export const mockFlows: Flow[] = [
  {
    id: 'flow-1',
    team_id: 'team-1',
    author_id: '2',
    type: 'decision',
    title: 'Q2 product roadmap priorities',
    brief_content: {
      'Context & background': 'We need to decide which features to prioritize for Q2. Our main metrics are user retention and revenue growth. We have capacity for 2-3 major initiatives.',
      'Options on the table': 'A) AI-powered search redesign\nB) Enterprise SSO & permissions\nC) Mobile app v2\nD) API marketplace',
      'Recommendation': 'I lean toward A + B as they address both growth vectors.',
      'Risks & trade-offs': 'Choosing A+B delays mobile, which customers have been requesting. C alone could reduce churn by 15%.',
    },
    deadline: hoursFromNow(18),
    status: 'active',
    participant_ids: ['1', '3', '4', '5'],
    created_at: hoursAgo(48),
    updated_at: hoursAgo(2),
    author: mockProfiles[1],
    responses: [
      {
        id: 'resp-1',
        flow_id: 'flow-1',
        author_id: '3',
        content: 'I think A+B is the right call. Enterprise SSO is blocking three deals worth $240k ARR. AI search would be a strong differentiator.',
        vote: 'A',
        sections: null,
        video_url: null,
        attachments: [],
        created_at: hoursAgo(24),
        author: mockProfiles[2],
      },
      {
        id: 'resp-2',
        flow_id: 'flow-1',
        author_id: '4',
        content: 'I\'d push back on deprioritizing mobile. Our mobile traffic is up 40% QoQ. I\'d do B+C — SSO unlocks enterprise revenue, mobile reduces churn.',
        vote: 'B',
        sections: null,
        video_url: null,
        attachments: [],
        created_at: hoursAgo(12),
        author: mockProfiles[3],
      },
    ],
  },
  {
    id: 'flow-2',
    team_id: 'team-1',
    author_id: '1',
    type: 'standup',
    title: 'Engineering standup — March 18',
    brief_content: {
      'Yesterday': 'Shipped auth improvements',
      'Today': 'Working on API rate limiting',
      'Blockers': 'None currently',
    },
    deadline: hoursFromNow(4),
    status: 'active',
    participant_ids: ['2', '3', '4'],
    created_at: hoursAgo(3),
    updated_at: hoursAgo(1),
    author: mockProfiles[0],
    responses: [
      {
        id: 'resp-3',
        flow_id: 'flow-2',
        author_id: '2',
        content: null,
        vote: null,
        sections: { Yesterday: 'Reviewed PRs, merged search refactor', Today: 'Starting on caching layer', Blockers: 'Need access to staging Redis' },
        video_url: null,
        attachments: [],
        created_at: hoursAgo(2),
        author: mockProfiles[1],
      },
    ],
  },
  {
    id: 'flow-3',
    team_id: 'team-1',
    author_id: '3',
    type: 'review',
    title: 'Design review: New onboarding flow',
    brief_content: {
      'What to review (attach link)': 'Figma link: https://figma.com/file/xyz — New 3-step onboarding with team setup and template selection.',
      'Specific feedback areas': '1. Is the flow intuitive for non-technical users?\n2. Should we add a skip option for the template step?\n3. Does the visual hierarchy guide the eye correctly?',
      'Constraints to keep in mind': 'Must work on mobile. Must not increase time-to-first-value beyond 3 minutes.',
    },
    deadline: hoursFromNow(36),
    status: 'active',
    participant_ids: ['1', '2', '4', '5'],
    created_at: hoursAgo(6),
    updated_at: hoursAgo(6),
    author: mockProfiles[2],
    responses: [],
  },
  {
    id: 'flow-4',
    team_id: 'team-1',
    author_id: '1',
    type: 'brainstorm',
    title: 'Ideas for reducing meeting fatigue',
    brief_content: {
      'Problem statement': 'Our team spends 22 hours/week in meetings. We need creative ways to reduce this by at least 40% while maintaining alignment.',
      'Initial seed ideas': '- Async standups via Dispach\n- No-meeting Wednesdays\n- 25-minute meeting cap',
      'Constraints': 'Must maintain cross-team alignment. Cannot eliminate 1:1s.',
    },
    deadline: null,
    status: 'completed',
    participant_ids: ['2', '3', '4', '5'],
    created_at: hoursAgo(120),
    updated_at: hoursAgo(72),
    author: mockProfiles[0],
    responses: [
      {
        id: 'resp-4',
        flow_id: 'flow-4',
        author_id: '2',
        content: 'What about replacing all status meetings with async flows? That alone could save 8 hours/week. Also — Loom recordings for any presentation that\'s just one-way info sharing.',
        vote: null,
        sections: null,
        video_url: null,
        attachments: [],
        created_at: hoursAgo(96),
        author: mockProfiles[1],
      },
      {
        id: 'resp-5',
        flow_id: 'flow-4',
        author_id: '3',
        content: 'I love the no-meeting Wednesday idea. Also, can we make it a rule that every meeting needs a written agenda 24h in advance? If no agenda, the meeting gets auto-canceled.',
        vote: null,
        sections: null,
        video_url: null,
        attachments: [],
        created_at: hoursAgo(90),
        author: mockProfiles[2],
      },
      {
        id: 'resp-6',
        flow_id: 'flow-4',
        author_id: '4',
        content: 'Async decision-making is the biggest win. Most "alignment" meetings are really just decisions that could be async. Also: office hours instead of scheduled meetings.',
        vote: null,
        sections: null,
        video_url: null,
        attachments: [],
        created_at: hoursAgo(85),
        author: mockProfiles[3],
      },
      {
        id: 'resp-7',
        flow_id: 'flow-4',
        author_id: '5',
        content: 'Can we quantify the cost? If each person makes $75/hr, 22 hours of meetings = $7,500/week for a 5-person team. Make that visible and it changes behavior fast.',
        vote: null,
        sections: null,
        video_url: null,
        attachments: [],
        created_at: hoursAgo(80),
        author: mockProfiles[4],
      },
    ],
    synthesis: {
      id: 'synth-1',
      flow_id: 'flow-4',
      summary: 'The team generated strong ideas for reducing meeting load by 40%+. The strongest consensus is around **replacing status/update meetings with async flows** and **instituting protected no-meeting time blocks**. There\'s also interest in process changes like mandatory written agendas.',
      consensus: 'Everyone agrees that **async tools should replace status meetings** — this is the lowest-hanging fruit with the highest impact (estimated 8h/week savings). There\'s also strong support for **no-meeting Wednesdays** as protected deep work time.',
      disagreements: 'Minor differences on approach: Marcus favors **tool-first changes** (Loom, async flows), while Jordan emphasizes **making costs visible** to change behavior. Both approaches are complementary, not conflicting.',
      open_questions: '- Should no-meeting time be a full day or half-days?\n- How do we handle cross-timezone teams where sync time is already limited?\n- Who owns the rollout and enforcement?',
      action_items: [
        { task: 'Pilot async standups for engineering team this sprint', owner_id: '1', due_date: hoursFromNow(168) },
        { task: 'Draft no-meeting Wednesday policy for team review', owner_id: '3', due_date: hoursFromNow(120) },
        { task: 'Create meeting cost calculator and share with leadership', owner_id: '5', due_date: hoursFromNow(240) },
      ],
      created_at: hoursAgo(72),
    },
  },
  {
    id: 'flow-5',
    team_id: 'team-1',
    author_id: '4',
    type: 'retro',
    title: 'Sprint 14 retrospective',
    brief_content: {
      'What went well': 'Shipped 3 features on time, great collaboration between design and eng.',
      'What could improve': 'Too many context switches, QA bottleneck on the last day.',
      'Action items': 'Need to improve our testing pipeline.',
    },
    deadline: hoursFromNow(48),
    status: 'active',
    participant_ids: ['1', '2', '3', '5'],
    created_at: hoursAgo(12),
    updated_at: hoursAgo(12),
    author: mockProfiles[3],
    responses: [
      {
        id: 'resp-8',
        flow_id: 'flow-5',
        author_id: '2',
        content: null,
        vote: null,
        sections: {
          'What went well': 'Pair programming sessions were super productive. The new design system saved us hours.',
          'What could improve': 'We should start QA earlier in the sprint, not just the last 2 days.',
          'Action items': 'Set up automated E2E tests for critical paths.',
        },
        video_url: null,
        attachments: [],
        created_at: hoursAgo(8),
        author: mockProfiles[1],
      },
      {
        id: 'resp-9',
        flow_id: 'flow-5',
        author_id: '5',
        content: null,
        vote: null,
        sections: {
          'What went well': 'Clear sprint goals from the start. No mid-sprint scope changes.',
          'What could improve': 'Daily standups felt rushed. Maybe we should go async for standups?',
          'Action items': 'Try async standups next sprint using Dispach.',
        },
        video_url: null,
        attachments: [],
        created_at: hoursAgo(5),
        author: mockProfiles[4],
      },
    ],
  },
];

export const mockSynthesis: Synthesis = mockFlows[3].synthesis!;

// Helper to get flows awaiting current user's response
export function getFlowsAwaitingResponse(userId: string): Flow[] {
  return mockFlows.filter(
    (f) =>
      f.status === 'active' &&
      f.participant_ids.includes(userId) &&
      !f.responses?.some((r) => r.author_id === userId)
  );
}

// Helper to get flows ready to synthesize (created by user, has responses, no synthesis)
export function getFlowsReadyToSynthesize(userId: string): Flow[] {
  return mockFlows.filter(
    (f) =>
      f.status === 'active' &&
      f.author_id === userId &&
      (f.responses?.length ?? 0) > 0 &&
      !f.synthesis
  );
}

// Helper to get recently completed flows
export function getCompletedFlows(): Flow[] {
  return mockFlows
    .filter((f) => f.status === 'completed')
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 5);
}
