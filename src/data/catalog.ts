export type CategorySlug = 'calcados' | 'capacetes' | 'vestimentas' | 'auditiva' | 'limpeza' | 'incendio';

export type Category = {
  slug: CategorySlug;
  name: string;
  /** Short description used on the category list and the category page. */
  summary: string;
  /** Image that represents the category (cut-out when possible). */
  image: string;
};

export const categories: Category[] = [
  {
    slug: 'calcados',
    name: 'Calçados de segurança',
    summary: 'Botas e botinas de couro com biqueira e solado tratorado, e botas de PVC para áreas molhadas.',
    image: 'bota-pvc-branca-v2',
  },
  {
    slug: 'capacetes',
    name: 'Capacetes',
    summary: 'Casco rígido com ajuste interno para obras, manutenção e trabalho em campo.',
    image: 'capacete-laranja-v2',
  },
  {
    slug: 'vestimentas',
    name: 'Vestimentas',
    summary: 'Colete refletivo, avental de vinil e conjunto térmico para câmara fria.',
    image: 'vestimenta-camara-fria-v2',
  },
  {
    slug: 'auditiva',
    name: 'Proteção auditiva',
    summary: 'Protetor tipo plug de silicone, com cordão, para ambientes ruidosos.',
    image: 'protetor-auditivo-v2',
  },
  {
    slug: 'limpeza',
    name: 'Limpeza profissional',
    summary: 'Vassouras e utensílios para áreas internas e externas.',
    image: 'vassoura-profissional-v2',
  },
  {
    slug: 'incendio',
    name: 'Prevenção de incêndio',
    summary: 'Extintores para composição de projetos preventivos.',
    image: 'extintores-v2',
  },
];

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  /** Brand or product line, as the store names it. */
  brand: string;
  /** Main picture, then any further pictures of the same item or line. */
  images: string[];
  description: string;
  features: string[];
  /** Shown first on the home page and in the "Destaques" sort. */
  featured?: boolean;
  /** What the buyer should tell the store when asking for a quote. */
  sizeHint?: string;
};

export const products: Product[] = [
  {
    slug: 'bota-gogowear-caramelo',
    name: 'Bota de segurança caramelo',
    category: 'calcados',
    brand: 'Gogowear',
    images: ['bota-gogowear-real'],
    description: 'Bota de cano médio, acolchoada e com solado tratorado. Foto do produto na loja.',
    features: ['Cano médio acolchoado', 'Solado tratorado', 'Fechamento por cadarço'],
    featured: true,
    sizeHint: 'Numeração',
  },
  {
    slug: 'botina-seguranca-escura',
    name: 'Botina de segurança escura',
    category: 'calcados',
    brand: 'Linha profissional',
    images: ['botina-escura-real'],
    description: 'Botina profissional com estrutura reforçada para jornadas longas.',
    features: ['Estrutura reforçada', 'Ajuste firme', 'Uso profissional'],
    featured: true,
    sizeHint: 'Numeração',
  },
  {
    slug: 'bota-seguranca-marrom',
    name: 'Bota de segurança marrom',
    category: 'calcados',
    brand: 'Linha profissional',
    images: ['bota-marrom-real'],
    description: 'Modelo de cano alto com biqueira protegida e solado aderente.',
    features: ['Cano alto', 'Biqueira protegida', 'Solado aderente'],
    sizeHint: 'Numeração',
  },
  {
    slug: 'bota-seguranca-cinza',
    name: 'Bota de segurança cinza',
    category: 'calcados',
    brand: 'Linha profissional',
    images: ['bota-cinza-real'],
    description: 'Bota leve com suporte de tornozelo para diferentes frentes de trabalho.',
    features: ['Suporte de tornozelo', 'Construção leve', 'Palmilha confortável'],
    sizeHint: 'Numeração',
  },
  {
    slug: 'capacete-de-protecao',
    name: 'Capacete de proteção laranja',
    category: 'capacetes',
    brand: 'Linha CR',
    images: ['capacete-laranja-v2', 'capacetes-referencia'],
    description: 'Capacete com casco rígido e ajuste interno para atividades profissionais.',
    features: ['Casco rígido', 'Ajuste interno', 'Alta visibilidade'],
    featured: true,
  },
  {
    slug: 'colete-refletivo',
    name: 'Colete refletivo amarelo',
    category: 'vestimentas',
    brand: 'Linha CR',
    images: ['vestimenta-referencia'],
    description: 'Colete leve de alta visibilidade com faixas refletivas.',
    features: ['Faixas refletivas', 'Tecido leve', 'Fechamento frontal'],
    sizeHint: 'Tamanho',
  },
  {
    slug: 'protetor-auditivo-plug',
    name: 'Protetor auditivo com cordão',
    category: 'auditiva',
    brand: 'Protect Plug',
    images: ['protetor-auditivo-v2', 'auditiva-referencia'],
    description: 'Plugs de silicone com cordão e formato anatômico.',
    features: ['Silicone flexível', 'Cordão integrado', 'Formato anatômico'],
  },
  {
    slug: 'bota-pvc-branca',
    name: 'Bota de PVC branca',
    category: 'calcados',
    brand: 'Linha impermeável',
    images: ['bota-pvc-branca-v2', 'bota-pvc-referencia'],
    description: 'Botas de PVC impermeáveis, com cano alto e solado profundo.',
    features: ['PVC impermeável', 'Cano alto', 'Fácil higienização'],
    featured: true,
    sizeHint: 'Numeração',
  },
  {
    slug: 'vestimenta-camara-fria',
    name: 'Conjunto para câmara fria',
    category: 'vestimentas',
    brand: 'Linha térmica',
    images: ['vestimenta-camara-fria-v2', 'camara-fria-referencia'],
    description: 'Conjunto térmico completo para operações em ambientes refrigerados.',
    features: ['Conjunto completo', 'Camada térmica', 'Cobertura ampla'],
    sizeHint: 'Tamanho',
  },
  {
    slug: 'avental-vinil',
    name: 'Avental de vinil cinza',
    category: 'vestimentas',
    brand: 'Linha impermeável',
    images: ['avental-vinil-v2', 'avental-vinil-referencia'],
    description: 'Avental de vinil com cobertura frontal ampla e cordão superior.',
    features: ['Superfície impermeável', 'Cordão de ajuste', 'Limpeza simples'],
  },
  {
    slug: 'linha-limpeza-profissional',
    name: 'Vassoura profissional',
    category: 'limpeza',
    brand: 'Linha CR',
    images: ['vassoura-profissional-v2', 'limpeza-referencia'],
    description: 'Vassoura de cerdas densas para áreas internas e externas.',
    features: ['Cabo de madeira', 'Cerdas densas', 'Cabeça larga'],
  },
  {
    slug: 'extintor-incendio',
    name: 'Extintores de 4 kg e 6 kg',
    category: 'incendio',
    brand: 'Linha de prevenção',
    images: ['extintores-v2', 'incendio-referencia'],
    description: 'Extintores em duas capacidades para composição de projetos preventivos.',
    features: ['Duas capacidades', 'Manômetros visíveis', 'Mangueiras flexíveis'],
  },
];

export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const productsIn = (slug: string) => products.filter((p) => p.category === slug);
export const brands = Array.from(new Set(products.map((p) => p.brand))).sort((a, b) => a.localeCompare(b, 'pt-BR'));

export function relatedProducts(product: Product, limit = 4) {
  const same = products.filter((p) => p.category === product.category && p.slug !== product.slug);
  const others = products.filter((p) => p.category !== product.category);
  return [...same, ...others].slice(0, limit);
}
