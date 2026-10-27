import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { PageShell } from '@/components/layout/page-shell';
import { Catalog } from '@/components/catalog/catalog';
import { categories, categoryBySlug } from '@/data/catalog';
import { img, pageMeta } from '@/lib/site';

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
  const c = categoryBySlug((await params).slug);
  if (!c) notFound();
  const pic = img(c.image);
  return (
    <PageShell>
      <section className="page-head page-head-split frame">
        <div>
          <h1 className="page-title">{c.name}</h1>
          <p className="lead">{c.summary}</p>
        </div>
        <div className="page-head-object" aria-hidden>
          <img src={pic.src} srcSet={pic.srcSet} sizes="30vw" width={pic.width} height={pic.height} alt="" />
        </div>
      </section>
      <Suspense fallback={<div className="frame catalog-loading">Carregando…</div>}>
        <Catalog category={c.slug} />
      </Suspense>
    </PageShell>
  );
}
