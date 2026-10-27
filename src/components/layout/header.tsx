'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ClipboardList, Menu, Phone } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { SheetContent } from '@/components/ui/sheet';
import { SlidingNumber } from '@/components/ui/sliding-number';
import { quote, useQuote } from '@/lib/quote-store';
import { SITE, generalMessage, logo, whatsappLink } from '@/lib/site';
import { cn } from '@/lib/utils';

export const NAV = [
  { href: '/produtos/', label: 'Catálogo' },
  { href: '/empresas/', label: 'Para empresas' },
  { href: '/sobre/', label: 'Sobre a CR' },
  { href: '/contato/', label: 'Contato' },
] as const;

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('wordmark', className)} aria-label="CR Soluções em EPIs, página inicial">
      <img src={logo.src} width={logo.width} height={logo.height} alt="" />
      <span>
        CR Soluções <span className="wordmark-sub">em EPIs</span>
      </span>
    </Link>
  );
}

function isActive(pathname: string, href: string) {
  const clean = pathname.replace(/\/$/, '');
  const target = href.replace(/\/$/, '');
  if (target === '/produtos') return clean.startsWith('/produtos') || clean.startsWith('/categorias');
  return clean === target;
}

export function Header() {
  const pathname = usePathname() || '/';
  const { items } = useQuote();
  const count = items.reduce((n, i) => n + i.qty, 0);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - last.current;
      if (y < 120) setHidden(false);
      else if (delta > 6) setHidden(true);
      else if (delta < -6) setHidden(false);
      last.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className={cn('site-header', hidden && !menuOpen && 'is-hidden')}>
      <div className="frame header-row">
        <Wordmark />
        <nav className="header-nav" aria-label="Navegação principal">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} aria-current={isActive(pathname, item.href) ? 'page' : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <a className="header-phone" href={SITE.phoneHref}>
            <Phone size={16} strokeWidth={1.75} aria-hidden />
            {SITE.phoneDisplay}
          </a>
          <button type="button" className="list-button" onClick={() => quote.open()} aria-label={`Abrir lista de orçamento, ${count} ${count === 1 ? 'item' : 'itens'}`}>
            <ClipboardList size={18} strokeWidth={1.75} aria-hidden />
            <span className="list-button-label">Lista</span>
            <span className="list-count" aria-hidden>
              <SlidingNumber value={count} />
            </span>
          </button>
          <a className="btn btn-accent header-cta" href={whatsappLink(generalMessage)} target="_blank" rel="noreferrer">
            Pedir orçamento
          </a>
          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger className="menu-button" aria-label="Abrir menu">
              <Menu size={22} strokeWidth={1.75} aria-hidden />
            </Dialog.Trigger>
            <SheetContent side="full" title="Menu" className="mobile-menu">
              <nav className="mobile-menu-nav" aria-label="Navegação no celular">
                <Link href="/" aria-current={pathname === '/' ? 'page' : undefined}>Início</Link>
                {NAV.map((item) => (
                  <Link key={item.href} href={item.href} aria-current={isActive(pathname, item.href) ? 'page' : undefined}>
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mobile-menu-foot">
                <a className="btn btn-accent btn-block" href={whatsappLink(generalMessage)} target="_blank" rel="noreferrer">
                  Pedir orçamento no WhatsApp
                </a>
                <a className="btn btn-quiet btn-block" href={SITE.phoneHref}>
                  Ligar para {SITE.phoneDisplay}
                </a>
                <p>
                  {SITE.street}, {SITE.district}
                  <br />
                  {SITE.city}/{SITE.state}
                </p>
              </div>
            </SheetContent>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
