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
  | 'incendio';

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
    image: '/images/catalog/oculos-steelflex-preto-v1.png',
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
    images: ['/images/catalog/oculos-steelflex-preto-v1.png'],
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
