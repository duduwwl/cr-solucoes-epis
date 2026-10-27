'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, ListPlus } from 'lucide-react';
import { quote, useQuote } from '@/lib/quote-store';
import { cn } from '@/lib/utils';

/** Adds a product to the shared quote list and confirms in place. */
export function AddToQuote({
  slug,
  name,
  qty = 1,
  size = '',
  className,
  compact,
}: {
  slug: string;
  name: string;
  qty?: number;
  size?: string;
  className?: string;
  compact?: boolean;
}) {
  const { items } = useQuote();
  const inList = items.find((i) => i.slug === slug);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!justAdded) return;
    const t = window.setTimeout(() => setJustAdded(false), 1600);
    return () => window.clearTimeout(t);
  }, [justAdded]);

  const label = justAdded ? 'Adicionado' : inList ? `Na lista (${inList.qty})` : 'Adicionar à lista';

  return (
    <button
      type="button"
      className={cn('btn add-to-quote', inList ? 'btn-quiet is-in' : 'btn-dark', compact && 'btn-small', className)}
      onClick={() => {
        quote.add(slug, qty, size);
        setJustAdded(true);
      }}
      aria-label={`Adicionar ${name} à lista de orçamento`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={label}
          className="add-to-quote-label"
          initial={{ opacity: 0, y: 6, filter: 'blur(2px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -6, filter: 'blur(2px)' }}
          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
        >
          {justAdded ? <Check size={16} strokeWidth={2} aria-hidden /> : <ListPlus size={16} strokeWidth={1.75} aria-hidden />}
          {label}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">
        {justAdded ? `${name} adicionado à lista de orçamento` : ''}
      </span>
    </button>
  );
}
