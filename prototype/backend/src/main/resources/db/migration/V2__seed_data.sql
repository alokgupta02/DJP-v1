-- Seed data for users in DJP Prototype H2 Database
INSERT INTO users (id, email, name, provider, provider_id, role, reputation_score, subscription_status, onboarding_completed, privacy_consent_given, privacy_consent_timestamp, joined_date, location, pincode, country, state, district, city, locality, ward, constituency, occupation, bio, topics, dob, gender, phone_number)
VALUES 
    -- Keep Alok Gupta
    ('1f4c2da8-eedd-4523-b541-7c818c237fff', 'citizen@djp.org', 'Alok Gupta', 'DEV', 'dev-citizen', 'CITIZEN', 0, 'ACTIVE', true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Ward 53, Bhopal', '462016', 'India', 'Madhya Pradesh', 'Bhopal', 'Bhopal', 'Arera Colony', 'Ward 53, Bhopal', 'Bhopal South-West', 'Software Engineer', 'I am a Patriot Citizen.', '', '1990-01-01', 'Male', '+91 9876543210'),
    
    -- Keep Admin
    ('c82b82ab-e0e0-4182-b50a-f2d391fb3296', 'admin@djp.org', 'Prototype Admin', 'DEV', 'dev-admin', 'LEADER', 100, 'ACTIVE', true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'New Delhi', '110001', 'India', 'Delhi', 'New Delhi', 'New Delhi', 'Connaught Place', 'Ward 1', 'New Delhi', 'Public Administrator', 'Platform Administrator ensuring transparency.', 'Digital Governance, Corruption, Judiciary', '1985-05-15', 'Female', '+91 9123456789'),
    
    -- Persona 1: Ananya Sharma
    ('11111111-aaaa-aaaa-aaaa-111111111111', 'ananya@djp.org', 'Ananya Sharma', 'DEV', 'dev-ananya', 'CITIZEN', 12, 'ACTIVE', true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Balewadi, Pune', '411045', 'India', 'Maharashtra', 'Pune', 'Pune', 'Balewadi', 'Ward 23', 'Shivajinagar', 'UX Designer', 'Wants neighborhood to be safe, clean, and walkable.', 'Roads, Cleanliness, Parks', '1998-05-20', 'Female', '+91 9811111111'),
    
    -- Persona 2: Rajan Malhotra
    ('22222222-bbbb-bbbb-bbbb-222222222222', 'rajan@djp.org', 'Rajan Malhotra', 'DEV', 'dev-rajan', 'CITIZEN', 450, 'ACTIVE', true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sector 4, South Delhi', '110022', 'India', 'Delhi', 'South Delhi', 'Delhi', 'R K Puram', 'Ward 42', 'New Delhi', 'Retired Army Colonel', 'Civic watchdog trusting evidence over promises.', 'Transparency, Defense, Infrastructure', '1979-11-10', 'Male', '+91 9822222222'),
    
    -- Persona 3: Priya Deshmukh
    ('33333333-cccc-cccc-cccc-333333333333', 'priya@djp.org', 'Priya Deshmukh', 'DEV', 'dev-priya', 'LEADER', 850, 'ACTIVE', true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Market Road, Pune', '411045', 'India', 'Maharashtra', 'Pune', 'Pune', 'Market Road', 'Ward 23', 'Shivajinagar', 'School Teacher / RWA Sec', 'Community organizer turning WhatsApp chats into action.', 'Community, Education, Cleanliness', '1990-08-14', 'Female', '+91 9833333333'),

    -- Persona 4: Vikram Joshi
    ('44444444-dddd-dddd-dddd-444444444444', 'vikram@djp.org', 'Vikram Joshi', 'DEV', 'dev-vikram', 'CITIZEN', 1250, 'ACTIVE', true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Civil Lines, New Delhi', '110054', 'India', 'Delhi', 'Central Delhi', 'Delhi', 'Civil Lines', 'Ward 1', 'New Delhi', 'Policy Researcher', 'Retired IAS officer debating deep civic policy.', 'Policy, Economics, Environment', '1974-02-28', 'Male', '+91 9844444444'),

    -- Persona 5: Sunita Devi
    ('55555555-eeee-eeee-eeee-555555555555', 'sunita@djp.org', 'Sunita Devi', 'DEV', 'dev-sunita', 'CITIZEN', 5, 'ACTIVE', true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sector 7, Dwarka, New Delhi', '110075', 'India', 'Delhi', 'South West Delhi', 'Delhi', 'Dwarka', 'Ward 38', 'Dwarka', 'Homemaker', 'First-time digital user reporting basic issues.', 'Women Safety, Basic Amenities', '1969-12-05', 'Female', '+91 9855555555'),

    -- Persona 6: Arjun Patil
    ('66666666-ffff-ffff-ffff-666666666666', 'arjun@djp.org', 'Arjun Patil', 'DEV', 'dev-arjun', 'LEADER', 920, 'ACTIVE', true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Shivaji Nagar, Pune', '411005', 'India', 'Maharashtra', 'Pune', 'Pune', 'Shivaji Nagar', 'Ward 15', 'Shivajinagar', 'Hardware Store Owner', 'Aspiring ward leader coordinating mass campaigns.', 'Local Business, Infrastructure, Youth', '1993-07-22', 'Male', '+91 9866666666')
ON CONFLICT (id) DO NOTHING;-- Seed data for issues in DJP Prototype H2 Database
INSERT INTO issues (id, author_id, title, description, category, priority, status, workflow_step, location, latitude, longitude, gov_level, supports_count, comments_count, metadata, created_at, updated_at)
VALUES 
    -- Issue reported by Arjun Patil (Aspiring Ward Leader)
    ('a1111111-1111-1111-1111-111111111111', '66666666-ffff-ffff-ffff-666666666666', 'Large Pothole Near Balewadi High Street Junction', 'Hazardous pothole causing traffic slowdowns. Let''s get this fixed!', 'Road', 'CRITICAL', 'REPORTED', 0, 'Balewadi High Street', 18.5721, 73.7719, 'Ward 23', 96, 24, '{"distance":"140 m","affected":"500+","govLevel":"Ward","author":"Arjun Patil","image":"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=350&h=240&fit=crop","imageCount":14,"verified":true}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    
    -- Issue reported by Ananya Sharma (Concerned Citizen)
    ('b2222222-2222-2222-2222-222222222222', '11111111-aaaa-aaaa-aaaa-111111111111', 'Garbage Dump on Balewadi Street near Parke Serene', 'Main waste collection point hasn''t been cleared for 4 days.', 'Garbage', 'HIGH', 'REPORTED', 0, 'Balewadi', 18.5700, 73.7700, 'Ward 23', 42, 18, '{"distance":"780 m","affected":"120–200","govLevel":"Ward","author":"Ananya Sharma","image":"https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?w=350&h=240&fit=crop","imageCount":6,"verified":true}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    
    -- Issue reported by Sunita Devi (First-Time Digital User)
    ('c3333333-3333-3333-3333-333333333333', '55555555-eeee-eeee-eeee-555555555555', 'Broken Streetlight in Sector 7', 'Streetlight is broken, very dark at night.', 'Infrastructure', 'HIGH', 'REPORTED', 0, 'Sector 7, Dwarka', 28.5833, 77.0500, 'Ward 38', 58, 11, '{"distance":"320 m","affected":"300–500","govLevel":"Ward","author":"Sunita Devi","image":"https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=350&h=240&fit=crop","imageCount":2,"verified":true}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;-- Seed data for discussions in DJP Prototype H2 Database
INSERT INTO discussions (id, author_id, title, description, category, votes_count, participant_count, proposal_count, proposal_preview, proposal_badge, proposal_badge_variant, comments_count, location, latitude, longitude, gov_level, metadata, created_at, updated_at)
VALUES 
    -- Discussion by Priya Deshmukh (Community Organizer)
    ('d4444444-4444-4444-4444-444444444444', '33333333-cccc-cccc-cccc-333333333333', 'Convert the Abandoned Plot Near 5th Cross into a Community Park', 'The vacant municipal plot has become an informal dumping ground. This proposal suggests converting it into a low-maintenance public park with walking paths, native trees, children''s play equipment and seating areas for senior citizens.', 'Proposal', 142, 21, 3, '"Implement an automated smart-stack parking system integrated with existing greenery..."', 'Top Draft', 'primary', 56, '5th Cross, Indiranagar', 12.9784, 77.6408, 'Ward 89', '{"tags":["Proposal","Ward"],"tagVariant":["brand","secondary"],"participants":["JD","MK"],"author":"Priya Deshmukh"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    
    -- Discussion by Vikram Joshi (Policy Thinker)
    ('e5555555-5555-5555-5555-555555555555', '44444444-dddd-dddd-dddd-444444444444', 'To whom is the higher judiciary accountable?', 'Research and public commentary have raised questions about judicial appointments, the collegium system, and the prevalence of family connections in India''s higher judiciary. Unlike the Legislature and Executive, which are politically accountable to voters through elections, what mechanisms ensure accountability of the Judiciary?', 'Question', 184, 37, 1, '"Establish a National Judicial Appointments Commission with civil society oversight..."', 'New', 'warning', 92, 'New Delhi', 28.6139, 77.2090, 'National', '{"tags":["Question","Judiciary"],"tagVariant":["brand","secondary"],"participants":["RS","MK"],"author":"Vikram Joshi"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    
    -- Discussion by Rajan Malhotra (Civic Watchdog)
    ('f6666666-6666-6666-6666-666666666666', '22222222-bbbb-bbbb-bbbb-222222222222', 'Did the Supreme Court''s action against the NCERT chapter on judicial corruption strike the right balance?', 'The Supreme Court''s intervention regarding an NCERT chapter discussing judicial corruption has revived an important constitutional debate. Should courts be able to restrict educational material concerning the judiciary?', 'Debate', 624, 52, 0, NULL, NULL, NULL, 184, 'New Delhi', 28.6139, 77.2090, 'National', '{"tags":["Debate","Judiciary","India"],"tagVariant":["error","secondary","brand"],"participants":["RS","NP"],"author":"Rajan Malhotra"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;
-- Seed data for polls in DJP Prototype H2 Database
INSERT INTO polls (id, author_id, question, description, category, options_json, votes_count, comments_count, location, latitude, longitude, gov_level, metadata, expires_at, created_at, updated_at)
VALUES 
    -- Poll by Vikram Joshi (Policy Thinker)
    ('1a1a1a1a-1a1a-1a1a-1a1a-1a1a1a1a1a1a', '44444444-dddd-dddd-dddd-444444444444', 'Should Ward 42 implement No-Car Sundays in the Market Area?', 'This poll seeks public opinion on introducing vehicle-free Sundays in the market area to improve pedestrian safety, local business activity and public spaces.', 'High Priority', '[{"label":"Yes","percent":68,"primary":true},{"label":"No","percent":32,"primary":false}]', 1842, 63, 'Ward 42 Market Area', 18.5204, 73.8567, 'Ward 42', '{"author":"Vikram Joshi"}', CURRENT_TIMESTAMP + INTERVAL '2' DAY, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    
    -- Poll by Vikram Joshi (Policy Thinker)
    ('2b2b2b2b-2b2b-2b2b-2b2b-2b2b2b2b2b2b', '44444444-dddd-dddd-dddd-444444444444', 'How should Pune improve its public transport over the next five years?', 'The Maharashtra Government is seeking citizen feedback on which transport initiative should receive the highest priority.', 'Environment', '[{"label":"Expand Metro Network","percent":41,"primary":true},{"label":"Increase PMPML Bus Fleet","percent":29,"primary":false},{"label":"Build More Cycling Tracks","percent":18,"primary":false},{"label":"Improve Existing Roads First","percent":12,"primary":false}]', 5284, 147, 'Pune City', 18.5204, 73.8567, 'City', '{"author":"Vikram Joshi"}', CURRENT_TIMESTAMP + INTERVAL '4' DAY, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;
