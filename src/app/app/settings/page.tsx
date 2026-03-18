import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import SettingsForm from '@/components/settings/SettingsForm';

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) redirect('/login');

  // Fetch team membership
  const { data: membership } = await supabase
    .from('team_members')
    .select('team_id')
    .eq('user_id', user.id)
    .limit(1)
    .single();

  if (!membership) redirect('/app');

  // Fetch team
  const { data: team } = await supabase
    .from('teams')
    .select('*')
    .eq('id', membership.team_id)
    .single();

  if (!team) redirect('/app');

  // Fetch team members with profiles
  const { data: members } = await supabase
    .from('team_members')
    .select('*, profile:profiles!user_id(*)')
    .eq('team_id', membership.team_id)
    .order('joined_at');

  return (
    <SettingsForm
      user={profile}
      team={team}
      members={members || []}
    />
  );
}
