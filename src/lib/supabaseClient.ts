import { createClient } from "@supabase/supabase-js";

// Fetch from Vite environment variables (.env.local & Vercel)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase environment variables are missing.");
}

// Single instance of the Supabase Client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
