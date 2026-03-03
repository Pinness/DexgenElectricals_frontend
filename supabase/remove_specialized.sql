-- REMOVE SPECIALIZED SERVICES
-- Removes the specialized services section content from the database.

DELETE FROM site_content
WHERE section_key LIKE 'service_specialized%';
