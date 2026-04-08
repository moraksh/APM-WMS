create extension if not exists "pgcrypto";

drop table if exists public.goods_receipts cascade;
drop table if exists public.inventory cascade;
drop table if exists public.sales_orders cascade;
drop table if exists public.locations cascade;
drop table if exists public.items cascade;
drop function if exists public.apply_audit_fields();

create table public.items (
  id uuid primary key default gen_random_uuid(),
  warehouse text not null default '',
  company text not null default '',
  item_number text not null default '',
  item_description_1 text not null default '',
  item_group text,
  item_main_group text,
  item_sub_group text,
  jis_prod_grp text,
  vas_group text,
  check_group text,
  matchcode text,
  item_grp_pick_time text,
  item_grp_ptwy_time text,
  item_grp_stocktak_time text,
  material_group text,
  ean_no_gtin text,
  ean_check text,
  display_item_images text,
  material_number text,
  material_thickness text,
  material_width text,
  material_length text,
  item_description_2 text,
  item_description_3 text,
  item_short_description text,
  sku_height text,
  key_qa_instruction text,
  quality_assurance_1_0 text,
  quality_code text,
  add_goods_excluded text,
  pick_strat text,
  reserv_strat text,
  reserv_threshold text,
  reserv_span text,
  customs_tariff_no text,
  last_inv_date text,
  stotak_cd text,
  standard_stor_loc text,
  standard_stor_area text,
  ptwy_compulsory text,
  whse_section text,
  raw_item_length text,
  raw_item_width text,
  raw_item_heigth text,
  raw_item_area_gross text,
  raw_item_area_net text,
  raw_item_volume_gross text,
  raw_item_volume_net text,
  theoret_wgt_in_kg text,
  net_wgt_in_kg text,
  gross_wgt_in_kg text,
  max_toleranz text,
  volume_in_cm3 text,
  qty_per_cm3 text,
  unit_of_measure text,
  length_in_mm text,
  width_in_mm text,
  height_in_mm text,
  pack_item_area_gross text,
  pack_item_area_gross_2 text,
  pack_item_volume_gross text,
  nesting_factor_length text,
  nesting_factor_width text,
  nesting_factor_height text,
  correction_factor_width text,
  correction_factor_lenght text,
  correction_factor_height text,
  piece_per_layer text,
  theoret_wgt_pu_in_kg text,
  net_wgt_pu_in_kg text,
  gross_wgt_pu_in_kg text,
  max_tolerance_pu text,
  volume_pu_in_cm3 text,
  qty_per_cm3_2 text,
  content_qty text,
  uom_of_pu text,
  pu_qty text,
  no_conversion_pu_1 text,
  length_pu_in_mm text,
  width_pu_in_mm text,
  height_pu_in_mm text,
  nesting_factor_l_pu text,
  nesting_factor_w_pu text,
  nesting_factor_h_pu text,
  correction_factor_w_pu text,
  correction_factor_l_pu text,
  correction_factor_h_pu text,
  pu_per_layer text,
  theoret_wgt_opu_in_kg text,
  net_wgt_opu_in_kg text,
  gross_wgt_opu_in_kg text,
  max_toleranz_opu text,
  volume_opu_in_cm3 text,
  qty_per_cm3_3 text,
  uom_of_opu text,
  outerpack_qty text,
  no_convresion_pu_2 text,
  length_opu_in_mm text,
  width_opu_in_mm text,
  height_opu_in_mm text,
  nesting_factor_l_opu text,
  nesting_factor_w_opu text,
  nesting_factor_h_opu text,
  correction_factor_w_opu text,
  correction_factor_l_opu text,
  correction_factor_h_opu text,
  outer_package_per_layer text,
  theoret_wgt_hu_in_kg text,
  net_wgt_hu_in_kg text,
  gross_wgt_hu_in_kg text,
  max_tolerance_hu text,
  volume_hu_in_cm3 text,
  qty_per_cm3_4 text,
  handling_unit text,
  qty_per_hu text,
  no_convresion_hu text,
  length_hu_in_mm text,
  width_hu_in_mm text,
  height_hu_in_mm text,
  nesting_factor_l_hu text,
  nesting_factor_w_hu text,
  nesting_factor_h_hu text,
  correction_factor_w_hu text,
  correction_factor_l_hu text,
  correction_factor_h_hu text,
  layers_per_pallet text,
  stack_height text,
  tolt_in_grad text,
  unit_of_measure_host text,
  unit_of_measure_iso_host text,
  rounding_control text,
  rounding_singles text,
  rounding_singles_2 text,
  rounding_outer_packs text,
  rounding_load_units text,
  volume_factor text,
  limit_pick_qty text,
  min_outp_qty text,
  scaling_item text,
  rack text,
  shipunit_finish_good text,
  prod_prior_item text,
  prod_orders_perm text,
  item_type text,
  consi_mater text,
  mat_owner text,
  cold_material text,
  reserv_selection text,
  remaining_time_in_days text,
  remain_time_in_gr_days text,
  max_bbd_in_days text,
  quarantine_cd text,
  quarantine_time text,
  new_qa_check_days text,
  maturity_date_in_days text,
  single_price text,
  currency_key text,
  standard_price text,
  currency_key_2 text,
  new_standard_price text,
  currency_key_3 text,
  cent_new_std text,
  currency_key_4 text,
  free_of_charge text,
  rent_price text,
  currency_key_5 text,
  new_rent_price text,
  currency_key_6 text,
  date_new_rent text,
  currency_key_7 text,
  return_sku_no_compuls text,
  no_of_pce_list_lines text,
  replacem_item_no text,
  item_reference text,
  item_returnable_1 text,
  item_returnable_2 text,
  item_returnable_3 text,
  item_returnable_type text,
  returnable_item_seq text,
  total_invent text,
  blocked_qty text,
  avail_qty text,
  item_lot_compuls text,
  item_bbd_compuls text,
  item_variety_compuls text,
  item_labelling text,
  scal_compul_with_pick text,
  single_item_picking text,
  item_group_picking text,
  s_n_compu_with_pick text,
  s_n_compu_receiving text,
  ser_no_inventory_pickup text,
  ser_no_inv_booking text,
  ser_no_without_ref text,
  serial_no_time_of_capt text,
  recovery_period text,
  goods_group text,
  rem_qty_display_in text,
  rem_qty_display_in_qu text,
  rem_goods_value_display text,
  days_in_workcalender text,
  no_of_boxes text,
  manufacturer text,
  supplier_no text,
  works_no text,
  item_comment_1 text,
  item_comment_2 text,
  item_comment_3 text,
  equipping_remark_1 text,
  equipping_remark_2 text,
  equipping_remark_3 text,
  new_record_host text,
  not_host_relevant text,
  dropped_goods_code text,
  hazagoods_indicator text,
  print_ucc_label text,
  shipmethod_excluded text,
  pack_loc_relevant text,
  trading_unit text,
  date_last_entry text,
  date_last_exit text,
  delete_cd text,
  delete_record_date text,
  inactive_cd text,
  rec_inactive_date text,
  sap_idoc_number text,
  user_last_modification text,
  terminal_last_modi text,
  modifik_date text,
  modifik_time text,
  upd_host_required text,
  last_upd_to_host_date text,
  last_upd_to_host_time text,
  coc_mixed_storage text,
  merchandise_group text,
  merchandise_group_2 text,
  merchandise_group_3 text,
  range_of_use text,
  minimum_quantity text,
  reason_quantity_change text,
  variant_segment text,
  variant_name text,
  variant_usage_1 text,
  variant_usage_2 text,
  variant_usage_3 text,
  variant_usage_4 text,
  variant_usage_5 text,
  matrix_info text,
  matrix_x_axis_1 text,
  matrix_y_axis_1 text,
  matrix_y_axis_2 text,
  variant_template text,
  brand_name text,
  shipping_hu_type text,
  splitt_kz_versand_lm text,
  residue_stor_loc text,
  residue_stor_area text,
  country_of_origin text,
  not_reserv_part_quant text,
  measure_date text,
  measure_time text,
  measure_user text,
  measure_terminal text,
  vas_profile_1 text,
  vas_profile_2 text,
  vas_profile_3 text,
  vas_profile_4 text,
  vas_profile_5 text,
  vas_profile_6 text,
  vas_profile_7 text,
  vas_profile_8 text,
  vas_profile_9 text,
  check_pos_pattern text,
  check_neg_pattern text,
  combi_label text,
  s_n_barcode_type text,
  sepa_ator_qr text,
  forbid_lfs_numbers text,
  forbid_ean text,
  duration_produc_sec text,
  duration_prepare_sek text,
  eff_dur_produc_sec text,
  additional_package text,
  distribute_record text,
  created_at timestamptz not null default timezone('utc', now()),
  created_by_user text not null default 'Akshay',
  updated_at timestamptz not null default timezone('utc', now()),
  updated_by_user text not null default 'Akshay',
  unique (warehouse, company, item_number)
);

