import Link from 'next/link';
import { categoryBySlug, type Product } from '@/data/catalog';
import { AddToQuote } from '@/components/quote/add-to-quote';
import { img, productMessage, whatsappLink } from '@/lib/site';
import { cn } from '@/lib/utils';

export function ProductPicture({
  name,
  alt,
  sizes,
  priority,
  className,
}: {
  name: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const pic = img(name);
  return (
    <div className={cn('product-picture', pic.cutout ? 'is-cutout' : 'is-photo', className)}>
      <img
        src={pic.src}
        srcSet={pic.srcSet}
        sizes={sizes}
        width={pic.width}
        height={pic.height}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        {...(priority ? { fetchPriority: 'high' as const } : {})}
      />
    </div>
  );
}

export function ProductCard({ product, headingLevel = 'h3' }: { product: Product; headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel;
  const cat = categoryBySlug(product.category);
  return (
    <article className="product-card">
      <Link href={`/produtos/${product.slug}/`} className="product-card-link" aria-label={`${product.name}, ver detalhes`}>
        <ProductPicture name={product.images[0]} alt={product.name} sizes="(min-width: 1100px) 24vw, (min-width: 700px) 33vw, 50vw" />
      </Link>
      <div className="product-card-body">
        <H className="product-card-title">
          <Link href={`/produtos/${product.slug}/`}>{product.name}</Link>
        </H>
        <p className="product-card-meta">
          {cat?.name} · {product.brand}
        </p>
        <p className="product-card-text">{product.description}</p>
        <div className="product-card-actions">
          <AddToQuote slug={product.slug} name={product.name} compact />
          <a className="text-link" href={whatsappLink(productMessage(product.name))} target="_blank" rel="noreferrer">
            Orçar no WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
