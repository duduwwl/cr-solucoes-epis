'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { InView } from '@/components/ui/in-view';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { VerticalCutReveal } from '@/components/fancy/vertical-cut-reveal';
import Faq from '@/components/faq';

export const cats = [
  ['01', 'Calçados', 'calcados'],
  ['02', 'Capacetes', 'capacetes'],
  ['03', 'Vestimentas', 'vestimentas'],
  ['04', 'Proteção auditiva', 'auditiva'],
  ['05', 'Limpeza', 'limpeza'],
  ['06', 'Prevenção de incêndio', 'incendio'],
] as const;

export type Product = {
  slug: string;
  name: string;
  cat: string;
  label: string;
  brand: string;
  image: string;
  price: number;
  description: string;
  features: string[];
};

export const products: Product[] = [
  { slug: 'bota-gogowear-caramelo', name: 'Bota de segurança caramelo', cat: 'calcados', label: 'Calçados', brand: 'Gogowear', image: '/images/products/calcados/bota-gogowear-real.png', price: 189.9, description: 'Bota de cano médio com visual robusto, acolchoamento interno e solado tratorado para rotinas profissionais.', features: ['Cano médio acolchoado', 'Solado tratorado', 'Fechamento por cadarço'] },
  { slug: 'botina-seguranca-escura', name: 'Botina de segurança escura', cat: 'calcados', label: 'Calçados', brand: 'Linha profissional', image: '/images/products/calcados/botina-escura-real.png', price: 159.9, description: 'Botina escura de uso profissional, com estrutura reforçada e acabamento pensado para jornadas prolongadas.', features: ['Estrutura reforçada', 'Ajuste firme', 'Uso profissional'] },
  { slug: 'bota-seguranca-marrom', name: 'Bota de segurança marrom', cat: 'calcados', label: 'Calçados', brand: 'Linha profissional', image: '/images/products/calcados/bota-marrom-real.png', price: 229.9, description: 'Modelo marrom de cano alto com biqueira protegida e solado de perfil aderente para ambientes exigentes.', features: ['Cano alto', 'Biqueira protegida', 'Solado de perfil aderente'] },
  { slug: 'bota-seguranca-cinza', name: 'Bota de segurança cinza', cat: 'calcados', label: 'Calçados', brand: 'Linha profissional', image: '/images/products/calcados/bota-cinza-real.png', price: 179.9, description: 'Bota cinza com construção leve, suporte de tornozelo e desenho versátil para diferentes frentes de trabalho.', features: ['Suporte de tornozelo', 'Construção leve', 'Palmilha confortável'] },
  { slug: 'capacete-de-protecao', name: 'Capacete de proteção laranja', cat: 'capacetes', label: 'Capacetes', brand: 'Linha CR', image: '/images/products/capacete-laranja-v2.png', price: 39.9, description: 'Capacete laranja com casco rígido e ajuste interno para proteção da cabeça em atividades profissionais.', features: ['Casco rígido', 'Ajuste interno', 'Cor de alta visibilidade'] },
  { slug: 'colete-refletivo', name: 'Colete refletivo amarelo', cat: 'vestimentas', label: 'Vestimentas', brand: 'Linha CR', image: '/images/products/vestimenta-referencia.png', price: 34.9, description: 'Colete leve de alta visibilidade com faixas refletivas para apoio à sinalização pessoal durante a jornada.', features: ['Faixas refletivas', 'Tecido leve', 'Fechamento frontal'] },
  { slug: 'protetor-auditivo-plug', name: 'Protetor auditivo com cordão', cat: 'auditiva', label: 'Proteção auditiva', brand: 'Protect Plug', image: '/images/products/protetor-auditivo-v2.png', price: 12.9, description: 'Par de plugs de silicone com cordão, formato anatômico e acabamento lavável para uso recorrente.', features: ['Silicone flexível', 'Cordão integrado', 'Formato anatômico'] },
  { slug: 'bota-pvc-branca', name: 'Bota de PVC branca', cat: 'calcados', label: 'Calçados', brand: 'Linha impermeável', image: '/images/products/bota-pvc-branca-v2.png', price: 79.9, description: 'Par de botas brancas em PVC com cano alto, acabamento impermeável e solado de desenho profundo.', features: ['PVC impermeável', 'Cano alto', 'Fácil higienização'] },
  { slug: 'vestimenta-camara-fria', name: 'Conjunto para câmara fria', cat: 'vestimentas', label: 'Vestimentas', brand: 'Linha térmica', image: '/images/products/vestimenta-camara-fria-v2.png', price: 549.9, description: 'Conjunto térmico completo com casaco longo, calça, capuz e luvas para operações em ambientes refrigerados.', features: ['Conjunto completo', 'Camada térmica', 'Cobertura ampla'] },
  { slug: 'avental-vinil', name: 'Avental de vinil cinza', cat: 'vestimentas', label: 'Vestimentas', brand: 'Linha impermeável', image: '/images/products/avental-vinil-v2.png', price: 29.9, description: 'Avental cinza de vinil com cordão superior, superfície lisa e cobertura frontal ampla.', features: ['Superfície impermeável', 'Cordão de ajuste', 'Limpeza simples'] },
  { slug: 'linha-limpeza-profissional', name: 'Vassoura profissional', cat: 'limpeza', label: 'Limpeza', brand: 'Linha CR', image: '/images/products/vassoura-profissional-v2.png', price: 44.9, description: 'Vassoura profissional com cabo de madeira e cerdas densas para limpeza de áreas internas e externas.', features: ['Cabo de madeira', 'Cerdas densas', 'Cabeça larga'] },
  { slug: 'extintor-incendio', name: 'Kit de extintores 4 kg e 6 kg', cat: 'incendio', label: 'Prevenção', brand: 'Linha de prevenção', image: '/images/products/extintores-v2.png', price: 389.9, description: 'Conjunto demonstrativo com dois extintores de capacidades distintas para composição de projetos preventivos.', features: ['Duas capacidades', 'Manômetros visíveis', 'Mangueiras flexíveis'] },
];

