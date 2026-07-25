-- Seed data for DJP Prototype H2 Database (local profile)

INSERT INTO users (id, email, name, provider, provider_id, role, reputation_score, subscription_status, onboarding_completed, joined_date)
VALUES 
    ('1f4c2da8-eedd-4523-b541-7c818c237fff', 'citizen@djp.org', 'Prototype Citizen', 'DEV', 'dev-citizen', 'CITIZEN', 0, 'ACTIVE', true, CURRENT_TIMESTAMP()),
    ('c82b82ab-e0e0-4182-b50a-f2d391fb3296', 'admin@djp.org', 'Prototype Admin', 'DEV', 'dev-admin', 'LEADER', 100, 'ACTIVE', true, CURRENT_TIMESTAMP());

INSERT INTO issues (id, author_id, title, description, category, priority, status, workflow_step, location, supports_count, comments_count, created_at, updated_at)
VALUES 
    ('990671fe-24d5-480f-9da5-76352b8cefd4', '1f4c2da8-eedd-4523-b541-7c818c237fff', 'Overflowing bin on High St (Prototype)', 'Main waste collection point hasn''t been cleared for 3 days.', 'Garbage', 'HIGH', 'REPORTED', 0, 'High St Ward 4', 45, 12, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
    ('51512996-3ffb-4205-8930-072ea7e94f1e', '1f4c2da8-eedd-4523-b541-7c818c237fff', 'Deep pothole near Junction 4 (Prototype)', 'Hazardous pothole causing traffic slowdowns.', 'Pothole', 'MEDIUM', 'VERIFIED', 1, 'Junction 4', 102, 8, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());
