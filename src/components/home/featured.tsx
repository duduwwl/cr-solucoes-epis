import Link from 'next/link';
import { InView } from '@/components/ui/in-view';
import { ProductCard } from '@/components/product/product-card';
import { products } from '@/data/catalog';

export function Featured() {
  const featured = products.filter((p) => p.featured);
  return (
    <section className="featured" aria-labelledby="featured-title">
      <div className="frame">
        <InView
          once
          viewOptions={{ margin: '0px 0px -15% 0px' }}
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="featured-head"
        >
          <h2 id="featured-title" className="section-title">Em destaque no catálogo</h2>
          <p className="lead">
            Monte sua lista com os itens que a equipe precisa e envie tudo de uma vez. A loja responde com disponibilidade, tamanhos, CA e valores.
          </p>
          <Link className="btn btn-dark" href="/produtos/">
            Ver os {products.length} produtos
          </Link>
        </InView>
        <div className="featured-grid">
          {featured.map((p, i) => (
            <InView
              key={p.slug}
              once
              viewOptions={{ margin: '0px 0px -10% 0px' }}
              variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.23, 1, 0.32, 1] }}
              className={`featured-cell featured-cell-${i}`}
            >
              <ProductCard product={p} />
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