type CartItem = { slug: string; qty: number };
const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`;

function readCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = JSON.parse(localStorage.getItem('cr-cart') || localStorage.getItem('cr-list') || '[]');
    if (!Array.isArray(raw)) return [];
    if (raw.every((item) => typeof item === 'string')) return raw.map((slug) => ({ slug, qty: 1 }));
    return raw.filter((item) => item && typeof item.slug === 'string').map((item) => ({ slug: item.slug, qty: Math.max(1, Number(item.qty) || 1) }));
  } catch { return []; }
}

function writeCart(items: CartItem[]) {
  localStorage.setItem('cr-cart', JSON.stringify(items));
  localStorage.removeItem('cr-list');
  window.dispatchEvent(new Event('cr-cart-updated'));
}

function addToCart(slug: string) {
  const cart = readCart();
  const found = cart.find((item) => item.slug === slug);
  if (found) found.qty += 1;
  else cart.push({ slug, qty: 1 });
  writeCart(cart);
}

function useCartCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const refresh = () => setCount(readCart().reduce((sum, item) => sum + item.qty, 0));
    refresh();
    window.addEventListener('cr-cart-updated', refresh);
    return () => window.removeEventListener('cr-cart-updated', refresh);
  }, []);
  return count;
}

function Brand() {
  return <Link href="/" className="brand brand-premium" aria-label="CR Soluções em EPIs">
    <img className="brand-logo-original" src={assetPath('/images/cr-logo-original-clean.png')} alt="CR Soluções em EPIs" />
  </Link>;
}

export function Header() {
  const count = useCartCount();
  return <header className="header header-premium">
    <div className="wrap nav nav-premium">
      <Brand />
      <nav className="navlinks navlinks-premium" aria-label="Navegação principal">
        <Link href="/produtos">Produtos</Link>
        <Link href="/empresas">Para empresas</Link>
        <Link href="/sobre">Sobre a CR</Link>
      </nav>
      <div className="navright navright-premium"><a className="nav-phone" href="tel:+553541046700">(35) 4104-6700</a><Link className="nav-cart-premium" href="/carrinho">Carrinho <span>{count}</span></Link><button className="mobile-menu" onClick={() => document.getElementById('mobileNav')?.classList.toggle('show')}>Menu</button></div>
    </div>
    <div id="mobileNav" className="mobile-nav mobile-nav-premium"><Link href="/produtos">Produtos</Link><Link href="/empresas">Para empresas</Link><Link href="/sobre">A CR</Link><Link href="/carrinho">Carrinho</Link><Link href="/contato">Contato</Link></div>
  </header>;
}

export function Footer() {
  return <footer className="footer footer-premium"><div className="wrap">
    <div className="footer-callout"><div><span>ATENDIMENTO COMERCIAL · LAVRAS/MG</span><h2>Proteção certa começa com uma conversa direta.</h2></div><Link className="footer-callout-link" href="/contato">Solicitar atendimento</Link></div>
    <div className="footer-main"><div className="footer-identity"><Brand/><p>Equipamentos para profissionais, equipes e empresas. Atendimento em Lavras e envio para todo o Brasil.</p></div><div className="footer-column"><h4>Comprar</h4><Link href="/produtos">Catálogo completo</Link><Link href="/carrinho">Carrinho</Link><Link href="/empresas">Compras empresariais</Link></div><div className="footer-column"><h4>Atendimento</h4><a href="tel:+553541046700">(35) 4104-6700</a><Link href="/contato">Fale com a equipe</Link><span>Rua Chagas Dória, 812<br/>Centro · Lavras/MG</span></div><div className="footer-column"><h4>Institucional</h4><Link href="/sobre">Sobre a CR</Link><Link href="/privacidade">Privacidade</Link><Link href="/termos">Termos de uso</Link></div></div>
    <div className="footer-bottom"><span>© CR Soluções em EPIs · Lavras, MG</span><span>Valores e descrições deste protótipo são ilustrativos.</span></div>
  </div></footer>;
}

export function MobileBar() {
  return <div className="mobile-bar"><Link href="/">Início</Link><Link href="/produtos">Produtos</Link><Link href="/carrinho">Carrinho</Link><Link href="/contato">Contato</Link></div>;
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return <><Header />{children}<Footer /><MobileBar /></>;
}

export function CatalogCard({ p }: { p: Product }) {
  return <Link href={`/produtos/${p.slug}`} className="product-card">
    <div className="product-image"><span className="product-tag">{p.label}</span><img src={assetPath(p.image)} alt={p.name} loading="lazy" /></div>
    <div className="product-info"><div className="product-meta">{p.brand}</div><h3>{p.name}</h3><p className="product-description">{p.description}</p><div className="product-bottom"><strong>{money.format(p.price)}</strong><span>Ver produto</span></div></div>
  </Link>;
}

export function CatalogGrid({ items }: { items: Product[] }) {
  return <AnimatedGroup preset="fade" className="product-grid">{items.map((p) => <CatalogCard key={p.slug} p={p} />)}</AnimatedGroup>;
}

const heroItems = products.filter((p) => ['bota-gogowear-caramelo', 'capacete-de-protecao', 'bota-pvc-branca', 'vestimenta-camara-fria', 'avental-vinil', 'extintor-incendio'].includes(p.slug));

function HeroCarousel() {
  const [active, setActive] = useState(0);
  useEffect(() => { const id = window.setInterval(() => setActive((current) => (current + 1) % heroItems.length), 3600); return () => window.clearInterval(id); }, []);
  const previous = () => setActive((current) => (current - 1 + heroItems.length) % heroItems.length);
  const next = () => setActive((current) => (current + 1) % heroItems.length);
  return <div className="hero-carousel hero-stage" aria-roledescription="carrossel" aria-label="Seleção de produtos CR">
    <div className="hero-stage-label">SELEÇÃO PROFISSIONAL</div>
    {heroItems.map((item, index) => <div className={`hero-slide ${index === active ? 'active' : ''}`} key={item.slug} aria-hidden={index !== active}><img src={assetPath(item.image)} alt={item.name}/><div className="hero-slide-copy"><span>{item.label}</span><strong>{item.name}</strong><small>{money.format(item.price)}</small></div></div>)}
    <div className="hero-carousel-controls"><button type="button" onClick={previous}>Anterior</button><div className="hero-progress">{heroItems.map((item,index)=><button key={item.slug} aria-label={`Mostrar ${item.name}`} className={index===active?'active':''} onClick={()=>setActive(index)}/>)}</div><button type="button" onClick={next}>Próximo</button></div>
  </div>;
}

export function HomePage() {
  return <PageShell><main>
    <section className="hero hero-premium"><div className="wrap hero-grid"><InView as="div" once variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }} transition={{ duration: .75 }} className="hero-copy"><h1><VerticalCutReveal text="Proteção que acompanha o ritmo do seu trabalho." /></h1><div className="hero-actions"><Link className="pill hot" href="/produtos">Explorar produtos</Link><Link className="hero-secondary" href="/empresas">Solicitar orçamento</Link></div><div className="hero-assurance"><span>ENVIO NACIONAL</span><span>RETIRADA EM LAVRAS</span><span>ATENDIMENTO ESPECIALIZADO</span></div></InView><HeroCarousel/></div></section>
    <section className="section products-section"><div className="wrap"><div className="section-head"><div><div className="eyebrow orange">CURADORIA CR</div><h2>Equipamentos em destaque.</h2></div><Link href="/produtos" className="pill">Ver catálogo completo</Link></div><CatalogGrid items={products.slice(0, 4)}/></div></section>
    <section className="strip"><div className="wrap strip-grid"><div><div className="eyebrow">Para empresas · obras · equipes</div><h2>Compras em volume com atendimento direto.</h2></div><p>Envie a lista da sua equipe para receber orientação sobre modelos, tamanhos e condições comerciais.</p><Link href="/empresas" className="pill">Solicitar atendimento</Link></div></section>
    <section className="section"><div className="wrap story-grid"><div className="story-copy"><div className="eyebrow orange">POR QUE ESCOLHER A CR</div><h2>Atendimento próximo. Compra simples.</h2><p>A CR Soluções em EPIs atende profissionais e empresas em Lavras e em todo o Brasil, com orientação antes da compra e retirada disponível na loja.</p><Link className="textlink" href="/sobre">Conheça a CR</Link></div><div className="proof-list"><div className="proof"><i/><div><h3>Entrega nacional</h3><p>Receba seu pedido em qualquer estado do Brasil.</p></div></div><div className="proof"><i/><div><h3>Retirada em Lavras</h3><p>Escolha retirada gratuita na loja durante o checkout.</p></div></div><div className="proof"><i/><div><h3>Atendimento empresarial</h3><p>Condições para equipes e compras em quantidade.</p></div></div></div></div></section>
    <section className="section faq"><div className="wrap faq-grid"><div><div className="eyebrow orange">DÚVIDAS FREQUENTES</div><h2>Informação antes da compra.</h2><p className="section-intro">Confira as respostas mais comuns e fale com a equipe quando precisar.</p></div><Faq/></div></section>
  </main></PageShell>;
}

export function ProductsPage({ category }: { category?: string }) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState(category || 'todos');
  const shown = products.filter((p) => (cat === 'todos' || p.cat === cat) && `${p.name} ${p.brand} ${p.description}`.toLowerCase().includes(q.toLowerCase()));
  return <PageShell><main><section className="page-hero"><div className="wrap"><div className="eyebrow orange">CR / catálogo</div><h1>Equipamentos para o trabalho.</h1><p className="section-intro">Preços e descrições fictícios para demonstração do e-commerce. Confirme especificações e certificações antes da publicação.</p><div className="filter-row"><input className="search-input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Busque por produto, linha ou aplicação" aria-label="Buscar produtos"/><button className={`filter-chip ${cat === 'todos' ? 'active' : ''}`} onClick={() => setCat('todos')}>Todos</button>{cats.map(([, name, slug]) => <button key={slug} className={`filter-chip ${cat === slug ? 'active' : ''}`} onClick={() => setCat(slug)}>{name}</button>)}</div></div></section><section className="product-listing"><div className="wrap">{shown.length ? <CatalogGrid items={shown}/> : <div className="empty-state">Nenhum produto encontrado.</div>}</div></section></main></PageShell>;
}

export function DetailPage({ slug }: { slug: string }) {
  const p = products.find((item) => item.slug === slug);
  const [added, setAdded] = useState(false);
  if (!p) return <PageShell><main className="wrap page-hero"><h1>Produto não encontrado.</h1><Link className="pill" href="/produtos">Voltar ao catálogo</Link></main></PageShell>;
  const add = () => { addToCart(p.slug); setAdded(true); };
  return <PageShell><main><div className="wrap detail-grid"><div className="detail-image"><img src={assetPath(p.image)} alt={p.name}/></div><div className="detail-copy"><div className="eyebrow orange">{p.label} / CR</div><h1>{p.name}</h1><div className="product-meta">{p.brand}</div><div className="detail-price">{money.format(p.price)}</div><p>{p.description}</p><ul className="feature-list">{p.features.map((feature) => <li key={feature}>{feature}</li>)}</ul><div className="notice">Conteúdo e valor ilustrativos para este protótipo. Confirme CA, materiais, medidas, disponibilidade e preço final antes da publicação.</div><div className="detail-actions"><button className="pill hot" onClick={add}>{added ? 'Produto adicionado' : 'Adicionar ao carrinho'}</button><Link className="pill" href="/carrinho">Ver carrinho</Link></div><p><Link href="/produtos" className="textlink">Voltar ao catálogo</Link></p></div></div></main></PageShell>;
}

export function CategoryPage({ slug }: { slug: string }) {
  const cat = cats.find((item) => item[2] === slug);
  return <PageShell><main><section className="page-hero"><div className="wrap"><div className="eyebrow orange">CR / categoria</div><h1>{cat?.[1] || 'Categoria'}</h1><p className="section-intro">Explore os itens da linha e monte seu pedido.</p></div></section><section className="product-listing"><div className="wrap"><CatalogGrid items={products.filter((p) => p.cat === slug)}/></div></section></main></PageShell>;
}

export function ContactPage() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const url = `https://wa.me/553541046700?text=${encodeURIComponent(`Olá, sou ${name || 'cliente'} e gostaria de falar sobre: ${message || 'EPIs e disponibilidade'}`)}`;
  return <PageShell><main><section className="wrap contact-grid"><div><div className="eyebrow orange">Atendimento CR · Lavras/MG</div><h1>Converse com quem entende de proteção.</h1><p className="section-intro">Conte o que sua rotina exige e receba orientação da equipe.</p><p><a className="pill hot" href="tel:+553541046700">Ligar para (35) 4104-6700</a></p></div><div><div className="contact-box"><small>Visite a loja</small><p>Rua Chagas Dória, 812<br/>Centro · Lavras/MG</p><a className="textlink" target="_blank" rel="noreferrer" href="https://maps.google.com/?q=Rua+Chagas+Doria+812+Lavras+MG">Abrir no mapa</a></div><div className="contact-box"><small>Escreva para a equipe</small><label className="formlabel">Seu nome<input className="search-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome completo"/></label><label className="formlabel">Mensagem<textarea className="search-input textarea" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Produto, quantidade e detalhes"/></label><a href={url} className="pill hot" target="_blank" rel="noreferrer">Continuar no WhatsApp</a></div></div></section></main></PageShell>;
}

