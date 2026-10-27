import { InView } from '@/components/ui/in-view';
import { SITE, generalMessage, img, whatsappLink } from '@/lib/site';

export function Closing() {
  const helmet = img('capacete-laranja-v2');
  return (
    <section className="closing" aria-labelledby="closing-title">
      <div className="closing-object" aria-hidden>
        <img src={helmet.src} srcSet={helmet.srcSet} sizes="80vw" width={helmet.width} height={helmet.height} alt="" loading="lazy" />
      </div>
      <InView
        once
        viewOptions={{ margin: '0px 0px -20% 0px' }}
        variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="closing-text"
      >
        <h2 id="closing-title">Orçamento em uma mensagem.</h2>
        <p>Mande os itens, as quantidades e os tamanhos. A equipe confirma disponibilidade, CA e valores pelo WhatsApp.</p>
        <p className="closing-fact">
          <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
        </p>
        <a className="btn btn-accent btn-large" href={whatsappLink(generalMessage)} target="_blank" rel="noreferrer">
          Chamar no WhatsApp
        </a>
      </InView>
    </section>
  );
}
