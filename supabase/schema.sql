create extension if not exists "pgcrypto";

create table if not exists public.items (
  id uuid primary key default gen_random_uuid(),
  item_code text not null unique,
  description text not null,
  category text not null,
  unit text not null,
  reorder_level integer not null default 0,
  status text not null default 'Active',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.locations (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  zone text not null,
  aisle text not null,
  bin text not null,
  capacity text not null,
  status text not null default 'Available',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.goods_receipts (
  id uuid primary key default gen_random_uuid(),
  receipt_no text not null unique,
  supplier text not null,
  item_code text not null references public.items(item_code),
  quantity integer not null check (quantity > 0),
  location_code text not null references public.locations(code),
  status text not null default 'Received',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.inventory (
  id uuid primary key default gen_random_uuid(),
  item_code text not null references public.items(item_code),
  description text not null,
  location_code text not null references public.locations(code),
  on_hand integer not null default 0,
  allocated integer not null default 0,
  available integer not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.sales_orders (
  id uuid primary key default gen_random_uuid(),
  order_no text not null unique,
  customer text not null,
  order_date date not null,
  item_count integer not null default 0,
  ship_from text not null,
  status text not null default 'Created',
  notes text,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.items enable row level security;
alter table public.locations enable row level security;
alter table public.goods_receipts enable row level security;
alter table public.inventory enable row level security;
alter table public.sales_orders enable row level security;

drop policy if exists "public read items" on public.items;
create policy "public read items"
on public.items
for select
to anon
using (true);

drop policy if exists "public insert items" on public.items;
create policy "public insert items"
on public.items
for insert
to anon
with check (true);

drop policy if exists "public update items" on public.items;
create policy "public update items"
on public.items
for update
to anon
using (true)
with check (true);

drop policy if exists "public delete items" on public.items;
create policy "public delete items"
on public.items
for delete
to anon
using (true);

drop policy if exists "public read locations" on public.locations;
create policy "public read locations"
on public.locations
for select
to anon
using (true);

drop policy if exists "public read goods receipts" on public.goods_receipts;
create policy "public read goods receipts"
on public.goods_receipts
for select
to anon
using (true);

drop policy if exists "public read inventory" on public.inventory;
create policy "public read inventory"
on public.inventory
for select
to anon
using (true);

drop policy if exists "public read sales orders" on public.sales_orders;
create policy "public read sales orders"
on public.sales_orders
for select
to anon
using (true);

insert into public.items (item_code, description, category, unit, reorder_level, status)
values
  ('ITM-1001', 'Industrial Tape 48mm', 'Packing', 'Roll', 120, 'Active'),
  ('ITM-1002', 'Barcode Scanner X2', 'Devices', 'Each', 25, 'Active'),
  ('ITM-1003', 'Safety Gloves Large', 'Safety', 'Pair', 80, 'Low Stock'),
  ('ITM-1004', 'Shipping Label 4x6', 'Consumables', 'Pack', 60, 'Active')
on conflict (item_code) do nothing;

insert into public.locations (code, zone, aisle, bin, capacity, status)
values
  ('A-01-01', 'Fast Pick', 'A01', '01', '500 units', 'Available'),
  ('B-02-04', 'Electronics', 'B02', '04', '100 units', 'Available'),
  ('QC-02', 'Quality Check', 'QC', '02', '60 units', 'Inspection'),
  ('RCV-01', 'Receiving', 'RCV', '01', '2 pallets', 'Inbound')
on conflict (code) do nothing;

insert into public.goods_receipts (receipt_no, supplier, item_code, quantity, location_code, status)
values
  ('GRN-2026-041', 'Nexa Supplies', 'ITM-1001', 240, 'RCV-01', 'Received'),
  ('GRN-2026-042', 'Blue Orbit Tech', 'ITM-1002', 20, 'QC-02', 'Quality Check'),
  ('GRN-2026-043', 'Prime Safety', 'ITM-1003', 150, 'RCV-01', 'Putaway Pending')
on conflict (receipt_no) do nothing;

insert into public.inventory (item_code, description, location_code, on_hand, allocated, available)
values
  ('ITM-1001', 'Industrial Tape 48mm', 'A-01-01', 460, 80, 380),
  ('ITM-1002', 'Barcode Scanner X2', 'B-02-04', 44, 12, 32),
  ('ITM-1003', 'Safety Gloves Large', 'QC-02', 96, 20, 76),
  ('ITM-1004', 'Shipping Label 4x6', 'A-01-01', 310, 55, 255)
on conflict do nothing;

insert into public.sales_orders (order_no, customer, order_date, item_count, ship_from, status, notes)
values
  ('SO-2026-318', 'Al Maha Retail', '2026-04-07', 6, 'A-01', 'Picking', null),
  ('SO-2026-319', 'Desert Trade LLC', '2026-04-07', 3, 'B-02', 'Packed', null),
  ('SO-2026-320', 'North Bay Stores', '2026-04-08', 8, 'Mixed', 'Allocated', null)
on conflict (order_no) do nothing;