export function ContentPage({ type }: { type: 'about' | 'business' | 'privacy' | 'terms' }) {
  let title = '', eyebrow = '', text: React.ReactNode = null;
  if (type === 'about') { title = 'Uma loja local com alcance nacional.'; eyebrow = 'Sobre a CR'; text = <><p>A CR Soluções em EPIs está na Rua Chagas Dória, 812, Centro, Lavras/MG. A empresa atende profissionais, equipes, obras e operações com diferentes linhas de proteção.</p><p>Este protótipo apresenta uma experiência completa de catálogo e checkout. Os dados comerciais exibidos precisam de validação antes da publicação.</p></>; }
  else if (type === 'business') { title = 'Proteção para equipes e empresas.'; eyebrow = 'Atendimento empresarial'; text = <><p>Envie a lista de equipamentos, quantidades, tamanhos e prazo desejado. A equipe orienta a seleção e prepara a condição comercial.</p><p>Atendimento para Lavras e envios para todo o Brasil.</p><Link className="pill hot" href="/contato">Solicitar atendimento</Link></>; }
  else { title = type === 'privacy' ? 'Privacidade e dados pessoais' : 'Termos de uso'; eyebrow = 'Informações'; text = <><p>Este site é um protótipo. Os campos do checkout funcionam apenas no navegador e não enviam dados a uma operadora de pagamento ou banco.</p><p>Preços, taxas, descrições e confirmações de pedido são fictícios. Antes da publicação, a CR deve aprovar políticas comerciais, privacidade, frete, trocas e tratamento de dados.</p></>; }
  return <PageShell><main className="wrap contact-grid"><div><div className="eyebrow orange">{eyebrow}</div><h1>{title}</h1></div><div className="story-copy">{text}</div></main></PageShell>;
}

