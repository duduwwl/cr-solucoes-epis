import { LegalPage } from '@/components/pages/legal';
import { SITE, pageMeta } from '@/lib/site';

export const metadata = pageMeta('/privacidade/', 'Privacidade', 'Como o site da CR Soluções em EPIs trata informações pessoais.');

export default function Page() {
  return (
    <LegalPage title="Privacidade">
      <p>Este site é um catálogo. Ele não tem cadastro, não recebe pagamentos e não envia dados pessoais para servidores da CR Soluções em EPIs.</p>
      <h2>Lista de orçamento</h2>
      <p>Os itens que você adiciona à lista ficam guardados apenas no seu navegador, para que a lista continue lá quando você voltar. Para apagá-los, use “Limpar lista” ou limpe os dados do site no navegador.</p>
      <h2>WhatsApp</h2>
      <p>Ao tocar em um botão de orçamento, o site abre o WhatsApp com uma mensagem já escrita. Nada é enviado até que você mesmo envie a mensagem. A partir daí, a conversa segue as regras do WhatsApp e o atendimento da loja.</p>
      <h2>Contato</h2>
      <p>Dúvidas sobre os seus dados podem ser tratadas diretamente com a loja, pelo telefone {SITE.phoneDisplay} ou na {SITE.street}, {SITE.district}, {SITE.city}/{SITE.state}.</p>
    </LegalPage>
  );
}
