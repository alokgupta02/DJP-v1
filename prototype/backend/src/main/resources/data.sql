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

MERGE INTO discussions (id, author_id, title, description, category, votes_count, participant_count, proposal_count, proposal_preview, proposal_badge, proposal_badge_variant, created_at, updated_at)
KEY (id)
VALUES 
    ('55555555-5555-5555-5555-555555555555', '11111111-1111-1111-1111-111111111111', 'Sustainable Multi-level Parking in Hauz Khas Village?', 'The current congestion is killing local businesses. We need a solution that balances foot traffic with environmental concerns and heritage preservation.', 'Infrastructure', 142, 48, 3, '"Implement an automated smart-stack parking system integrated with existing greenery..."', 'Top Draft', 'primary', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
    ('66666666-6666-6666-6666-666666666666', '11111111-1111-1111-1111-111111111111', 'Decentralized Waste Composting Units for Ward 42', 'Moving away from centralized landfills. Proposal for local RWA-managed composting zones to reduce trucking emissions.', 'Public Health', 89, 22, 1, '"Convert the derelict park corner into a modular biogas and composting facility..."', 'New', 'warning', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());

MERGE INTO polls (id, author_id, question, description, category, options_json, votes_count, comments_count, expires_at, created_at, updated_at)
KEY (id)
VALUES 
    ('77777777-7777-7777-7777-777777777777', '11111111-1111-1111-1111-111111111111', 'Should Ward 12 implement "No Car Sundays" on the Central Corridor?', 'This proposal aims to reduce local carbon emissions and promote pedestrian activity. The pilot would run for 6 months between 8 AM and 4 PM.', 'High Priority', '[{"label":"Yes, implement it","pct":64,"primary":true},{"label":"No, maintain current traffic","pct":36,"primary":false}]', 12402, 482, CURRENT_TIMESTAMP() + INTERVAL '7' DAY, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
    ('88888888-8888-8888-8888-888888888888', '11111111-1111-1111-1111-111111111111', 'Increase funding for Ward 12 Community Gardens?', 'Allocating budget from discretionary community funds to establish 5 new urban gardens.', 'Environment', '[{"label":"Yes, allocate funds","pct":82,"primary":true},{"label":"No, prioritize roads","pct":18,"primary":false}]', 4100, 115, CURRENT_TIMESTAMP() + INTERVAL '5' DAY, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());
