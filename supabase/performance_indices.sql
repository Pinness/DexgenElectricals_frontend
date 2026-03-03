-- PERFORMANCE OPTIMIZATION PATCH
-- Add indices to speed up content management queries

-- 1. Index for fast section grouping and ordering
CREATE INDEX IF NOT EXISTS idx_site_content_section_sort 
ON public.site_content (section_key, sort_order);

-- 2. Index for quick published item filtering
CREATE INDEX IF NOT EXISTS idx_site_content_published 
ON public.site_content (is_published) 
WHERE is_published = true;

-- 3. Verify admin_profiles lookup speed
CREATE INDEX IF NOT EXISTS idx_admin_profiles_id 
ON public.admin_profiles (id);

ANALYZE public.site_content;
ANALYZE public.admin_profiles;
