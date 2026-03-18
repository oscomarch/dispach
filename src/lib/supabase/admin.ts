import { createClient } from '@supabase/supabase-js';

// Lazy-initialized admin client. Must NOT be created at module level
// because this module could be evaluated during bundling and the
// service role key is a server-only secret.
let _admin: ReturnType<typeof createClient> | null = null;

export function getSupabaseAdmin() {
  if (!_admin) {
    _admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }
  return _admin;
}
