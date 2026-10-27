'use client';

import Link from 'next/link';
import { useState } from 'react';
import { TransitionPanel } from '@/components/ui/transition-panel';
import { AddToQuote } from '@/components/quote/add-to-quote';
import { QtyStepper } from '@/components/quote/qty-stepper';
import { ProductPicture } from '@/components/product/product-card';
import { categoryBySlug, type Product } from '@/data/catalog';
import { img, whatsappLink } from '@/lib/site';

export function ProductDetail({ product }: { product: Product }) {
  const [shot, setShot] = useState(0);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const cat = categoryBySlug(product.category);

  const message = [
    `Olá! Gostaria de solicitar um orçamento para ${product.name}.`,
    `Quantidade: ${qty}${size.trim() ? ` · ${product.sizeHint ?? 'Tamanho'}: ${size.trim()}` : ''}.`,
    'Poderiam informar disponibilidade, tamanhos, CA e valores?',
  ].join('\n');

  return (
    <div className="detail frame">
      <nav className="breadcrumb" aria-label="Você está em">
        <ol>
          <li>
            <Link href="/">Início</Link>
          </li>
          <li>
            <Link href="/produtos/">Catálogo</Link>
          </li>
          <li>
            <Link href={`/categorias/${product.category}/`}>{cat?.name}</Link>
          </li>
          <li aria-current="page">{product.name}</li>
        </ol>
      </nav>

      <div className="detail-grid">
        <div className="detail-gallery">
          <TransitionPanel
            activeIndex={shot}
            className="detail-stage"
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            variants={{
              enter: { opacity: 0, scale: 0.985, filter: 'blur(4px)' },
              center: { opacity: 1, scale: 1, filter: 'blur(0px)' },
              exit: { opacity: 0, scale: 1.01, filter: 'blur(4px)' },
            }}
          >
            {product.images.map((name, i) => (
              <ProductPicture
                key={name}
                name={name}
                alt={i === 0 ? product.name : `${product.name}: imagem de referência da linha`}
                sizes="(min-width: 1000px) 52vw, 100vw"
                priority={i === 0}
                className="detail-picture"
              />
            ))}
          </TransitionPanel>
          {product.images.length > 1 && (
            <div className="detail-thumbs" role="group" aria-label="Escolher imagem">
              {product.images.map((name, i) => {
                const pic = img(name);
                return (
                  <button
                    key={name}
                    type="button"
                    className={i === shot ? 'is-on' : ''}
                    aria-pressed={i === shot}
                    aria-label={`Ver imagem ${i + 1} de ${product.images.length}`}
                    onClick={() => setShot(i)}
                  >
                    <img src={pic.src} srcSet={pic.srcSet} sizes="96px" width={pic.width} height={pic.height} alt="" loading="lazy" />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="detail-info">
          <p className="detail-meta">
            <Link href={`/categorias/${product.category}/`}>{cat?.name}</Link> · {product.brand}
          </p>
          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-text">{product.description}</p>

          <h2 className="detail-subtitle">Características</h2>
          <ul className="detail-features">
            {product.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          <div className="detail-ca">
            <h2 className="detail-subtitle">Certificado de Aprovação (CA)</h2>
            <p>
              O número do CA, os materiais e a ficha técnica deste item são confirmados pela equipe no orçamento, conforme o fabricante e o modelo exato disponível.
            </p>
          </div>

          <div className="detail-order">
            <div className="detail-order-fields">
              <div className="field">
                <span>Quantidade</span>
                <QtyStepper value={qty} onChange={setQty} label={`Quantidade de ${product.name}`} />
              </div>
              <label className="field">
                <span>{product.sizeHint ?? 'Tamanho ou observação'} (opcional)</span>
                <input value={size} onChange={(e) => setSize(e.target.value)} placeholder={product.sizeHint === 'Numeração' ? 'Ex.: 40 e 42' : product.sizeHint ? 'Ex.: M, G e GG' : 'Ex.: cor, uso, prazo'} maxLength={40} />
              </label>
            </div>
            <div className="detail-actions">
              <a className="btn btn-accent btn-large" href={whatsappLink(message)} target="_blank" rel="noreferrer">
                Pedir orçamento no WhatsApp
              </a>
              <AddToQuote slug={product.slug} name={product.name} qty={qty} size={size} className="btn-large" />
            </div>
            <p className="detail-note">Sem cadastro e sem pagamento pelo site. A loja responde com disponibilidade e valores.</p>
          </div>
        </div>
      </div>

      <div className="detail-sticky" aria-hidden={false}>
        <a className="btn btn-accent btn-block" href={whatsappLink(message)} target="_blank" rel="noreferrer">
          Orçar no WhatsApp
        </a>
        <AddToQuote slug={product.slug} name={product.name} qty={qty} size={size} compact />
      </div>
    </div>
  );
}
