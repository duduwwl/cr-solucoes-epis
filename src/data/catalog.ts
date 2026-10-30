export type CategorySlug =
  | 'calcados'
  | 'capacetes'
  | 'luvas'
  | 'vestimentas'
  | 'uniformes'
  | 'auditiva'
  | 'ocular'
  | 'altura'
  | 'limpeza'
  | 'incendio'
  | 'ferramentas'
  | 'respiratoria'
  | 'sinalizacao'
  | 'manutencao';

export type Category = {
  slug: CategorySlug;
  name: string;
  /** Short description used on the category list and the category page. */
  summary: string;
  /** Image that represents the category (transparent cut-out). */
  image: string;
};

export const categories: Category[] = [
  {
    slug: 'calcados',
    name: 'Calçados de segurança',
    summary: 'Botas e botinas Gogowear e Ecosafety, botina elástica, botas de PVC e sapatos antiderrapantes Sticky Shoes.',
    image: 't-gogowear-caramelo',
  },
  {
    slug: 'capacetes',
    name: 'Capacetes',
    summary: 'Capacetes com CA, suspensão ajustável e diversas cores, para obra, indústria, manutenção e área rural.',
    image: 't-capacete-laranja',
  },
  {
    slug: 'luvas',
    name: 'Luvas',
    summary: 'Luvas de látex, neoprene, nitrílica e multitato para limpeza, indústria, química e construção civil.',
    image: 't-luva-multitato',
  },
  {
    slug: 'vestimentas',
    name: 'Vestimentas',
    summary: 'Coletes refletivos, aventais, roupas para câmara fria, capas e conjuntos de chuva, apicultura e aplicação de herbicidas.',
    image: 't-camara-fria-branca',
  },
  {
    slug: 'uniformes',
    name: 'Uniformes profissionais',
    summary: 'Uniformes de brim cinza e azul royal e uniforme NR10 com faixas refletivas.',
    image: 't-uniforme-nr10',
  },
  {
    slug: 'auditiva',
    name: 'Proteção auditiva',
    summary: 'Protetor tipo plug de silicone com cordão e abafadores tipo concha, inclusive para acoplar ao capacete.',
    image: 't-protetor-auditivo-plug',
  },
  {
    slug: 'ocular',
    name: 'Proteção ocular',
    summary: 'Óculos de segurança para proteção dos olhos em atividades profissionais.',
    image: '/images/catalog/oculos-steelflex-preto-v1.webp',
  },
  {
    slug: 'altura',
    name: 'Trabalho em altura',
    summary: 'Cinto paraquedista de três pontos com talabarte duplo e absorvedor de energia.',
    image: 't-cinto-paraquedista',
  },
  {
    slug: 'limpeza',
    name: 'Limpeza e higiene',
    summary: 'Vassouras e utensílios de limpeza, sabão desengraxante, cremes protetores e protetor solar.',
    image: 't-vassoura',
  },
  {
    slug: 'incendio',
    name: 'Incêndio e emergência',
    summary: 'Extintores de 1, 4 e 6 kg, placas de sinalização e kit ambiental. Luminárias de emergência sob consulta.',
    image: 't-extintores',
  },
  {
    slug: 'ferramentas',
    name: 'Ferramentas e acessórios',
    summary: 'Caixas, ferramentas e acessórios para apoiar manutenção, obra e rotina profissional.',
    image: '/images/catalog/caixa-ferramentas-stanley-v1.webp',
  },
  {
    slug: 'respiratoria',
    name: 'Proteção respiratória',
    summary: 'Respiradores e máscaras para poeira, névoas e uso diário em obra, indústria e saúde.',
    image: '/images/catalog/kit-respirador-3m.webp',
  },
  {
    slug: 'sinalizacao',
    name: 'Sinalização e bloqueio',
    summary: 'Cones, bastões, giroflex, fita antiderrapante e cadeados para isolar áreas e bloquear energia.',
    image: '/images/catalog/cone-sinalizacao.webp',
  },
  {
    slug: 'manutencao',
    name: 'Colas, vedação e manutenção',
    summary: 'Colas, selantes, vedação, lubrificantes e tintas para a manutenção do dia a dia.',
    image: '/images/catalog/cola-contato-cascola.webp',
  },
];

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  /** Brand or product line, as the store names it. */
  brand: string;
  /** Pictures on a white background; the first is the main one. */
  images: string[];
  description: string;
  features: string[];
  /** Shown first on the home page and in the "Destaques" sort. */
  featured?: boolean;
  /** What the buyer should tell the store when asking for a quote. */
  sizeHint?: string;
  /** A price the store itself published, shown as a starting point only. */
};

/** Product photo cut out from the store's own pictures, on a white square. */
const photo = (slug: string) => `/images/catalog/${slug}.webp`;

const gogowearText = 'Linha Gogowear: alta durabilidade, conforto e segurança.';
const gogowearFeatures = ['Alta durabilidade e resistência', 'Conforto térmico e de caminhada', 'Excelente aderência'];

