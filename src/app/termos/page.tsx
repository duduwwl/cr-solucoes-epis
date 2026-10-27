import { ContentPage } from '@/components/site';
import { pageMeta } from '@/lib/site';
export const metadata = pageMeta('/termos/', 'Termos de uso', 'Condições de uso do catálogo online da CR Soluções em EPIs.');
export default function Page() { return <ContentPage type="terms" />; }
