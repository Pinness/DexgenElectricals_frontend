-- DUPLICATE CLEANUP SCRIPT
-- This script identifies and removes duplicate entries with the same section_key.
-- It keeps the most recently created/updated version of each record.

DELETE FROM site_content
WHERE id IN (
    SELECT id
    FROM (
        SELECT id,
               ROW_NUMBER() OVER (
                   PARTITION BY section_key 
                   ORDER BY updated_at DESC, created_at DESC
               ) as row_num
        FROM site_content
    ) t
    WHERE t.row_num > 1
);

-- OPTIONAL: Add a unique constraint to prevent this in the future
-- Note: Only run this if you want to strictly enforce one ID per section_key.
-- ALTER TABLE site_content ADD CONSTRAINT unique_section_key UNIQUE (section_key);
