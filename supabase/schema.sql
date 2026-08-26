-- Surabhi Academy — Supabase schema
-- Run this once in your Supabase project's SQL editor (Dashboard → SQL Editor → New query).

-- =========================================================
-- COURSES
-- =========================================================
create table if not exists public.courses (
  id text primary key default 'c_' || extract(epoch from now())::text,
  slug text unique not null,
  title text not null,
  category text not null,
  category_label text not null,
  grade_level text not null,
  duration text not null,
  description text,
  badge text,
  short_description text not null,
  full_description text not null,
  subjects text[] default '{}',
  features text[] default '{}',
  eligibility text not null,
  class_timing text not null,
  batch_size text not null,
  materials_included text[] default '{}',
  curriculum_highlights jsonb default '[]',
  targeted_exams text[] default '{}',
  fee_structure text,
  image text,
  fees_info text,
  status text not null default 'active' check (status in ('active', 'inactive')),
  display_order int default 0,
  created_at timestamptz default now()
);

-- =========================================================
-- ACHIEVERS (StudentResult)
-- =========================================================
create table if not exists public.achievers (
  id text primary key default 'r_' || extract(epoch from now())::text,
  name text not null,
  rank int,
  rank_title text not null,
  exam text not null,
  exam_name text,
  score text not null,
  percentile text,
  year text not null,
  category text not null,
  category_label text not null,
  grade_level text not null,
  school text,
  testimonial text,
  testimonial_quote text,
  image text,
  photo text,
  badge_type text check (badge_type in ('gold', 'silver', 'bronze', 'special')),
  featured boolean default false,
  display_order int default 0,
  status text default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz default now()
);

-- =========================================================
-- ENQUIRIES (admission enquiries submitted by the public)
-- =========================================================
create table if not exists public.enquiries (
  id text primary key default 'enq_' || extract(epoch from now())::text,
  student_name text not null,
  parent_name text,
  mobile_number text not null,
  email_address text,
  student_class text not null,
  course_interested text,
  message text,
  notes text,
  status text not null default 'new' check (
    status in ('new', 'contacted', 'interested', 'converted', 'closed', 'enrolled', 'archived')
  ),
  admin_notes text,
  created_at timestamptz default now(),
  source text
);

-- =========================================================
-- SITE CONTENT (single-row tables for hero / about / settings)
-- =========================================================
create table if not exists public.hero_content (
  id int primary key default 1,
  data jsonb not null,
  updated_at timestamptz default now(),
  constraint single_row check (id = 1)
);

create table if not exists public.about_content (
  id int primary key default 1,
  data jsonb not null,
  updated_at timestamptz default now(),
  constraint single_row check (id = 1)
);

create table if not exists public.site_settings (
  id int primary key default 1,
  data jsonb not null,
  updated_at timestamptz default now(),
  constraint single_row check (id = 1)
);

-- =========================================================
-- ROW LEVEL SECURITY
-- Public visitors: read-only on content tables, insert-only on enquiries.
-- Writes to everything else require an authenticated admin session.
-- =========================================================
alter table public.courses enable row level security;
alter table public.achievers enable row level security;
alter table public.enquiries enable row level security;
alter table public.hero_content enable row level security;
alter table public.about_content enable row level security;
alter table public.site_settings enable row level security;

-- Public read access on content tables
create policy "Public can read courses" on public.courses for select using (true);
create policy "Public can read achievers" on public.achievers for select using (true);
create policy "Public can read hero_content" on public.hero_content for select using (true);
create policy "Public can read about_content" on public.about_content for select using (true);
create policy "Public can read site_settings" on public.site_settings for select using (true);

-- Authenticated admin write access on content tables
create policy "Admins can write courses" on public.courses for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admins can write achievers" on public.achievers for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admins can write hero_content" on public.hero_content for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admins can write about_content" on public.about_content for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admins can write site_settings" on public.site_settings for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Enquiries: anyone can submit (insert), only admins can read/update/delete
create policy "Public can submit enquiries" on public.enquiries for insert with check (true);
create policy "Admins can read enquiries" on public.enquiries for select
  using (auth.role() = 'authenticated');
create policy "Admins can update enquiries" on public.enquiries for update
  using (auth.role() = 'authenticated');
create policy "Admins can delete enquiries" on public.enquiries for delete
  using (auth.role() = 'authenticated');

-- =========================================================
-- STORAGE (for ImageUpload.tsx -> Supabase Storage)
-- =========================================================
insert into storage.buckets (id, name, public)
values ('academy-images', 'academy-images', true)
on conflict (id) do nothing;

create policy "Public can view academy images"
  on storage.objects for select
  using (bucket_id = 'academy-images');

create policy "Admins can upload academy images"
  on storage.objects for insert
  with check (bucket_id = 'academy-images' and auth.role() = 'authenticated');

create policy "Admins can update academy images"
  on storage.objects for update
  using (bucket_id = 'academy-images' and auth.role() = 'authenticated');

create policy "Admins can delete academy images"
  on storage.objects for delete
  using (bucket_id = 'academy-images' and auth.role() = 'authenticated');

-- =========================================================
-- SEED default content rows (so the site isn't empty on first load)
-- Edit the JSON below to match src/context/AcademyContext.tsx defaults,
-- or just insert once and edit via the admin panel afterwards.
-- =========================================================
insert into public.hero_content (id, data) values (1, '{}'::jsonb) on conflict (id) do nothing;
insert into public.about_content (id, data) values (1, '{}'::jsonb) on conflict (id) do nothing;
insert into public.site_settings (id, data) values (1, '{}'::jsonb) on conflict (id) do nothing;
