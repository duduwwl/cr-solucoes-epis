import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  console.log('Banco não configurado neste ambiente; migração ignorada.');
  process.exit(0);
}

const sql = neon(connectionString);

const statements = [
  `CREATE EXTENSION IF NOT EXISTS pgcrypto`,
  `CREATE TABLE IF NOT EXISTS categories (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9-]+$'),
    name text NOT NULL,
    sort_order integer NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
  )`,
  `CREATE TABLE IF NOT EXISTS products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9-]+$'),
    category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
    name text NOT NULL,
    label text NOT NULL,
    brand text NOT NULL,
    image_path text NOT NULL,
    description text NOT NULL,
    features jsonb NOT NULL DEFAULT '[]'::jsonb,
    active boolean NOT NULL DEFAULT true,
    sort_order integer NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
  )`,
  `CREATE TABLE IF NOT EXISTS quote_requests (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_name text NOT NULL,
    phone text,
    email text,
    company text,
    message text NOT NULL,
    product_slug text,
    status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed', 'spam')),
    source text NOT NULL DEFAULT 'website',
    user_agent text,
    ip_hash text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
  )`,
  `CREATE INDEX IF NOT EXISTS quote_requests_status_created_idx ON quote_requests(status, created_at DESC)`,
  `CREATE INDEX IF NOT EXISTS quote_requests_product_slug_idx ON quote_requests(product_slug)`,
  `CREATE TABLE IF NOT EXISTS request_rate_limits (
    id bigserial PRIMARY KEY,
    fingerprint text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
  )`,
  `CREATE INDEX IF NOT EXISTS request_rate_limits_fingerprint_created_idx ON request_rate_limits(fingerprint, created_at DESC)`,
  `CREATE TABLE IF NOT EXISTS audit_log (
    id bigserial PRIMARY KEY,
    action text NOT NULL,
    entity_type text NOT NULL,
    entity_id uuid,
    actor text,
    metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now()
  )`,
  `CREATE INDEX IF NOT EXISTS audit_log_entity_idx ON audit_log(entity_type, entity_id, created_at DESC)`,
];

const categories = [
  ['calcados', 'Calçados', 1], ['capacetes', 'Capacetes', 2], ['vestimentas', 'Vestimentas', 3],
  ['auditiva', 'Proteção auditiva', 4], ['limpeza', 'Limpeza', 5], ['incendio', 'Prevenção de incêndio', 6],
];

const products = [
  ['bota-gogowear-caramelo','calcados','Bota de segurança caramelo','Calçados','Gogowear','/images/products/calcados/bota-gogowear-real.png','Bota de cano médio, acolchoada e com solado tratorado.',['Cano médio acolchoado','Solado tratorado','Fechamento por cadarço']],
  ['botina-seguranca-escura','calcados','Botina de segurança escura','Calçados','Linha profissional','/images/products/calcados/botina-escura-real.png','Botina profissional com estrutura reforçada para jornadas longas.',['Estrutura reforçada','Ajuste firme','Uso profissional']],
  ['bota-seguranca-marrom','calcados','Bota de segurança marrom','Calçados','Linha profissional','/images/products/calcados/bota-marrom-real.png','Modelo de cano alto com biqueira protegida e solado aderente.',['Cano alto','Biqueira protegida','Solado aderente']],
  ['bota-seguranca-cinza','calcados','Bota de segurança cinza','Calçados','Linha profissional','/images/products/calcados/bota-cinza-real.png','Bota leve com suporte de tornozelo para diferentes frentes de trabalho.',['Suporte de tornozelo','Construção leve','Palmilha confortável']],
  ['capacete-de-protecao','capacetes','Capacete de proteção laranja','Capacetes','Linha CR','/images/products/capacete-laranja-v2.png','Capacete com casco rígido e ajuste interno para atividades profissionais.',['Casco rígido','Ajuste interno','Alta visibilidade']],
  ['colete-refletivo','vestimentas','Colete refletivo amarelo','Vestimentas','Linha CR','/images/products/vestimenta-referencia.png','Colete leve de alta visibilidade com faixas refletivas.',['Faixas refletivas','Tecido leve','Fechamento frontal']],
  ['protetor-auditivo-plug','auditiva','Protetor auditivo com cordão','Proteção auditiva','Protect Plug','/images/products/protetor-auditivo-v2.png','Plugs de silicone com cordão e formato anatômico.',['Silicone flexível','Cordão integrado','Formato anatômico']],
  ['bota-pvc-branca','calcados','Bota de PVC branca','Calçados','Linha impermeável','/images/products/bota-pvc-branca-v2.png','Botas de PVC impermeáveis, com cano alto e solado profundo.',['PVC impermeável','Cano alto','Fácil higienização']],
  ['vestimenta-camara-fria','vestimentas','Conjunto para câmara fria','Vestimentas','Linha térmica','/images/products/vestimenta-camara-fria-v2.png','Conjunto térmico completo para operações em ambientes refrigerados.',['Conjunto completo','Camada térmica','Cobertura ampla']],
  ['avental-vinil','vestimentas','Avental de vinil cinza','Vestimentas','Linha impermeável','/images/products/avental-vinil-v2.png','Avental de vinil com cobertura frontal ampla e cordão superior.',['Superfície impermeável','Cordão de ajuste','Limpeza simples']],
  ['linha-limpeza-profissional','limpeza','Vassoura profissional','Limpeza','Linha CR','/images/products/vassoura-profissional-v2.png','Vassoura de cerdas densas para áreas internas e externas.',['Cabo de madeira','Cerdas densas','Cabeça larga']],
  ['extintor-incendio','incendio','Kit de extintores 4 kg e 6 kg','Prevenção','Linha de prevenção','/images/products/extintores-v2.png','Kit demonstrativo para composição de projetos preventivos.',['Duas capacidades','Manômetros visíveis','Mangueiras flexíveis']],
];

await sql`SELECT pg_advisory_lock(93701357)`;
try {
  for (const statement of statements) await sql.query(statement);
  for (const [slug, name, sortOrder] of categories) {
    await sql`INSERT INTO categories (slug, name, sort_order) VALUES (${slug}, ${name}, ${sortOrder}) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order, updated_at = now()`;
  }
  for (let index = 0; index < products.length; index += 1) {
    const [slug, categorySlug, name, label, brand, imagePath, description, features] = products[index];
    await sql`INSERT INTO products (slug, category_id, name, label, brand, image_path, description, features, sort_order)
      VALUES (${slug}, (SELECT id FROM categories WHERE slug = ${categorySlug}), ${name}, ${label}, ${brand}, ${imagePath}, ${description}, ${JSON.stringify(features)}::jsonb, ${index + 1})
      ON CONFLICT (slug) DO UPDATE SET category_id = EXCLUDED.category_id, name = EXCLUDED.name, label = EXCLUDED.label, brand = EXCLUDED.brand, image_path = EXCLUDED.image_path, description = EXCLUDED.description, features = EXCLUDED.features, sort_order = EXCLUDED.sort_order, updated_at = now()`;
  }
  await sql`DELETE FROM request_rate_limits WHERE created_at < now() - interval '24 hours'`;
  console.log('Migração e catálogo concluídos.');
} finally {
  await sql`SELECT pg_advisory_unlock(93701357)`;
}
