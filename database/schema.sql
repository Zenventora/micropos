-- Puravigal POS — PostgreSQL domain foundation
-- Financial records are immutable by policy; corrections use returns, refunds and adjustments.
create extension if not exists pgcrypto;

create table if not exists organizations(
 id uuid primary key default gen_random_uuid(), name text not null, legal_name text,
 country_code char(2) not null default 'IN', currency_code char(3) not null default 'INR',
 timezone text not null default 'Asia/Kolkata', locale text not null default 'en-IN',
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists stores(
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references organizations(id),
 name text not null, code text, address jsonb not null default '{}'::jsonb, is_active boolean not null default true,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 unique(organization_id,code)
);
create table if not exists users(
 id uuid primary key default gen_random_uuid(), email text not null unique, password_hash text,
 display_name text not null, phone text, is_verified boolean not null default false,
 is_active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists organization_users(
 organization_id uuid not null references organizations(id) on delete cascade,
 user_id uuid not null references users(id) on delete cascade,
 role text not null default 'staff', created_at timestamptz not null default now(),
 primary key(organization_id,user_id)
);
create table if not exists categories(
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references organizations(id) on delete cascade,
 name text not null, is_active boolean not null default true, created_at timestamptz not null default now(),
 unique(organization_id,name)
);
create table if not exists products(
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references organizations(id) on delete cascade,
 category_id uuid references categories(id), name text not null, sku text, barcode text,
 unit text not null default 'pcs', purchase_price numeric(19,4) not null default 0,
 selling_price numeric(19,4) not null default 0, currency_code char(3) not null default 'INR',
 tax_code text, min_stock numeric(19,4) not null default 0, stock_tracking boolean not null default true,
 is_active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 unique(organization_id,sku), unique(organization_id,barcode)
);
create table if not exists customers(
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references organizations(id) on delete cascade,
 name text not null, phone text, email text, address jsonb not null default '{}'::jsonb,
 notes text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists suppliers(
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references organizations(id) on delete cascade,
 name text not null, phone text, email text, address jsonb not null default '{}'::jsonb,
 tax_id text, notes text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists invoices(
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references organizations(id),
 store_id uuid not null references stores(id), customer_id uuid references customers(id),
 invoice_number text not null, status text not null default 'paid',
 currency_code char(3) not null, subtotal numeric(19,4) not null default 0,
 discount_total numeric(19,4) not null default 0, tax_total numeric(19,4) not null default 0,
 grand_total numeric(19,4) not null default 0, created_by uuid references users(id),
 created_at timestamptz not null default now(),
 unique(organization_id,store_id,invoice_number)
);
create table if not exists invoice_items(
 id uuid primary key default gen_random_uuid(), invoice_id uuid not null references invoices(id) on delete restrict,
 product_id uuid references products(id), description text not null, quantity numeric(19,4) not null,
 unit_price numeric(19,4) not null, discount_amount numeric(19,4) not null default 0,
 tax_amount numeric(19,4) not null default 0, line_total numeric(19,4) not null
);
create table if not exists payments(
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references organizations(id),
 invoice_id uuid references invoices(id), method text not null, amount numeric(19,4) not null,
 currency_code char(3) not null, status text not null default 'paid', reference text,
 created_by uuid references users(id), created_at timestamptz not null default now()
);
create table if not exists stock_movements(
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references organizations(id),
 store_id uuid not null references stores(id), product_id uuid not null references products(id),
 movement_type text not null, quantity numeric(19,4) not null, reference_type text,
 reference_id uuid, reason text, created_by uuid references users(id), created_at timestamptz not null default now()
);
create table if not exists audit_logs(
 id uuid primary key default gen_random_uuid(), organization_id uuid references organizations(id),
 user_id uuid references users(id), action text not null, entity_type text, entity_id uuid,
 before_data jsonb, after_data jsonb, ip_address inet, created_at timestamptz not null default now()
);
create index if not exists idx_products_org on products(organization_id);
create index if not exists idx_products_barcode on products(organization_id,barcode);
create index if not exists idx_stock_product on stock_movements(organization_id,product_id,created_at);
create index if not exists idx_invoices_org_date on invoices(organization_id,created_at);
create index if not exists idx_audit_org_date on audit_logs(organization_id,created_at);