import { createClient } from '@supabase/supabase-js';

// Service-role client that bypasses RLS. Server-only — never expose to the client.
// Used for operations where no INSERT RLS policy exists (e.g., syntheses table).
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
