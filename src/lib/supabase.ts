/**
 * Supabase client utilities for Evigo platform.
 *
 * - createBrowserClient  → use in Client Components ("use client")
 * - createServerClient   → use in Server Components, Route Handlers, Middleware
 *
 * Env vars required (add to .env.local):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 *   SUPABASE_SERVICE_ROLE_KEY  (server-only, never expose to browser)
 */

import { createBrowserClient as _createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// ── Browser client (anon key, safe for public clients) ─────────────────────
export function createBrowserClient() {
  return _createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// ── Server / Admin client (service role – SERVER ONLY) ────────────────────
// Never import this from a "use client" file or any NEXT_PUBLIC_ path.
export function createAdminClient() {
  if (!SERVICE_ROLE_KEY) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not set. This client is server-only."
    );
  }
  return createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

// ── Database type helpers ──────────────────────────────────────────────────

export type PageVisit = {
  id: string;
  session_id: string;
  page_path: string;
  page_title: string | null;
  referrer: string | null;
  user_agent: string | null;
  ip_address: string | null;
  country: string | null;
  city: string | null;
  device_type: "mobile" | "tablet" | "desktop" | null;
  user_phone: string | null;      // linked to logged-in user (nullable)
  duration_seconds: number | null;
  created_at: string;
};

export type SiteUser = {
  id: string;
  phone: string;
  role: "client" | "provider";
  profile_image: string | null;
  name: string | null;
  email: string | null;
  city: string | null;
  last_seen_at: string | null;
  created_at: string;
  updated_at: string;
};
