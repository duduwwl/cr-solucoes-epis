# Migração para Supabase e expansão de catálogo

## Intenção

Migrar o banco do catálogo da CR Soluções em EPIs de Neon para Supabase e adicionar os produtos inéditos da pasta fornecida. O catálogo continuará sem preços e o atendimento seguirá pelo WhatsApp.

## Escopo

- Criar schema no Supabase compatível com categorias, produtos, variações de imagem, orçamentos, auditoria e limite de requisições.
- Manter Neon sem alterações até a validação do Supabase.
- Catalogar as 155 fotos automaticamente: um produto por modelo; fotos repetidas serão variações.
- Ignorar itens já presentes no site.
- Converter originais HEIC para imagens web e aplicar fundo branco aos produtos novos.
- Publicar imagens, dados e site após validação.

## Segurança

- RLS permanece ativo; tabelas não serão expostas automaticamente pela Data API.
- O site acessará o banco apenas por conexão de servidor guardada como variável sensível na Vercel.
- Não serão expostas senhas, chaves ou dados de orçamento.

## Caminho e retorno

1. Expandir schema no Supabase e carregar dados existentes.
2. Validar leituras, gravação de orçamento e contagem do catálogo.
3. Trocar a variável da Vercel para Supabase e publicar.
4. Manter Neon como retorno imediato até aprovação final. Não excluir Neon nesta etapa.

## Abordagens consideradas

- Importar cada foto como produto: descartada porque cria duplicatas e catálogo ruim.
- Usar lista manual de SKU: seria mais precisa, mas não foi fornecida.
- Identificação visual por modelo, com fotos repetidas como variações: escolhida pelo usuário para acelerar o cadastro e preservar revisão posterior.

## Limites conhecidos

Nomes, marcas e descrições serão inferidos visualmente quando a foto não mostrar rótulo legível. Itens ambíguos ficam marcados para revisão, sem inventar especificações técnicas.
