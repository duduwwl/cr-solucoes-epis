# CR Soluções em EPIs

Site e catálogo da CR Soluções em EPIs (Rua Chagas Dória, 812, Centro, Lavras/MG), publicado no GitHub Pages em
https://duduwwl.github.io/cr-solucoes-epis/.

O site não vende nem recebe pagamentos: cada produto leva a um orçamento pelo WhatsApp (35) 4104-6700, sozinho ou
reunido na lista de orçamento, que fica salva apenas no navegador de quem monta.

## Estrutura

- `src/data/catalog.ts`: categorias e produtos (nome, linha/marca, fotos, descrição, características). É o único lugar para
  cadastrar ou corrigir produtos; páginas, sitemap e filtros se atualizam a partir dele.
- `src/lib/site.ts`: telefone, endereço, mensagens de WhatsApp e utilitários de imagem.
- `src/lib/quote-store.ts`: lista de orçamento compartilhada entre catálogo, página de produto e página inicial.
- `public/images/products`: fotos originais. `public/images/opt`: versões WebP otimizadas usadas pelo site
  (geradas a partir das originais; o tamanho de cada uma está em `src/data/images.json`).

## Infraestrutura

O projeto é publicado na Vercel e utiliza Neon Postgres provisionado pelo Marketplace da Vercel. As credenciais são variáveis sensíveis do projeto e não fazem parte do repositório.

- `pnpm db:migrate` cria o esquema e semeia as categorias e os produtos de forma idempotente.
- O comando de build executa a migração antes da compilação, protegida por lock do Postgres para evitar concorrência.
- `POST /api/orcamentos` valida os dados, confere a origem, usa honeypot e limita requisições por IP anonimizado.
- `GET /api/produtos` fornece somente o catálogo público, com cache.

Copie `.env.example` somente para desenvolvimento local e preencha valores próprios; não exponha segredos no navegador ou no Git.

## Desenvolvimento

```bash
pnpm install
pnpm dev
```

Build de produção (inclui a migração idempotente quando as variáveis do banco estiverem disponíveis):

```bash
pnpm build
```

## Publicação

O repositório está conectado à Vercel. Cada envio à branch `main` cria uma implantação de produção.