create table public.locations (
  id uuid primary key default gen_random_uuid(),
  warehouse text not null default '',
  company text not null default '',
  code text not null unique,
  zone text not null,
  aisle text not null,
  bin text not null,
  capacity text not null,
  status text not null default 'Available',
  created_at timestamptz not null default timezone('utc', now()),
  created_by_user text not null default 'Akshay',
  updated_at timestamptz not null default timezone('utc', now()),
  updated_by_user text not null default 'Akshay'
);

create table public.goods_receipts (
  id uuid primary key default gen_random_uuid(),
  warehouse text not null default '',
  company text not null default '',
  receipt_no text not null unique,
  supplier text not null,
  item_number text not null,
  quantity integer not null check (quantity > 0),
  location_code text not null references public.locations(code),
  status text not null default 'Received',
  created_at timestamptz not null default timezone('utc', now()),
  created_by_user text not null default 'Akshay',
  updated_at timestamptz not null default timezone('utc', now()),
  updated_by_user text not null default 'Akshay'
);

create table public.inventory (
  id uuid primary key default gen_random_uuid(),
  warehouse text not null default '',
  company text not null default '',
  item_number text not null,
  description text not null,
  location_code text not null references public.locations(code),
  on_hand integer not null default 0,
  allocated integer not null default 0,
  available integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  created_by_user text not null default 'Akshay',
  updated_at timestamptz not null default timezone('utc', now()),
  updated_by_user text not null default 'Akshay'
);

