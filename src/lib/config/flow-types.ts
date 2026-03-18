export const FLOW_TYPES = {
  status: {
    label: 'Status Update',
    icon: '📊',
    color: '#2B6CB0',
    description: 'Share progress without pulling everyone into a room',
    sections: ['What\'s done', 'What\'s in progress', 'Blockers', 'Next steps'],
    responseType: 'structured' as const,
  },
  decision: {
    label: 'Decision',
    icon: '⚖️',
    color: '#E8612D',
    description: 'Get alignment and make a call — async',
    sections: ['Context & background', 'Options on the table', 'Recommendation', 'Risks & trade-offs'],
    responseType: 'vote' as const,
  },
  review: {
    label: 'Review / Critique',
    icon: '🔍',
    color: '#6B46C1',
    description: 'Collect structured feedback on work',
    sections: ['What to review (attach link)', 'Specific feedback areas', 'Constraints to keep in mind'],
    responseType: 'feedback' as const,
  },
  brainstorm: {
    label: 'Brainstorm',
    icon: '💡',
    color: '#B7791F',
    description: 'Generate and build on ideas over 48 hours',
    sections: ['Problem statement', 'Initial seed ideas', 'Constraints'],
    responseType: 'freeform' as const,
  },
  retro: {
    label: 'Retrospective',
    icon: '🔄',
    color: '#2F855A',
    description: 'Reflect on what worked and what didn\'t',
    sections: ['What went well', 'What could improve', 'Action items'],
    responseType: 'structured' as const,
  },
  standup: {
    label: 'Daily Standup',
    icon: '🏃',
    color: '#C53030',
    description: 'Yesterday / Today / Blockers — 2 min per person',
    sections: ['Yesterday', 'Today', 'Blockers'],
    responseType: 'quick' as const,
  },
} as const;

export type FlowType = keyof typeof FLOW_TYPES;
export type ResponseType = typeof FLOW_TYPES[FlowType]['responseType'];
