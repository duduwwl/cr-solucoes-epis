import { Suspense } from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Catalog } from '@/components/catalog/catalog';
import { products } from '@/data/catalog';
import { pageMeta } from '@/lib/site';

export const metadata = pageMeta(
  '/produtos/',
  'Catálogo de EPIs',
  `Catálogo com ${products.length} equipamentos de proteção: calçados de segurança, capacetes, vestimentas, protetor auditivo, limpeza e extintores. Orçamento pelo WhatsApp, em Lavras/MG.`,
);

export default function Page() {
  return (
    <PageShell>
      <section className="page-head frame">
        <h1 className="page-title">Catálogo de EPIs</h1>
        <p className="lead">
          Busque, filtre e junte os itens na lista. O orçamento sai em uma única mensagem para a loja, com quantidades e tamanhos.
        </p>
      </section>
      <Suspense fallback={<div className="frame catalog-loading">Carregando o catálogo…</div>}>
        <Catalog />
      </Suspense>
    </PageShell>
  );
}
