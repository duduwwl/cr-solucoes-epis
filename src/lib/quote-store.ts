'use client';

import { useSyncExternalStore } from 'react';
import { productBySlug } from '@/data/catalog';
import { whatsappLink } from '@/lib/site';

export type QuoteItem = { slug: string; qty: number; size: string };
export type QuoteState = { items: QuoteItem[]; open: boolean };

const KEY = 'cr-epis-lista-orcamento';
const EMPTY: QuoteState = { items: [], open: false };

let state: QuoteState = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === 'undefined') return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as QuoteItem[];
    if (Array.isArray(parsed)) {
      state = {
        ...state,
        items: parsed
          .filter((i) => i && productBySlug(i.slug))
          .map((i) => ({ slug: i.slug, qty: clampQty(Number(i.qty) || 1), size: String(i.size || '').slice(0, 40) })),
      };
    }
  } catch {
    /* storage unavailable: the list simply starts empty */
  }
}

function persist() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state.items));
  } catch {
    /* ignore */
  }
}

function set(next: QuoteState) {
  state = next;
  persist();
  listeners.forEach((l) => l());
}

const clampQty = (n: number) => Math.max(1, Math.min(9999, Math.round(n)));

export const quote = {
  add(slug: string, qty = 1, size = '') {
    load();
    const existing = state.items.find((i) => i.slug === slug);
    const items = existing
      ? state.items.map((i) => (i.slug === slug ? { ...i, qty: clampQty(i.qty + qty), size: size || i.size } : i))
      : [...state.items, { slug, qty: clampQty(qty), size }];
    set({ ...state, items });
  },
  setQty(slug: string, qty: number) {
    set({ ...state, items: state.items.map((i) => (i.slug === slug ? { ...i, qty: clampQty(qty) } : i)) });
  },
  setSize(slug: string, size: string) {
    set({ ...state, items: state.items.map((i) => (i.slug === slug ? { ...i, size: size.slice(0, 40) } : i)) });
  },
  remove(slug: string) {
    set({ ...state, items: state.items.filter((i) => i.slug !== slug) });
  },
  clear() {
    set({ ...state, items: [] });
  },
  open(open = true) {
    load();
    set({ ...state, open });
  },
};

function subscribe(listener: () => void) {
  load();
  listeners.add(listener);
  // keep several tabs in step
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    loaded = false;
    state = { ...state, items: [] };
    load();
    listener();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

export function useQuote() {
  return useSyncExternalStore(
    subscribe,
    () => {
      load();
      return state;
    },
    () => EMPTY,
  );
}

export type Requester = { name?: string; company?: string; city?: string; note?: string };

/** The consolidated message sent to the store on WhatsApp. */
export function quoteMessage(items: QuoteItem[], who: Requester = {}) {
  const lines = items.map((i) => {
    const p = productBySlug(i.slug);
    const size = i.size.trim() ? ` · ${i.size.trim()}` : '';
    return `• ${i.qty}x ${p?.name ?? i.slug}${size}`;
  });
  const header = who.company?.trim()
    ? `Olá! Gostaria de solicitar um orçamento de EPIs para a empresa ${who.company.trim()}.`
    : 'Olá! Gostaria de solicitar um orçamento dos seguintes itens:';
  const parts = [header, '', ...lines];
  const tail: string[] = [];
  if (who.name?.trim()) tail.push(`Nome: ${who.name.trim()}`);
  if (who.city?.trim()) tail.push(`Cidade para entrega ou retirada: ${who.city.trim()}`);
  if (who.note?.trim()) tail.push(`Observações: ${who.note.trim()}`);
  if (tail.length) parts.push('', ...tail);
  parts.push('', 'Poderiam informar disponibilidade, tamanhos e valores?');
  return parts.join('\n');
}

export const quoteLink = (items: QuoteItem[], who?: Requester) => whatsappLink(quoteMessage(items, who));
