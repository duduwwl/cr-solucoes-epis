import { ContentPage } from '@/components/site';
import { pageMeta } from '@/lib/site';
export const metadata = pageMeta('/privacidade/', 'Privacidade', 'Como o site da CR Soluções em EPIs trata informações pessoais.');
export default function Page() { return <ContentPage type="privacy" />; }
