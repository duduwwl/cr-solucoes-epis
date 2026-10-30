'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Pause, Play, Search, Settings, X } from 'lucide-react';
import { InView } from '@/components/ui/in-view';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { SlidingNumber } from '@/components/ui/sliding-number';
import { TransitionPanel } from '@/components/ui/transition-panel';
import { LetterSwapLink } from '@/components/fancy/letter-swap-link';
import Faq from '@/components/faq';
import { categories, categoryBySlug, productBySlug, products, relatedProducts, type Product } from '@/data/catalog';
import { SITE, assetPath, businessMessage, catalogImage, generalMessage, img, logo, productMessage, whatsappLink } from '@/lib/site';

/* ───────────── Base ───────────── */

function Brand() {
  return (
    <Link href="/" className="brand brand-premium" aria-label="CR Soluções em EPIs, página inicial">
      <img className="brand-logo-original" src={logo.src} width={logo.width} height={logo.height} alt="CR Soluções em EPIs" />
    </Link>
  );
}

const NAV = [
  { href: '/produtos/', label: 'Produtos' },
  { href: '/empresas/', label: 'Para empresas' },
  { href: '/sobre/', label: 'Sobre a CR' },
  { href: '/contato/', label: 'Contato' },
];

function isActive(pathname: string, href: string) {
  const clean = pathname.replace(/\/$/, '') || '/';
  const target = href.replace(/\/$/, '') || '/';
  if (target === '/produtos') return clean.startsWith('/produtos') || clean.startsWith('/categorias');
  return clean === target;
}

