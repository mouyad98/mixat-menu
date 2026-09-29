-- Run this in Supabase Dashboard -> SQL Editor -> New query

-- 1. Restaurants (tenants). One row per client, e.g. "Orange"
create table restaurants (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,          -- used in the URL, e.g. "orange"
  name text not null,
  tagline text,
  phone text,
  location text,
  instagram_url text,
  facebook_url text,
  owner_id uuid references auth.users (id), -- the owner's login account
  logo_url text,
  created_at timestamptz default now()
);

-- 2. Categories, e.g. "Fresh Juices", "Desserts"
create table categories (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid references restaurants (id) on delete cascade,
  name_en text not null,
  name_ar text,
  image_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 3. Products, e.g. "Orange Juice - Large"
create table products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories (id) on delete cascade,
  name_en text not null,
  name_ar text,
  description_en text,
  description_ar text,
  price numeric(10,2) not null,
  image_url text,
  is_available boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ---------- Row Level Security ----------
-- Public visitors can READ everything (it's a menu, it should be public).
-- Only the logged-in owner can INSERT/UPDATE/DELETE their own restaurant's data.

alter table restaurants enable row level security;
alter table categories enable row level security;
alter table products enable row level security;

-- Public read access
create policy "Public can view restaurants" on restaurants for select using (true);
create policy "Public can view categories" on categories for select using (true);
create policy "Public can view products" on products for select using (true);

-- Owner-only write access
create policy "Owner manages own restaurant" on restaurants
  for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create policy "Owner manages own categories" on categories
  for all using (
    exists (select 1 from restaurants r where r.id = restaurant_id and r.owner_id = auth.uid())
  ) with check (
    exists (select 1 from restaurants r where r.id = restaurant_id and r.owner_id = auth.uid())
  );

create policy "Owner manages own products" on products
  for all using (
    exists (
      select 1 from categories c
      join restaurants r on r.id = c.restaurant_id
      where c.id = category_id and r.owner_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from categories c
      join restaurants r on r.id = c.restaurant_id
      where c.id = category_id and r.owner_id = auth.uid()
    )
  );

-- ---------- Storage ----------
-- After running this file, go to Storage -> create a bucket called "menu-images" and set it to Public.
