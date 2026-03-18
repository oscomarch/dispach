import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  // Auth check
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { flow, responses } = await req.json();

  const systemPrompt = `You are an expert meeting facilitator and decision analyst. You analyze async discussion responses and produce clear, actionable summaries. Be direct and specific. Use bold for key findings. Structure your output as:

**Summary**: 2-3 sentence overview of the discussion
**Consensus**: What most participants agree on
**Disagreements**: Where opinions diverge and why
**Open Questions**: What remains unresolved
**Recommended Next Steps**: Specific actions with suggested owners

Keep it concise — this replaces a 30-minute meeting debrief.`;

  const userPrompt = `Flow type: ${flow.type}
Title: ${flow.title}
Brief: ${JSON.stringify(flow.brief_content)}
Deadline: ${flow.deadline}

Responses (${responses.length} of ${flow.participant_ids.length} participants):
${responses
  .map(
    (r: { author: { full_name: string }; vote?: string; content?: string; sections?: Record<string, string> }) =>
      `- ${r.author?.full_name || 'Unknown'}${r.vote ? ` (voted: ${r.vote})` : ''}:\n  ${r.content || JSON.stringify(r.sections)}`
  )
  .join('\n')}

Synthesize these responses. Be specific about who said what when relevant.`;

  const result = streamText({
    model: anthropic('claude-sonnet-4-20250514'),
    system: systemPrompt,
    prompt: userPrompt,
  });

  return result.toDataStreamResponse();
}
