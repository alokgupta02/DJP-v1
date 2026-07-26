-- Seed data for polls in DJP Prototype H2 Database
INSERT INTO polls (id, author_id, question, description, category, options_json, votes_count, comments_count, location, latitude, longitude, gov_level, metadata, expires_at, created_at, updated_at)
VALUES 
    -- Poll by Vikram Joshi (Policy Thinker)
    ('1a1a1a1a-1a1a-1a1a-1a1a-1a1a1a1a1a1a', '44444444-dddd-dddd-dddd-444444444444', 'Should Ward 42 implement No-Car Sundays in the Market Area?', 'This poll seeks public opinion on introducing vehicle-free Sundays in the market area to improve pedestrian safety, local business activity and public spaces.', 'High Priority', '[{"label":"Yes","percent":68,"primary":true},{"label":"No","percent":32,"primary":false}]', 1842, 63, 'Ward 42 Market Area', 18.5204, 73.8567, 'Ward 42', '{"author":"Vikram Joshi"}', CURRENT_TIMESTAMP + INTERVAL '2' DAY, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    
    -- Poll by Vikram Joshi (Policy Thinker)
    ('2b2b2b2b-2b2b-2b2b-2b2b-2b2b2b2b2b2b', '44444444-dddd-dddd-dddd-444444444444', 'How should Pune improve its public transport over the next five years?', 'The Maharashtra Government is seeking citizen feedback on which transport initiative should receive the highest priority.', 'Environment', '[{"label":"Expand Metro Network","percent":41,"primary":true},{"label":"Increase PMPML Bus Fleet","percent":29,"primary":false},{"label":"Build More Cycling Tracks","percent":18,"primary":false},{"label":"Improve Existing Roads First","percent":12,"primary":false}]', 5284, 147, 'Pune City', 18.5204, 73.8567, 'City', '{"author":"Vikram Joshi"}', CURRENT_TIMESTAMP + INTERVAL '4' DAY, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;
