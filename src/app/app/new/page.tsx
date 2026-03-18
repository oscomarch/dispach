import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import NewFlowForm from '@/components/flows/NewFlowForm';

export default async function NewFlowPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: membership } = await supabase
    .from('team_members')
    .select('team_id')
    .eq('user_id', user.id)
    .limit(1)
    .single();

  if (!membership) redirect('/app');

  // Fetch team members (excluding current user) for participant selector
  const { data: teamMembers } = await supabase
    .from('team_members')
    .select('user_id, profiles:profiles!user_id(id, full_name, email, avatar_url, created_at)')
    .eq('team_id', membership.team_id)
    .neq('user_id', user.id);

  const members = (teamMembers || [])
    .map((tm) => {
      const p = tm.profiles;
      if (Array.isArray(p)) return p[0] || null;
      return p;
    })
    .filter(Boolean) as { id: string; full_name: string; email: string; avatar_url: string | null; created_at: string }[];

  return <NewFlowForm members={members} teamId={membership.team_id} />;
}
