import { HomePage } from '@/components/site';
import { FAQ_ITEMS } from '@/components/accordion-1';

export const metadata = { alternates: { canonical: './' } };

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((f) => ({ '@type': 'Question', name: f.title, acceptedAnswer: { '@type': 'Answer', text: f.content } })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <HomePage />
    </>
  );
}
