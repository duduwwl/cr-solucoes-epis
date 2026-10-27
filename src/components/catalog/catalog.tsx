'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import * as Dialog from '@radix-ui/react-dialog';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from '@/components/product/product-card';
import { SheetContent } from '@/components/ui/sheet';
import { SlidingNumber } from '@/components/ui/sliding-number';
import { brands, categories, categoryBySlug, products, type Product } from '@/data/catalog';
import { whatsappLink } from '@/lib/site';

type Sort = 'destaques' | 'az' | 'za';
const SORTS: { value: Sort; label: string }[] = [
  { value: 'destaques', label: 'Destaques primeiro' },
  { value: 'az', label: 'Nome, de A a Z' },
  { value: 'za', label: 'Nome, de Z a A' },
];

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

function searchText(p: Product) {
  const cat = categoryBySlug(p.category);
  return norm([p.name, p.brand, p.description, cat?.name, ...p.features].join(' '));
}

export function Catalog({ category }: { category?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const fixed = Boolean(category);

  const [q, setQ] = useState(params.get('q') ?? '');
  const [cat, setCat] = useState<string>(category ?? params.get('categoria') ?? 'todas');
  const [brandSel, setBrandSel] = useState<string[]>(params.get('marca')?.split('|').filter(Boolean) ?? []);
  const [sort, setSort] = useState<Sort>((params.get('ordem') as Sort) || 'destaques');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const deferredQ = useDeferredValue(q);
  const searchRef = useRef<HTMLInputElement>(null);

  // keep the address shareable
  useEffect(() => {
    const sp = new URLSearchParams();
    if (q.trim()) sp.set('q', q.trim());
    if (!fixed && cat !== 'todas') sp.set('categoria', cat);
    if (brandSel.length) sp.set('marca', brandSel.join('|'));
    if (sort !== 'destaques') sp.set('ordem', sort);
    const qs = sp.toString();
    const next = qs ? `${pathname}?${qs}` : pathname;
    if (next !== `${pathname}${window.location.search}`) router.replace(next, { scroll: false });
  }, [q, cat, brandSel, sort, fixed, pathname, router]);

  const shown = useMemo(() => {
    const terms = norm(deferredQ).split(/\s+/).filter(Boolean);
    const list = products.filter((p) => {
      if (cat !== 'todas' && p.category !== cat) return false;
      if (brandSel.length && !brandSel.includes(p.brand)) return false;
      if (!terms.length) return true;
      const text = searchText(p);
      return terms.every((t) => text.includes(t));
    });
    const byName = (a: Product, b: Product) => a.name.localeCompare(b.name, 'pt-BR');
    if (sort === 'az') return [...list].sort(byName);
    if (sort === 'za') return [...list].sort((a, b) => byName(b, a));
    return [...list].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }, [deferredQ, cat, brandSel, sort]);

  const countIn = (slug: string) => products.filter((p) => p.category === slug).length;
  const activeCount = (cat !== 'todas' && !fixed ? 1 : 0) + brandSel.length;
  const clearAll = () => {
    setQ('');
    if (!fixed) setCat('todas');
    setBrandSel([]);
  };
  const toggleBrand = (b: string) => setBrandSel((s) => (s.includes(b) ? s.filter((x) => x !== b) : [...s, b]));

  const filters = (
    <div className="filters">
      {!fixed && (
        <fieldset className="filter-group">
          <legend>Linha</legend>
          <label className={`filter-option ${cat === 'todas' ? 'is-on' : ''}`}>
            <input type="radio" name="categoria" checked={cat === 'todas'} onChange={() => setCat('todas')} />
            <span>Todas</span>
            <span className="filter-count">{products.length}</span>
          </label>
          {categories.map((c) => (
            <label key={c.slug} className={`filter-option ${cat === c.slug ? 'is-on' : ''}`}>
              <input type="radio" name="categoria" checked={cat === c.slug} onChange={() => setCat(c.slug)} />
              <span>{c.name}</span>
              <span className="filter-count">{countIn(c.slug)}</span>
            </label>
          ))}
        </fieldset>
      )}
      <fieldset className="filter-group">
        <legend>Marca ou linha de produto</legend>
        {brands.map((b) => (
          <label key={b} className={`filter-option ${brandSel.includes(b) ? 'is-on' : ''}`}>
            <input type="checkbox" checked={brandSel.includes(b)} onChange={() => toggleBrand(b)} />
            <span>{b}</span>
            <span className="filter-count">{products.filter((p) => p.brand === b).length}</span>
          </label>
        ))}
      </fieldset>
      {activeCount > 0 && (
        <button type="button" className="text-button" onClick={clearAll}>
          Limpar filtros
        </button>
      )}
    </div>
  );

  return (
    <div className="catalog frame">
      <aside className="catalog-aside" aria-label="Filtros">
        {filters}
      </aside>

      <div className="catalog-main">
        <div className="catalog-toolbar" role="search">
          <label className="search-field">
            <Search size={18} strokeWidth={1.75} aria-hidden />
            <span className="sr-only">Buscar produtos</span>
            <input
              ref={searchRef}
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por produto, linha ou uso: bota, PVC, câmara fria"
              enterKeyHint="search"
            />
            {q && (
              <button
                type="button"
                className="search-clear"
                onClick={() => {
                  setQ('');
                  searchRef.current?.focus();
                }}
                aria-label="Limpar busca"
              >
                <X size={18} strokeWidth={1.75} aria-hidden />
              </button>
            )}
          </label>
          <label className="sort-field">
            <span>Ordenar</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Ordenar produtos">
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <Dialog.Root open={filtersOpen} onOpenChange={setFiltersOpen}>
            <Dialog.Trigger className="btn btn-quiet filters-button">
              <SlidersHorizontal size={18} strokeWidth={1.75} aria-hidden />
              Filtrar{activeCount ? ` (${activeCount})` : ''}
            </Dialog.Trigger>
            <SheetContent side="bottom" title="Filtrar produtos" className="filters-sheet">
              <div className="sheet-body">{filters}</div>
              <div className="sheet-foot">
                <Dialog.Close className="btn btn-accent btn-block">
                  Ver {shown.length} {shown.length === 1 ? 'produto' : 'produtos'}
                </Dialog.Close>
              </div>
            </SheetContent>
          </Dialog.Root>
        </div>

        <div className="catalog-status" aria-live="polite">
          <span className="catalog-count">
            <SlidingNumber value={shown.length} />
          </span>
          <span>
            {shown.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
            {deferredQ.trim() ? ` para “${deferredQ.trim()}”` : ''}
          </span>
          {!fixed && cat !== 'todas' && (
            <button type="button" className="chip" onClick={() => setCat('todas')} aria-label={`Remover filtro ${categoryBySlug(cat)?.name}`}>
              {categoryBySlug(cat)?.name}
              <X size={14} strokeWidth={2} aria-hidden />
            </button>
          )}
          {brandSel.map((b) => (
            <button key={b} type="button" className="chip" onClick={() => toggleBrand(b)} aria-label={`Remover filtro ${b}`}>
              {b}
              <X size={14} strokeWidth={2} aria-hidden />
            </button>
          ))}
        </div>

        {shown.length ? (
          <motion.ul className="catalog-grid" layout>
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((p) => (
                <motion.li
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                >
                  <ProductCard product={p} headingLevel="h2" />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        ) : (
          <div className="empty-state">
            <h2>Nada encontrado com esses filtros.</h2>
            <p>Tente outra palavra ou limpe os filtros. Se o item não está no catálogo, a loja pode ter ou conseguir: pergunte.</p>
            <div className="empty-actions">
              <button type="button" className="btn btn-dark" onClick={clearAll}>
                Limpar busca e filtros
              </button>
              <a
                className="btn btn-accent"
                href={whatsappLink(`Olá! Procurei${q.trim() ? ` por “${q.trim()}”` : ' um item'} no site e não encontrei. Vocês trabalham com esse produto?`)}
                target="_blank"
                rel="noreferrer"
              >
                Perguntar no WhatsApp
              </a>
            </div>
          </div>
        )}
        {fixed && (
          <p className="catalog-more">
            <Link href="/produtos/" className="text-link">
              Ver o catálogo completo
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
