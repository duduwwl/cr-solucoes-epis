import Link from 'next/link';
import { PageShell } from '@/components/layout/page-shell';
import { Visit } from '@/components/home/visit';
import { categories } from '@/data/catalog';
import { SITE, img, pageMeta } from '@/lib/site';

export const metadata = pageMeta(
  '/sobre/',
  'Sobre a loja',
  'A CR Soluções em EPIs é uma loja de equipamentos de proteção individual na Rua Chagas Dória, 812, Centro de Lavras/MG, com atendimento a profissionais e empresas e envio para todo o Brasil.',
);

export default function Page() {
  const shelf = img('bota-gogowear-real');
  return (
    <PageShell>
      <section className="about frame">
        <div className="about-text">
          <h1 className="page-title">Uma loja de EPIs no Centro de Lavras</h1>
          <p className="lead">
            A CR Soluções em EPIs fica na {SITE.street}, {SITE.district}, em Lavras/MG. Atende profissionais autônomos, equipes, obras e empresas que precisam de proteção para o trabalho do dia a dia.
          </p>
          <p>
            O atendimento é direto: você diz o que a equipe faz, quantas pessoas são e os tamanhos, e a loja indica os modelos, confirma o CA de cada item e passa os valores. A retirada pode ser feita na loja, e os pedidos também seguem para outras cidades e estados.
          </p>
          <h2 className="section-title-small">O que você encontra</h2>
          <ul className="about-lines">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/categorias/${c.slug}/`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <figure className="about-photo">
          <img src={shelf.src} srcSet={shelf.srcSet} sizes="(min-width: 900px) 40vw, 100vw" width={shelf.width} height={shelf.height} alt="Bota de segurança exposta sobre a caixa na loja, com prateleiras de produtos ao fundo" />
          <figcaption>Calçados de segurança na prateleira da loja.</figcaption>
        </figure>
      </section>
      <Visit />
    </PageShell>
  );
}
