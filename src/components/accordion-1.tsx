import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
const items=[
 {value:'availability',title:'Como confirmo se um produto está disponível?',content:'Este catálogo apresenta uma simulação comercial. Antes da publicação, conecte o estoque real da loja e confirme tamanhos, modelos e reposição com a equipe CR.'},
 {value:'ca',title:'Onde encontro o Certificado de Aprovação (CA)?',content:'O CA depende do fabricante e do modelo exato. Solicite à equipe a confirmação do CA e da ficha técnica do item antes da compra e valide a seleção com o responsável de segurança da sua operação.'},
 {value:'quote',title:'Como peço um orçamento para minha empresa?',content:'Envie a lista de itens, quantidades, tamanhos e atividade da equipe pelo contato. A CR confirma modelos e condições comerciais disponíveis.'},
 {value:'delivery',title:'A loja entrega fora de Lavras?',content:'O checkout demonstra entrega para todo o Brasil com taxa fixa e retirada gratuita na loja em Lavras. As condições reais devem ser cadastradas antes da publicação.'},
 {value:'price',title:'Os preços do catálogo são definitivos?',content:'Não. Os valores e descrições desta versão são fictícios e servem para demonstrar a experiência de compra. Cadastre preços, estoque e regras comerciais reais antes da publicação.'},
] as const;
export default function Accordion1(){return <Accordion className="w-full" type="single" collapsible>{items.map(item=><AccordionItem key={item.value} value={item.value}><AccordionTrigger>{item.title}</AccordionTrigger><AccordionContent>{item.content}</AccordionContent></AccordionItem>)}</Accordion>}
