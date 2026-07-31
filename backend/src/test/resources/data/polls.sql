-- H2-compatible seed data for polls (using valid UUID format)
MERGE INTO polls (id, author_id, question, description, category, options_json, votes_count, comments_count, expires_at, location, latitude, longitude, gov_level, metadata, created_at, updated_at)
KEY (id)
VALUES 
    ('aaaaaaaa-1111-1111-1111-111111111111', '11111111-aaaa-aaaa-aaaa-111111111111', 'Should Ward 23 implement a permanent Saturday Car-Free Zone on 5th Main Road?', 'Pilot trial showed 34% drop in PM2.5 and 27% increase in footfall for local businesses. Proposal: Every Saturday 6 AM - 10 PM, pedestrian and cycle only.', 'Environment', '[{"label":"Yes, make it permanent","pct":62},{"label":"No, revert to cars","pct":24},{"label":"Extend to Sundays too","pct":14}]', 1240, 89, CURRENT_TIMESTAMP + INTERVAL '3' DAY, '5th Main Road, Indiranagar', 12.9784, 77.6408, 'Ward 23', '{"tags":["Environment","Ward"],"tagVariant":["info","secondary"]}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

MERGE INTO polls (id, author_id, question, description, category, options_json, votes_count, comments_count, expires_at, location, latitude, longitude, gov_level, metadata, created_at, updated_at)
KEY (id)
VALUES 
    ('bbbbbbbb-2222-2222-2222-222222222222', '66666666-ffff-ffff-ffff-666666666666', 'Which issue should the Ward Committee prioritize for Q3 budget allocation?', 'Limited ward development funds require community prioritization. Vote for the single most impactful project.', 'Infrastructure', '[{"label":"Drainage upgrade (flooding risk)","pct":41},{"label":"LED streetlight replacement","pct":29},{"label":"Footpath repair & ramps","pct":20},{"label":"Community center renovation","pct":10}]', 856, 67, CURRENT_TIMESTAMP + INTERVAL '7' DAY, 'Balewadi', 18.5721, 73.7719, 'Ward 23', '{"tags":["Infrastructure","Ward"],"tagVariant":["warning","secondary"]}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

MERGE INTO polls (id, author_id, question, description, category, options_json, votes_count, comments_count, expires_at, location, latitude, longitude, gov_level, metadata, created_at, updated_at)
KEY (id)
VALUES 
    ('cccccccc-3333-3333-3333-333333333333', '33333333-cccc-cccc-cccc-333333333333', 'Rate the effectiveness of the new online RTI filing portal for your ward.', 'The municipal corporation launched a digital RTI portal. We want to know how usable and transparent citizens find it.', 'Governance', '[{"label":"Very effective (5/5)","pct":12},{"label":"Effective (4/5)","pct":28},{"label":"Average (3/5)","pct":35},{"label":"Poor (2/5)","pct":18},{"label":"Very poor (1/5)","pct":7}]', 432, 41, CURRENT_TIMESTAMP + INTERVAL '14' DAY, 'Indiranagar', 12.9784, 77.6408, 'Ward 89', '{"tags":["Governance","Digital"],"tagVariant":["success","secondary"]}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);