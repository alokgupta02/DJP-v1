-- Seed data for issues in DJP Prototype H2 Database
MERGE INTO issues (id, author_id, title, description, category, priority, status, workflow_step, location, supports_count, comments_count, created_at, updated_at)
KEY (id)
VALUES 
    ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'Overflowing bin on High St (Prototype)', 'Main waste collection point hasn''t been cleared for 3 days.', 'Garbage', 'HIGH', 'REPORTED', 0, 'High St Ward 4', 45, 12, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
    ('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'Deep pothole near Junction 4 (Prototype)', 'Hazardous pothole causing traffic slowdowns.', 'Pothole', 'MEDIUM', 'VERIFIED', 1, 'Junction 4', 102, 8, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());
MERGE INTO issues (id, author_id, title, description, category, priority, status, workflow_step, location, supports_count, comments_count, created_at, updated_at)
KEY (id)
VALUES ('8392c5bd-4455-4dd0-a934-33c7b760e473', '11111111-1111-1111-1111-111111111111', 'Broken streetlight on 5th Ave (API Test)', 'Streetlight pole #102 has been out for over a week.', 'Lighting', 'HIGH', 'REPORTED', 0, '5th Ave & Elm St', 0, 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());