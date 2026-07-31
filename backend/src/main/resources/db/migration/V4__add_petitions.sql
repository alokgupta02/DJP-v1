create table petitions (
    id uuid not null,
    author_id uuid not null,
    title varchar(255) not null,
    description TEXT not null,
    category varchar(50),
    target_authority varchar(150),
    signature_goal integer not null default 100,
    signature_count integer not null default 0,
    created_at timestamp(6) with time zone not null,
    expires_at timestamp(6) with time zone,
    primary key (id),
    constraint fk_petition_author foreign key (author_id) references users(id)
);
