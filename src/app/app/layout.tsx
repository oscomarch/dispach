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

  let supabase;
  try {
    supabase = await createClient();
  } catch {
    redirect('/login');
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Fetch profile — create one if it doesn't exist yet (e.g. fresh OAuth signup)
  let { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) {
    const meta = user.user_metadata || {};
    const { data: newProfile } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: meta.full_name || meta.name || user.email?.split('@')[0] || 'User',
        email: user.email || '',
        avatar_url: meta.avatar_url || null,
      })
      .select('*')
      .single();

    profile = newProfile;
  }

  if (!profile) {
    // Profile creation failed — show error instead of redirect loop
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
        <div className="max-w-[400px] text-center">
          <h2 className="text-xl text-text-primary mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            Account setup incomplete
          </h2>
          <p className="text-sm text-text-muted mb-4">
            Your profile could not be created. Please try signing out and back in.
          </p>
          <a href="/login" className="px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-all inline-block">
            Go to login
          </a>
        </div>
      </div>
    );
  }

  // Fetch team membership — handle case where user has no team yet
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
