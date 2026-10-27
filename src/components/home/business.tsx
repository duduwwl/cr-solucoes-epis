'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { img } from '@/lib/site';

const STEPS = [
  { text: 'Compra para equipes inteiras', pics: ['vestimenta-referencia', 'bota-marrom-real'] },
  { text: 'Uma lista por colaborador, com tamanhos', pics: ['bota-cinza-real', 'camara-fria-referencia'] },
  { text: 'Orientação na escolha de cada EPI', pics: ['auditiva-referencia', 'capacetes-referencia'] },
  { text: 'Condição comercial para volume', pics: ['botina-escura-real', 'bota-pvc-referencia'] },
  { text: 'Envio para todo o Brasil', pics: ['incendio-referencia', 'avental-vinil-referencia'] },
  { text: 'Retirada na loja em Lavras', pics: ['limpeza-referencia', 'bota-gogowear-real'] },
];

export function Business() {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length * 0.999)));
    setStep((s) => (s === next ? s : next));
  });

  return (
    <section ref={ref} className="business" aria-labelledby="business-title">
      <div className="business-stage">
        <div className="frame business-grid">
          <ul className="business-steps">
            {STEPS.map((s, i) => (
              <li key={s.text} className={i === step ? 'is-active' : i < step ? 'is-past' : ''} aria-current={i === step ? 'step' : undefined}>
                {i === 0 ? (
                  <h2 id="business-title" className="business-step-text">
                    {s.text}
                  </h2>
                ) : (
                  <p className="business-step-text">{s.text}</p>
                )}
              </li>
            ))}
          </ul>
          <div className="business-pics" aria-hidden>
            <AnimatePresence mode="popLayout" initial={false}>
              {STEPS[step].pics.map((name, j) => {
                const pic = img(name);
                return (
                  <motion.img
                    key={`${step}-${name}`}
                    className={`business-pic business-pic-${j}`}
                    src={pic.src}
                    srcSet={pic.srcSet}
                    sizes="22vw"
                    width={pic.width}
                    height={pic.height}
                    alt=""
                    loading="lazy"
                    initial={{ opacity: 0, y: 40, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, transition: { duration: 0.25 } }}
                    transition={{ duration: 0.6, delay: j * 0.09, ease: [0.23, 1, 0.32, 1] }}
                  />
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