export function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  useEffect(() => setCart(readCart()), []);
  const rows = cart.map((item) => ({ ...item, product: products.find((p) => p.slug === item.slug) })).filter((item): item is CartItem & { product: Product } => Boolean(item.product));
  const subtotal = rows.reduce((sum, row) => sum + row.product.price * row.qty, 0);
  const update = (slug: string, qty: number) => { const next = qty < 1 ? cart.filter((item) => item.slug !== slug) : cart.map((item) => item.slug === slug ? { ...item, qty } : item); setCart(next); writeCart(next); };
  return <PageShell><main className="wrap cart-page"><div className="eyebrow orange">Seu carrinho</div><h1>Revise o pedido.</h1>{rows.length === 0 ? <div className="empty-state">Seu carrinho está vazio.<p><Link href="/produtos" className="pill hot">Explorar produtos</Link></p></div> : <div className="cart-layout"><div className="cart-items">{rows.map(({ product, qty }) => <article className="cart-row" key={product.slug}><img src={assetPath(product.image)} alt={product.name}/><div><div className="product-meta">{product.label}</div><h2>{product.name}</h2><p>{money.format(product.price)} por unidade</p><label className="quantity-field">Quantidade<input type="number" min="1" max="99" value={qty} onChange={(e) => update(product.slug, Number(e.target.value))}/></label><button className="remove-button" onClick={() => update(product.slug, 0)}>Remover</button></div><strong>{money.format(product.price * qty)}</strong></article>)}</div><aside className="order-summary"><span>Resumo</span><div><small>Subtotal</small><strong>{money.format(subtotal)}</strong></div><div><small>Entrega</small><strong>Calculada no checkout</strong></div><div className="summary-total"><small>Total parcial</small><strong>{money.format(subtotal)}</strong></div><Link href="/checkout" className="pill hot full">Continuar para o checkout</Link><Link href="/produtos" className="pill full">Continuar comprando</Link></aside></div>}</main></PageShell>;
}

