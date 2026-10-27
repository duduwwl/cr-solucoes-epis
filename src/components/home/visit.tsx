import { SITE, img, whatsappLink } from '@/lib/site';

const STORE_PHOTOS = [
  { name: 'limpeza-referencia', alt: 'Parede da loja CR com vassouras, rodos e utensílios de limpeza profissional' },
  { name: 'incendio-referencia', alt: 'Extintores de 1, 4 e 6 kg expostos na loja' },
  { name: 'bota-cinza-real', alt: 'Bota de segurança cinza exposta sobre a caixa, com prateleiras de produtos ao fundo' },
];

export function Visit({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  const H = headingLevel;
  return (
    <section className="visit" aria-labelledby="visit-title">
      <div className="visit-photos">
        {STORE_PHOTOS.map((s) => {
          const pic = img(s.name);
          return (
            <figure key={s.name}>
              <img src={pic.src} srcSet={pic.srcSet} sizes="34vw" width={pic.width} height={pic.height} alt={s.alt} loading="lazy" />
            </figure>
          );
        })}
      </div>
      <div className="visit-card">
        <H id="visit-title" className="visit-title">
          Visite a loja
        </H>
        <p className="visit-address">
          {SITE.street}
          <br />
          {SITE.district} · {SITE.city}/{SITE.state}
        </p>
        <dl className="visit-rows">
          <div>
            <dt>Telefone</dt>
            <dd>
              <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
            </dd>
          </div>
          <div>
            <dt>Horário</dt>
            <dd>Confirme pelo telefone</dd>
          </div>
          <div>
            <dt>Entrega</dt>
            <dd>Todo o Brasil</dd>
          </div>
        </dl>
        <div className="visit-actions">
          <a className="btn btn-accent btn-block" href={SITE.mapsUrl} target="_blank" rel="noreferrer">
            Abrir no mapa
          </a>
          <a
            className="btn btn-quiet btn-block"
            href={whatsappLink('Olá! Quero retirar um pedido na loja. Podem confirmar a disponibilidade?')}
            target="_blank"
            rel="noreferrer"
          >
            Combinar retirada
          </a>
        </div>
      </div>
    </section>
  );
}
