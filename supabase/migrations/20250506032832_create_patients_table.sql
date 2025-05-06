create table patients
(
  id              bigint primary key generated always as identity,
  first_name      text,
  middle_name     text null,
  last_name       text,
  date_of_birth   date,
  status          text,
  address         json,
  created_at      timestamptz default now()
);
