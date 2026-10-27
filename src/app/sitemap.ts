import type { MetadataRoute } from 'next';
import { categories, products } from '@/data/catalog';
import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/produtos/', '/empresas/', '/sobre/', '/contato/', '/privacidade/', '/termos/'];
  return [
    ...paths.map((p) => ({ url: `${SITE.url}${p}`, changeFrequency: 'monthly' as const, priority: p === '/' ? 1 : 0.7 })),
    ...categories.map((c) => ({ url: `${SITE.url}/categorias/${c.slug}/`, changeFrequency: 'monthly' as const, priority: 0.6 })),
    ...products.map((p) => ({ url: `${SITE.url}/produtos/${p.slug}/`, changeFrequency: 'monthly' as const, priority: 0.6 })),
  ];
}
