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

## Desenvolvimento

```bash
pnpm install
pnpm dev
```

Build igual ao da publicação:

```bash
NEXT_PUBLIC_BASE_PATH=/cr-solucoes-epis pnpm build   # gera a pasta out/
```

## Publicação

O workflow em `.github/workflows/deploy-pages.yml` gera o site estático e publica no GitHub Pages a cada envio para a
branch `main`.
