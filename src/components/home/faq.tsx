import { ChevronDown } from 'lucide-react';
import { SITE } from '@/lib/site';

export const FAQ = [
  {
    q: 'Como confirmo se um produto está disponível?',
    a: 'Pelo WhatsApp ou pelo telefone (35) 4104-6700. Envie o item, a quantidade e o tamanho; a equipe confere o estoque da loja e o prazo de reposição quando necessário.',
  },
  {
    q: 'Onde encontro o Certificado de Aprovação (CA)?',
    a: 'O número do CA depende do fabricante e do modelo exato. Peça a confirmação do CA e da ficha técnica junto com o orçamento e valide a escolha com o responsável pela segurança do trabalho da sua operação.',
  },
  {
    q: 'Como peço um orçamento para a minha empresa?',
    a: 'Monte a lista no site, com quantidades e tamanhos por item, e envie pelo WhatsApp. Se preferir, mande a lista da equipe do seu jeito: planilha, foto ou mensagem. A equipe responde com as condições comerciais.',
  },
  {
    q: 'A loja envia para fora de Lavras?',
    a: 'Sim, a CR atende todo o Brasil. A modalidade de envio e o prazo são combinados no orçamento, conforme a cidade de destino.',
  },
  {
    q: 'Posso retirar o pedido na loja?',
    a: `Sim. A loja fica na ${SITE.street}, ${SITE.district}, em ${SITE.city}/${SITE.state}. Confirme a disponibilidade antes de ir para encontrar o pedido separado.`,
  },
  {
    q: 'Por que o site não mostra preços?',
    a: 'Os valores mudam conforme o modelo, o tamanho e a quantidade. Por isso cada pedido recebe um orçamento direto da equipe, com o valor atualizado.',
  },
];

export function Faq() {
  return (
    <section className="faq" aria-labelledby="faq-title">
      <div className="frame">
        <h2 id="faq-title" className="faq-title">Antes de pedir</h2>
        <div className="faq-list">
          {FAQ.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>
                <span>{item.q}</span>
                <ChevronDown size={22} strokeWidth={1.75} aria-hidden />
              </summary>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
