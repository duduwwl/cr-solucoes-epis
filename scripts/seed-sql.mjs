// Writes supabase/seed/catalog.sql from src/data/catalog.ts so the database matches the site.
// Run: node scripts/seed-sql.mjs   (Node 23+ strips the TypeScript types on import)
import fs from 'node:fs';
import { categories, products } from '../src/data/catalog.ts';

const q = (value) => (value == null ? 'null' : `'${String(value).replace(/'/g, "''")}'`);
const json = (value) => `${q(JSON.stringify(value))}::jsonb`;

const lines = [
  '-- Gerado por scripts/seed-sql.mjs a partir de src/data/catalog.ts. Pode rodar mais de uma vez.',
  'begin;',
  '',
  ...categories.map((c, i) => `insert into public.categories (slug, name, summary, sort_order) values (${q(c.slug)}, ${q(c.name)}, ${q(c.summary)}, ${i})
  on conflict (slug) do update set name = excluded.name, summary = excluded.summary, sort_order = excluded.sort_order, updated_at = now();`),
  '',
  ...products.flatMap((p, i) => [
    `insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values (${q(p.slug)}, (select id from public.categories where slug = ${q(p.category)}), ${q(p.name)}, ${q(p.brand)}, ${q(p.description)}, ${json(p.features)}, ${q(p.sizeHint)}, ${p.featured ? 'true' : 'false'}, true, ${i}, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';`,
    `delete from public.product_images where product_id = (select id from public.products where slug = ${q(p.slug)} and source = 'site');`,
    ...p.images.map((path, n) => `insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, ${q(path)}, ${q(p.name)}, ${n} from public.products where slug = ${q(p.slug)}
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;`),
  ]),
  '',
  'commit;',
  "notify pgrst, 'reload schema';",
  '',
];

fs.mkdirSync('supabase/seed', { recursive: true });
fs.writeFileSync('supabase/seed/catalog.sql', lines.join('\n'));
console.log(`supabase/seed/catalog.sql: ${categories.length} categorias, ${products.length} produtos`);
