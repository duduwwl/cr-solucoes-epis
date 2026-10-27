import { LegalPage } from '@/components/pages/legal';

export const metadata = { title: 'Área administrativa', robots: { index: false, follow: false } };

export default function Page() {
  return (
    <LegalPage title="Área administrativa">
      <p>O painel de gestão ainda não está ativo. Ele depende de banco de dados, autenticação e das credenciais do responsável pela loja, que não ficam em um site estático.</p>
      <p>Nenhuma solicitação comercial é armazenada neste site: os pedidos chegam à loja pelo WhatsApp.</p>
    </LegalPage>
  );
}
