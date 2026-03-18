import { redirect, notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import FlowDetail from '@/components/flows/FlowDetail';

export default async function FlowDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: flow, error } = await supabase
    .from('flows')
    .select(`
      *,
      author:profiles!author_id(*),
      responses(*, author:profiles!author_id(*)),
      synthesis:syntheses(*)
    `)
    .eq('id', id)
    .single();

  if (error || !flow) {
    notFound();
  }

  // Supabase returns one-to-one relations as arrays — normalize synthesis
  const synthesis = Array.isArray(flow.synthesis)
    ? flow.synthesis[0] || null
    : flow.synthesis;

  const normalizedFlow = {
    ...flow,
    synthesis,
  };

  return <FlowDetail flow={normalizedFlow} userId={user.id} />;
}
