-- Fixes "42501 permission denied": projects created without automatic Data API grants
-- leave new tables unreadable even for the secret (service_role) key.
-- Only the server (service_role) gets access; the public keys (anon/authenticated) get none,
-- so the tables stay private even if RLS were ever disabled.

grant usage on schema public to service_role;
grant select, insert, update, delete on all tables in schema public to service_role;
grant usage, select on all sequences in schema public to service_role;
alter default privileges in schema public grant select, insert, update, delete on tables to service_role;
alter default privileges in schema public grant usage, select on sequences to service_role;

revoke all on all tables in schema public from anon, authenticated;
revoke all on all sequences in schema public from anon, authenticated;

notify pgrst, 'reload schema';
