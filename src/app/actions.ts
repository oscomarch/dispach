'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import type { FlowType } from '@/lib/config/flow-types';
import type { ActionItem } from '@/types';

export async function createFlow(input: {
  team_id: string;
  type: FlowType;
  title: string;
  brief_content: Record<string, string>;
  participant_ids: string[];
  deadline: string | null;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('flows')
    .insert({
      team_id: input.team_id,
      author_id: user.id,
      type: input.type,
      title: input.title,
      brief_content: input.brief_content,
      participant_ids: input.participant_ids,
      deadline: input.deadline,
      status: 'active',
    })
    .select('id')
    .single();

  if (error) throw new Error(error.message);

  revalidatePath('/app');
  return { id: data.id };
}

export async function submitResponse(
  flowId: string,
  responseData: { content?: string; vote?: string; sections?: Record<string, string> }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase.from('responses').insert({
    flow_id: flowId,
    author_id: user.id,
    content: responseData.content || null,
    vote: responseData.vote || null,
    sections: responseData.sections || null,
  });

  if (error) throw new Error(error.message);

  revalidatePath('/app');
}

export async function saveSynthesis(
  flowId: string,
  synthesis: {
    summary: string;
    consensus: string | null;
    disagreements: string | null;
    open_questions: string | null;
    action_items: ActionItem[];
  }
) {
  // Use admin client — no INSERT RLS policy on syntheses table
  const { error: synthError } = await supabaseAdmin.from('syntheses').upsert(
    {
      flow_id: flowId,
      summary: synthesis.summary,
      consensus: synthesis.consensus,
      disagreements: synthesis.disagreements,
      open_questions: synthesis.open_questions,
      action_items: synthesis.action_items,
    },
    { onConflict: 'flow_id' }
  );

  if (synthError) throw new Error(synthError.message);

  // Mark flow as completed
  const { error: flowError } = await supabaseAdmin
    .from('flows')
    .update({ status: 'completed', updated_at: new Date().toISOString() })
    .eq('id', flowId);

  if (flowError) throw new Error(flowError.message);

  revalidatePath('/app');
}

export async function updateTeamName(teamId: string, name: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('teams')
    .update({ name })
    .eq('id', teamId);

  if (error) throw new Error(error.message);

  revalidatePath('/app/settings');
  revalidatePath('/app');
}

export async function inviteTeamMember(teamId: string, email: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // Find profile by email
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email)
    .single();

  if (profileError || !profile) {
    return { error: 'No user found with that email. They need to sign up first.' };
  }

  const { error } = await supabase.from('team_members').insert({
    team_id: teamId,
    user_id: profile.id,
    role: 'member',
  });

  if (error) {
    if (error.code === '23505') {
      return { error: 'This user is already a member of the team.' };
    }
    return { error: error.message };
  }

  revalidatePath('/app/settings');
  revalidatePath('/app');
  return { error: null };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
