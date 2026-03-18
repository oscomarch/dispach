import { redirect } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
        <div className="max-w-[500px] text-center">
          <h1
            className="text-2xl text-text-primary mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Supabase not configured
          </h1>
          <p className="text-sm text-text-secondary mb-6">
            Create a <code className="px-1.5 py-0.5 bg-bg-secondary rounded text-accent font-mono text-xs">.env.local</code> file
            in the project root with your Supabase credentials:
          </p>
          <div className="bg-[#1A1A1A] rounded-xl p-5 text-left">
            <pre className="text-sm text-[#FAF8F5]/80 leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>
{`NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ANTHROPIC_API_KEY=your-api-key`}
            </pre>
          </div>
          <p className="text-xs text-text-muted mt-4">
            Then restart the dev server.
          </p>
        </div>
      </div>
    );
  }

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
