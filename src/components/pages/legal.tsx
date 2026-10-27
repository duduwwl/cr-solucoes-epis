import type { ReactNode } from 'react';
import { PageShell } from '@/components/layout/page-shell';

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <PageShell>
      <article className="legal frame">
        <h1 className="page-title">{title}</h1>
        <div className="legal-body">{children}</div>
      </article>
    </PageShell>
  );
}
