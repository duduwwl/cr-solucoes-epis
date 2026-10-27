import { notFound } from 'next/navigation';
import { DetailPage } from '@/components/site';
import { categoryBySlug, productBySlug, products } from '@/data/catalog';
import { SITE, img, pageMeta } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

const rel = (src: string) => src.replace(/^\/cr-solucoes-epis\//, '').replace(/^\//, '');

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = productBySlug((await params).slug);
  if (!p) return {};
  return pageMeta(`/produtos/${p.slug}/`, p.name, `${p.description} ${p.features.join(', ')}. Orçamento pelo WhatsApp com a CR Soluções em EPIs, em Lavras/MG.`, {
    url: rel(img(p.images[0]).src),
    alt: p.name,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const p = productBySlug((await params).slug);
  if (!p) notFound();
  const cat = categoryBySlug(p.category);
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: p.name,
      description: p.description,
      image: `${SITE.url}/${rel(img(p.images[0]).src)}`,
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
      <DetailPage slug={p.slug} />
    </>
  );
}
