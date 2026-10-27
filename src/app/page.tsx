import { PageShell } from '@/components/layout/page-shell';
import { Hero } from '@/components/home/hero';
import { Showcase } from '@/components/home/showcase';
import { Lines } from '@/components/home/lines';
import { Featured } from '@/components/home/featured';
import { Business } from '@/components/home/business';
import { TeamList } from '@/components/home/team-list';
import { Closing } from '@/components/home/closing';
import { Faq, FAQ } from '@/components/home/faq';
import { Visit } from '@/components/home/visit';

export const metadata = {
  alternates: { canonical: './' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

export default function Page() {
  return (
    <PageShell tone="dark">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Hero />
      <Showcase />
      <Lines />
      <Featured />
      <Business />
      <TeamList />
      <Faq />
      <Visit />
      <Closing />
    </PageShell>
  );
}
