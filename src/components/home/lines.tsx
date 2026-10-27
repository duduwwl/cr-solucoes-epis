'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { categories, productsIn } from '@/data/catalog';
import { img } from '@/lib/site';

export function Lines() {
  const [active, setActive] = useState(0);
  const rows = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    rows.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section className="lines" aria-labelledby="lines-title">
      <div className="frame lines-inner">
        <div className="lines-rider" aria-hidden>
          <div className="lines-rider-sticky">
            {categories.map((c, i) => {
              const pic = img(c.image);
              return (
                <img
                  key={c.slug}
                  className={i === active ? 'is-active' : ''}
                  src={pic.src}
                  srcSet={pic.srcSet}
                  sizes="22vw"
                  width={pic.width}
                  height={pic.height}
                  alt=""
                  loading="lazy"
                />
              );
            })}
          </div>
        </div>

        <h2 id="lines-title" className="lines-title">
          <span>Seis linhas</span>
          <span>na loja</span>
        </h2>

        <ol className="lines-list">
          {categories.map((c, i) => {
            const count = productsIn(c.slug).length;
            const pic = img(c.image);
            return (
              <li key={c.slug} data-index={i} ref={(el) => { rows.current[i] = el; }} className={i === active ? 'is-active' : ''}>
                <Link href={`/categorias/${c.slug}/`} className="lines-row">
                  <span className="lines-name">
                    <span className="lines-label">{c.name}</span>
                    <span className="lines-note">{c.summary}</span>
                  </span>
                  <span className="lines-thumb" aria-hidden>
                    <img src={pic.src} srcSet={pic.srcSet} sizes="30vw" width={pic.width} height={pic.height} alt="" loading="lazy" />
                  </span>
                  <span className="lines-count">
                    {count} {count === 1 ? 'modelo no catálogo' : 'modelos no catálogo'}
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
