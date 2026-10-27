'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Minus, Plus } from 'lucide-react';
import { SlidingNumber } from '@/components/ui/sliding-number';
import { products } from '@/data/catalog';
import { quote, quoteLink, useQuote } from '@/lib/quote-store';
import { businessMessage, img, whatsappLink } from '@/lib/site';

/** The live thing: build the crew's list here and read the message the store will receive. */
export function TeamList() {
  const { items } = useQuote();
  const [company, setCompany] = useState('');
  const total = items.reduce((n, i) => n + i.qty, 0);
  const qtyOf = (slug: string) => items.find((i) => i.slug === slug)?.qty ?? 0;

  return (
    <section className="team" aria-labelledby="team-title">
      <div className="frame team-grid">
        <div className="team-pick">
          <h2 id="team-title" className="section-title">Monte a lista da equipe</h2>
          <p className="lead">
            Escolha os itens e as quantidades. Ao lado, a requisição se escreve sozinha e segue pronta para o WhatsApp da loja.
          </p>
          <ul className="team-products">
            {products.map((p) => {
              const q = qtyOf(p.slug);
              const pic = img(p.images[0]);
              return (
                <li key={p.slug} className={q > 0 ? 'is-picked' : ''}>
                  <span className={`team-thumb ${pic.cutout ? 'is-cutout' : ''}`} aria-hidden>
                    <img src={pic.src} srcSet={pic.srcSet} sizes="56px" width={pic.width} height={pic.height} alt="" loading="lazy" />
                  </span>
                  <span className="team-name">{p.name}</span>
                  <span className="team-stepper" role="group" aria-label={`Quantidade de ${p.name}`}>
                    <button
                      type="button"
                      onClick={() => (q <= 1 ? quote.remove(p.slug) : quote.setQty(p.slug, q - 1))}
                      disabled={q === 0}
                      aria-label={`Diminuir ${p.name}`}
                    >
                      <Minus size={16} strokeWidth={2} aria-hidden />
                    </button>
                    <span className="team-qty" aria-live="polite">
                      <span className="sr-only">{q} unidades</span>
                      <span aria-hidden>
                        <SlidingNumber value={q} />
                      </span>
                    </span>
                    <button type="button" onClick={() => quote.add(p.slug, 1)} aria-label={`Aumentar ${p.name}`}>
                      <Plus size={16} strokeWidth={2} aria-hidden />
                    </button>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="slip-wrap">
          <div className="slip" aria-label="Prévia da requisição enviada pelo WhatsApp">
            <p className="slip-title">Requisição de EPI</p>
            <label className="slip-field">
              <span>Empresa ou obra</span>
              <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Nome da empresa (opcional)" autoComplete="organization" />
            </label>
            <div className="slip-items">
              {items.length === 0 ? (
                <p className="slip-empty">Use os botões de mais e menos para incluir itens. Eles aparecem aqui, na ordem em que entraram.</p>
              ) : (
                <table>
                  <caption className="sr-only">Itens da requisição</caption>
                  <thead>
                    <tr>
                      <th scope="col">Item</th>
                      <th scope="col">Qtd.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence initial={false}>
                      {items.map((i) => {
                        const p = products.find((x) => x.slug === i.slug);
                        return (
                          <motion.tr
                            key={i.slug}
                            layout
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, transition: { duration: 0.12 } }}
                            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                          >
                            <td>
                              {p?.name}
                              {i.size ? <span className="slip-size"> · {i.size}</span> : null}
                            </td>
                            <td>{i.qty}</td>
                          </motion.tr>
                        );
                      })}
                    </AnimatePresence>
                  </tbody>
                </table>
              )}
            </div>
            <div className="slip-total">
              <span>Total de peças</span>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.strong
                  key={total}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                >
                  {total}
                </motion.strong>
              </AnimatePresence>
            </div>
            <div className="slip-actions">
              {items.length > 0 ? (
                <>
                  <a className="btn btn-accent btn-block" href={quoteLink(items, { company })} target="_blank" rel="noreferrer">
                    Enviar requisição pelo WhatsApp
                  </a>
                  <button type="button" className="btn btn-quiet btn-block" onClick={() => quote.open()}>
                    Informar tamanhos na lista
                  </button>
                </>
              ) : (
                <a className="btn btn-dark btn-block" href={whatsappLink(businessMessage)} target="_blank" rel="noreferrer">
                  Prefiro conversar antes
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
