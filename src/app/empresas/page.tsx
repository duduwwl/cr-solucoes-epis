import { PageShell } from '@/components/layout/page-shell';
import { TeamList } from '@/components/home/team-list';
import { Visit } from '@/components/home/visit';
import { SITE, businessMessage, img, pageMeta, whatsappLink } from '@/lib/site';

export const metadata = pageMeta(
  '/empresas/',
  'EPIs para empresas e equipes',
  'Orçamento de EPIs para empresas, obras e equipes: lista por colaborador com tamanhos, orientação na escolha, condição para volume, retirada em Lavras/MG e envio para todo o Brasil.',
);

const SEND = [
  { t: 'A lista de itens', d: 'Calçados, capacetes, vestimentas, protetores e o que mais a equipe usa. Pode ser uma planilha, uma foto ou o que você montar no site.' },
  { t: 'Quantidades e tamanhos', d: 'Numeração de calçados e tamanho de vestimentas por colaborador evitam trocas depois.' },
  { t: 'A atividade da equipe', d: 'Obra, manutenção, câmara fria, limpeza ou indústria: ajuda a equipe da loja a indicar o modelo adequado.' },
  { t: 'Prazo e cidade', d: 'Para combinar retirada na loja em Lavras ou envio para a sua cidade.' },
];

export default function Page() {
  const vest = img('vestimenta-referencia');
  const shoes = img('botina-escura-real');
  return (
    <PageShell>
      <section className="page-head page-head-split frame">
        <div>
          <h1 className="page-title">EPIs para a sua equipe inteira</h1>
          <p className="lead">
            A CR atende empresas, obras e operações que compram em quantidade: orientação na escolha, lista por colaborador e condição comercial combinada direto com a loja.
          </p>
          <div className="button-row">
            <a className="btn btn-accent btn-large" href={whatsappLink(businessMessage)} target="_blank" rel="noreferrer">
              Falar com o comercial
            </a>
            <a className="btn btn-quiet btn-large" href={SITE.phoneHref}>
              {SITE.phoneDisplay}
            </a>
          </div>
        </div>
        <div className="page-head-pair" aria-hidden>
          <img src={vest.src} srcSet={vest.srcSet} sizes="22vw" width={vest.width} height={vest.height} alt="" />
          <img src={shoes.src} srcSet={shoes.srcSet} sizes="22vw" width={shoes.width} height={shoes.height} alt="" />
        </div>
      </section>

      <section className="send frame" aria-labelledby="send-title">
        <h2 id="send-title" className="section-title">O que mandar no pedido</h2>
        <dl className="send-list">
          {SEND.map((s) => (
            <div key={s.t}>
              <dt>{s.t}</dt>
              <dd>{s.d}</dd>
            </div>
          ))}
        </dl>
      </section>

      <TeamList />


      <Visit />
    </PageShell>
  );
}
