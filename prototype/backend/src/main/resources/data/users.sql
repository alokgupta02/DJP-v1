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
ON CONFLICT (id) DO NOTHING;