'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'motion/react';
import { TransitionPanel } from '@/components/ui/transition-panel';
import { img } from '@/lib/site';

const STAGES = [
  {
    scale: 1,
    origin: '50% 50%',
    title: 'Bota de segurança caramelo',
    text: 'Como ela está na prateleira da loja, sobre a caixa do fabricante. Cano médio, couro acolchoado e cadarço reforçado.',
  },
  {
    scale: 2,
    origin: '62% 62%',
    title: 'Solado tratorado',
    text: 'Cravos profundos para pisos irregulares, terra e cascalho. Confirme com a equipe a indicação para o seu tipo de piso.',
  },
  {
    scale: 2.1,
    origin: '24% 34%',
    title: 'Cano acolchoado',
    text: 'Gola com espuma em volta do tornozelo, pensada para jornadas longas em pé. Numerações sob consulta.',
  },
];

export function Showcase() {
  const ref = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = v < 0.3 ? 0 : v < 0.64 ? 1 : 2;
    setStage((s) => (s === next ? s : next));
  });

  const pic = img('bota-gogowear-real');
  const s = STAGES[stage];

  return (
    <section ref={ref} className="showcase" aria-labelledby="showcase-title">
      <div className="showcase-stage">
        <h2 id="showcase-title" className="showcase-title">
          <span className="showcase-title-top">Calçado de segurança,</span>
          <span className={`showcase-title-bottom ${stage > 0 ? 'is-in' : ''}`}>visto de perto.</span>
        </h2>
        <figure className="showcase-frame">
          <img
            src={pic.src}
            srcSet={pic.srcSet}
            sizes="(min-width: 900px) 34vw, 72vw"
            width={pic.width}
            height={pic.height}
            alt="Bota de segurança caramelo Gogowear sobre a caixa do fabricante, na prateleira da loja CR"
            loading="lazy"
            style={{ transform: `scale(${s.scale})`, transformOrigin: s.origin }}
          />
        </figure>
        <div className="showcase-caption" aria-live="polite">
          <TransitionPanel
            activeIndex={stage}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            variants={{
              enter: { opacity: 0, y: 14, filter: 'blur(3px)' },
              center: { opacity: 1, y: 0, filter: 'blur(0px)' },
              exit: { opacity: 0, y: -10, filter: 'blur(3px)' },
            }}
          >
            {STAGES.map((st) => (
              <div key={st.title}>
                <p className="showcase-caption-title">{st.title}</p>
                <p>{st.text}</p>
              </div>
            ))}
          </TransitionPanel>
          <Link href="/categorias/calcados/" className="text-link">
            Ver todos os calçados de segurança
          </Link>
        </div>
      </div>
    </section>
  );
}
