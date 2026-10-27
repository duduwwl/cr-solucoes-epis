'use client';

import Link from 'next/link';
import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'motion/react';
import { SheetContent } from '@/components/ui/sheet';
import { QtyStepper } from '@/components/quote/qty-stepper';
import { productBySlug } from '@/data/catalog';
import { quote, quoteLink, quoteMessage, useQuote, type Requester } from '@/lib/quote-store';
import { img } from '@/lib/site';

export function QuoteSheet() {
  const { items, open } = useQuote();
  const [who, setWho] = useState<Requester>({});
  const total = items.reduce((n, i) => n + i.qty, 0);

  return (
    <Dialog.Root open={open} onOpenChange={(o) => quote.open(o)}>
      <SheetContent title="Lista de orçamento" description="Junte os itens, informe quantidades e tamanhos e envie tudo em uma única mensagem para a loja." className="quote-sheet">
        <div className="sheet-body">
          {items.length === 0 ? (
            <div className="quote-empty">
              <p>Nenhum item na lista ainda.</p>
              <p className="muted">No catálogo, use “Adicionar à lista” nos produtos que você ou a sua equipe precisam.</p>
              <Dialog.Close asChild>
                <Link className="pill hot" href="/produtos/">
                  Ver produtos
                </Link>
              </Dialog.Close>
            </div>
          ) : (
            <>
              <ul className="quote-items">
                <AnimatePresence initial={false}>
                  {items.map((item) => {
                    const p = productBySlug(item.slug);
                    if (!p) return null;
                    const pic = img(p.images[0]);
                    const hint = p.sizeHint === 'Numeração' ? 'Numeração (ex.: 40, 42)' : p.sizeHint ? 'Tamanho (ex.: M, G, GG)' : 'Tamanho ou observação';
                    return (
                      <motion.li
                        key={item.slug}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 24, transition: { duration: 0.15 } }}
                        transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                        className="quote-item"
                      >
                        <div className={`quote-thumb ${pic.cutout ? 'is-cutout' : ''}`}>
                          <img src={pic.src} srcSet={pic.srcSet} sizes="72px" width={pic.width} height={pic.height} alt="" loading="lazy" />
                        </div>
                        <div>
                          <div className="quote-item-top">
                            <Dialog.Close asChild>
                              <Link href={`/produtos/${p.slug}/`} className="quote-item-name">
                                {p.name}
                              </Link>
                            </Dialog.Close>
                            <button type="button" className="remove-button" onClick={() => quote.remove(item.slug)} aria-label={`Remover ${p.name} da lista`}>
                              Remover
                            </button>
                          </div>
                          <div className="quote-item-controls">
                            <QtyStepper value={item.qty} onChange={(v) => quote.setQty(item.slug, v)} label={`Quantidade de ${p.name}`} />
                            <label className="quote-size">
                              <span className="sr-only">
                                {p.sizeHint ?? 'Tamanho ou observação'} de {p.name}
                              </span>
                              <input className="search-input" value={item.size} onChange={(e) => quote.setSize(item.slug, e.target.value)} placeholder={hint} maxLength={40} />
                            </label>
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
              <fieldset className="quote-who">
                <legend>Para quem é o orçamento</legend>
                <label className="formlabel">
                  Seu nome
                  <input className="search-input" autoComplete="name" value={who.name ?? ''} onChange={(e) => setWho({ ...who, name: e.target.value })} />
                </label>
                <label className="formlabel">
                  Empresa (opcional)
                  <input className="search-input" autoComplete="organization" value={who.company ?? ''} onChange={(e) => setWho({ ...who, company: e.target.value })} />
                </label>
                <label className="formlabel">
                  Cidade para entrega ou retirada
                  <input className="search-input" autoComplete="address-level2" value={who.city ?? ''} onChange={(e) => setWho({ ...who, city: e.target.value })} />
                </label>
              </fieldset>
              <details className="quote-preview">
                <summary>Ver a mensagem que será enviada</summary>
                <p>{quoteMessage(items, who)}</p>
              </details>
            </>
          )}
        </div>
        {items.length > 0 && (
          <div className="sheet-foot">
            <a className="pill hot" href={quoteLink(items, who)} target="_blank" rel="noreferrer">
              Enviar {total} {total === 1 ? 'item' : 'itens'} pelo WhatsApp
            </a>
            <button type="button" className="pill" onClick={() => quote.clear()}>
              Limpar lista
            </button>
          </div>
        )}
      </SheetContent>
    </Dialog.Root>
  );
}