create table public.sales_orders (
  id uuid primary key default gen_random_uuid(),
  warehouse text not null default '',
  company text not null default '',
  order_no text not null unique,
  customer text not null,
  order_date date not null,
  item_count integer not null default 0,
  ship_from text not null,
  status text not null default 'Created',
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  created_by_user text not null default 'Akshay',
  updated_at timestamptz not null default timezone('utc', now()),
  updated_by_user text not null default 'Akshay'
);

create table public.process_field_settings (
  id uuid primary key default gen_random_uuid(),
  process_name text not null,
  field_key text not null,
  display_label text not null,
  is_visible boolean not null default true,
  is_required boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  created_by_user text not null default 'Akshay',
  updated_at timestamptz not null default timezone('utc', now()),
  updated_by_user text not null default 'Akshay',
  unique (process_name, field_key)
);

create or replace function public.apply_audit_fields() returns trigger language plpgsql as $$
begin
  if tg_op = 'INSERT' then
    new.created_at := coalesce(new.created_at, timezone('utc', now()));
    new.updated_at := coalesce(new.updated_at, new.created_at);
    new.created_by_user := coalesce(nullif(new.created_by_user, ''), current_setting('app.current_user', true), 'Akshay');
    new.updated_by_user := coalesce(nullif(new.updated_by_user, ''), new.created_by_user, current_setting('app.current_user', true), 'Akshay');
  else
    new.created_at := old.created_at;
    new.created_by_user := old.created_by_user;
    new.updated_at := timezone('utc', now());
    new.updated_by_user := coalesce(nullif(new.updated_by_user, ''), current_setting('app.current_user', true), old.updated_by_user, old.created_by_user, 'Akshay');
  end if;
  return new;
end;
$$;

do $$
declare
  table_name text;
  text_lengths integer[] := array[20,30,40,50,60,70,80,90,100,120,140,160,180,220,255];
  idx integer;
begin
  foreach table_name in array array['items', 'locations', 'goods_receipts', 'inventory', 'sales_orders', 'process_field_settings'] loop
    for idx in 1..15 loop
      execute format('alter table public.%I add column if not exists reserve_text_%s varchar(%s)', table_name, lpad(idx::text, 2, '0'), text_lengths[idx]);
      execute format('alter table public.%I add column if not exists reserve_num_%s numeric(18,4)', table_name, lpad(idx::text, 2, '0'));
    end loop;
    execute format('drop trigger if exists trg_%I_apply_audit_fields on public.%I', table_name, table_name);
    execute format('create trigger trg_%I_apply_audit_fields before insert or update on public.%I for each row execute function public.apply_audit_fields()', table_name, table_name);
  end loop;
end $$;
alter table public.items enable row level security;
alter table public.locations enable row level security;
alter table public.goods_receipts enable row level security;
alter table public.inventory enable row level security;
alter table public.sales_orders enable row level security;
alter table public.process_field_settings enable row level security;

drop policy if exists "public read items" on public.items;
create policy "public read items" on public.items for select to anon using (true);
drop policy if exists "public insert items" on public.items;
create policy "public insert items" on public.items for insert to anon with check (true);
drop policy if exists "public update items" on public.items;
create policy "public update items" on public.items for update to anon using (true) with check (true);
drop policy if exists "public delete items" on public.items;
create policy "public delete items" on public.items for delete to anon using (true);

drop policy if exists "public read locations" on public.locations;
create policy "public read locations" on public.locations for select to anon using (true);
drop policy if exists "public read goods receipts" on public.goods_receipts;
create policy "public read goods receipts" on public.goods_receipts for select to anon using (true);
drop policy if exists "public read inventory" on public.inventory;
create policy "public read inventory" on public.inventory for select to anon using (true);
drop policy if exists "public read sales orders" on public.sales_orders;
create policy "public read sales orders" on public.sales_orders for select to anon using (true);

insert into public.items (warehouse, company, item_number, item_description_1) values ('DXB1', 'APM', 'ITM-1001', 'Industrial Tape 48mm') on conflict do nothing;
insert into public.locations (warehouse, company, code, zone, aisle, bin, capacity, status) values ('DXB1', 'APM', 'A-01-01', 'Fast Pick', 'A01', '01', '500 units', 'Available') on conflict do nothing;




drop policy if exists "public read process field settings" on public.process_field_settings;
create policy "public read process field settings" on public.process_field_settings for select to anon using (true);
drop policy if exists "public write process field settings" on public.process_field_settings;
create policy "public write process field settings" on public.process_field_settings for all to anon using (true) with check (true);
