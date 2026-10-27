import { LegalPage } from '@/components/pages/legal';
import { pageMeta } from '@/lib/site';

export const metadata = pageMeta('/termos/', 'Termos de uso', 'Condições de uso do catálogo online da CR Soluções em EPIs.');

export default function Page() {
  return (
    <LegalPage title="Termos de uso">
      <p>O site apresenta produtos que a CR Soluções em EPIs trabalha. Ele serve para consulta e para iniciar um pedido de orçamento; não é uma loja com compra online.</p>
      <h2>Informações dos produtos</h2>
      <p>Descrições e imagens ajudam a identificar cada item. Especificações, número do CA, materiais, tamanhos, disponibilidade e valores são confirmados pela equipe no orçamento, conforme o fabricante e o modelo disponível.</p>
      <h2>Escolha do EPI</h2>
      <p>A seleção do equipamento adequado a cada atividade deve ser validada pelo responsável pela segurança do trabalho da empresa ou da operação.</p>
      <h2>Pedidos</h2>
      <p>Um pedido só é fechado depois da confirmação da loja, com valor, prazo e forma de entrega ou retirada combinados.</p>
    </LegalPage>
  );
}
