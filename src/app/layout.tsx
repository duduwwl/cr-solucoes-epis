import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';
import { SITE, assetPath } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE.url}/`),
  title: {
    default: 'CR Soluções em EPIs | Equipamentos de proteção em Lavras/MG',
    template: '%s | CR Soluções em EPIs',
  },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: SITE.name,
    title: 'CR Soluções em EPIs | Proteção para o seu trabalho',
    description: SITE.description,
    url: './',
    images: [{ url: 'og.jpg', width: 1200, height: 630, alt: 'Capacete de proteção laranja sobre fundo grafite, com a marca CR Soluções em EPIs' }],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: assetPath('/favicon.png'), apple: assetPath('/apple-touch-icon.png') },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#171716',
  width: 'device-width',
  initialScale: 1,
};

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: SITE.name,
  description: SITE.description,
  url: `${SITE.url}/`,
  telephone: '+55-35-4104-6700',
  image: `${SITE.url}/og.jpg`,
  logo: `${SITE.url}/images/opt/cr-logo.webp`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.street,
    addressLocality: SITE.city,
    addressRegion: SITE.state,
    addressCountry: 'BR',
  },
  areaServed: [{ '@type': 'City', name: 'Lavras' }, { '@type': 'Country', name: 'Brasil' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <noscript>
          <style>{'[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important;filter:none!important}'}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
