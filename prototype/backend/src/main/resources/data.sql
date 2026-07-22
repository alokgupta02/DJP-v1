-- Seed data for DJP Prototype H2 Database (local profile)

MERGE INTO users (id, email, name, provider, provider_id, role, reputation_score, subscription_status, onboarding_completed, joined_date)
KEY (id)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'citizen@djp.org', 'Prototype Citizen', 'DEV', 'dev-citizen', 'CITIZEN', 0, 'ACTIVE', true, CURRENT_TIMESTAMP()),
    ('22222222-2222-2222-2222-222222222222', 'admin@djp.org', 'Prototype Admin', 'DEV', 'dev-admin', 'LEADER', 100, 'ACTIVE', true, CURRENT_TIMESTAMP());

MERGE INTO issues (id, author_id, title, description, category, priority, status, workflow_step, location, supports_count, comments_count, created_at, updated_at)
KEY (id)
VALUES 
    ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'Overflowing bin on High St (Prototype)', 'Main waste collection point hasn''t been cleared for 3 days.', 'Garbage', 'HIGH', 'REPORTED', 0, 'High St Ward 4', 45, 12, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
    ('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'Deep pothole near Junction 4 (Prototype)', 'Hazardous pothole causing traffic slowdowns.', 'Pothole', 'MEDIUM', 'VERIFIED', 1, 'Junction 4', 102, 8, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());
