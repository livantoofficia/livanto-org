
-- =========================
-- LIVANTO account schema
-- =========================

-- 1. Profiles (1:1 with auth.users) ---------------------------------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  phone text,
  avatar_url text,
  referral_code text unique,
  referred_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users view own profile"   on public.profiles for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- 2. Addresses ------------------------------------------------------
create table public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text,
  full_name text not null,
  phone text not null,
  line1 text not null,
  line2 text,
  city text not null,
  state text not null,
  pincode text not null,
  country text not null default 'India',
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.addresses enable row level security;

create policy "Users view own addresses"   on public.addresses for select using (auth.uid() = user_id);
create policy "Users insert own addresses" on public.addresses for insert with check (auth.uid() = user_id);
create policy "Users update own addresses" on public.addresses for update using (auth.uid() = user_id);
create policy "Users delete own addresses" on public.addresses for delete using (auth.uid() = user_id);

-- 3. Wallet transactions -------------------------------------------
create table public.wallet_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  amount numeric(10,2) not null,
  type text not null check (type in ('credit','debit')),
  reason text,
  created_at timestamptz not null default now()
);

alter table public.wallet_transactions enable row level security;

create policy "Users view own wallet" on public.wallet_transactions for select using (auth.uid() = user_id);
-- credits/debits are server-side only; no insert policy for clients

-- 4. Wishlist items (synced) ---------------------------------------
create table public.wishlist_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_handle text not null,
  product_id text,
  created_at timestamptz not null default now(),
  unique (user_id, product_handle)
);

alter table public.wishlist_items enable row level security;

create policy "Users view own wishlist"   on public.wishlist_items for select using (auth.uid() = user_id);
create policy "Users insert own wishlist" on public.wishlist_items for insert with check (auth.uid() = user_id);
create policy "Users delete own wishlist" on public.wishlist_items for delete using (auth.uid() = user_id);

-- 5. Recently viewed -----------------------------------------------
create table public.recently_viewed (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_handle text not null,
  viewed_at timestamptz not null default now(),
  unique (user_id, product_handle)
);

alter table public.recently_viewed enable row level security;

create policy "Users view own history"   on public.recently_viewed for select using (auth.uid() = user_id);
create policy "Users insert own history" on public.recently_viewed for insert with check (auth.uid() = user_id);
create policy "Users delete own history" on public.recently_viewed for delete using (auth.uid() = user_id);

-- 6. Orders (mirrored from Shopify webhooks later) -----------------
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  shopify_order_id text unique,
  order_number text,
  status text,
  total numeric(10,2),
  currency text default 'INR',
  placed_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "Users view own orders" on public.orders for select using (auth.uid() = user_id);

-- 7. Auto-create profile on signup ---------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  ref_code text;
begin
  ref_code := upper(substr(replace(new.id::text,'-',''), 1, 8));
  insert into public.profiles (id, full_name, email, phone, referral_code)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.email,
    new.phone,
    ref_code
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 8. updated_at trigger for profiles -------------------------------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();
