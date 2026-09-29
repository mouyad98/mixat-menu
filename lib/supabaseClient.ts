import { createBrowserClient } from "@supabase/ssr";

// Use this inside "use client" components (e.g. the admin dashboard forms)
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
