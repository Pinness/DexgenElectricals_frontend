-- METADATA KEY STANDARDIZATION
-- The frontend expects 'features' but the seed data used 'services' or 'details'.
-- This script migrates the JSONB keys.

UPDATE site_content
SET metadata = jsonb_set(metadata - 'services', '{features}', metadata->'services')
WHERE metadata ? 'services';

UPDATE site_content
SET metadata = jsonb_set(metadata - 'details', '{features}', metadata->'details')
WHERE metadata ? 'details';
