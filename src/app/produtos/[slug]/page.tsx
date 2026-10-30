import { notFound } from 'next/navigation';
import { DetailPage } from '@/components/site';
import { categoryBySlug, productBySlug, products } from '@/data/catalog';
import type { Product } from '@/data/catalog';
import { getDb } from '@/lib/db';
import { SITE, assetPath, img, pageMeta } from '@/lib/site';

export const dynamicParams = true;
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

const rel = (src: string) => src.replace(/^\/cr-solucoes-epis\//, '').replace(/^\//, '');
const productImage = (src: string) => (src.startsWith('/') ? assetPath(src) : img(src).src);

async function databaseProduct(slug: string): Promise<Product | undefined> {
  try {
    const { data, error } = await getDb().from('products').select('slug, name, brand, description, features, size_hint, featured, category:categories(slug), images:product_images(path, sort_order)').eq('slug', slug).eq('active', true).single();
    if (error || !data) return undefined;
    const category = Array.isArray(data.category) ? data.category[0] : data.category;
    if (!category?.slug) return undefined;
    return { slug: data.slug, name: data.name, brand: data.brand, description: data.description, features: Array.isArray(data.features) ? data.features.filter((value): value is string => typeof value === 'string') : [], sizeHint: data.size_hint ?? undefined, featured: data.featured, category: category.slug as Product['category'], images: [...(data.images ?? [])].sort((a, b) => a.sort_order - b.sort_order).map((image) => image.path) };
  } catch {
    return undefined;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const p = productBySlug(slug) ?? await databaseProduct(slug);
  if (!p) return {};
  return pageMeta(`/produtos/${p.slug}/`, p.name, `${p.description} ${p.features.join(', ')}. Orçamento pelo WhatsApp com a CR Soluções em EPIs, em Lavras/MG.`, {
    url: rel(productImage(p.images[0])),
    alt: p.name,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const p = productBySlug(slug) ?? await databaseProduct(slug);
  if (!p) notFound();
  const cat = categoryBySlug(p.category);
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: p.name,
      description: p.description,
      image: `${SITE.url}/${rel(productImage(p.images[0]))}`,
      category: cat?.name,
      brand: { '@type': 'Brand', name: p.brand },
      url: `${SITE.url}/produtos/${p.slug}/`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE.url}/` },
        { '@type': 'ListItem', position: 2, name: 'Produtos', item: `${SITE.url}/produtos/` },
        { '@type': 'ListItem', position: 3, name: cat?.name, item: `${SITE.url}/categorias/${p.category}/` },
        { '@type': 'ListItem', position: 4, name: p.name },
      ],
    },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DetailPage product={p} />
    </>
  );
}
