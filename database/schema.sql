create extension if not exists pgcrypto;
create extension if not exists citext;

create table if not exists organizations (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 business_type text not null,
 country_code char(2) not null,
 currency_code char(3) not null,
 timezone text not null default 'Asia/Kolkata',
 locale text not null default 'en-IN',
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

create table if not exists users (
 id uuid primary key default gen_random_uuid(),
 email citext unique not null,
 password_hash text,
 display_name text not null,
 email_verified_at timestamptz,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

create table if not exists organization_members (
 organization_id uuid not null references organizations(id) on delete cascade,
 user_id uuid not null references users(id) on delete cascade,
 role_code text not null,
 status text not null default 'active',
 created_at timestamptz not null default now(),
 primary key (organization_id,user_id)
);

create table if not exists stores (
 id uuid primary key default gen_random_uuid(),
 organization_id uuid not null references organizations(id) on delete cascade,
 name text not null,
 code text not null,
 address jsonb not null default '{}',
 is_active boolean not null default true,
 created_at timestamptz not null default now(),
 unique(organization_id,code)
);

create table if not exists categories (
 id uuid primary key default gen_random_uuid(),
 organization_id uuid not null references organizations(id) on delete cascade,
 name text not null,
 is_active boolean not null default true,
 created_at timestamptz not null default now(),
 unique(organization_id,name)
);

create table if not exists products (
 id uuid primary key default gen_random_uuid(),
 organization_id uuid not null references organizations(id) on delete cascade,
 category_id uuid references categories(id),
 sku text not null,
 barcode text,
 name text not null,
 unit_code text not null default 'pcs',
 purchase_price numeric(18,4) not null default 0,
 selling_price numeric(18,4) not null default 0,
 min_stock numeric(18,4) not null default 0,
 is_stock_tracked boolean not null default true,
 is_active boolean not null default true,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 unique(organization_id,sku)
);

create table if not exists customers (
 id uuid primary key default gen_random_uuid(),
 organization_id uuid not null references organizations(id) on delete cascade,
 name text not null,
 phone text,
 email text,
 address jsonb not null default '{}',
 opening_balance numeric(18,4) not null default 0,
 created_at timestamptz not null default now()
);

create table if not exists suppliers (
 id uuid primary key default gen_random_uuid(),
 organization_id uuid not null references organizations(id) on delete cascade,
 name text not null,
 phone text,
 email text,
 address jsonb not null default '{}',
 opening_balance numeric(18,4) not null default 0,
 created_at timestamptz not null default now()
);

create table if not exists sales (
 id uuid primary key default gen_random_uuid(),
 organization_id uuid not null references organizations(id) on delete cascade,
 store_id uuid references stores(id),
 customer_id uuid references customers(id),
 invoice_number text not null,
 status text not null default 'finalized',
 currency_code char(3) not null,
 subtotal numeric(18,4) not null default 0,
 discount_total numeric(18,4) not null default 0,
 tax_total numeric(18,4) not null default 0,
 grand_total numeric(18,4) not null default 0,
 created_by uuid references users(id),
 created_at timestamptz not null default now(),
 unique(organization_id,invoice_number)
);

create table if not exists sale_items (
 id uuid primary key default gen_random_uuid(),
 sale_id uuid not null references sales(id) on delete cascade,
 product_id uuid not null references products(id),
 quantity numeric(18,4) not null,
 unit_price numeric(18,4) not null,
 discount_amount numeric(18,4) not null default 0,
 tax_amount numeric(18,4) not null default 0,
 line_total numeric(18,4) not null
);

create table if not exists payments (
 id uuid primary key default gen_random_uuid(),
 organization_id uuid not null references organizations(id) on delete cascade,
 sale_id uuid references sales(id),
 method_code text not null,
 amount numeric(18,4) not null,
 status text not null default 'paid',
 reference text,
 created_at timestamptz not null default now()
);

create table if not exists inventory_movements (
 id uuid primary key default gen_random_uuid(),
 organization_id uuid not null references organizations(id) on delete cascade,
 store_id uuid references stores(id),
 product_id uuid not null references products(id),
 movement_type text not null,
 quantity numeric(18,4) not null,
 unit_cost numeric(18,4),
 reference_type text,
 reference_id uuid,
 reason text,
 created_by uuid references users(id),
 created_at timestamptz not null default now()
);

create table if not exists audit_logs (
 id uuid primary key default gen_random_uuid(),
 organization_id uuid references organizations(id) on delete cascade,
 user_id uuid references users(id),
 action text not null,
 entity_type text not null,
 entity_id uuid,
 before_data jsonb,
 after_data jsonb,
 created_at timestamptz not null default now()
);

create index if not exists idx_products_org on products(organization_id);
create index if not exists idx_sales_org_created on sales(organization_id,created_at desc);
create index if not exists idx_inventory_org_product on inventory_movements(organization_id,product_id,created_at desc);
create index if not exists idx_audit_org_created on audit_logs(organization_id,created_at desc);