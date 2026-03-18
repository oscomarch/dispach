import { redirect } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import { createClient } from '@/lib/supabase/server';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) redirect('/login');

  const { data: membership } = await supabase
    .from('team_members')
    .select('team_id')
    .eq('user_id', user.id)
    .limit(1)
    .single();

  const teamId = membership?.team_id;

  const { data: flows } = teamId
    ? await supabase
        .from('flows')
        .select('id, title, type, status, team_id, author_id, brief_content, deadline, participant_ids, created_at, updated_at')
        .eq('team_id', teamId)
        .order('created_at', { ascending: false })
    : { data: [] };

  return (
    <div className="flex min-h-screen">
      <Sidebar flows={flows || []} user={profile} />
      <main className="flex-1 min-h-screen">
        {children}
      </main>
    </div>
  );
}