export const products: Product[] = [
  /* ───────── Calçados ───────── */
  {
    slug: 'bota-gogowear-caramelo',
    name: 'Bota Gogowear caramelo',
    category: 'calcados',
    brand: 'Gogowear',
    images: ['w-gogowear-caramelo'],
    description: 'Bota de cano médio em couro caramelo, acolchoada, com solado tratorado.',
    features: ['Cano médio acolchoado', 'Solado tratorado', 'Fechamento por cadarço'],
    featured: true,
    sizeHint: 'Numeração',
  },
  {
    slug: 'botina-seguranca-escura',
    name: 'Botina Gogowear preta',
    category: 'calcados',
    brand: 'Gogowear',
    images: ['w-gogowear-escura'],
    description: `Botina de couro preto com gola acolchoada e solado de borracha. ${gogowearText}`,
    features: ['Couro preto', 'Gola acolchoada', 'Solado de borracha'],
    sizeHint: 'Numeração',
  },
  {
    slug: 'bota-seguranca-marrom',
    name: 'Bota Gogowear marrom e preta',
    category: 'calcados',
    brand: 'Gogowear',
    images: ['w-gogowear-marrom'],
    description: `Bota de cano alto em couro marrom com proteção frontal preta e solado bicolor. ${gogowearText}`,
    features: ['Cano alto', 'Proteção frontal reforçada', 'Solado aderente'],
    sizeHint: 'Numeração',
  },
  {
    slug: 'bota-seguranca-cinza',
    name: 'Bota Gogowear cinza',
    category: 'calcados',
    brand: 'Gogowear',
    images: ['w-gogowear-cinza'],
    description: `Bota de cano alto em couro cinza com solado de borracha. ${gogowearText}`,
    features: ['Cano alto', 'Suporte de tornozelo', 'Solado de borracha'],
    sizeHint: 'Numeração',
  },
  {
    slug: 'bota-gogowear-trilha',
    name: 'Bota Gogowear marrom cano médio',
    category: 'calcados',
    brand: 'Gogowear',
    images: ['w-gogowear-trilha'],
    description: `Bota de cano médio em couro marrom com solado de borracha cinza. ${gogowearText}`,
    features: gogowearFeatures,
    sizeHint: 'Numeração',
  },
  {
    slug: 'botina-gogowear-tabaco',
    name: 'Botina Gogowear tabaco',
    category: 'calcados',
    brand: 'Gogowear',
    images: ['w-gogowear-tabaco'],
    description: `Botina em couro tabaco com gola acolchoada e solado preto. ${gogowearText}`,
    features: gogowearFeatures,
    sizeHint: 'Numeração',
  },
  {
    slug: 'botina-gogowear-cafe',
    name: 'Botina Gogowear café',
    category: 'calcados',
    brand: 'Gogowear',
    images: ['w-gogowear-cafe'],
    description: `Botina em couro liso cor café com solado preto. ${gogowearText}`,
    features: gogowearFeatures,
    sizeHint: 'Numeração',
  },
  {
    slug: 'bota-gogowear-grafite',
    name: 'Bota Gogowear grafite',
    category: 'calcados',
    brand: 'Gogowear',
    images: ['w-gogowear-grafite'],
    description: `Bota de couro grafite com gola acolchoada e solado tratorado. ${gogowearText}`,
    features: gogowearFeatures,
    sizeHint: 'Numeração',
  },
  {
    slug: 'botina-ecosafety',
    name: 'Botina Ecosafety',
    category: 'calcados',
    brand: 'Ecosafety',
    images: ['w-ecosafety-preta'],
    description: 'Botina robusta, com excelente acabamento, para o trabalho e o dia a dia. Disponível nas cores preta e marrom.',
    features: ['Cores preta e marrom', 'Gola acolchoada', 'Solado de borracha'],
    sizeHint: 'Numeração',
  },
  {
    slug: 'botina-elastica',
    name: 'Botina elástica de couro',
    category: 'calcados',
    brand: 'Linha CR',
    images: ['w-botina-elastica'],
    description: 'Botina de couro com elástico lateral, fácil de calçar, para jornadas pesadas. Pronta entrega.',
    features: ['Solado PU', 'Couro', 'Bico de proteção em PVC', 'Elástico lateral'],
    featured: true,
    sizeHint: 'Numeração',
  },
  {
    slug: 'bota-pvc-branca',
    name: 'Bota de PVC branca',
    category: 'calcados',
    brand: 'Linha impermeável',
    images: ['w-bota-pvc-branca', 'w-bota-pvc-branca-ig'],
    description: 'Bota de PVC impermeável, de cano alto, para água, lama, produtos de limpeza e pisos escorregadios.',
    features: ['100% impermeável', 'Solado antiderrapante', 'Fácil de higienizar', 'Indicada para indústria, limpeza, agronegócio e frigoríficos'],
    featured: true,
    sizeHint: 'Numeração',
  },
  {
    slug: 'bota-pvc-preta',
    name: 'Bota de PVC preta',
    category: 'calcados',
    brand: 'Linha impermeável',
    images: ['w-bota-pvc-preta'],
    description: 'Bota de PVC impermeável, de cano alto, leve e resistente, para longas jornadas em áreas molhadas.',
    features: ['Impermeável', 'Solado antiderrapante', 'Fácil de limpar'],
    sizeHint: 'Numeração',
  },
  {
    slug: 'sticky-shoes',
    name: 'Sapato antiderrapante Sticky Shoes',
    category: 'calcados',
    brand: 'Sticky Shoes',
    images: ['w-sticky-shoes-preto'],
    description: 'Sapato ocupacional com solado antiderrapante, para quem não pode escorregar na rotina: cozinhas, hospitais e áreas úmidas. Nas cores branca e preta.',
    features: ['Solado antiderrapante', 'Cores branca e preta', 'Fácil de limpar'],
    sizeHint: 'Numeração',
  },

  /* ───────── Capacetes ───────── */
  {
    slug: 'capacete-de-protecao',
    name: 'Capacete de proteção',
    category: 'capacetes',
    brand: 'Linha CR',
    images: ['w-capacete-laranja', 'w-capacetes-cores', 'w-capacete-verde'],
    description: 'Capacete com CA, casco rígido e suspensão ajustável, em diversas cores e modelos.',
    features: ['Proteção contra impactos', 'Suspensão ajustável', 'Diversas cores e modelos', 'Para construção civil, indústria, manutenção, logística e área rural'],
    featured: true,
  },

  /* ───────── Luvas ───────── */
  {
    slug: 'luva-multitato',
    name: 'Luva multitato poliuretano preta',
    category: 'luvas',
    brand: 'Linha CR',
    images: ['w-luva-multitato'],
    description: 'Luva com revestimento em poliuretano para quem precisa de proteção sem perder a sensibilidade nas mãos.',
    features: ['Excelente tato e precisão', 'Alta resistência', 'Tecido respirável', 'Ótima aderência'],
    featured: true,
    sizeHint: 'Tamanho',
  },
  {
    slug: 'luva-latex-mucambo',
    name: 'Luva de látex Mucambo profissional',
    category: 'luvas',
    brand: 'Mucambo',
    images: ['w-luva-latex-mucambo'],
    description: 'Luva de látex preta para argamassa, cimento, óleos, solventes, detergentes, limpeza e coleta de resíduos.',
    features: ['Preparação de argamassa e cimento', 'Manuseio de óleo e solventes', 'Limpeza e coleta de resíduos'],
    sizeHint: 'Tamanho',
  },
  {
    slug: 'luva-latex-amarela',
    name: 'Luva de látex verniz silver amarela',
    category: 'luvas',
    brand: 'Volk do Brasil',
    images: ['w-luva-latex-amarela'],
    description: 'Luva de látex para serviços de higiene, limpeza e postos de trabalho na indústria alimentícia.',
    features: ['Higiene e limpeza', 'Indústria alimentícia', 'Proteção impermeável'],
    sizeHint: 'Tamanho',
  },
  {
    slug: 'luva-latex-neoprene-bicolor',
    name: 'Luva de látex e neoprene bicolor',
    category: 'luvas',
    brand: 'Volk do Brasil',
    images: ['w-luva-latex-neoprene-bicolor'],
    description: 'Luva para trabalhos gerais médios e severos, com proteção contra agentes químicos.',
    features: ['Trabalhos médios e severos', 'Agentes químicos', 'Agroquímicos, pintura, limpeza e manutenção'],
    sizeHint: 'Tamanho',
  },
  {
    slug: 'luva-latex-neoprene-laranja',
    name: 'Luva de látex e neoprene laranja super reforçada',
    category: 'luvas',
    brand: 'Volk do Brasil',
    images: ['w-luva-latex-neoprene-laranja'],
    description: 'Luva super reforçada para indústrias químicas, automotivas, alimentícias e construção civil.',
    features: ['Super reforçada', 'Indústria química e automotiva', 'Agroquímicos, pintura, limpeza e manutenção'],
    sizeHint: 'Tamanho',
  },
  {
    slug: 'luva-nitrilica',
    name: 'Luva nitrílica',
    category: 'luvas',
    brand: 'Volk do Brasil',
    images: ['w-luva-nitrilica'],
    description: 'Luva nitrílica para manuseio de solventes, químicos, cáusticos, óleos, graxas, detergentes e combustíveis.',
    features: ['Solventes e químicos', 'Óleos, graxas e combustíveis', 'Indústria química, automotiva e alimentícia'],
    sizeHint: 'Tamanho',
  },

  /* ───────── Vestimentas ───────── */
  {
    slug: 'colete-refletivo',
    name: 'Colete refletivo',
    category: 'vestimentas',
    brand: 'Linha CR',
    images: ['w-colete-refletivo'],
    description: 'Colete de alta visibilidade com faixas refletivas, nas cores amarelo e laranja fluorescente.',
    features: ['Faixas refletivas de alta visibilidade', 'Leve e resistente', 'Bolso frontal', 'Amarelo ou laranja fluorescente'],
    featured: true,
    sizeHint: 'Tamanho',
  },
  {
    slug: 'vestimenta-camara-fria',
    name: 'Conjunto para câmara fria',
    category: 'vestimentas',
    brand: 'Linha térmica',
    images: ['w-camara-fria-branca', 'w-camara-fria-azul'],
    description: 'Vestimenta térmica para câmaras frias, frigoríficos, freezers e centros de distribuição.',
    features: ['Isolamento térmico', 'Impermeável e resistente à umidade', 'Bloqueia o vento', 'Branco ou azul-marinho'],
    sizeHint: 'Tamanho',
  },
  {
    slug: 'avental-vinil',
    name: 'Avental de vinil com cordão',
    category: 'vestimentas',
    brand: 'Linha impermeável',
    images: ['w-avental-vinil'],
    description: 'Avental de vinil com cobertura frontal ampla e cordão de ajuste.',
    features: ['Impermeável', 'Cordão de ajuste', 'Fácil de limpar'],
  },
  {
    slug: 'avental-vinil-fitilho',
    name: 'Avental de vinil com fitilho',
    category: 'vestimentas',
    brand: 'Linha impermeável',
    images: ['w-avental-vinil-fitilho'],
    description: 'Avental de vinil com fitilho em vinil, que não desfia e não absorve umidade. Para açougues, cozinhas, indústrias e laboratórios.',
    features: ['100% impermeável', 'Fitilho em vinil', 'Fácil de limpar'],
  },
  {
    slug: 'avental-pvc-branco',
    name: 'Avental de PVC branco',
    category: 'vestimentas',
    brand: 'Linha impermeável',
    images: ['w-avental-pvc-branco'],
    description: 'Avental de PVC branco para proteção e higiene em açougues, cozinhas, indústrias e laboratórios.',
    features: ['Impermeável', 'PVC resistente', 'Limpeza com pano úmido'],
  },
  {
    slug: 'avental-trevira',
    name: 'Avental de trevira super resistente',
    category: 'vestimentas',
    brand: 'Linha CR',
    images: ['w-avental-trevira'],
    description: 'Avental de trevira com revestimento em PVC, resistente a rasgos, furos e abrasão. Para soldagem, serralherias, oficinas e mecânicas.',
    features: ['Revestimento em PVC', 'Impermeável a líquidos e graxas', 'Alta durabilidade'],
  },
  {
    slug: 'avental-raspa',
    name: 'Avental de raspa',
    category: 'vestimentas',
    brand: 'Linha CR',
    images: ['w-avental-raspa'],
    description: 'Avental de couro raspa para soldagem, serralheria, metalurgia, funilaria e manutenção.',
    features: ['Couro de raspa', 'Resistente a abrasão e respingos', 'Tiras reforçadas'],
  },
  {
    slug: 'conjunto-chuva-transparente',
    name: 'Conjunto de chuva transparente',
    category: 'vestimentas',
    brand: 'Linha CR',
    images: ['w-conjunto-chuva-transparente'],
    description: 'Conjunto impermeável para motociclistas, entregadores e trabalhadores externos.',
    features: ['Impermeável', 'Capuz integrado', 'Punhos com elástico', 'Fácil de transportar'],
    sizeHint: 'Tamanho',
  },
  {
    slug: 'capa-chuva-standard',
    name: 'Capa de chuva Standard amarela',
    category: 'vestimentas',
    brand: 'Linha CR',
    images: ['w-capa-chuva-standard'],
    description: 'Capa de chuva longa com capuz fixo e mangas longas.',
    features: ['Capuz fixo', 'Mangas longas', 'Fechamento por botões de pressão', 'Costura em solda eletrônica'],
    sizeHint: 'Tamanho',
  },
  {
    slug: 'capa-chuva-morcego',
    name: 'Capa de chuva Morcego',
    category: 'vestimentas',
    brand: 'Linha CR',
    images: ['w-capa-chuva-morcego'],
    description: 'Capa de chuva modelo morcego, com capuz fixo e manga curta.',
    features: ['Capuz fixo', 'Manga curta', 'Botões de pressão', 'Costura em solda eletrônica'],
    sizeHint: 'Tamanho',
  },
  {
    slug: 'bata-calca-polietileno',
    name: 'Bata e calça em polietileno',
    category: 'vestimentas',
    brand: 'Linha CR',
    images: ['w-bata-calca-polietileno'],
    description: 'Conjunto leve contra chuva, umidade e vento, reutilizável e fácil de limpar.',
    features: ['Reutilizável', 'Leve e confortável', 'Elástico nas extremidades'],
    sizeHint: 'Tamanho',
  },
  {
    slug: 'vestimenta-apicultor',
    name: 'Vestimenta para apicultor',
    category: 'vestimentas',
    brand: 'Linha CR',
    images: ['w-vestimenta-apicultor'],
    description: 'Macacão para apicultura com tela de visão ampla, costuras duplas e zíper resistente.',
    features: ['Tecido que impede picadas', 'Tela de alta visibilidade', 'Bolsos funcionais'],
    sizeHint: 'Tamanho',
  },
  {
    slug: 'conjunto-herbicidas',
    name: 'Conjunto para aplicação de herbicidas',
    category: 'vestimentas',
    brand: 'Linha CR',
    images: ['w-conjunto-herbicidas'],
    description: 'Conjunto para aplicação de herbicidas, inseticidas e defensivos agrícolas, com capuz e visor.',
    features: ['Tecido hidrorrepelente', 'Capuz com visor', 'Avental impermeável frontal'],
    sizeHint: 'Tamanho',
  },

  /* ───────── Uniformes ───────── */
  {
    slug: 'uniforme-nr10',
    name: 'Uniforme NR10',
    category: 'uniformes',
    brand: 'Linha profissional',
    images: ['w-uniforme-nr10'],
    description: 'Uniforme para eletricistas e serviços com eletricidade, com faixas refletivas e tecido de alta resistência.',
    features: ['Proteção contra riscos elétricos', 'Faixas refletivas', 'Atende às exigências da NR10'],
    featured: true,
    sizeHint: 'Tamanho',
  },
  {
    slug: 'uniforme-brim-cinza',
    name: 'Uniforme de brim cinza',
    category: 'uniformes',
    brand: 'Linha profissional',
    images: ['w-uniforme-brim-cinza'],
    description: 'Uniforme de brim 100% algodão, leve e resistente, para indústria, construção civil, manutenção e serviços gerais.',
    features: ['Brim 100% algodão', 'Acabamento reforçado', 'Bolso frontal'],
    sizeHint: 'Tamanho',
  },
  {
    slug: 'uniforme-brim-azul',
    name: 'Uniforme de brim azul royal',
    category: 'uniformes',
    brand: 'Linha profissional',
    images: ['w-uniforme-brim-azul'],
    description: 'Uniforme de brim 100% algodão na cor azul royal, para indústria, construção civil, manutenção e serviços gerais.',
    features: ['Brim 100% algodão', 'Acabamento reforçado', 'Bolso frontal'],
    sizeHint: 'Tamanho',
  },

  /* ───────── Proteção auditiva ───────── */
  {
    slug: 'protetor-auditivo-plug',
    name: 'Protetor auditivo plug de silicone',
    category: 'auditiva',
    brand: 'Protect Plug',
    images: ['w-protetor-auditivo-plug'],
    description: 'Protetor tipo plug de silicone, com cordão e estojo, reutilizável.',
    features: ['Silicone macio e hipoalergênico', 'Cordão integrado', 'Reutilizável'],
  },
  {
    slug: 'protetor-auditivo-concha',
    name: 'Protetor auditivo tipo concha',
    category: 'auditiva',
    brand: 'Linha CR',
    images: ['w-protetor-auditivo-concha'],
    description: 'Abafador tipo concha com hastes ajustáveis e conchas acolchoadas, para ruídos intensos.',
    features: ['Alta atenuação', 'Conchas acolchoadas', 'Hastes ajustáveis'],
  },
  {
    slug: 'protetor-concha-capacete',
    name: 'Protetor auditivo concha para capacete',
    category: 'auditiva',
    brand: '3M',
    images: ['w-protetor-concha-capacete'],
    description: 'Protetor tipo concha para acoplar no capacete, para construção civil, indústria e mineração.',
    features: ['Acoplamento ao capacete', 'Alta atenuação', 'Conchas confortáveis para uso prolongado'],
  },

  /* ───────── Proteção ocular ───────── */
  {
    slug: 'oculos-steelflex-preto',
    name: 'Óculos de segurança SteelFlex preto',
    category: 'ocular',
    brand: 'SteelFlex',
    images: ['/images/catalog/oculos-steelflex-preto-v1.webp'],
    description: 'Óculos de segurança com lentes escuras e hastes laterais reforçadas.',
    features: ['Lentes escuras', 'Hastes reforçadas'],
  },

  /* ───────── Trabalho em altura ───────── */
  {
    slug: 'cinto-paraquedista',
    name: 'Cinto paraquedista com talabarte duplo',
    category: 'altura',
    brand: 'Lifecintos',
    images: ['w-cinto-paraquedista'],
    description: 'Cinto paraquedista de três pontos com talabarte duplo e absorvedor de energia, para trabalho em altura.',
    features: ['3 pontos de ancoragem', 'Talabarte duplo com absorvedor', 'Regulagem ajustável', 'Equipamento certificado'],
    featured: true,
  },

  /* ───────── Limpeza e higiene ───────── */
  {
    slug: 'linha-limpeza-profissional',
    name: 'Vassoura profissional',
    category: 'limpeza',
    brand: 'Linha CR',
    images: ['w-vassoura'],
    description: 'Vassoura de cerdas densas para áreas internas e externas. A loja também tem baldes, rodos e pás.',
    features: ['Cabo de madeira', 'Cerdas densas', 'Cabeça larga'],
  },
  {
    slug: 'sabao-desengraxante-creme',
    name: 'Sabão desengraxante e creme protetor',
    category: 'limpeza',
    brand: 'Pinheiro e Help Hand',
    images: ['w-sabao-desengraxante-creme'],
    description: 'Sabão desengraxante que remove graxa e óleo, e cremes protetores que criam uma barreira na pele das mãos.',
    features: ['Remove graxa e óleo', 'Creme protetor para as mãos', 'Para oficinas e trabalho pesado'],
  },
  {
    slug: 'protetor-solar-cremes',
    name: 'Protetor solar e cremes de proteção',
    category: 'limpeza',
    brand: 'Sunlau e Help Hand',
    images: ['w-protetor-solar-cremes'],
    description: 'Linha de proteção para quem trabalha exposto ao sol, a agentes químicos e a insetos.',
    features: ['Protetor solar FPS 30 e 60', 'Creme protetor', 'Repelente'],
  },

  /* ───────── Incêndio e emergência ───────── */
  {
    slug: 'extintor-incendio',
    name: 'Extintores de 1, 4 e 6 kg',
    category: 'incendio',
    brand: 'Linha de prevenção',
    images: ['w-extintores', 'w-extintores-ig'],
    description: 'Extintores de incêndio para empresas, comércios e residências, com suportes.',
    features: ['Capacidades de 1, 4 e 6 kg', 'Manômetro', 'Suporte para extintor'],
  },
  {
    slug: 'placas-sinalizacao',
    name: 'Placas de sinalização',
    category: 'incendio',
    brand: 'Linha de prevenção',
    images: ['w-placas-sinalizacao'],
    description: 'Placas de advertência, proibição, orientação, emergência e incêndio para indústrias, comércios e condomínios.',
    features: ['Advertência e proibição', 'Orientação e emergência', 'Incêndio', 'Cavaletes de piso molhado'],
  },
  {
    slug: 'kit-ambiental',
    name: 'Kit ambiental',
    category: 'incendio',
    brand: 'CR Soluções em EPIs',
    images: ['w-kit-ambiental'],
    description: 'Kit para contenção de vazamentos e emergências ambientais em indústrias, oficinas, transportadoras, postos e operações agrícolas.',
    features: ['Contenção de resíduos', 'Pronto para uso', 'Ajuda a manter a empresa dentro das normas'],
  },

  /* ───────── Ferramentas e acessórios ───────── */
  {
    slug: 'caixa-ferramentas-stanley',
    name: 'Caixa de ferramentas Stanley',
    category: 'ferramentas',
    brand: 'Stanley',
    images: ['/images/catalog/caixa-ferramentas-stanley-v1.webp'],
    description: 'Caixa de ferramentas rígida Stanley, com fechos metálicos e alça superior para transporte e organização.',
    features: ['Estrutura rígida', 'Fechos metálicos', 'Alça superior'],
  },

  /* ───────── Fotos enviadas pela loja em outubro/2026 ───────── */
  ...([
    // [slug, categoria, nome, marca, descrição, características]
    ['bota-pvc-sola-amarela', 'calcados', 'Bota de PVC com solado amarelo', 'Linha profissional', 'Bota de PVC cano longo com biqueira reforçada e solado amarelo de alta visibilidade, para áreas molhadas, obras e limpeza pesada.', ['Impermeável', 'Solado antiderrapante', 'Cano longo']],
    ['bota-pvc-cano-forrado', 'calcados', 'Bota de PVC com perneira de nylon', 'Linha profissional', 'Bota de PVC azul com perneira de nylon e cordão de ajuste no cano, que impede a entrada de água, lama e resíduos.', ['Perneira com cordão de ajuste', 'Impermeável', 'Solado antiderrapante']],
    ['bota-soft-works-preta', 'calcados', 'Bota Soft Works preta', 'Soft Works', 'Bota de borracha de cano médio, leve e confortável, para indústria alimentícia, limpeza e áreas úmidas.', ['Leve e flexível', 'Fácil de higienizar', 'Solado antiderrapante']],
    ['bota-soft-works-branca', 'calcados', 'Bota Soft Works branca', 'Soft Works', 'Bota branca de cano médio para indústria alimentícia, frigoríficos, cozinhas e serviços de saúde.', ['Cor branca para áreas limpas', 'Fácil de higienizar', 'Solado antiderrapante']],

    ['capacete-abafador-acoplado', 'capacetes', 'Capacete com abafador acoplado', 'Linha profissional', 'Capacete branco com protetor auditivo tipo concha acoplado, para atividades que exigem proteção da cabeça e da audição ao mesmo tempo.', ['Abafador acoplado', 'Conchas reguláveis', 'Proteção da cabeça e audição']],

    ['luva-impacto-super-safety', 'luvas', 'Luva de impacto Super Safety', 'Super Safety', 'Luva tricotada com proteções de TPR no dorso e banho na palma, para montagem, mineração, petróleo e manuseio pesado.', ['Proteção contra impactos no dorso', 'Palma emborrachada', 'Ótima pegada']],
    ['luva-impacto-amarela', 'luvas', 'Luva de impacto com dorso amarelo', 'Linha profissional', 'Luva tricotada com proteções amarelas no dorso e palma revestida, para manuseio de peças e ferramentas pesadas.', ['Dorso reforçado', 'Palma revestida', 'Boa destreza']],
    ['luva-nitrilica-preta-tricotada', 'luvas', 'Luva tricotada com nitrílico preta', 'Linha profissional', 'Luva de malha com banho nitrílico na palma, resistente a óleo e abrasão, para mecânica, montagem e manutenção.', ['Banho nitrílico', 'Resistente a óleo', 'Punho em malha']],
    ['luva-latex-verde-tricotada', 'luvas', 'Luva tricotada com látex verde', 'Linha profissional', 'Luva de algodão com banho de látex corrugado na palma, ideal para construção civil, carga e descarga.', ['Látex corrugado', 'Alta aderência', 'Boa ventilação no dorso']],
    ['luva-anticorte-volk', 'luvas', 'Luva anticorte Volk', 'Volk do Brasil', 'Luva tricotada anticorte com pontos de borracha, para manuseio de chapas, vidros e peças com bordas cortantes.', ['Proteção contra cortes', 'Pontos antiderrapantes', 'Ajuste firme']],
    ['luva-termica-latex-azul', 'luvas', 'Luva térmica com látex azul', 'Linha profissional', 'Luva com forro térmico e banho de látex azul, para câmaras frias, trabalho em clima frio e manuseio de peças úmidas.', ['Forro térmico', 'Látex de alta aderência', 'Punho alto visível']],
    ['luva-raspa-solda-volk', 'luvas', 'Luva de raspa para solda Weld Smart', 'Volk do Brasil', 'Luva de raspa de couro com cano longo e reforço na palma, para soldagem e trabalhos com fagulhas e calor.', ['Couro de raspa', 'Cano longo', 'Reforço na palma']],
    ['luva-nitrilica-superglove', 'luvas', 'Luva nitrílica Superglove Mechanics', 'Supermax', 'Caixa de luvas nitrílicas de alta resistência com textura diamante, para mecânica, oficinas e manutenção.', ['Textura para pegada', 'Resistente a óleos', 'Caixa com 50 unidades']],
    ['luva-procedimento-supermax', 'luvas', 'Luva de procedimento Supermax', 'Supermax', 'Luva descartável para procedimentos, limpeza, cozinha e serviços de saúde.', ['Descartável', 'Ambidestra', 'Caixa com 100 unidades']],
    ['luva-vinil-volk', 'luvas', 'Luva de vinil sem amido', 'Volk do Brasil', 'Luva descartável de vinil sem amido, para manipulação de alimentos, limpeza e procedimentos rápidos.', ['Sem amido', 'Descartável', 'Caixa com 100 unidades']],

    ['oculos-sobrepor-incolor', 'ocular', 'Óculos de sobrepor incolor', 'Linha profissional', 'Óculos de segurança que podem ser usados por cima de óculos de grau, com proteção frontal e lateral.', ['Usa sobre óculos de grau', 'Proteção lateral', 'Lente incolor']],
    ['oculos-lente-verde', 'ocular', 'Óculos de segurança lente verde', 'Linha profissional', 'Óculos com lente verde para atividades com luminosidade intensa, como corte e solda leve.', ['Lente verde', 'Hastes ajustáveis', 'Leve e confortável']],
    ['oculos-incolor-armacao-preta', 'ocular', 'Óculos de segurança incolor com armação preta', 'Linha profissional', 'Óculos incolor com armação preta e proteção lateral para obra, indústria e manutenção.', ['Lente incolor', 'Proteção lateral', 'Armação resistente']],
    ['oculos-steelflex-espelhado', 'ocular', 'Óculos SteelFlex espelhado', 'SteelFlex', 'Óculos esportivo com lente espelhada, para trabalho ao ar livre com sol forte.', ['Lente espelhada', 'Design esportivo', 'Proteção contra raios UV']],
    ['oculos-steelflex-fume-verde', 'ocular', 'Óculos SteelFlex fumê com detalhe verde', 'SteelFlex', 'Óculos com lente fumê e hastes com detalhe verde, para trabalho externo e alta luminosidade.', ['Lente fumê', 'Hastes confortáveis', 'Proteção contra raios UV']],
    ['oculos-steelflex-branco-azul', 'ocular', 'Óculos SteelFlex branco e azul', 'SteelFlex', 'Óculos de armação branca com lente azulada, leve e confortável para longas jornadas ao ar livre.', ['Armação leve', 'Lente azulada', 'Proteção contra raios UV']],
    ['oculos-steelflex-fume-espuma', 'ocular', 'Óculos SteelFlex fumê com espuma', 'SteelFlex', 'Óculos fumê com vedação de espuma ao redor dos olhos, que reduz a entrada de poeira e vento.', ['Vedação de espuma', 'Lente fumê', 'Ajuste confortável']],
    ['oculos-steelflex-fume', 'ocular', 'Óculos SteelFlex fumê armação cinza', 'SteelFlex', 'Óculos fumê com armação cinza, design moderno e proteção para trabalho em áreas abertas.', ['Lente fumê', 'Armação cinza', 'Proteção contra raios UV']],
    ['oculos-vedacao-espuma', 'ocular', 'Óculos com vedação de espuma azul', 'Linha profissional', 'Óculos incolor com vedação de espuma removível, para ambientes com poeira e partículas em suspensão.', ['Espuma de vedação', 'Lente incolor', 'Hastes com detalhe azul']],
    ['oculos-preto-incolor', 'ocular', 'Óculos incolor armação preta esportiva', 'Linha profissional', 'Óculos com lente incolor e armação preta de linhas esportivas, para uso diário em obra e indústria.', ['Lente incolor', 'Armação esportiva', 'Leve e resistente']],
    ['oculos-ampla-visao-kalipso', 'ocular', 'Óculos ampla visão Kalipso', 'Kalipso', 'Óculos de ampla visão com elástico ajustável, para respingos de produtos químicos, poeira e partículas.', ['Vedação ao redor dos olhos', 'Elástico ajustável', 'Pode ser usado com óculos de grau']],
    ['oculos-macariqueiro-kalipso', 'ocular', 'Óculos de maçariqueiro Kalipso', 'Kalipso', 'Óculos com lentes escuras para oxicorte, maçarico e solda leve, com elástico ajustável.', ['Lentes escuras', 'Elástico ajustável', 'Uso em oxicorte']],

    ['abafador-concha-cinza', 'auditiva', 'Abafador tipo concha cinza', 'Linha profissional', 'Protetor auditivo tipo concha com arco ajustável e almofadas macias, para uso contínuo em ambientes ruidosos.', ['Arco ajustável', 'Almofadas macias', 'Uso contínuo']],

    ['kit-respirador-3m', 'respiratoria', 'Kit respirador 3M para serviços gerais', '3M', 'Kit com respirador semifacial e filtros para serviços gerais como pintura, limpeza e manutenção.', ['Respirador semifacial', 'Filtros inclusos', 'Uso em pintura e limpeza']],
    ['mascara-tripla-prevemax', 'respiratoria', 'Máscara tripla camada Prevemax', 'Prevemax', 'Máscara descartável de tripla camada com elástico, para uso diário, saúde e manipulação de alimentos.', ['Tripla camada', 'Descartável', 'Caixa com 50 unidades']],

    ['colete-salva-vidas-ativa', 'vestimentas', 'Colete salva-vidas Ativa', 'Ativa', 'Colete salva-vidas laranja com fitas de ajuste, para trabalho próximo à água, barcos e travessias.', ['Alta visibilidade', 'Fitas de ajuste', 'Flutuação garantida']],

    ['mosquetao-aco', 'altura', 'Mosquetão de aço com trava', 'Linha profissional', 'Mosquetão de aço com trava de rosca, para ancoragem e conexão de equipamentos de trabalho em altura.', ['Trava de rosca', 'Aço resistente', 'Uso em altura']],

    ['creme-protetor-nutriex', 'limpeza', 'Creme protetor para as mãos Nutriex', 'Nutriex', 'Creme de proteção grupo 3 para as mãos, que forma barreira contra água, óleo e pintura. Visível sob luz negra.', ['Grupo 3', 'Água, óleo e pintura', 'Frasco de 200 g']],
    ['protetor-solar-nutriex-fps60', 'limpeza', 'Protetor solar Nutriex FPS 60', 'Nutriex', 'Protetor solar FPS 60 com repelente, para quem trabalha exposto ao sol.', ['FPS 60', 'Com repelente', 'Frasco de 120 ml']],
    ['protetor-solar-nutriex-fps30-1l', 'limpeza', 'Protetor solar Nutriex FPS 30 1 litro', 'Nutriex', 'Protetor solar FPS 30 com repelente em embalagem de 1 litro com válvula, ideal para equipes no campo.', ['FPS 30', 'Com repelente', 'Embalagem de 1 litro']],

    ['cone-sinalizacao', 'sinalizacao', 'Cone de sinalização', 'Linha profissional', 'Cone laranja com faixas refletivas brancas para isolar áreas, obras e vagas.', ['Faixas refletivas', 'Base estável', 'Alta visibilidade']],
    ['bastao-sinalizador', 'sinalizacao', 'Bastão sinalizador PL 6010', 'Linha profissional', 'Bastão luminoso para orientar o trânsito e sinalizar manobras de veículos e máquinas.', ['Luz de alta visibilidade', 'Leve', 'Uso em pátios e vias']],
    ['giroflex-led-vonder', 'sinalizacao', 'Giroflex LED âmbar Vonder', 'Vonder', 'Sinalizador rotativo de LED na cor âmbar, para veículos, máquinas e áreas de manobra.', ['LED de alto brilho', 'Cor âmbar', 'Baixo consumo']],
    ['fita-antiderrapante-vonder', 'sinalizacao', 'Fita antiderrapante Vonder', 'Vonder', 'Fita adesiva antiderrapante para escadas, rampas e pisos escorregadios.', ['Superfície abrasiva', 'Fácil aplicação', '50 mm de largura']],
    ['cadeado-bloqueio-jgb', 'sinalizacao', 'Cadeado de bloqueio JGB', 'JGB', 'Cadeado de segurança com corpo isolante para bloqueio e etiquetagem de energia em manutenções (NR10/NR12).', ['Corpo isolante', 'Haste longa', 'Bloqueio de energia']],

    ['marcador-industrial', 'manutencao', 'Marcador industrial', 'Linha profissional', 'Marcador de tinta para metal, madeira, concreto e superfícies ásperas.', ['Alta cobertura', 'Diversas superfícies', 'Cores vivas']],
    ['fita-veda-rosca-tekbond', 'manutencao', 'Fita veda rosca Tekbond', 'Tekbond', 'Fita veda rosca para conexões hidráulicas, evitando vazamentos em roscas.', ['Vedação de roscas', 'Fácil aplicação', 'Diversas medidas']],
    ['durepoxi-loctite', 'manutencao', 'Durepoxi Loctite', 'Loctite', 'Massa epóxi para colar, vedar e reconstruir peças de metal, madeira, cerâmica e outros materiais.', ['Alta resistência', 'Moldável', 'Embalagem de 50 g']],
    ['cola-instantanea-tekbond-793', 'manutencao', 'Cola instantânea Tekbond 793', 'Tekbond', 'Cola instantânea de secagem rápida para reparos em diversos materiais.', ['Secagem rápida', 'Uso geral', 'Frasco de 20 g']],
    ['super-lub-loctite', 'manutencao', 'Super Lub Loctite multiuso', 'Loctite', 'Lubrificante e desengripante multiuso em spray, para soltar peças, lubrificar e proteger contra umidade.', ['Desengripa', 'Lubrifica', 'Protege contra umidade']],
    ['silicone-acetico-kala', 'manutencao', 'Silicone acético Kala', 'Kala', 'Silicone acético para vedação de vidros, box, pias e esquadrias.', ['Alta aderência', 'Resistente à água', 'Tubo de 280 g']],
    ['espuma-expansiva-dryko', 'manutencao', 'Espuma expansiva PU Dryko', 'Dryko', 'Espuma de poliuretano que cola, fixa, isola e preenche vãos em portas, janelas e tubulações.', ['Rendimento expansivo', 'Isolamento térmico e acústico', 'Lata de 500 ml']],
    ['tinta-spray-alta-temperatura-vonder', 'manutencao', 'Tinta spray alta temperatura Vonder', 'Vonder', 'Tinta spray para superfícies quentes como escapamentos, motores, churrasqueiras e fornos.', ['Resiste a altas temperaturas', 'Secagem rápida', 'Lata de 350 ml']],
    ['tinta-spray-kala-cor', 'manutencao', 'Tinta spray Kala Cor', 'Kala', 'Tinta spray de uso geral para interno e externo, com secagem rápida e várias cores.', ['Secagem rápida', 'Uso interno e externo', 'Lata de 350 ml']],
    ['cola-contato-cascola', 'manutencao', 'Adesivo de contato Cascola', 'Cascola', 'Adesivo de contato tradicional para fórmica, couro, borracha, madeira e laminados.', ['Alta aderência', 'Uso profissional', 'Lata de 195 g']],
    ['pasta-solda-vonder', 'manutencao', 'Pasta para soldar Vonder', 'Vonder', 'Pasta fluxo para soldagem de componentes eletrônicos e fios com estanho.', ['Facilita a soldagem', 'Uso em eletrônica', 'Pote de 110 g']],
    ['aplicador-silicone', 'manutencao', 'Aplicador de silicone', 'Linha profissional', 'Pistola aplicadora para tubos de silicone, selantes e adesivos em cartucho.', ['Gatilho com alavanca', 'Estrutura metálica', 'Uso com cartuchos']],

    ['lanterna-vonder-recarregavel', 'ferramentas', 'Lanterna recarregável Vonder', 'Vonder', 'Lanterna recarregável de LED com corpo emborrachado, para manutenção, vigilância e emergências.', ['LED de alto brilho', 'Recarregável', 'Corpo emborrachado']],
    ['lanterna-vonder-lrv-300l', 'ferramentas', 'Lanterna Vonder LRV 300L', 'Vonder', 'Lanterna recarregável de LED com cordão para pulso, para uso profissional e doméstico.', ['Recarregável', 'LED de alto brilho', 'Cordão de pulso']],
    ['lanterna-vonder-lrv-400', 'ferramentas', 'Lanterna Vonder LRV 400', 'Vonder', 'Lanterna recarregável de LED compacta e potente, para manutenção e uso no campo.', ['Recarregável', 'Compacta', 'LED de alto brilho']],
    ['lanterna-cabeca-nove54', 'ferramentas', 'Lanterna de cabeça recarregável Nove54', 'Nove54', 'Lanterna de cabeça de LED recarregável que deixa as mãos livres para trabalhar.', ['Mãos livres', 'Recarregável', 'Elástico ajustável']],
    ['radio-baofeng-bf777s', 'ferramentas', 'Rádio comunicador Baofeng BF-777S', 'Baofeng', 'Par de rádios comunicadores com bases carregadoras, para equipes de obra, segurança e eventos.', ['Par de rádios', 'Bases carregadoras', 'Comunicação entre equipes']],
    ['alicate-universal-vonder', 'ferramentas', 'Alicate universal isolado Vonder', 'Vonder', 'Alicate universal com cabo isolado, para cortar, dobrar e segurar fios e peças.', ['Cabo isolado', 'Corte e pressão', 'Aço resistente']],
    ['ferro-solda-vonder', 'ferramentas', 'Ferro de solda Vonder 30 W', 'Vonder', 'Ferro de solda de 30 W para eletrônica, fios e pequenos reparos.', ['30 W', 'Ponta fina', 'Uso em eletrônica']],
    ['jogo-chave-allen-vonder', 'ferramentas', 'Jogo de chaves allen Vonder', 'Vonder', 'Jogo com 9 chaves allen de aço cromo vanádio com ponta abaulada.', ['9 peças', 'Aço cromo vanádio', 'Ponta abaulada']],
    ['chave-ajustavel-vonder', 'ferramentas', 'Chave ajustável Vonder', 'Vonder', 'Chave ajustável (inglesa) de aço forjado com regulagem precisa de abertura.', ['Aço forjado', 'Abertura regulável', 'Uso profissional']],
    ['chave-ajustavel-belzer', 'ferramentas', 'Chave ajustável Belzer 6"', 'Belzer', 'Chave ajustável de 6 polegadas com acabamento fosfatizado e regulagem suave.', ['6 polegadas', 'Regulagem suave', 'Acabamento resistente']],
    ['chave-ajustavel-nove54', 'ferramentas', 'Chave ajustável Nove54 6"', 'Nove54', 'Chave ajustável de 6 polegadas com acabamento cromado para manutenção em geral.', ['6 polegadas', 'Acabamento cromado', 'Uso geral']],
    ['multimetro-digital-worker', 'ferramentas', 'Multímetro digital Worker', 'Worker', 'Multímetro digital com pontas de prova para medir tensão, corrente e resistência.', ['Visor digital', 'Pontas de prova', 'Medições elétricas básicas']],
    ['esmerilhadeira-dewalt', 'ferramentas', 'Esmerilhadeira angular DeWalt DWE4020', 'DeWalt', 'Esmerilhadeira angular de 4 1/2" para corte e desbaste de metais.', ['Disco de 4 1/2"', 'Corte e desbaste', 'Uso profissional']],
    ['balanca-digital-vonder', 'ferramentas', 'Balança digital de precisão Vonder 10 kg', 'Vonder', 'Balança digital compacta para pesagem de pequenos objetos até 10 kg.', ['Até 10 kg', 'Visor digital', 'Desligamento automático']],
    ['trena-stanley-5m', 'ferramentas', 'Trena Stanley 5 m', 'Stanley', 'Trena de 5 metros com trava e clipe para cinto.', ['5 metros', 'Trava da fita', 'Clipe para cinto']],
    ['trena-worker-8m', 'ferramentas', 'Trena Worker 8 m', 'Worker', 'Trena emborrachada de 8 metros com trava e cordão.', ['8 metros', 'Corpo emborrachado', 'Trava da fita']],
    ['trena-collins-5m', 'ferramentas', 'Trena ABS Collins 5 m', 'Collins', 'Trena de 5 metros com corpo em ABS e fita de 19 mm.', ['5 metros', 'Fita de 19 mm', 'Corpo em ABS']],
    ['jogo-trenas-vonder', 'ferramentas', 'Jogo de trenas Vonder', 'Vonder', 'Jogo com duas trenas Vonder para obra e manutenção.', ['2 trenas', 'Trava da fita', 'Clipe para cinto']],
    ['trena-fibra-50m-nove54', 'ferramentas', 'Trena de fibra 50 m Nove54', 'Nove54', 'Trena longa de fibra de vidro com 50 metros, para medição de terrenos e obras.', ['50 metros', 'Fita de fibra', 'Manivela de recolhimento']],
    ['estilete-worker', 'ferramentas', 'Estilete Worker 18 mm', 'Worker', 'Estilete profissional de 18 mm com corpo emborrachado e trava da lâmina.', ['Lâmina de 18 mm', 'Trava de segurança', 'Corpo emborrachado']],
    ['estilete-nove54', 'ferramentas', 'Estilete Nove54 9 mm', 'Nove54', 'Estilete compacto de 9 mm para cortes precisos em papel, plástico e fitas.', ['Lâmina de 9 mm', 'Compacto', 'Trava da lâmina']],
    ['estilete-seguranca-starrett', 'ferramentas', 'Estilete de segurança Starrett', 'Starrett', 'Estilete com retração automática da lâmina, que reduz o risco de cortes acidentais.', ['Retração automática', 'Corpo metálico', 'Uso profissional']],
    ['estilete-seguranca-vonder', 'ferramentas', 'Estilete de segurança Vonder', 'Vonder', 'Cortador de segurança com lâmina protegida, para abrir caixas, filmes e fitas sem expor a lâmina.', ['Lâmina protegida', 'Abre caixas e filmes', 'Ergonômico']],
    ['canivete-inox-kala', 'ferramentas', 'Canivete inox Kala', 'Kala', 'Canivete com lâmina de aço inox e cabo com acabamento em madeira.', ['Lâmina inox', 'Cabo em madeira', 'Dobrável']],
    ['bainha-couro-canivete', 'ferramentas', 'Bainha de couro para canivete', 'Linha profissional', 'Bainha de couro trabalhado com botão de fechamento e passador para cinto.', ['Couro legítimo', 'Botão de pressão', 'Passador para cinto']],
    ['facao-bainha-couro', 'ferramentas', 'Bainha de couro para facão', 'Linha profissional', 'Bainha de couro trabalhado com costura reforçada para facões de até 14 polegadas. O facão também está disponível na loja.', ['Couro legítimo', 'Costura reforçada', 'Passador para cinto']],
    ['pedra-afiar-carborundum', 'ferramentas', 'Pedra de afiar Carborundum', 'Carborundum', 'Pedra combinada de dupla granulação para afiar facas, facões e ferramentas de corte.', ['Dupla granulação', 'Afiação e acabamento', 'Uso doméstico e profissional']],
    ['tesouras-multiuso', 'ferramentas', 'Tesoura multiuso', 'Vonder / Worker', 'Tesouras multiuso de aço inox com cabo emborrachado, para cortes de papel, plástico, tecido e fitas.', ['Lâminas de aço inox', 'Cabo emborrachado', 'Uso geral']],
    ['tesoura-poda-robust', 'ferramentas', 'Tesoura de poda Robust', 'Robust', 'Tesoura de poda com lâminas de aço e cabo laranja, para jardinagem e pomares.', ['Lâminas de aço', 'Mola de retorno', 'Trava de segurança']],
    ['tesoura-poda-cerca-viva', 'ferramentas', 'Tesoura para cerca viva', 'Linha profissional', 'Tesoura de lâmina longa com cabos de madeira, para aparar cercas vivas e arbustos.', ['Lâminas longas', 'Cabos de madeira', 'Corte uniforme']],
    ['kit-jardinagem-vonder', 'ferramentas', 'Kit de jardinagem Vonder', 'Vonder', 'Kit de ferramentas manuais para jardinagem com cabos de madeira.', ['Cabos de madeira', 'Peças para plantio', 'Uso em jardins e vasos']],
    ['serrote-vonder', 'ferramentas', 'Serrote Vonder', 'Vonder', 'Serrote com cabo ergonômico bimaterial, para cortes em madeira.', ['Dentes temperados', 'Cabo ergonômico', 'Corte em madeira']],
    ['lamina-rocadeira-3-pontas-vonder', 'ferramentas', 'Lâmina 3 pontas para roçadeira Vonder', 'Vonder', 'Lâmina de 3 pontas com 255 mm para roçadeiras, para mato alto e vegetação densa.', ['3 pontas', '255 mm', 'Aço temperado']],
    ['lamina-rocadeira-vonder', 'ferramentas', 'Lâmina 2 pontas para roçadeira Vonder', 'Vonder', 'Lâmina de 2 pontas para roçadeiras, para capina e limpeza de terrenos.', ['2 pontas', 'Aço temperado', 'Uso em roçadeiras']],
    ['broca-sds-worker', 'ferramentas', 'Broca SDS Plus Worker', 'Worker', 'Broca SDS Plus para concreto e alvenaria em marteletes.', ['Encaixe SDS Plus', 'Concreto e alvenaria', 'Ponta de metal duro']],
    ['mangueira-suporte-vonder', 'ferramentas', 'Mangueira com suporte Vonder', 'Vonder', 'Mangueira laranja com suporte enrolador de piso, prática para guardar e transportar.', ['Suporte enrolador', 'Mangueira flexível', 'Fácil de transportar']],
    ['cantil-militar', 'ferramentas', 'Cantil com capa', 'Linha profissional', 'Cantil preto com capa de nylon e alça para cinto, para trabalho no campo e longas jornadas.', ['Capa de nylon', 'Alça para cinto', 'Tampa rosqueável']],
    ['garrafao-termico-soprano', 'ferramentas', 'Garrafão térmico Soprano Aspen 12 L', 'Soprano', 'Garrafão térmico de 12 litros com torneira, para manter água fresca para a equipe.', ['12 litros', 'Torneira frontal', 'Alça de transporte']],
    ['repelente-roedores-solar', 'ferramentas', 'Repelente solar ultrassônico', 'Linha profissional', 'Repelente ultrassônico com placa solar para afastar roedores e pragas de quintais, hortas e jardins.', ['Energia solar', 'Ultrassônico', 'Uso externo']],
  ] as [string, CategorySlug, string, string, string, string[]][]).map(([slug, category, name, brand, description, features]) => ({
    slug,
    category,
    name,
    brand,
    images: slug === 'cantil-militar' ? [photo(slug), photo('cantil-militar-2')] : [photo(slug)],
    description,
    features,
  })),
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
