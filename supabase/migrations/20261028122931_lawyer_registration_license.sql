alter table public.lawyers
  add column if not exists country text,
  add column if not exists city text,
  add column if not exists license_document_path text;
create unique index if not exists lawyers_one_profile_per_user on public.lawyers(user_id) where user_id is not null;

alter table public.lawyers enable row level security;

-- Self-service registration must never inherit the legacy authenticated ALL policy.
drop policy if exists "Admins can manage lawyers" on public.lawyers;
create policy "Active admins manage lawyer records" on public.lawyers for all to authenticated
  using (exists(select 1 from public.admins where email=auth.jwt()->>'email' and is_active=true))
  with check (exists(select 1 from public.admins where email=auth.jwt()->>'email' and is_active=true));
create policy "Applicants read their own lawyer record" on public.lawyers for select to authenticated
  using (user_id=(select auth.uid()));
create policy "Applicants insert pending records" on public.lawyers for insert to authenticated
  with check (user_id=(select auth.uid()) and registration_status='pending' and license_verified=false);
create policy "Lawyers update their own record" on public.lawyers for update to authenticated
  using (user_id=(select auth.uid())) with check (user_id=(select auth.uid()));

create or replace function public.guard_lawyer_self_service() returns trigger
language plpgsql security invoker set search_path=public,pg_temp as $$
begin
  if current_user not in ('anon','authenticated') then return new; end if;
  if exists(select 1 from public.admins where email=auth.jwt()->>'email' and is_active=true) then return new; end if;
  if auth.uid() is null or new.user_id is distinct from auth.uid() then raise exception 'Not permitted' using errcode='42501'; end if;
  if new.email is distinct from auth.jwt()->>'email' then raise exception 'Use the verified account email' using errcode='42501'; end if;
  if tg_op='INSERT' then
    new.rating := 0; new.total_cases := 0;
    if new.registration_status is distinct from 'pending' or new.license_verified is distinct from false then raise exception 'Review is required' using errcode='42501'; end if;
    if nullif(btrim(new.name),'') is null or nullif(btrim(new.specialty),'') is null or nullif(btrim(new.license_number),'') is null or new.license_document_path is null then raise exception 'Professional details and license required'; end if;
  else
    if old.user_id is distinct from new.user_id or old.id is distinct from new.id then raise exception 'Owner is immutable' using errcode='42501'; end if;
    if old.registration_status='approved' then
      if new.registration_status is distinct from old.registration_status or new.license_verified is distinct from old.license_verified or new.name is distinct from old.name or new.specialty is distinct from old.specialty or new.license_number is distinct from old.license_number or new.license_document_path is distinct from old.license_document_path then raise exception 'Approved professional details require admin review' using errcode='42501'; end if;
    elsif new.registration_status not in ('pending','incomplete') or new.license_verified is distinct from false then raise exception 'Review is required' using errcode='42501'; end if;
    if new.rating is distinct from old.rating or new.total_cases is distinct from old.total_cases then raise exception 'Platform metrics are immutable' using errcode='42501'; end if;
  end if;
  if new.license_document_path is not null and split_part(new.license_document_path,'/',1) is distinct from auth.uid()::text then raise exception 'License must belong to applicant' using errcode='42501'; end if;
  return new;
end $$;
create trigger guard_lawyer_self_service before insert or update on public.lawyers
for each row execute function public.guard_lawyer_self_service();

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('lawyer-licenses','lawyer-licenses',false,5242880,array['application/pdf','image/jpeg','image/png']) on conflict(id) do nothing;
create policy "Applicants upload own license" on storage.objects for insert to authenticated
with check (bucket_id='lawyer-licenses' and (storage.foldername(name))[1]=(select auth.uid())::text);
create policy "Applicants and admins read private licenses" on storage.objects for select to authenticated
using (bucket_id='lawyer-licenses' and ((storage.foldername(name))[1]=(select auth.uid())::text or exists(select 1 from public.admins where email=auth.jwt()->>'email' and is_active=true)));
create policy "Applicants remove unsubmitted uploads" on storage.objects for delete to authenticated
using (bucket_id='lawyer-licenses' and (storage.foldername(name))[1]=(select auth.uid())::text and not exists(select 1 from public.lawyers where license_document_path=storage.objects.name));
