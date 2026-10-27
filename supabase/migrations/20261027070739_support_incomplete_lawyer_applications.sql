-- Applied through the connected Supabase migration API.
alter table public.lawyers alter column license_number drop not null;
alter table public.lawyers add constraint approved_lawyer_requires_professional_details check (registration_status is distinct from 'approved' or (nullif(btrim(license_number),'') is not null and nullif(btrim(name),'') is not null and nullif(btrim(specialty),'') is not null));