export function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [delivery, setDelivery] = useState<'shipping' | 'pickup'>('shipping');
  const [payment, setPayment] = useState<'pix' | 'credit' | 'debit'>('pix');
  const [complete, setComplete] = useState(false);
  const rows = useMemo(() => cart.map((item) => ({ ...item, product: products.find((p) => p.slug === item.slug) })).filter((item): item is CartItem & { product: Product } => Boolean(item.product)), [cart]);
  const subtotal = rows.reduce((sum, row) => sum + row.product.price * row.qty, 0);
  const shipping = delivery === 'shipping' ? 24.9 : 0;
  const total = subtotal + shipping;
  useEffect(() => { setCart(readCart()); setReady(true); }, []);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setComplete(true); writeCart([]); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  if (!ready) return <PageShell><main className="wrap cart-page"><div className="eyebrow orange">Checkout</div><h1>Preparando seu pedido…</h1></main></PageShell>;
  if (!rows.length && !complete) return <PageShell><main className="wrap cart-page"><div className="eyebrow orange">Checkout</div><h1>Seu carrinho está vazio.</h1><Link className="pill hot" href="/produtos">Escolher produtos</Link></main></PageShell>;
  if (complete) return <PageShell><main className="wrap confirmation"><div className="eyebrow orange">Pedido demonstrativo CR-240821</div><h1>Pedido recebido.</h1><p>{payment === 'pix' ? 'Use o código fictício abaixo para visualizar a etapa Pix. Nenhuma cobrança foi criada.' : 'Pagamento fictício aprovado para demonstração. Nenhum dado foi transmitido.'}</p>{payment === 'pix' && <div className="pix-code">00020126 580014BR.GOV.BCB.PIX 0136 CR-SOLUCOES-DEMONSTRACAO 52040000 5303986</div>}<div className="notice">Protótipo: esta confirmação não representa uma compra real.</div><Link href="/produtos" className="pill hot">Voltar ao catálogo</Link></main></PageShell>;
  return <PageShell><main className="wrap checkout-page"><div className="checkout-heading"><div className="eyebrow orange">Checkout seguro · demonstração</div><h1>Finalize seu pedido.</h1><p>Todos os campos abaixo são demonstrativos e permanecem apenas neste navegador.</p></div><form className="checkout-layout" onSubmit={submit}><div className="checkout-form"><fieldset><legend>1. Dados de contato</legend><div className="form-grid"><label>Nome completo<input required name="name" autoComplete="name"/></label><label>CPF ou CNPJ<input required name="document" inputMode="numeric" placeholder="000.000.000-00"/></label><label>E-mail<input required type="email" name="email" autoComplete="email"/></label><label>Telefone<input required type="tel" name="phone" autoComplete="tel" placeholder="(00) 00000-0000"/></label></div></fieldset><fieldset><legend>2. Forma de entrega</legend><div className="choice-grid"><label className={`choice-card ${delivery === 'shipping' ? 'selected' : ''}`}><input type="radio" name="delivery" checked={delivery === 'shipping'} onChange={() => setDelivery('shipping')}/><strong>Entrega para todo o Brasil</strong><span>Taxa demonstrativa de {money.format(24.9)}</span></label><label className={`choice-card ${delivery === 'pickup' ? 'selected' : ''}`}><input type="radio" name="delivery" checked={delivery === 'pickup'} onChange={() => setDelivery('pickup')}/><strong>Retirada na loja</strong><span>Rua Chagas Dória, 812 · Lavras/MG</span></label></div>{delivery === 'shipping' && <div className="form-grid address-grid"><label>CEP<input required name="postalCode" inputMode="numeric" autoComplete="postal-code" placeholder="00000-000"/></label><label className="wide">Endereço<input required name="address" autoComplete="street-address"/></label><label>Número<input required name="number"/></label><label>Complemento<input name="complement"/></label><label>Bairro<input required name="district"/></label><label>Cidade<input required name="city" autoComplete="address-level2"/></label><label>Estado<select required name="state" autoComplete="address-level1" defaultValue=""><option value="" disabled>Selecione</option>{['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map((state) => <option key={state}>{state}</option>)}</select></label></div>}</fieldset><fieldset><legend>3. Pagamento</legend><div className="payment-tabs"><label className={payment === 'pix' ? 'selected' : ''}><input type="radio" name="payment" checked={payment === 'pix'} onChange={() => setPayment('pix')}/>Pix</label><label className={payment === 'credit' ? 'selected' : ''}><input type="radio" name="payment" checked={payment === 'credit'} onChange={() => setPayment('credit')}/>Cartão de crédito</label><label className={payment === 'debit' ? 'selected' : ''}><input type="radio" name="payment" checked={payment === 'debit'} onChange={() => setPayment('debit')}/>Cartão de débito</label></div>{payment === 'pix' ? <div className="payment-note"><strong>Pagamento por Pix</strong><p>O código demonstrativo será exibido após a confirmação do pedido.</p></div> : <div className="form-grid card-grid"><label className="wide">Nome impresso no cartão<input required name="cardHolder" autoComplete="cc-name"/></label><label className="wide">Número do cartão<input required name="cardNumber" inputMode="numeric" autoComplete="cc-number" placeholder="0000 0000 0000 0000"/></label><label>Validade<input required name="expiry" autoComplete="cc-exp" placeholder="MM/AA"/></label><label>Código de segurança<input required name="cvv" inputMode="numeric" autoComplete="cc-csc" placeholder="000"/></label>{payment === 'credit' && <label className="wide">Parcelamento<select name="installments" defaultValue="1"><option value="1">1 vez de {money.format(total)}</option><option value="2">2 vezes de {money.format(total / 2)}</option><option value="3">3 vezes de {money.format(total / 3)}</option></select></label>}</div>}</fieldset><label className="consent"><input required type="checkbox"/>Confirmo que este é um checkout demonstrativo e que os dados não serão processados.</label></div><aside className="order-summary checkout-summary"><span>Seu pedido</span>{rows.map(({ product, qty }) => <div className="mini-row" key={product.slug}><img src={assetPath(product.image)} alt=""/><p>{product.name}<small>{qty} unidade{qty > 1 ? 's' : ''}</small></p><strong>{money.format(product.price * qty)}</strong></div>)}<div><small>Subtotal</small><strong>{money.format(subtotal)}</strong></div><div><small>{delivery === 'shipping' ? 'Entrega nacional' : 'Retirada na loja'}</small><strong>{shipping ? money.format(shipping) : 'Grátis'}</strong></div><div className="summary-total"><small>Total</small><strong>{money.format(total)}</strong></div><button type="submit" className="pill hot full">Confirmar pedido demonstrativo</button><p className="summary-disclaimer">Nenhuma cobrança real será realizada.</p></aside></form></main></PageShell>;
}

export function AdminPage() {
  return <PageShell><main className="wrap page-hero"><div className="eyebrow orange">Área administrativa</div><h1>Painel de gestão em configuração.</h1><p className="section-intro">O painel exige banco de dados, autenticação e credenciais do responsável. Nenhum pedido real é armazenado nesta demonstração.</p><div className="notice">Conecte os serviços comerciais antes de publicar a operação.</div></main></PageShell>;
}
