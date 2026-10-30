import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const runtime = 'nodejs';
export const revalidate = 300;

export async function GET() {
  try {
    const { data, error } = await getDb()
      .from('products')
      .select('slug, name, brand, description, features, size_hint, featured, category:categories(slug, name), images:product_images(path, alt_text, sort_order)')
      .eq('active', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) throw error;

    const products = (data ?? []).map((product) => ({
      ...product,
      category: Array.isArray(product.category) ? product.category[0] ?? null : product.category,
      images: [...(product.images ?? [])].sort((a, b) => a.sort_order - b.sort_order),
    }));

    return NextResponse.json(
      { products },
      { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } },
    );
  } catch (error) {
    console.error('products_read_failed', error);
    return NextResponse.json({ error: 'Catálogo indisponível no momento.' }, { status: 503 });
  }
}
