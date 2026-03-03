-- SECURITY REFINEMENT PATCH
-- Restrict 'anon' access to strictly SELECT only.
-- This prevents any potential unauthorized writes even if RLS was misconfigured.

-- 1. Revoke excessive privileges from 'anon' (the default for public users)
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon;
REVOKE ALL ON ALL ROUTINES IN SCHEMA public FROM anon;

-- 2. Grant only SELECT to 'anon'
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;

-- 3. Explicitly verify RLS is ON (In case it was accidentally disabled)
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- 4. Re-grant full access only to 'authenticated' role
-- RLS policies will still govern what 'authenticated' can actually do.
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
