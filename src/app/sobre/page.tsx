import { ContentPage } from '@/components/site';
import { pageMeta } from '@/lib/site';
export const metadata = pageMeta('/sobre/', 'Sobre a loja', 'A CR Soluções em EPIs fica na Rua Chagas Dória, 812, Centro de Lavras/MG, e atende profissionais e empresas com envio para todo o Brasil.');
export default function Page() { return <ContentPage type="about" />; }
