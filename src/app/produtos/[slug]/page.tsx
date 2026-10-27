import { notFound } from 'next/navigation';
import { PageShell } from '@/components/layout/page-shell';
import { ProductDetail } from '@/components/product/product-detail';
import { ProductCard } from '@/components/product/product-card';
import { categoryBySlug, productBySlug, products, relatedProducts } from '@/data/catalog';
import { SITE, img, pageMeta } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = productBySlug((await params).slug);
  if (!p) return {};
  const pic = img(p.images[0]);
  return pageMeta(
    `/produtos/${p.slug}/`,
    p.name,
    `${p.description} ${p.features.join(', ')}. Peça orçamento pelo WhatsApp com a CR Soluções em EPIs, em Lavras/MG.`,
    { url: pic.src.replace(/^\/cr-solucoes-epis\//, '').replace(/^\//, ''), alt: p.name },
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const p = productBySlug((await params).slug);
  if (!p) notFound();
  const cat = categoryBySlug(p.category);
  const pic = img(p.images[0]);
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: p.name,
      description: p.description,
      image: `${SITE.url}${pic.src.replace(/^\/cr-solucoes-epis/, '')}`,
      category: cat?.name,
      brand: { '@type': 'Brand', name: p.brand },
      url: `${SITE.url}/produtos/${p.slug}/`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE.url}/` },
        { '@type': 'ListItem', position: 2, name: 'Catálogo', item: `${SITE.url}/produtos/` },
        { '@type': 'ListItem', position: 3, name: cat?.name, item: `${SITE.url}/categorias/${p.category}/` },
        { '@type': 'ListItem', position: 4, name: p.name },
      ],
    },
  ];
  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetail product={p} />
      <section className="related frame" aria-labelledby="related-title">
        <h2 id="related-title" className="section-title-small">Para completar o pedido</h2>
        <ul className="catalog-grid">
          {relatedProducts(p).map((r) => (
            <li key={r.slug}>
              <ProductCard product={r} />
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
