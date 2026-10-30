import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { isAdminRequest } from '@/lib/admin-auth';
import { getDb } from '@/lib/db';
import { isTrustedOrigin } from '@/lib/security';

export const runtime = 'nodejs';
const productPayload = z.object({
  slug: z.string().trim().regex(/^[a-z0-9-]+$/).max(120),
  categorySlug: z.string().trim().regex(/^[a-z0-9-]+$/).max(80),
  name: z.string().trim().min(2).max(180),
  brand: z.string().trim().max(120).default('Linha CR'),
  description: z.string().trim().max(1200).default(''),
  features: z.array(z.string().trim().min(1).max(180)).max(12).default([]),
  sizeHint: z.string().trim().max(240).nullable().optional(),
  imagePath: z.string().trim().min(1).max(500),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
});

function denied() { return NextResponse.json({ error: 'Acesso administrativo necessário.' }, { status: 401 }); }

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return denied();
  try {
    const { data, error } = await getDb().from('products').select('id, slug, name, brand, description, features, size_hint, featured, active, sort_order, category:categories(slug, name), images:product_images(path, alt_text, sort_order)').order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json({ products: (data ?? []).map((product) => ({ ...product, category: Array.isArray(product.category) ? product.category[0] ?? null : product.category, images: [...(product.images ?? [])].sort((a, b) => a.sort_order - b.sort_order) })) });
  } catch {
    return NextResponse.json({ error: 'Banco indisponível.' }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request) || !isTrustedOrigin(request)) return denied();
  const parsed = productPayload.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Dados do produto inválidos.' }, { status: 400 });
  try {
    const db = getDb();
    const { data: category, error: categoryError } = await db.from('categories').select('id').eq('slug', parsed.data.categorySlug).single();
    if (categoryError || !category) return NextResponse.json({ error: 'Categoria não encontrada.' }, { status: 400 });
    const { data: product, error } = await db.from('products').insert({ slug: parsed.data.slug, category_id: category.id, name: parsed.data.name, brand: parsed.data.brand, description: parsed.data.description, features: parsed.data.features, size_hint: parsed.data.sizeHint || null, featured: parsed.data.featured, active: parsed.data.active, source: 'admin' }).select('id, slug').single();
    if (error || !product) throw error ?? new Error('Produto não criado.');
    const { error: imageError } = await db.from('product_images').insert({ product_id: product.id, path: parsed.data.imagePath, alt_text: parsed.data.name });
    if (imageError) throw imageError;
    await db.from('audit_log').insert({ action: 'product.created', entity_type: 'product', entity_id: product.id, actor: 'admin', metadata: { slug: product.slug } });
    return NextResponse.json({ product }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Não foi possível criar o produto.' }, { status: 503 });
  }
}
