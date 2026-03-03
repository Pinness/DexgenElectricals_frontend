-- SUPPLEMENTARY SEED DATA
-- Fills in missing sections for a 100% dynamic CMS experience.

-- 1. Hero Section
INSERT INTO site_content (section_key, title, description, image_url, sort_order) VALUES
(
  'hero_section',
  'Professional Electrical Services You Can Trust',
  'From residential wiring to industrial installations, Dexgen Engineering delivers safe, reliable, and efficient electrical services across Lagos and beyond.',
  'https://swwxfpgirdznkwznjbwc.supabase.co/storage/v1/object/public/public-assets/hero-electrician.jpg',
  10
);

-- 2. Hero Trust Indicators
INSERT INTO site_content (section_key, title, description, metadata, sort_order) VALUES
(
  'hero_trust_licensed',
  'Licensed',
  '& Insured',
  '{"icon": "Shield"}'::jsonb,
  10
),
(
  'hero_trust_experience',
  '15+ Years',
  'Experience',
  '{"icon": "Clock"}'::jsonb,
  20
),
(
  'hero_trust_certified',
  'Certified',
  'Specialists',
  '{"icon": "Award"}'::jsonb,
  30
),
(
  'hero_trust_rating',
  '4.9/5',
  'Client Rating',
  '{"is_star": true}'::jsonb,
  40
);

-- 3. About Story
INSERT INTO site_content (section_key, title, description, sort_order) VALUES
(
  'about_story',
  'Our Story',
  'Founded in 2008, Dexgen Engineering has been serving the Lagos metropolitan area with dedication and excellence. What started as a small team of licensed electricians has grown into one of the most trusted electrical service providers in the region.\n\nOur commitment to quality workmanship, transparent pricing, and exceptional customer service has earned us the trust of hundreds of satisfied residential and commercial clients.',
  10
);

-- 4. About Certifications
INSERT INTO site_content (section_key, title, sort_order) VALUES
(
  'about_cert_lic',
  'Licensed Electrical Contractors',
  10
),
(
  'about_cert_ins',
  'Fully Insured & Bonded',
  20
),
(
  'about_cert_hnc',
  'HNC in Electrical Engineering',
  30
),
(
  'about_cert_safe',
  'Certified Safety Compliant',
  40
);
