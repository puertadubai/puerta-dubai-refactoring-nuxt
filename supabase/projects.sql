-- Schema for projects + related tables
create extension if not exists "pgcrypto";

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  hero_title text not null,
  hero_location text not null,
  hero_image text not null,
  intro text not null,
  location_title text,
  location_text text,
  location_map_image text,
  location_map_alt text,
  location_map_query text,
  location_lat double precision,
  location_lng double precision,
  location_zoom integer,
  investment_title text,
  investment_text text,
  investment_cta_label text,
  investment_cta_link text,
  previous_slug text,
  next_slug text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_highlights (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  label text not null,
  value text not null,
  sort_order integer not null default 0
);

create table if not exists public.project_amenities (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  icon text not null,
  label text not null,
  group_index integer not null default 0,
  sort_order integer not null default 0
);

create table if not exists public.project_gallery (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  image_path text not null,
  sort_order integer not null default 0
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

-- Storage bucket for images (public read)
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

drop policy if exists "Public read project images" on storage.objects;
create policy "Public read project images"
on storage.objects for select
using (bucket_id = 'project-images');

-- Seed data
begin;
with inserted as (
  insert into public.projects (
    slug, hero_title, hero_location, hero_image, intro,
    location_title, location_text, location_map_image, location_map_alt, location_map_query,
    location_lat, location_lng, location_zoom,
    investment_title, investment_text, investment_cta_label, investment_cta_link,
    previous_slug, next_slug
  ) values (
    'ir1dian-park',
    'IR1DIAN PARK',
    'Jumeirah Village Circle * Dubai',
    'projects/ir1dian/1.webp',
    'IR1DIAN Park is a contemporary residential development in the heart of Jumeirah Village Circle, Dubai, offering modern living with an urban design and family-friendly amenities. Nestled within a tree-lined and dynamic community, the project blends thoughtful architecture, high-quality finishes and accessible lifestyle to deliver a home that supports both everyday comfort and investment appeal.',
    'Location & Lifestyle',
    'Ideally situated in the vibrant JVC community, IR1DIAN Park benefits from excellent connectivity via Al Khalil Road and Sheikh Mohammed Bin Zayed Road. Residents enjoy proximity to parks, schools, retail hubs, and leisure destinations - making the development appealing for families, professionals and investors alike.',
    'projects/ir1dian/map.png',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    'Investment Proposition',
    'With a launch price from AED 772,000 and completion expected in Q2 2027, IR1DIAN Park presents an attractive entry point into the JVC market. The combination of strong location, modern design and family-oriented amenities supports both rental demand and long-term value appreciation.',
    'Book a call',
    NULL,
    'costa-mare',
    'saadiyat-grove'
  ) returning id
)
, highlights as (
  insert into public.project_highlights (project_id, label, value, sort_order)
  select id, 'Developer', 'Object 1 Real Estate Development', 0 from inserted
  union all
  select id, 'Type', 'Low-rise Apartments', 1 from inserted
  union all
  select id, 'Units', 'Studios - 2BR', 2 from inserted
  union all
  select id, 'Starting Price', 'AED 772,000', 3 from inserted
  union all
  select id, 'Delivery', 'Q2 2027', 4 from inserted
  union all
  select id, 'Location', 'Jumeirah Village Circle, Dubai', 5 from inserted
  union all
  select id, 'Unique', 'Urban design * Family-friendly amenities * Strong connectivity', 6 from inserted)
, amenities as (
  insert into public.project_amenities (project_id, icon, label, group_index, sort_order)
  select id, 'dumbbell', 'Gym', 0, 0 from inserted
  union all
  select id, 'waves', 'Swimming Pool & Kids Pool', 0, 1 from inserted
  union all
  select id, 'gamepad-2', 'Kids Play Area', 0, 2 from inserted
  union all
  select id, 'car', 'Indoor Parking', 0, 3 from inserted
  union all
  select id, 'leaf', 'Landscaped Gardens', 1, 0 from inserted
  union all
  select id, 'flame', 'BBQ & Outdoor Lounge', 1, 1 from inserted
  union all
  select id, 'shield', '24/7 Security', 1, 2 from inserted
  union all
  select id, 'wifi', 'Smart Home Features', 1, 3 from inserted)
, gallery as (
  insert into public.project_gallery (project_id, image_path, sort_order)
  select id, 'projects/ir1dian/1.webp', 0 from inserted
  union all
  select id, 'projects/ir1dian/2.webp', 1 from inserted
  union all
  select id, 'projects/ir1dian/3.webp', 2 from inserted
  union all
  select id, 'projects/ir1dian/4.webp', 3 from inserted
  union all
  select id, 'projects/ir1dian/5.webp', 4 from inserted
  union all
  select id, 'projects/ir1dian/6.jpg', 5 from inserted
  union all
  select id, 'projects/ir1dian/7.jpg', 6 from inserted)
select 1;

with inserted as (
  insert into public.projects (
    slug, hero_title, hero_location, hero_image, intro,
    location_title, location_text, location_map_image, location_map_alt, location_map_query,
    location_lat, location_lng, location_zoom,
    investment_title, investment_text, investment_cta_label, investment_cta_link,
    previous_slug, next_slug
  ) values (
    'costa-mare',
    'Costa Mare',
    'Al Marjan Island * Ras Al Khaimah',
    'projects/ellington/10.jpg',
    'Costa Mare is a seaside residential project by Ellington Properties, located on the pristine Al Marjan Island. Designed with timeless architecture and refined interiors, it offers a serene coastal lifestyle with direct access to the sea.',
    'Location & Lifestyle',
    'Located on Al Marjan Island, Costa Mare offers a refined coastal lifestyle with direct beach access and proximity to Ras Al Khaimah''s growing hospitality and leisure attractions.',
    'projects/ellington/map.png',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    'Investment Proposition',
    'With strong tourism growth and limited beachfront supply, Costa Mare offers excellent potential for capital appreciation and rental yields in Ras Al Khaimah''s rising luxury market.',
    'Book a call',
    NULL,
    'binghatti-house',
    'ir1dian-park'
  ) returning id
)
, highlights as (
  insert into public.project_highlights (project_id, label, value, sort_order)
  select id, 'Developer', 'Ellington Properties', 0 from inserted
  union all
  select id, 'Type', 'Beachfront Residences', 1 from inserted
  union all
  select id, 'Units', 'Studios - 3BR', 2 from inserted
  union all
  select id, 'Starting Price', 'USD 270,000', 3 from inserted
  union all
  select id, 'Location', 'Al Marjan Island, Ras Al Khaimah', 4 from inserted
  union all
  select id, 'Unique', 'Seafront living * Premium finishes * Resort lifestyle', 5 from inserted)
, amenities as (
  insert into public.project_amenities (project_id, icon, label, group_index, sort_order)
  select id, 'waves', 'Private Beach Access', 0, 0 from inserted
  union all
  select id, 'droplets', 'Infinity Pool', 0, 1 from inserted
  union all
  select id, 'dumbbell', 'Fitness Studio', 0, 2 from inserted
  union all
  select id, 'sparkles', 'Spa & Wellness Areas', 1, 0 from inserted
  union all
  select id, 'bell', 'Concierge Services', 1, 1 from inserted
  union all
  select id, 'leaf', 'Landscaped Gardens', 1, 2 from inserted)
, gallery as (
  insert into public.project_gallery (project_id, image_path, sort_order)
  select id, 'projects/ellington/10.jpg', 0 from inserted
  union all
  select id, 'projects/ellington/2.jpg', 1 from inserted
  union all
  select id, 'projects/ellington/3.webp', 2 from inserted
  union all
  select id, 'projects/ellington/4.webp', 3 from inserted
  union all
  select id, 'projects/ellington/5.webp', 4 from inserted)
select 1;

with inserted as (
  insert into public.projects (
    slug, hero_title, hero_location, hero_image, intro,
    location_title, location_text, location_map_image, location_map_alt, location_map_query,
    location_lat, location_lng, location_zoom,
    investment_title, investment_text, investment_cta_label, investment_cta_link,
    previous_slug, next_slug
  ) values (
    'binghatti-house',
    'Binghatti House',
    'Jumeirah Village Circle * Dubai',
    'projects/binghatti/1.webp',
    'Binghatti House is a contemporary residential development featuring the brand''s iconic architectural identity. Located in JVC, it combines modern aesthetics with functional layouts for urban living.',
    'Location & Lifestyle',
    'Situated in Jumeirah Village Circle, Binghatti House benefits from strong rental demand, community infrastructure and easy access to Dubai''s main arteries.',
    'projects/binghatti/map.png',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    'Investment Proposition',
    'Positioned in one of Dubai''s strongest rental zones, Binghatti House is ideal for investors seeking steady yields and accessible entry pricing.',
    'Book a call',
    NULL,
    'saadiyat-grove',
    'costa-mare'
  ) returning id
)
, highlights as (
  insert into public.project_highlights (project_id, label, value, sort_order)
  select id, 'Developer', 'Binghatti Developers', 0 from inserted
  union all
  select id, 'Type', 'Apartments', 1 from inserted
  union all
  select id, 'Units', 'Studios - 1BR', 2 from inserted
  union all
  select id, 'Starting Price', 'AED 570,000', 3 from inserted
  union all
  select id, 'Location', 'JVC, Dubai', 4 from inserted
  union all
  select id, 'Unique', 'Signature architecture * High ROI * Central location', 5 from inserted)
, amenities as (
  insert into public.project_amenities (project_id, icon, label, group_index, sort_order)
  select id, 'droplets', 'Swimming Pool', 0, 0 from inserted
  union all
  select id, 'dumbbell', 'Gym', 0, 1 from inserted
  union all
  select id, 'car', 'Covered Parking', 1, 0 from inserted
  union all
  select id, 'shield', '24/7 Security', 1, 1 from inserted)
, gallery as (
  insert into public.project_gallery (project_id, image_path, sort_order)
  select id, 'projects/binghatti/1.webp', 0 from inserted
  union all
  select id, 'projects/binghatti/2.jpg', 1 from inserted
  union all
  select id, 'projects/binghatti/3.webp', 2 from inserted
  union all
  select id, 'projects/binghatti/4.webp', 3 from inserted
  union all
  select id, 'projects/binghatti/5.jpg', 4 from inserted)
select 1;

with inserted as (
  insert into public.projects (
    slug, hero_title, hero_location, hero_image, intro,
    location_title, location_text, location_map_image, location_map_alt, location_map_query,
    location_lat, location_lng, location_zoom,
    investment_title, investment_text, investment_cta_label, investment_cta_link,
    previous_slug, next_slug
  ) values (
    'saadiyat-grove',
    'Saadiyat Grove',
    'Abu Dhabi',
    'projects/saadiyat/1.jpg',
    'Saadiyat Grove is Aldar''s cultural and lifestyle destination located on Saadiyat Island, blending residential, retail and cultural landmarks in one of Abu Dhabi''s most prestigious districts.',
    'Location & Lifestyle',
    'Located in Abu Dhabi''s cultural heart, Saadiyat Grove connects residents to world-class museums, pristine beaches and a refined urban environment.',
    'projects/saadiyat/map.png',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    'Investment Proposition',
    'Saadiyat Grove offers long-term value supported by government-backed development, international demand and limited prime supply.',
    'Book a call',
    NULL,
    'ir1dian-park',
    'binghatti-house'
  ) returning id
)
, highlights as (
  insert into public.project_highlights (project_id, label, value, sort_order)
  select id, 'Developer', 'Aldar Properties', 0 from inserted
  union all
  select id, 'Type', 'Mixed-use Residences', 1 from inserted
  union all
  select id, 'Units', '1 - 3BR', 2 from inserted
  union all
  select id, 'Starting Price', 'AED 1.29M', 3 from inserted
  union all
  select id, 'Location', 'Saadiyat Island, Abu Dhabi', 4 from inserted
  union all
  select id, 'Unique', 'Cultural district * Beach proximity * Premium lifestyle', 5 from inserted)
, amenities as (
  insert into public.project_amenities (project_id, icon, label, group_index, sort_order)
  select id, 'shopping-bag', 'Retail Boulevard', 0, 0 from inserted
  union all
  select id, 'ticket', 'Cultural Venues', 0, 1 from inserted
  union all
  select id, 'waves', 'Beach Access', 1, 0 from inserted
  union all
  select id, 'tree-pine', 'Parks & Public Spaces', 1, 1 from inserted)
, gallery as (
  insert into public.project_gallery (project_id, image_path, sort_order)
  select id, 'projects/saadiyat/1.jpg', 0 from inserted
  union all
  select id, 'projects/saadiyat/2.jpg', 1 from inserted
  union all
  select id, 'projects/saadiyat/3.jpg', 2 from inserted
  union all
  select id, 'projects/saadiyat/4.jpg', 3 from inserted)
select 1;

commit;
