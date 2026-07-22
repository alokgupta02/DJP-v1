-- Seed data for users in DJP Prototype H2 Database
MERGE INTO users (id, email, name, provider, provider_id, role, reputation_score, subscription_status, onboarding_completed, privacy_consent_given, privacy_consent_timestamp, joined_date, location, pincode, occupation, bio, topics)
KEY (id)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'citizen@djp.org', 'Prototype Citizen', 'DEV', 'dev-citizen', 'CITIZEN', 0, 'ACTIVE', true, true, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 'Ward 53, Bhopal', '462016', 'Software Engineer', 'Civic enthusiast working towards digital transformation.', 'Roads, Water Supply, Environment'),
    ('22222222-2222-2222-2222-222222222222', 'admin@djp.org', 'Prototype Admin', 'DEV', 'dev-admin', 'LEADER', 100, 'ACTIVE', true, true, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 'New Delhi', '110001', 'Public Administrator', 'Platform Administrator ensuring transparency.', 'Digital Governance, Corruption, Judiciary');


MERGE INTO users (id, email, name, provider, provider_id, role, reputation_score, subscription_status, onboarding_completed, privacy_consent_given, privacy_consent_timestamp, joined_date, location, pincode, occupation, bio, topics)
KEY (id)
VALUES ('11111111-1111-1111-1111-111111111111', 'citizen@djp.org', 'Prototype Citizen', 'DEV', 'dev-citizen', 'CITIZEN', 0, 'ACTIVE', true, true, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 'Ward 53, Bhopal', '462016', 'Software Engineer', 'Civic enthusiast working towards digital transformation.', 'Roads, Water Supply, Environment');
MERGE INTO users (id, email, name, provider, provider_id, role, reputation_score, subscription_status, onboarding_completed, privacy_consent_given, privacy_consent_timestamp, joined_date, location, pincode, occupation, bio, topics)
KEY (id)
VALUES ('e4e0ee0c-aa1e-4c5a-a2ae-045f7625d0ea', 'testonboard@djp.org', 'Citizen Verified', 'DEV', 'dev-testonboard@djp.org', 'CITIZEN', 0, 'ACTIVE', true, true, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 'Ward 44, Bhopal', '462001', 'Teacher', 'Civic teacher.', 'Education, Roads');