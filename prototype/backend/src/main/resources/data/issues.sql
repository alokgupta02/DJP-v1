-- Seed data for issues in DJP Prototype H2 Database
INSERT INTO issues (id, author_id, title, description, category, priority, status, workflow_step, location, latitude, longitude, gov_level, supports_count, comments_count, metadata, created_at, updated_at)
VALUES 
    -- Issue reported by Arjun Patil (Aspiring Ward Leader)
    ('a1111111-1111-1111-1111-111111111111', '66666666-ffff-ffff-ffff-666666666666', 'Large Pothole Near Balewadi High Street Junction', 'Hazardous pothole causing traffic slowdowns. Let''s get this fixed!', 'Road', 'CRITICAL', 'REPORTED', 0, 'Balewadi High Street', 18.5721, 73.7719, 'Ward 23', 96, 24, '{"distance":"140 m","affected":"500+","govLevel":"Ward","author":"Arjun Patil","image":"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=350&h=240&fit=crop","imageCount":14,"verified":true}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    
    -- Issue reported by Ananya Sharma (Concerned Citizen)
    ('b2222222-2222-2222-2222-222222222222', '11111111-aaaa-aaaa-aaaa-111111111111', 'Garbage Dump on Balewadi Street near Parke Serene', 'Main waste collection point hasn''t been cleared for 4 days.', 'Garbage', 'HIGH', 'REPORTED', 0, 'Balewadi', 18.5700, 73.7700, 'Ward 23', 42, 18, '{"distance":"780 m","affected":"120–200","govLevel":"Ward","author":"Ananya Sharma","image":"https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?w=350&h=240&fit=crop","imageCount":6,"verified":true}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    
    -- Issue reported by Sunita Devi (First-Time Digital User)
    ('c3333333-3333-3333-3333-333333333333', '55555555-eeee-eeee-eeee-555555555555', 'Broken Streetlight in Sector 7', 'Streetlight is broken, very dark at night.', 'Infrastructure', 'HIGH', 'REPORTED', 0, 'Sector 7, Dwarka', 28.5833, 77.0500, 'Ward 38', 58, 11, '{"distance":"320 m","affected":"300–500","govLevel":"Ward","author":"Sunita Devi","image":"https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=350&h=240&fit=crop","imageCount":2,"verified":true}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;