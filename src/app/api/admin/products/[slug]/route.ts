import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { isAdminRequest } from '@/lib/admin-auth';
import { getDb } from '@/lib/db';
import { isTrustedOrigin } from '@/lib/security';

export const runtime = 'nodejs';
const updatePayload = z.object({
  name: z.string().trim().min(2).max(180),
  brand: z.string().trim().max(120),
  description: z.string().trim().max(1200),
  features: z.array(z.string().trim().min(1).max(180)).max(12),
  sizeHint: z.string().trim().max(240).nullable().optional(),
  imagePath: z.string().trim().min(1).max(500),
  featured: z.boolean(),
  active: z.boolean(),
});

function denied() { return NextResponse.json({ error: 'Acesso administrativo necessário.' }, { status: 401 }); }

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAdminRequest(request) || !isTrustedOrigin(request)) return denied();
  const parsed = updatePayload.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Dados do produto inválidos.' }, { status: 400 });
  try {
    const db = getDb();
    const slug = (await params).slug;
    const { data: product, error } = await db.from('products').update({ name: parsed.data.name, brand: parsed.data.brand, description: parsed.data.description, features: parsed.data.features, size_hint: parsed.data.sizeHint || null, featured: parsed.data.featured, active: parsed.data.active, updated_at: new Date().toISOString() }).eq('slug', slug).select('id, slug').single();
    if (error || !product) throw error ?? new Error('Produto não encontrado.');
    const { error: deleteImageError } = await db.from('product_images').delete().eq('product_id', product.id);
    if (deleteImageError) throw deleteImageError;
    const { error: imageError } = await db.from('product_images').insert({ product_id: product.id, path: parsed.data.imagePath, alt_text: parsed.data.name, sort_order: 0 });
    if (imageError) throw imageError;
    await db.from('audit_log').insert({ action: 'product.updated', entity_type: 'product', entity_id: product.id, actor: 'admin', metadata: { slug } });
    return NextResponse.json({ product });
  } catch {
    return NextResponse.json({ error: 'Não foi possível atualizar o produto.' }, { status: 503 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAdminRequest(request) || !isTrustedOrigin(request)) return denied();
  try {
    const db = getDb();
    const slug = (await params).slug;
    const { data: product, error } = await db.from('products').delete().eq('slug', slug).select('id, slug').single();
    if (error || !product) throw error ?? new Error('Produto não encontrado.');
    await db.from('audit_log').insert({ action: 'product.deleted', entity_type: 'product', entity_id: product.id, actor: 'admin', metadata: { slug } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Não foi possível remover o produto.' }, { status: 503 });
  }
}
