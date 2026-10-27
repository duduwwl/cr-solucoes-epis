import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SITE } from '@/lib/site';

export const FAQ_ITEMS = [
  {
    value: 'availability',
    title: 'Como confirmo se um produto está disponível?',
    content: `Pelo WhatsApp ou pelo telefone ${SITE.phoneDisplay}. Envie o item, a quantidade e o tamanho; a equipe confere o estoque da loja e, se for preciso, o prazo de reposição.`,
  },
  {
    value: 'ca',
    title: 'Onde encontro o Certificado de Aprovação (CA)?',
    content:
      'O número do CA depende do fabricante e do modelo exato. Peça a confirmação do CA e da ficha técnica junto com o orçamento e valide a escolha com o responsável pela segurança do trabalho da sua operação.',
  },
  {
    value: 'quote',
    title: 'Como peço um orçamento para a minha empresa?',
    content:
      'Junte os itens na lista de orçamento do site, com quantidade e tamanho de cada um, e envie tudo pelo WhatsApp. Se preferir, mande a lista da equipe do seu jeito: planilha, foto ou mensagem.',
  },
  {
    value: 'delivery',
    title: 'A loja entrega fora de Lavras?',
    content: 'Sim. A CR atende todo o Brasil. A modalidade de envio e o prazo são combinados no orçamento, conforme a cidade de destino.',
  },
  {
    value: 'pickup',
    title: 'Posso retirar o pedido na loja?',
    content: `Sim. A loja fica na ${SITE.street}, ${SITE.district}, em ${SITE.city}/${SITE.state}. Confirme a disponibilidade antes para encontrar o pedido separado.`,
  },
  {
    value: 'price',
    title: 'Por que o catálogo não mostra preços?',
    content: 'Os valores mudam conforme o modelo, o tamanho e a quantidade. Cada pedido recebe um orçamento direto da equipe, com o valor atualizado.',
  },
] as const;

export default function Accordion1() {
  return (
    <Accordion className="w-full" type="single" collapsible>
      {FAQ_ITEMS.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
