create table refresh_tokens (
    id uuid not null,
    token varchar(512) not null unique,
    user_id uuid not null,
    expires_at timestamp(6) with time zone not null,
    created_at timestamp(6) with time zone not null,
    revoked boolean not null default false,
    primary key (id)
);

create index idx_refresh_token_user on refresh_tokens (user_id);
create index idx_refresh_token_token on refresh_tokens (token);

alter table if exists refresh_tokens add constraint fk_refresh_tokens_user foreign key (user_id) references users;
