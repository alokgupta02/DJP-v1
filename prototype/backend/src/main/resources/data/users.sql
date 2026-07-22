-- Seed data for users in DJP Prototype H2 Database
MERGE INTO users (id, email, name, provider, provider_id, role, reputation_score, subscription_status, onboarding_completed, privacy_consent_given, privacy_consent_timestamp, joined_date)
KEY (id)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'citizen@djp.org', 'Prototype Citizen', 'DEV', 'dev-citizen', 'CITIZEN', 0, 'ACTIVE', true, true, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
    ('22222222-2222-2222-2222-222222222222', 'admin@djp.org', 'Prototype Admin', 'DEV', 'dev-admin', 'LEADER', 100, 'ACTIVE', true, true, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());
