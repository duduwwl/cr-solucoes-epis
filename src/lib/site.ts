import images from '@/data/images.json';

export const SITE = {
  name: 'CR Soluções em EPIs',
  shortName: 'CR Soluções',
  url: 'https://duduwwl.github.io/cr-solucoes-epis',
  phoneDisplay: '(35) 4104-6700',
  phoneHref: 'tel:+553541046700',
  whatsappNumber: '553541046700',
  street: 'Rua Chagas Dória, 812',
  district: 'Centro',
  city: 'Lavras',
  state: 'MG',
  mapsUrl: 'https://maps.google.com/?q=Rua+Chagas+D%C3%B3ria+812+Lavras+MG',
  description:
    'Calçados de segurança, capacetes, vestimentas e proteção auditiva em Lavras/MG. Orçamento pelo WhatsApp, retirada na loja e envio para todo o Brasil.',
} as const;

const base = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** Prefixes a public file with the GitHub Pages base path. */
export const assetPath = (path: string) => `${base}${path}`;

type ImageMeta = { w: number; h: number; sizes: number[]; alpha: boolean };
const meta = images as Record<string, ImageMeta>;

export type ImageName = keyof typeof images;

/** Width, height, src and srcSet for an optimized image in /images/opt. */
export function img(name: string) {
  const m = meta[name];
  if (!m) throw new Error(`Imagem desconhecida: ${name}`);
  const largest = m.sizes[m.sizes.length - 1];
  return {
    src: assetPath(`/images/opt/${name}-${largest}.webp`),
    srcSet: m.sizes.map((w) => `${assetPath(`/images/opt/${name}-${w}.webp`)} ${w}w`).join(', '),
    width: m.w,
    height: m.h,
    cutout: m.alpha,
  };
}

export const logo = {
  src: assetPath('/images/opt/cr-logo.webp'),
  width: meta['cr-logo'].w,
  height: meta['cr-logo'].h,
};

export function whatsappLink(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const productMessage = (name: string) =>
  `Olá! Gostaria de solicitar um orçamento para ${name}. Poderiam informar disponibilidade, tamanhos e valores?`;

export const businessMessage =
  'Olá! Gostaria de solicitar um orçamento de EPIs para minha empresa. Podem me orientar?';

export const generalMessage = 'Olá! Vim pelo site da CR Soluções em EPIs e gostaria de um orçamento.';

/** Per-page metadata with canonical URL and Open Graph, relative to the GitHub Pages base. */
export function pageMeta(path: string, title: string, description: string, image?: { url: string; alt: string }) {
  const url = path.replace(/^\//, '');
  return {
    title,
    description,
    alternates: { canonical: url || './' },
    openGraph: {
      title: `${title} | CR Soluções em EPIs`,
      description,
      url: url || './',
      type: 'website' as const,
      locale: 'pt_BR',
      siteName: 'CR Soluções em EPIs',
      images: [image ?? { url: 'og.jpg', width: 1200, height: 630, alt: 'CR Soluções em EPIs' }],
    },
  };
}
