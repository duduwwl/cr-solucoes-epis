'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import VerticalCutReveal from '@/components/fancy/vertical-cut-reveal';
import LetterSwapForward from '@/components/fancy/letter-swap-forward';
import { TextEffect } from '@/components/ui/text-effect';
import { Magnetic } from '@/components/ui/magnetic';
import { productBySlug } from '@/data/catalog';
import { SITE, businessMessage, img, whatsappLink } from '@/lib/site';

const OBJECTS = ['capacete-de-protecao', 'bota-pvc-branca', 'protetor-auditivo-plug', 'extintor-incendio'] as const;

export function Hero() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    let id = 0;
    const start = () => {
      window.clearInterval(id);
      id = window.setInterval(() => setActive((i) => (i + 1) % OBJECTS.length), 5600);
    };
    const onVisibility = () => (document.hidden ? window.clearInterval(id) : start());
    start();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduce]);

  const current = productBySlug(OBJECTS[active])!;
  const cut = { type: 'spring' as const, stiffness: 170, damping: 24 };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-stage" aria-hidden>
        {OBJECTS.map((slug, i) => {
          const p = productBySlug(slug)!;
          const pic = img(p.images[0]);
          return (
            <img
              key={slug}
              className={`hero-object hero-object-${slug} ${i === active ? 'is-active' : ''}`}
              src={pic.src}
              srcSet={pic.srcSet}
              sizes="(min-width: 900px) 52vw, 92vw"
              width={pic.width}
              height={pic.height}
              alt=""
              loading={i === 0 ? 'eager' : 'lazy'}
              {...(i === 0 ? { fetchPriority: 'high' as const } : {})}
            />
          );
        })}
      </div>

      <h1 id="hero-title" className="hero-title">
        <span className="hero-line hero-line-top">
          <VerticalCutReveal splitBy="characters" staggerDuration={0.028} transition={cut}>
            Da cabeça
          </VerticalCutReveal>
        </span>
        <span className="hero-line hero-line-bottom">
          <VerticalCutReveal splitBy="characters" staggerDuration={0.028} transition={{ ...cut, delay: 0.32 }}>
            aos pés.
          </VerticalCutReveal>
        </span>
      </h1>

      <div className="hero-intro">
        <TextEffect per="word" as="p" preset="fade-in-blur" delay={0.5} speedReveal={2.2} speedSegment={0.7} className="hero-sentence">
          Equipamentos de proteção individual para obras, indústria, câmara fria e limpeza. Loja em Lavras/MG, envio para todo o Brasil.
        </TextEffect>
        <div className="hero-actions">
          <Magnetic intensity={0.18} range={120}>
            <Link className="btn btn-accent btn-large" href="/produtos/">
              <LetterSwapForward label="Ver o catálogo" staggerDuration={0.018} />
            </Link>
          </Magnetic>
          <a className="btn btn-quiet btn-large" href={whatsappLink(businessMessage)} target="_blank" rel="noreferrer">
            Orçamento para empresas
          </a>
        </div>
      </div>

      <dl className="hero-facts">
        <div>
          <dt>Retirada na loja</dt>
          <dd>
            {SITE.street}
            <br />
            {SITE.district} · {SITE.city}/{SITE.state}
          </dd>
        </div>
        <div>
          <dt>Em destaque</dt>
          <dd>
            <Link href={`/produtos/${current.slug}/`} className="hero-current" key={current.slug}>
              {current.name}
            </Link>
          </dd>
        </div>
      </dl>
    </section>
  );
}
