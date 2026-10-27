import Link from 'next/link';
import { categories } from '@/data/catalog';
import { SITE, businessMessage, img, logo, whatsappLink } from '@/lib/site';

const MENU = [
  { href: '/produtos/', label: 'Catálogo' },
  { href: '/empresas/', label: 'Para empresas' },
  { href: '/sobre/', label: 'Sobre a CR' },
  { href: '/contato/', label: 'Contato' },
];

export function Footer() {
  const photo = img('botina-escura-real');
  return (
    <footer className="site-footer">
      <div className="footer-picture" aria-hidden>
        <img src={photo.src} srcSet={photo.srcSet} sizes="50vw" width={photo.width} height={photo.height} alt="" loading="lazy" />
      </div>
      <div className="footer-side">
        <Link href="/" className="footer-mark" aria-label="CR Soluções em EPIs, página inicial">
          <img src={logo.src} width={logo.width} height={logo.height} alt="" loading="lazy" />
          CR Soluções em EPIs
        </Link>
        <nav className="footer-menu" aria-label="Rodapé">
          {MENU.map((m) => (
            <Link key={m.href} href={m.href}>
              {m.label}
            </Link>
          ))}
        </nav>
        <div className="footer-blocks">
          <div>
            <h2 className="footer-heading">Loja</h2>
            <p>
              {SITE.street}, {SITE.district}
              <br />
              {SITE.city}/{SITE.state}
            </p>
            <p>
              <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
              <br />
              <a href={whatsappLink(businessMessage)} target="_blank" rel="noreferrer">
                WhatsApp comercial
              </a>
            </p>
          </div>
          <div>
            <h2 className="footer-heading">Linhas</h2>
            <ul>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/categorias/${c.slug}/`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-legal">
          <span>© {new Date().getFullYear()} CR Soluções em EPIs · Lavras/MG</span>
          <span>
            <Link href="/privacidade/">Privacidade</Link> · <Link href="/termos/">Termos de uso</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
