import { ProductsPage } from '@/components/site';
import { products } from '@/data/catalog';
import { pageMeta } from '@/lib/site';

export const metadata = pageMeta(
  '/produtos/',
  'Catálogo de EPIs',
  `${products.length} equipamentos de proteção: calçados de segurança, capacetes, vestimentas, protetor auditivo, limpeza e extintores. Orçamento pelo WhatsApp em Lavras/MG.`,
);

export default function Page() {
  return <ProductsPage />;
}
