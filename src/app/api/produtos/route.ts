import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const runtime = 'nodejs';
export const revalidate = 300;

export async function GET() {
  try {
    const rows = await sql`
      SELECT p.slug, p.name, p.label, p.brand, p.image_path AS image, p.description, p.features,
             c.slug AS category_slug, c.name AS category_name
      FROM products p
      LEFT JOIN categories c ON c.id = p.category_id
      WHERE p.active = true
      ORDER BY p.sort_order ASC, p.created_at ASC
    `;
    return NextResponse.json({ products: rows }, { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } });
  } catch (error) {
    console.error('products_read_failed', error);
    return NextResponse.json({ error: 'Catálogo indisponível no momento.' }, { status: 503 });
  }
}
