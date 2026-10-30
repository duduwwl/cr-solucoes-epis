create extension if not exists pgcrypto;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  name text not null,
  summary text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  brand text not null default 'Linha CR',
  description text not null default '',
  features jsonb not null default '[]'::jsonb,
  size_hint text,
  featured boolean not null default false,
  active boolean not null default true,
  sort_order integer not null default 0,
  source text not null default 'site',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  path text not null,
  alt_text text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique(product_id, path)
);

create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  contact_name text not null,
  phone text,
  email text,
  company text,
  message text not null,
  product_slug text,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed', 'spam')),
  source text not null default 'website',
  user_agent text,
  ip_hash text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.request_rate_limits (
  id bigint generated always as identity primary key,
  fingerprint text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_log (
  id bigint generated always as identity primary key,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  actor text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists products_active_sort_idx on public.products(active, sort_order, created_at);
create index if not exists product_images_product_sort_idx on public.product_images(product_id, sort_order);
create index if not exists quote_requests_status_created_idx on public.quote_requests(status, created_at desc);
create index if not exists request_rate_limits_fingerprint_created_idx on public.request_rate_limits(fingerprint, created_at desc);
create index if not exists audit_log_entity_idx on public.audit_log(entity_type, entity_id, created_at desc);

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.quote_requests enable row level security;
alter table public.request_rate_limits enable row level security;
alter table public.audit_log enable row level security;
