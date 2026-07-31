create table representatives (
    id uuid not null,
    name varchar(150) not null,
    position varchar(100) not null,
    ward varchar(200),
    party varchar(100),
    since varchar(20),
    phone varchar(30),
    email varchar(255),
    image_initials varchar(4),
    avatar_bg varchar(50),
    avatar_text_color varchar(50),
    issues_resolved integer default 0,
    meetings_held integer default 0,
    attendance varchar(10),
    biography TEXT,
    created_at timestamp(6) with time zone not null default now(),
    primary key (id)
);

INSERT INTO representatives (id, name, position, ward, party, since, phone, email, image_initials, avatar_bg, issues_resolved, meetings_held, attendance) VALUES
    (gen_random_uuid(), 'Smt. Meera Devi', 'Ward Councilor', 'Ward 42 — South Delhi', 'Independent', '2020', '+91 98765 43210', 'meera.devi@ward42.in', 'MD', 'purple', 847, 124, '96%'),
    (gen_random_uuid(), 'Shri. Rajesh Kumar', 'MLA', 'South Delhi Constituency', 'Aam Aadmi Party', '2019', '+91 98765 43211', 'rajesh.kumar@delhi.gov.in', 'RK', 'blue', 0, 56, '92%'),
    (gen_random_uuid(), 'Adv. Sunita Sharma', 'Municipal Committee Chairperson', 'Zone 3 — South Zone', 'Independent', '2021', '+91 98765 43212', 'sunita.sharma@mcd.gov.in', 'SS', 'green', 1203, 34, '98%');
