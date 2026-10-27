import { notFound } from 'next/navigation';
import { CategoryPage } from '@/components/site';
import { categories, categoryBySlug } from '@/data/catalog';
import { pageMeta } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const c = categoryBySlug((await params).slug);
  if (!c) return {};
  return pageMeta(`/categorias/${c.slug}/`, `${c.name} em Lavras/MG`, `${c.summary} Orçamento pelo WhatsApp, retirada em Lavras/MG e envio para todo o Brasil.`);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!categoryBySlug(slug)) notFound();
  return <CategoryPage slug={slug} />;
}
