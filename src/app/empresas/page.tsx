import { ContentPage } from '@/components/site';
import { pageMeta } from '@/lib/site';
export const metadata = pageMeta('/empresas/', 'EPIs para empresas e equipes', 'Orçamento de EPIs para empresas, obras e equipes em Lavras/MG: lista por colaborador, orientação na escolha, CA no orçamento e envio para todo o Brasil.');
export default function Page() { return <ContentPage type="business" />; }
