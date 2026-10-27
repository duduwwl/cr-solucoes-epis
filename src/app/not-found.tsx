import Link from 'next/link';
import { PageShell } from '@/components/layout/page-shell';

export const metadata = { title: 'Página não encontrada', robots: { index: false } };

export default function NotFound() {
  return (
    <PageShell>
      <section className="frame not-found">
        <h1 className="page-title">Esta página não existe.</h1>
        <p className="lead">O endereço pode ter mudado. O catálogo continua no mesmo lugar.</p>
        <div className="button-row">
          <Link className="btn btn-accent btn-large" href="/produtos/">
            Ir para o catálogo
          </Link>
          <Link className="btn btn-quiet btn-large" href="/">
            Página inicial
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
