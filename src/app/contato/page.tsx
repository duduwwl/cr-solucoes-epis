import { PageShell } from '@/components/layout/page-shell';
import { ContactForm } from '@/components/pages/contact-form';
import { Visit } from '@/components/home/visit';
import { SITE, pageMeta } from '@/lib/site';

export const metadata = pageMeta(
  '/contato/',
  'Contato e orçamento',
  'Fale com a CR Soluções em EPIs pelo WhatsApp ou pelo telefone (35) 4104-6700. Loja na Rua Chagas Dória, 812, Centro, Lavras/MG.',
);

export default function Page() {
  return (
    <PageShell>
      <section className="contact frame">
        <div>
          <h1 className="page-title">Fale com a loja</h1>
          <p className="lead">Conte o que a sua rotina exige. A equipe responde pelo WhatsApp com modelos, disponibilidade e valores.</p>
          <dl className="contact-facts">
            <div>
              <dt>Telefone</dt>
              <dd>
                <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
              </dd>
            </div>
            <div>
              <dt>Endereço</dt>
              <dd>
                {SITE.street}, {SITE.district}
                <br />
                {SITE.city}/{SITE.state}
              </dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </section>
      <Visit />
    </PageShell>
  );
}