export function Header() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const d = y - last.current;
      if (y < 140) setHidden(false);
      else if (d > 8) setHidden(true);
      else if (d < -8) setHidden(false);
      last.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`header header-premium ${hidden && !open ? 'is-hidden' : ''}`}>
      <div className="wrap nav nav-premium">
        <Brand />
        <nav className="navlinks navlinks-premium" aria-label="Navegação principal">
          {NAV.slice(0, 3).map((item) => (
            <span key={item.href} className={isActive(pathname, item.href) ? 'nav-item is-active' : 'nav-item'}>
              <LetterSwapLink href={item.href}>{item.label}</LetterSwapLink>
            </span>
          ))}
        </nav>
        <div className="navright navright-premium">
          <a className="nav-phone" href={SITE.phoneHref}>
            {SITE.phoneDisplay}
          </a>
          <button
            type="button"
            className={`mobile-menu ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobileNav"
          >
            {open ? 'Fechar' : 'Menu'}
          </button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobileNav"
            className="mobile-nav mobile-nav-premium show"
            aria-label="Navegação no celular"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.12 } }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} aria-current={isActive(pathname, item.href) ? 'page' : undefined}>
                {item.label}
              </Link>
            ))}
            <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer footer-premium">
      <div className="wrap">
        <div className="footer-callout">
          <div>
            <span>ATENDIMENTO COMERCIAL · LAVRAS/MG</span>
            <h2>Proteção certa começa com uma conversa direta.</h2>
          </div>
          <a className="footer-callout-link" href={whatsappLink(generalMessage)} target="_blank" rel="noreferrer">
            Falar no WhatsApp
          </a>
        </div>
        <div className="footer-main">
          <div className="footer-identity">
            <Brand />
            <p>Equipamentos de proteção para profissionais, equipes e empresas. Atendimento em Lavras e envio para todo o Brasil.</p>
            <Link className="footer-admin-link" href="/admin/">
              <Settings size={16} aria-hidden="true" />
              Área da gerência
            </Link>
          </div>
          <div className="footer-column">
            <h4>Catálogo</h4>
            <Link href="/produtos/">Todos os produtos</Link>
            {categories.slice(0, 4).map((c) => (
              <Link key={c.slug} href={`/categorias/${c.slug}/`}>
                {c.name}
              </Link>
            ))}
          </div>
          <div className="footer-column">
            <h4>Atendimento</h4>
            <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
            <a href={whatsappLink(businessMessage)} target="_blank" rel="noreferrer">
              Compras para empresas
            </a>
            <Link href="/contato/">Fale com a equipe</Link>
            <span>
              {SITE.street}
              <br />
              {SITE.district} · {SITE.city}/{SITE.state}
            </span>
          </div>
          <div className="footer-column">
            <h4>Institucional</h4>
            <Link href="/sobre/">Sobre a CR</Link>
            <Link href="/privacidade/">Privacidade</Link>
            <Link href="/termos/">Termos de uso</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} CR Soluções em EPIs · Lavras, MG</span>
          <span>Orçamentos e disponibilidade confirmados pela equipe.</span>
        </div>
      </div>
    </footer>
  );
}

export function MobileBar() {
  const pathname = usePathname() || '/';
  return (
    <nav className="mobile-bar" aria-label="Atalhos">
      <Link href="/" aria-current={pathname === '/' ? 'page' : undefined}>
        Início
      </Link>
      <Link href="/produtos/" aria-current={isActive(pathname, '/produtos/') ? 'page' : undefined}>
        Produtos
      </Link>
      <Link href="/empresas/" aria-current={isActive(pathname, '/empresas/') ? 'page' : undefined}>
        Empresas
      </Link>
      <a href={whatsappLink(generalMessage)} target="_blank" rel="noreferrer">WhatsApp</a>
    </nav>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <div id="conteudo">{children}</div>
      <Footer />
      <MobileBar />
    </>
  );
}

/* ───────────── Produtos ───────────── */

export function ProductImage({ name, alt, sizes, eager, className = '' }: { name: string; alt: string; sizes: string; eager?: boolean; className?: string }) {
  if (name.startsWith('/')) {
    return <img className={`is-photo ${className}`} src={assetPath(name)} sizes={sizes} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />;
  }
  const pic = img(name);
  return (
    <img
      className={`${pic.cutout ? 'is-cutout' : 'is-photo'} ${className}`}
      src={pic.src}
      srcSet={pic.srcSet}
      sizes={sizes}
      width={pic.width}
      height={pic.height}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}

export function CatalogCard({ p }: { p: Product }) {
  const cat = categoryBySlug(p.category);
  const productWhatsApp = whatsappLink(productMessage(p.name));
  const detailHref = `/produtos/${p.slug}/`;
  return (
    <article className="product-card">
      <Link href={detailHref} className="product-image" aria-label={`Ver detalhes de ${p.name}`}>
        <span className="product-tag">{cat?.name}</span>
        <ProductImage name={catalogImage(p.images[0])} alt={p.name} sizes="(min-width: 1060px) 24vw, (min-width: 560px) 45vw, 92vw" />
      </Link>
      <div className="product-info">
        <div className="product-meta">{p.brand}</div>
        <h3>
          <Link href={detailHref}>{p.name}</Link>
        </h3>
        <p className="product-description">{p.description}</p>
        <div className="product-bottom">
          <a href={productWhatsApp} target="_blank" rel="noreferrer" className="product-wa">
            Orçar no WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

export function CatalogGrid({ items }: { items: Product[] }) {
  return (
    <AnimatedGroup preset="blur-slide" className="product-grid">
      {items.map((p) => (
        <CatalogCard key={p.slug} p={p} />
      ))}
    </AnimatedGroup>
  );
}

/* ───────────── Início ───────────── */

const heroItems = ['bota-gogowear-caramelo', 'capacete-de-protecao', 'luva-multitato', 'bota-pvc-branca', 'cinto-paraquedista', 'protetor-concha-capacete', 'extintor-incendio']
  .map((slug) => productBySlug(slug)!)
  .filter(Boolean);

function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % heroItems.length), 5200);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  return (
    <div
      className="hero-carousel hero-stage"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Seleção de produtos CR"
      onFocusCapture={(event) => {
        if (!(event.target instanceof HTMLButtonElement && event.target.classList.contains('hero-rotation-toggle'))) setPaused(true);
      }}
    >
      {heroItems.map((item, index) => (
        <a
          href={whatsappLink(productMessage(item.name))}
          target="_blank"
          rel="noreferrer"
          className={`hero-slide ${index === active ? 'active' : ''}`}
          key={item.slug}
          aria-hidden={index !== active}
          tabIndex={index === active ? 0 : -1}
        >
          <ProductImage name={catalogImage(item.images[0])} alt={item.name} sizes="(min-width: 820px) 50vw, 92vw" eager={index === 0} />
          <div className="hero-slide-copy">
            <span>{categoryBySlug(item.category)?.name}</span>
            <strong>{item.name}</strong>
            <em>Ver detalhes</em>
          </div>
        </a>
      ))}
      <div className="hero-carousel-controls">
        <div className="hero-progress">
          {heroItems.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              aria-label={`Mostrar ${item.name}`}
              aria-pressed={index === active}
              className={index === active ? 'active' : ''}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
        <button
          className="hero-rotation-toggle"
          type="button"
          aria-label={paused || reducedMotion ? 'Retomar carrossel' : 'Pausar carrossel'}
          aria-pressed={paused || reducedMotion}
          onClick={() => setPaused((current) => !current)}
        >
          {paused || reducedMotion ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}

const reveal = { hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0 } };
const revealTransition = { duration: 0.65, ease: [0.23, 1, 0.32, 1] as const };

function Categories() {
  return (
    <section className="section categories-section" aria-labelledby="categorias-titulo">
      <div className="wrap">
        <InView once viewOptions={{ margin: '0px 0px -12% 0px' }} variants={reveal} transition={revealTransition} className="section-head">
          <div>
            <div className="eyebrow orange">LINHAS DE PROTEÇÃO</div>
            <h2 id="categorias-titulo">Encontre pela necessidade.</h2>
          </div>
          <p className="section-intro">{categories.length} linhas e mais de {Math.floor(products.length / 10) * 10} produtos, da bota ao extintor. Escolha uma para ver os modelos e pedir orçamento.</p>
        </InView>
        <AnimatedGroup preset="blur-slide" className="category-grid">
          {categories.map((c) => {
            const count = products.filter((p) => p.category === c.slug).length;
            return (
              <Link key={c.slug} href={`/categorias/${c.slug}/`} className="category-card">
                <span className="category-index">
                  {count} {count === 1 ? 'modelo' : 'modelos'}
                </span>
                <h3>{c.name}</h3>
                <span className="category-picture" aria-hidden>
                  <ProductImage name={c.image} alt="" sizes="160px" />
                </span>
              </Link>
            );
          })}
        </AnimatedGroup>
      </div>
    </section>
  );
}

export function HomePage() {
  const featured = products.filter((p) => p.featured);
  return (
    <PageShell>
      <main>
        <section className="hero hero-premium">
          <div className="wrap hero-grid">
            <div className="hero-copy hero-ticket">
              <p className="hero-ticket-kicker">CR Soluções em EPIs · Lavras, MG</p>
              <h1>Proteção para trabalho sério.</h1>
              <p className="hero-sub">
                EPIs para obra, indústria e equipes. Conte sua atividade; a CR indica o equipamento, confirma o CA e prepara o orçamento.
              </p>
              <div className="hero-actions">
                <Link className="pill hot" href="/produtos/">
                  Ver equipamentos
                </Link>
                <a className="hero-secondary" href={whatsappLink(businessMessage)} target="_blank" rel="noreferrer">
                  Solicitar orçamento
                </a>
              </div>
              <div className="hero-assurance">
                <span>ENVIO NACIONAL</span>
                <span>RETIRADA EM LAVRAS</span>
                <span>ATENDIMENTO ESPECIALIZADO</span>
              </div>
            </div>
            <HeroCarousel />
          </div>
        </section>

        <Categories />

        <section className="section products-section" aria-labelledby="destaques-titulo">
          <div className="wrap">
            <InView once viewOptions={{ margin: '0px 0px -12% 0px' }} variants={reveal} transition={revealTransition} className="section-head">
              <div>
                <div className="eyebrow orange">CURADORIA CR</div>
                <h2 id="destaques-titulo">Equipamentos em destaque.</h2>
              </div>
              <Link href="/produtos/" className="pill">
                Ver catálogo completo
              </Link>
            </InView>
            <CatalogGrid items={featured} />
          </div>
        </section>

        <section className="strip" aria-labelledby="empresas-titulo">
          <div className="wrap strip-grid">
            <InView once variants={reveal} transition={revealTransition}>
              <div className="eyebrow">Para empresas · obras · equipes</div>
              <h2 id="empresas-titulo">Compras em volume com atendimento direto.</h2>
            </InView>
            <ul className="strip-list">
              <li>Lista por colaborador, com numeração e tamanhos</li>
              <li>Orientação na escolha de cada EPI</li>
              <li>Condição comercial para quantidade</li>
              <li>Retirada em Lavras ou envio para todo o Brasil</li>
            </ul>
            <a href={whatsappLink(businessMessage)} target="_blank" rel="noreferrer" className="pill">
              Orçamento para empresa
            </a>
          </div>
        </section>

        <section className="section" aria-labelledby="porque-titulo">
          <div className="wrap story-grid">
            <InView once variants={reveal} transition={revealTransition} className="story-copy">
              <div className="eyebrow orange">POR QUE ESCOLHER A CR</div>
              <h2 id="porque-titulo">Atendimento próximo. Compra simples.</h2>
              <p>
                A CR Soluções em EPIs atende profissionais e empresas em Lavras e em todo o Brasil, com orientação antes da compra e retirada disponível na loja da {SITE.street}.
              </p>
              <Link className="textlink" href="/sobre/">
                Conheça a CR
              </Link>
            </InView>
            <AnimatedGroup preset="slide" className="proof-list">
              <div className="proof">
                <i />
                <div>
                  <h3>Entrega nacional</h3>
                  <p>Envio para qualquer estado, com prazo combinado no orçamento.</p>
                </div>
              </div>
              <div className="proof">
                <i />
                <div>
                  <h3>Retirada em Lavras</h3>
                  <p>Confirme a disponibilidade e retire o pedido separado na loja.</p>
                </div>
              </div>
              <div className="proof">
                <i />
                <div>
                  <h3>Lista de orçamento</h3>
                  <p>Junte vários itens com quantidades e tamanhos e envie em uma única mensagem.</p>
                </div>
              </div>
              <div className="proof">
                <i />
                <div>
                  <h3>CA confirmado</h3>
                  <p>O número do CA e a ficha técnica de cada item são informados junto com o orçamento.</p>
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>

        <section className="section faq" aria-labelledby="faq-titulo">
          <div className="wrap faq-grid">
            <InView once variants={reveal} transition={revealTransition}>
              <div className="eyebrow orange">DÚVIDAS FREQUENTES</div>
              <h2 id="faq-titulo">Informação antes da compra.</h2>
              <p className="section-intro">Confira as respostas mais comuns e fale com a equipe quando precisar.</p>
            </InView>
            <Faq />
          </div>
        </section>

        <section className="section location-section" aria-labelledby="localizacao-titulo">
          <div className="wrap location-grid">
            <div>
              <div className="eyebrow orange">LOJA FÍSICA · LAVRAS/MG</div>
              <h2 id="localizacao-titulo">Venha falar com a CR.</h2>
              <address>
                {SITE.street}
                <br />
                {SITE.district} · {SITE.city}/{SITE.state}
              </address>
              <p className="section-intro">Retire seu pedido na loja ou converse com nossa equipe antes de sair.</p>
              <a className="pill hot" href={SITE.mapsUrl} target="_blank" rel="noreferrer">
                Abrir rota no Google Maps
              </a>
            </div>
            <iframe
              className="location-map"
              title="Mapa da CR Soluções em EPIs em Lavras"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Rua%20Chagas%20D%C3%B3ria%20812%2C%20Lavras%2C%20MG&z=17&output=embed"
            />
          </div>
        </section>
      </main>
    </PageShell>
  );
}

/* ───────────── Catálogo ───────────── */

type Sort = 'destaques' | 'az' | 'za';
const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export function ProductsPage({ category }: { category?: string }) {
  const fixed = Boolean(category);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState(category || 'todos');
  const [sort, setSort] = useState<Sort>('destaques');
  const [databaseProducts, setDatabaseProducts] = useState<Product[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let active = true;
    fetch('/api/produtos', { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : null)
      .then((body) => {
        if (!active || !body?.products) return;
        const imported = body.products.flatMap((item: { slug: string; name: string; brand: string; description: string; features: unknown; size_hint?: string | null; featured?: boolean; category?: { slug?: string } | null; images?: { path: string }[] }) => {
          const categorySlug = item.category?.slug;
          if (!categorySlug || !categoryBySlug(categorySlug) || !item.images?.[0]?.path) return [];
          return [{ slug: item.slug, name: item.name, brand: item.brand, description: item.description, features: Array.isArray(item.features) ? item.features.filter((value): value is string => typeof value === 'string') : [], sizeHint: item.size_hint ?? undefined, featured: item.featured, category: categorySlug as Product['category'], images: item.images.map((image) => image.path) }];
        });
        setDatabaseProducts(imported);
      })
      .catch(() => undefined);
    return () => { active = false; };
  }, []);

  // The database is the source of truth once it answers; the bundled catalog is the offline fallback.
  const catalog = databaseProducts.length ? databaseProducts : products;

  // read ?categoria= / ?q= once, and keep them in the address
  useEffect(() => {
    if (fixed) return;
    const sp = new URLSearchParams(window.location.search);
    const c = sp.get('categoria');
    if (c && categoryBySlug(c)) setCat(c);
    const query = sp.get('q');
    if (query) setQ(query);
  }, [fixed]);

  useEffect(() => {
    if (fixed) return;
    const sp = new URLSearchParams();
    if (cat !== 'todos') sp.set('categoria', cat);
    if (q.trim()) sp.set('q', q.trim());
    const qs = sp.toString();
    window.history.replaceState(null, '', `${window.location.pathname}${qs ? `?${qs}` : ''}`);
  }, [cat, q, fixed]);

  const shown = useMemo(() => {
    const terms = norm(q).split(/\s+/).filter(Boolean);
    const list = catalog.filter((p) => {
      if (cat !== 'todos' && p.category !== cat) return false;
      const text = norm([p.name, p.brand, p.description, categoryBySlug(p.category)?.name, ...p.features].join(' '));
      return terms.every((t) => text.includes(t));
    });
    const byName = (a: Product, b: Product) => a.name.localeCompare(b.name, 'pt-BR');
    if (sort === 'az') return [...list].sort(byName);
    if (sort === 'za') return [...list].sort((a, b) => byName(b, a));
    return [...list].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }, [q, cat, sort, catalog]);

  const current = categoryBySlug(cat);
  const title = fixed ? current?.name ?? 'Categoria' : 'Equipamentos para o trabalho.';

  return (
    <PageShell>
      <main>
        <section className="page-hero">
          <div className="wrap">
            <div className="eyebrow orange">{fixed ? 'CR / categoria' : 'CR / catálogo'}</div>
            <h1>{title}</h1>
            <p className="section-intro">
              {fixed
                ? current?.summary
                : 'Escolha o item e fale no WhatsApp. A equipe confirma especificações, CA, disponibilidade e valores.'}
            </p>
            <div className="catalog-tools" role="search">
              <label className="search-box">
                <Search size={17} strokeWidth={1.8} aria-hidden />
                <span className="sr-only">Buscar produtos</span>
                <input
                  ref={searchRef}
                  className="search-input"
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Busque por produto, linha ou aplicação"
                />
                {q && (
                  <button
                    type="button"
                    className="search-clear"
                    aria-label="Limpar busca"
                    onClick={() => {
                      setQ('');
                      searchRef.current?.focus();
                    }}
                  >
                    <X size={17} strokeWidth={1.8} aria-hidden />
                  </button>
                )}
              </label>
              <label className="sort-box">
                <span className="sr-only">Ordenar produtos</span>
                <select className="search-input" value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Ordenar produtos">
                  <option value="destaques">Destaques primeiro</option>
                  <option value="az">Nome, de A a Z</option>
                  <option value="za">Nome, de Z a A</option>
                </select>
              </label>
            </div>
            {!fixed && (
              <div className="filter-row" role="group" aria-label="Filtrar por linha">
                <button type="button" className={`filter-chip ${cat === 'todos' ? 'active' : ''}`} aria-pressed={cat === 'todos'} onClick={() => setCat('todos')}>
                  Todos <small>{catalog.length}</small>
                </button>
                {categories.map((c) => (
                  <button
                    type="button"
                    key={c.slug}
                    className={`filter-chip ${cat === c.slug ? 'active' : ''}`}
                    aria-pressed={cat === c.slug}
                    onClick={() => setCat(c.slug)}
                  >
                    {c.name} <small>{catalog.filter((p) => p.category === c.slug).length}</small>
                  </button>
                ))}
              </div>
            )}
            <div className="catalog-count" aria-live="polite">
              <strong>
                <SlidingNumber value={shown.length} />
              </strong>
              <span>{shown.length === 1 ? 'produto encontrado' : 'produtos encontrados'}{q.trim() ? ` para “${q.trim()}”` : ''}</span>
            </div>
          </div>
        </section>
        <section className="product-listing">
          <div className="wrap">
            {shown.length ? (
              <motion.div className="product-grid" layout>
                <AnimatePresence mode="popLayout" initial={false}>
                  {shown.map((p) => (
                    <motion.div
                      key={p.slug}
                      layout
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.15 } }}
                      transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                      className="product-grid-item"
                    >
                      <CatalogCard p={p} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="empty-state">
                <h2>Nenhum produto encontrado.</h2>
                <p>Tente outra palavra ou veja todas as linhas. Se o item não está no catálogo, pergunte: a loja pode ter ou conseguir.</p>
                <div className="detail-actions">
                  <button
                    type="button"
                    className="pill"
                    onClick={() => {
                      setQ('');
                      if (!fixed) setCat('todos');
                    }}
                  >
                    Limpar busca
                  </button>
                  <a
                    className="pill hot"
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
                <Link className="textlink" href="/produtos/">
                  Ver o catálogo completo
                </Link>
              </p>
            )}
          </div>
        </section>
      </main>
    </PageShell>
  );
}

export function CategoryPage({ slug }: { slug: string }) {
  return <ProductsPage category={slug} />;
}

/* ───────────── Produto ───────────── */

export function DetailPage({ slug, product }: { slug?: string; product?: Product }) {
  const p = product ?? (slug ? productBySlug(slug) : undefined);
  const [shot, setShot] = useState(0);
  if (!p)
    return (
      <PageShell>
        <main className="wrap page-hero">
          <h1>Produto não encontrado.</h1>
          <Link className="pill" href="/produtos/">
            Voltar ao catálogo
          </Link>
        </main>
      </PageShell>
    );
  const cat = categoryBySlug(p.category);
  const message = productMessage(p.name);

  return (
    <PageShell>
      <main>
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Você está em">
            <Link href="/">Início</Link>
            <span aria-hidden>/</span>
            <Link href="/produtos/">Produtos</Link>
            <span aria-hidden>/</span>
            <Link href={`/categorias/${p.category}/`}>{cat?.name}</Link>
          </nav>
        </div>
        <div className="wrap detail-grid">
          <div>
            <TransitionPanel
              activeIndex={shot}
              className="detail-image"
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              variants={{
                enter: { opacity: 0, scale: 0.985, filter: 'blur(4px)' },
                center: { opacity: 1, scale: 1, filter: 'blur(0px)' },
                exit: { opacity: 0, scale: 1.01, filter: 'blur(4px)' },
              }}
            >
              {p.images.map((name, i) => (
                <ProductImage key={name} name={catalogImage(name)} alt={i === 0 ? p.name : `${p.name}: imagem de referência da linha`} sizes="(min-width: 820px) 55vw, 100vw" eager={i === 0} />
              ))}
            </TransitionPanel>
            {p.images.length > 1 && (
              <div className="detail-thumbs" role="group" aria-label="Escolher imagem">
                {p.images.map((name, i) => (
                  <button key={name} type="button" className={i === shot ? 'active' : ''} aria-pressed={i === shot} aria-label={`Ver imagem ${i + 1} de ${p.images.length}`} onClick={() => setShot(i)}>
                    <ProductImage name={catalogImage(name)} alt="" sizes="88px" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="detail-copy">
            <div className="eyebrow orange">{cat?.name} / CR</div>
            <h1>{p.name}</h1>
            <div className="product-meta">{p.brand}</div>
            <p>{p.description}</p>
            <ul className="feature-list">
              {p.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <div className="notice">Confirme com a equipe o número do CA, materiais, medidas, disponibilidade e condições comerciais antes de fechar o pedido.</div>
            <div className="detail-actions">
              <a className="pill hot" href={whatsappLink(message)} target="_blank" rel="noreferrer">
                Solicitar orçamento no WhatsApp
              </a>
            </div>
            <p>
              <Link href="/produtos/" className="textlink">
                Voltar ao catálogo
              </Link>
            </p>
          </div>
        </div>
        <section className="section products-section related" aria-labelledby="relacionados-titulo">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow orange">PARA COMPLETAR O PEDIDO</div>
                <h2 id="relacionados-titulo">Itens relacionados.</h2>
              </div>
            </div>
            <CatalogGrid items={relatedProducts(p)} />
          </div>
        </section>
      </main>
    </PageShell>
  );
}

/* ───────────── Páginas de conteúdo ───────────── */

export function ContactPage() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [website, setWebsite] = useState('');
  const text = `Olá, sou ${name.trim() || 'cliente'} e gostaria de falar sobre: ${message.trim() || 'EPIs e disponibilidade'}`;
  async function submitQuote() {
    if (sending) return;
    setSending(true);
    try {
      await fetch('/api/orcamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() || 'Cliente', message: message.trim(), website }),
      });
    } catch {
      // O atendimento não deve ficar bloqueado se a gravação estiver temporariamente indisponível.
    } finally {
      window.open(whatsappLink(text), '_blank', 'noopener');
      setSending(false);
    }
  }
  return (
    <PageShell>
      <main>
        <section className="wrap contact-grid">
          <div>
            <div className="eyebrow orange">Atendimento CR · Lavras/MG</div>
            <h1>Converse com quem entende de proteção.</h1>
            <p className="section-intro">Conte o que sua rotina exige e receba orientação da equipe sobre modelos, tamanhos e valores.</p>
            <p>
              <a className="pill hot" href={SITE.phoneHref}>
                Ligar para {SITE.phoneDisplay}
              </a>
            </p>
          </div>
          <div>
            <div className="contact-box">
              <small>Visite a loja</small>
              <p>
                {SITE.street}
                <br />
                {SITE.district} · {SITE.city}/{SITE.state}
              </p>
              <a className="textlink" target="_blank" rel="noreferrer" href={SITE.mapsUrl}>
                Abrir no mapa
              </a>
            </div>
            <form
              className="contact-box"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                if (!message.trim()) {
                  setError('Escreva o que você precisa para continuar.');
                  return;
                }
                setError('');
                void submitQuote();
              }}
            >
              <small>Escreva para a equipe</small>
              <label className="formlabel">
                Seu nome
                <input className="search-input" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome completo" />
              </label>
              <label className="formlabel">
                Mensagem
                <textarea
                  className="search-input textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Produto, quantidade e detalhes"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'contato-erro' : undefined}
                />
              </label>
              <label className="honeypot" aria-hidden="true">
                Site
                <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </label>
              {error && (
                <p id="contato-erro" className="form-error" role="alert">
                  {error}
                </p>
              )}
              <button type="submit" className="pill hot" disabled={sending}>
                {sending ? 'Abrindo WhatsApp…' : 'Continuar no WhatsApp'}
              </button>
            </form>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

export function ContentPage({ type }: { type: 'about' | 'business' | 'privacy' | 'terms' }) {
  let title = '';
  let eyebrow = '';
  let text: ReactNode = null;
  if (type === 'about') {
    title = 'Uma loja local com alcance nacional.';
    eyebrow = 'Sobre a CR';
    text = (
      <>
        <p>
          A CR Soluções em EPIs está na {SITE.street}, {SITE.district}, {SITE.city}/{SITE.state}. A empresa atende profissionais, equipes, obras e operações com diferentes linhas de proteção.
        </p>
        <p>O atendimento é direto: você conta o que a equipe faz, quantas pessoas são e os tamanhos, e a loja indica os modelos, confirma o CA de cada item e passa os valores.</p>
        <p>
          <Link className="pill hot" href="/produtos/">
            Ver produtos
          </Link>
        </p>
      </>
    );
  } else if (type === 'business') {
    title = 'Proteção para equipes e empresas.';
    eyebrow = 'Atendimento empresarial';
    text = (
      <>
        <p>Envie a lista de equipamentos, quantidades, tamanhos e prazo desejado. A equipe orienta a seleção e prepara a condição comercial.</p>
        <ul className="feature-list">
          <li>Lista por colaborador, com numeração de calçados e tamanho de vestimentas</li>
          <li>Indicação do modelo conforme a atividade: obra, manutenção, câmara fria, limpeza</li>
          <li>CA e ficha técnica informados no orçamento</li>
          <li>Retirada em Lavras ou envio para todo o Brasil</li>
        </ul>
        <div className="detail-actions">
          <a className="pill hot" href={whatsappLink(businessMessage)} target="_blank" rel="noreferrer">
            Solicitar orçamento empresarial
          </a>
          <a className="pill" href={whatsappLink(businessMessage)} target="_blank" rel="noreferrer">Falar com a equipe</a>
        </div>
      </>
    );
  } else if (type === 'privacy') {
    title = 'Privacidade e dados pessoais';
    eyebrow = 'Informações';
    text = (
      <>
        <p>Este site é um catálogo. Ele não tem cadastro, não recebe pagamentos e não envia dados pessoais para servidores da CR Soluções em EPIs.</p>
        <p>O catálogo não usa carrinho ou checkout. Os pedidos são tratados diretamente pela equipe no WhatsApp.</p>
        <p>Os botões de orçamento abrem o WhatsApp com uma mensagem já escrita. Nada é enviado até que você mesmo envie a mensagem.</p>
      </>
    );
  } else {
    title = 'Termos de uso';
    eyebrow = 'Informações';
    text = (
      <>
        <p>O site apresenta produtos com que a CR Soluções em EPIs trabalha e serve para consulta e pedido de orçamento. Não há compra online.</p>
        <p>Especificações, número do CA, materiais, tamanhos, disponibilidade e valores são confirmados pela equipe no orçamento. A escolha do EPI adequado deve ser validada pelo responsável pela segurança do trabalho.</p>
      </>
    );
  }
  return (
    <PageShell>
      <main className="wrap contact-grid">
        <div>
          <div className="eyebrow orange">{eyebrow}</div>
          <h1>{title}</h1>
        </div>
        <div className="story-copy">{text}</div>
      </main>
    </PageShell>
  );
}

export function AdminPage() {
  type ManagedProduct = { slug: string; name: string; brand: string; description: string; active: boolean; featured: boolean; category?: { slug: string; name: string } | null; images?: { path: string }[] };
  const [password, setPassword] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [items, setItems] = useState<ManagedProduct[]>([]);
  const [notice, setNotice] = useState('');
  const [form, setForm] = useState({ slug: '', categorySlug: categories[0].slug, name: '', brand: 'Linha CR', description: '', imagePath: '', featured: false, active: true });
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  async function loadProducts() {
    const response = await fetch('/api/admin/products', { cache: 'no-store' });
    if (!response.ok) throw new Error('Não foi possível carregar produtos.');
    const body = await response.json();
    setItems(body.products ?? []);
  }
  async function login(event: React.FormEvent) {
    event.preventDefault();
    setNotice('');
    const response = await fetch('/api/admin/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    if (!response.ok) { setNotice('Senha inválida ou área ainda não configurada.'); return; }
    setPassword(''); setAuthorized(true);
    try { await loadProducts(); } catch { setNotice('Sessão aberta, mas o banco não respondeu.'); }
  }
  async function save(event: React.FormEvent) {
    event.preventDefault();
    setNotice('');
    const response = await fetch(editingSlug ? `/api/admin/products/${editingSlug}` : '/api/admin/products', { method: editingSlug ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editingSlug ? form : { ...form, features: [] }) });
    if (!response.ok) { setNotice('Não foi possível salvar. Confira categoria, slug e imagem.'); return; }
    setForm({ slug: '', categorySlug: categories[0].slug, name: '', brand: 'Linha CR', description: '', imagePath: '', featured: false, active: true });
    setEditingSlug(null); await loadProducts(); setNotice(editingSlug ? 'Produto atualizado.' : 'Produto criado.');
  }
  async function remove(slug: string) {
    if (!window.confirm(`Remover ${slug}?`)) return;
    const response = await fetch(`/api/admin/products/${slug}`, { method: 'DELETE' });
    if (!response.ok) { setNotice('Não foi possível remover.'); return; }
    await loadProducts(); setNotice('Produto removido.');
  }
  function edit(item: ManagedProduct) {
    setEditingSlug(item.slug);
    setForm({ slug: item.slug, categorySlug: (item.category?.slug ?? categories[0].slug) as typeof categories[number]['slug'], name: item.name, brand: item.brand, description: item.description, imagePath: item.images?.[0]?.path ?? '', featured: item.featured, active: item.active });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return (
    <PageShell>
      <main className="wrap admin-page">
        <div className="eyebrow orange">ÁREA ADMINISTRATIVA</div>
        <h1>Catálogo CR.</h1>
        {!authorized ? (
          <form className="admin-login" onSubmit={login}>
            <label>Senha de gestão<input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
            <button className="pill hot" type="submit">Entrar</button>
          </form>
        ) : (
          <div className="admin-grid">
            <form className="admin-form" onSubmit={save}>
              <h2>{editingSlug ? 'Editar produto' : 'Adicionar produto'}</h2>
              <label>Nome<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label>
              <label>Slug<input disabled={Boolean(editingSlug)} value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })} placeholder="ex.: luva-nitrilica-azul" required /></label>
              {!editingSlug && <label>Categoria<select value={form.categorySlug} onChange={(e) => setForm({ ...form, categorySlug: e.target.value as typeof categories[number]['slug'] })}>{categories.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}</select></label>}
              <label>Marca<input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} required /></label>
              <label>Descrição<textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
              <label>Caminho da imagem<input value={form.imagePath} onChange={(e) => setForm({ ...form, imagePath: e.target.value })} placeholder="/images/catalog/produto.png" required /></label>
              <label className="admin-check"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Destaque</label>
              <div className="admin-actions"><button className="pill hot" type="submit">{editingSlug ? 'Atualizar produto' : 'Salvar produto'}</button>{editingSlug && <button className="pill" type="button" onClick={() => { setEditingSlug(null); setForm({ slug: '', categorySlug: categories[0].slug, name: '', brand: 'Linha CR', description: '', imagePath: '', featured: false, active: true }); }}>Cancelar</button>}</div>
            </form>
            <section className="admin-list" aria-live="polite">
              <div><h2>Produtos no banco</h2><button type="button" className="textlink" onClick={() => void loadProducts()}>Atualizar</button></div>
              {items.map((item) => <article key={item.slug}><div><strong>{item.name}</strong><span>{item.category?.name ?? 'Sem categoria'} · {item.active ? 'Ativo' : 'Inativo'}</span></div><div className="admin-row-actions"><button type="button" onClick={() => edit(item)}>Editar</button><button type="button" onClick={() => void remove(item.slug)}>Remover</button></div></article>)}
            </section>
          </div>
        )}
        {notice && <p className="form-error" role="status">{notice}</p>}
      </main>
    </PageShell>
  );
}

export function NotFoundPage() {
  return (
    <PageShell>
      <main className="wrap page-hero">
        <div className="eyebrow orange">Página não encontrada</div>
        <h1>Este endereço não existe.</h1>
        <p className="section-intro">O link pode ter mudado. O catálogo continua no mesmo lugar.</p>
        <div className="detail-actions">
          <Link className="pill hot" href="/produtos/">
            Ver produtos
          </Link>
          <Link className="pill" href="/">
            Página inicial
          </Link>
        </div>
      </main>
    </PageShell>
  );
}
