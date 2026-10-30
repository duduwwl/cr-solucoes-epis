-- Gerado por scripts/seed-sql.mjs a partir de src/data/catalog.ts. Pode rodar mais de uma vez.
begin;

insert into public.categories (slug, name, summary, sort_order) values ('calcados', 'Calçados de segurança', 'Botas e botinas Gogowear e Ecosafety, botina elástica, botas de PVC e sapatos antiderrapantes Sticky Shoes.', 0)
  on conflict (slug) do update set name = excluded.name, summary = excluded.summary, sort_order = excluded.sort_order, updated_at = now();
insert into public.categories (slug, name, summary, sort_order) values ('capacetes', 'Capacetes', 'Capacetes com CA, suspensão ajustável e diversas cores, para obra, indústria, manutenção e área rural.', 1)
  on conflict (slug) do update set name = excluded.name, summary = excluded.summary, sort_order = excluded.sort_order, updated_at = now();
insert into public.categories (slug, name, summary, sort_order) values ('luvas', 'Luvas', 'Luvas de látex, neoprene, nitrílica e multitato para limpeza, indústria, química e construção civil.', 2)
  on conflict (slug) do update set name = excluded.name, summary = excluded.summary, sort_order = excluded.sort_order, updated_at = now();
insert into public.categories (slug, name, summary, sort_order) values ('vestimentas', 'Vestimentas', 'Coletes refletivos, aventais, roupas para câmara fria, capas e conjuntos de chuva, apicultura e aplicação de herbicidas.', 3)
  on conflict (slug) do update set name = excluded.name, summary = excluded.summary, sort_order = excluded.sort_order, updated_at = now();
insert into public.categories (slug, name, summary, sort_order) values ('uniformes', 'Uniformes profissionais', 'Uniformes de brim cinza e azul royal e uniforme NR10 com faixas refletivas.', 4)
  on conflict (slug) do update set name = excluded.name, summary = excluded.summary, sort_order = excluded.sort_order, updated_at = now();
insert into public.categories (slug, name, summary, sort_order) values ('auditiva', 'Proteção auditiva', 'Protetor tipo plug de silicone com cordão e abafadores tipo concha, inclusive para acoplar ao capacete.', 5)
  on conflict (slug) do update set name = excluded.name, summary = excluded.summary, sort_order = excluded.sort_order, updated_at = now();
insert into public.categories (slug, name, summary, sort_order) values ('ocular', 'Proteção ocular', 'Óculos de segurança para proteção dos olhos em atividades profissionais.', 6)
  on conflict (slug) do update set name = excluded.name, summary = excluded.summary, sort_order = excluded.sort_order, updated_at = now();
insert into public.categories (slug, name, summary, sort_order) values ('altura', 'Trabalho em altura', 'Cinto paraquedista de três pontos com talabarte duplo e absorvedor de energia.', 7)
  on conflict (slug) do update set name = excluded.name, summary = excluded.summary, sort_order = excluded.sort_order, updated_at = now();
insert into public.categories (slug, name, summary, sort_order) values ('limpeza', 'Limpeza e higiene', 'Vassouras e utensílios de limpeza, sabão desengraxante, cremes protetores e protetor solar.', 8)
  on conflict (slug) do update set name = excluded.name, summary = excluded.summary, sort_order = excluded.sort_order, updated_at = now();
insert into public.categories (slug, name, summary, sort_order) values ('incendio', 'Incêndio e emergência', 'Extintores de 1, 4 e 6 kg, placas de sinalização e kit ambiental. Luminárias de emergência sob consulta.', 9)
  on conflict (slug) do update set name = excluded.name, summary = excluded.summary, sort_order = excluded.sort_order, updated_at = now();
insert into public.categories (slug, name, summary, sort_order) values ('ferramentas', 'Ferramentas e acessórios', 'Caixas, ferramentas e acessórios para apoiar manutenção, obra e rotina profissional.', 10)
  on conflict (slug) do update set name = excluded.name, summary = excluded.summary, sort_order = excluded.sort_order, updated_at = now();
insert into public.categories (slug, name, summary, sort_order) values ('respiratoria', 'Proteção respiratória', 'Respiradores e máscaras para poeira, névoas e uso diário em obra, indústria e saúde.', 11)
  on conflict (slug) do update set name = excluded.name, summary = excluded.summary, sort_order = excluded.sort_order, updated_at = now();
insert into public.categories (slug, name, summary, sort_order) values ('sinalizacao', 'Sinalização e bloqueio', 'Cones, bastões, giroflex, fita antiderrapante e cadeados para isolar áreas e bloquear energia.', 12)
  on conflict (slug) do update set name = excluded.name, summary = excluded.summary, sort_order = excluded.sort_order, updated_at = now();
insert into public.categories (slug, name, summary, sort_order) values ('manutencao', 'Colas, vedação e manutenção', 'Colas, selantes, vedação, lubrificantes e tintas para a manutenção do dia a dia.', 13)
  on conflict (slug) do update set name = excluded.name, summary = excluded.summary, sort_order = excluded.sort_order, updated_at = now();

insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('bota-gogowear-caramelo', (select id from public.categories where slug = 'calcados'), 'Bota Gogowear caramelo', 'Gogowear', 'Bota de cano médio em couro caramelo, acolchoada, com solado tratorado.', '["Cano médio acolchoado","Solado tratorado","Fechamento por cadarço"]'::jsonb, 'Numeração', true, true, 0, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'bota-gogowear-caramelo' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-gogowear-caramelo', 'Bota Gogowear caramelo', 0 from public.products where slug = 'bota-gogowear-caramelo'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('botina-seguranca-escura', (select id from public.categories where slug = 'calcados'), 'Botina Gogowear preta', 'Gogowear', 'Botina de couro preto com gola acolchoada e solado de borracha. Linha Gogowear: alta durabilidade, conforto e segurança.', '["Couro preto","Gola acolchoada","Solado de borracha"]'::jsonb, 'Numeração', false, true, 1, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'botina-seguranca-escura' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-gogowear-escura', 'Botina Gogowear preta', 0 from public.products where slug = 'botina-seguranca-escura'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('bota-seguranca-marrom', (select id from public.categories where slug = 'calcados'), 'Bota Gogowear marrom e preta', 'Gogowear', 'Bota de cano alto em couro marrom com proteção frontal preta e solado bicolor. Linha Gogowear: alta durabilidade, conforto e segurança.', '["Cano alto","Proteção frontal reforçada","Solado aderente"]'::jsonb, 'Numeração', false, true, 2, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'bota-seguranca-marrom' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-gogowear-marrom', 'Bota Gogowear marrom e preta', 0 from public.products where slug = 'bota-seguranca-marrom'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('bota-seguranca-cinza', (select id from public.categories where slug = 'calcados'), 'Bota Gogowear cinza', 'Gogowear', 'Bota de cano alto em couro cinza com solado de borracha. Linha Gogowear: alta durabilidade, conforto e segurança.', '["Cano alto","Suporte de tornozelo","Solado de borracha"]'::jsonb, 'Numeração', false, true, 3, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'bota-seguranca-cinza' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-gogowear-cinza', 'Bota Gogowear cinza', 0 from public.products where slug = 'bota-seguranca-cinza'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('bota-gogowear-trilha', (select id from public.categories where slug = 'calcados'), 'Bota Gogowear marrom cano médio', 'Gogowear', 'Bota de cano médio em couro marrom com solado de borracha cinza. Linha Gogowear: alta durabilidade, conforto e segurança.', '["Alta durabilidade e resistência","Conforto térmico e de caminhada","Excelente aderência"]'::jsonb, 'Numeração', false, true, 4, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'bota-gogowear-trilha' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-gogowear-trilha', 'Bota Gogowear marrom cano médio', 0 from public.products where slug = 'bota-gogowear-trilha'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('botina-gogowear-tabaco', (select id from public.categories where slug = 'calcados'), 'Botina Gogowear tabaco', 'Gogowear', 'Botina em couro tabaco com gola acolchoada e solado preto. Linha Gogowear: alta durabilidade, conforto e segurança.', '["Alta durabilidade e resistência","Conforto térmico e de caminhada","Excelente aderência"]'::jsonb, 'Numeração', false, true, 5, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'botina-gogowear-tabaco' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-gogowear-tabaco', 'Botina Gogowear tabaco', 0 from public.products where slug = 'botina-gogowear-tabaco'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('botina-gogowear-cafe', (select id from public.categories where slug = 'calcados'), 'Botina Gogowear café', 'Gogowear', 'Botina em couro liso cor café com solado preto. Linha Gogowear: alta durabilidade, conforto e segurança.', '["Alta durabilidade e resistência","Conforto térmico e de caminhada","Excelente aderência"]'::jsonb, 'Numeração', false, true, 6, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'botina-gogowear-cafe' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-gogowear-cafe', 'Botina Gogowear café', 0 from public.products where slug = 'botina-gogowear-cafe'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('bota-gogowear-grafite', (select id from public.categories where slug = 'calcados'), 'Bota Gogowear grafite', 'Gogowear', 'Bota de couro grafite com gola acolchoada e solado tratorado. Linha Gogowear: alta durabilidade, conforto e segurança.', '["Alta durabilidade e resistência","Conforto térmico e de caminhada","Excelente aderência"]'::jsonb, 'Numeração', false, true, 7, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'bota-gogowear-grafite' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-gogowear-grafite', 'Bota Gogowear grafite', 0 from public.products where slug = 'bota-gogowear-grafite'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('botina-ecosafety', (select id from public.categories where slug = 'calcados'), 'Botina Ecosafety', 'Ecosafety', 'Botina robusta, com excelente acabamento, para o trabalho e o dia a dia. Disponível nas cores preta e marrom.', '["Cores preta e marrom","Gola acolchoada","Solado de borracha"]'::jsonb, 'Numeração', false, true, 8, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'botina-ecosafety' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-ecosafety-preta', 'Botina Ecosafety', 0 from public.products where slug = 'botina-ecosafety'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('botina-elastica', (select id from public.categories where slug = 'calcados'), 'Botina elástica de couro', 'Linha CR', 'Botina de couro com elástico lateral, fácil de calçar, para jornadas pesadas. Pronta entrega.', '["Solado PU","Couro","Bico de proteção em PVC","Elástico lateral"]'::jsonb, 'Numeração', true, true, 9, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'botina-elastica' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-botina-elastica', 'Botina elástica de couro', 0 from public.products where slug = 'botina-elastica'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('bota-pvc-branca', (select id from public.categories where slug = 'calcados'), 'Bota de PVC branca', 'Linha impermeável', 'Bota de PVC impermeável, de cano alto, para água, lama, produtos de limpeza e pisos escorregadios.', '["100% impermeável","Solado antiderrapante","Fácil de higienizar","Indicada para indústria, limpeza, agronegócio e frigoríficos"]'::jsonb, 'Numeração', true, true, 10, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'bota-pvc-branca' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-bota-pvc-branca', 'Bota de PVC branca', 0 from public.products where slug = 'bota-pvc-branca'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-bota-pvc-branca-ig', 'Bota de PVC branca', 1 from public.products where slug = 'bota-pvc-branca'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('bota-pvc-preta', (select id from public.categories where slug = 'calcados'), 'Bota de PVC preta', 'Linha impermeável', 'Bota de PVC impermeável, de cano alto, leve e resistente, para longas jornadas em áreas molhadas.', '["Impermeável","Solado antiderrapante","Fácil de limpar"]'::jsonb, 'Numeração', false, true, 11, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'bota-pvc-preta' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-bota-pvc-preta', 'Bota de PVC preta', 0 from public.products where slug = 'bota-pvc-preta'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('sticky-shoes', (select id from public.categories where slug = 'calcados'), 'Sapato antiderrapante Sticky Shoes', 'Sticky Shoes', 'Sapato ocupacional com solado antiderrapante, para quem não pode escorregar na rotina: cozinhas, hospitais e áreas úmidas. Nas cores branca e preta.', '["Solado antiderrapante","Cores branca e preta","Fácil de limpar"]'::jsonb, 'Numeração', false, true, 12, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'sticky-shoes' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-sticky-shoes-preto', 'Sapato antiderrapante Sticky Shoes', 0 from public.products where slug = 'sticky-shoes'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('capacete-de-protecao', (select id from public.categories where slug = 'capacetes'), 'Capacete de proteção', 'Linha CR', 'Capacete com CA, casco rígido e suspensão ajustável, em diversas cores e modelos.', '["Proteção contra impactos","Suspensão ajustável","Diversas cores e modelos","Para construção civil, indústria, manutenção, logística e área rural"]'::jsonb, null, true, true, 13, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'capacete-de-protecao' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-capacete-laranja', 'Capacete de proteção', 0 from public.products where slug = 'capacete-de-protecao'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-capacetes-cores', 'Capacete de proteção', 1 from public.products where slug = 'capacete-de-protecao'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-capacete-verde', 'Capacete de proteção', 2 from public.products where slug = 'capacete-de-protecao'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('luva-multitato', (select id from public.categories where slug = 'luvas'), 'Luva multitato poliuretano preta', 'Linha CR', 'Luva com revestimento em poliuretano para quem precisa de proteção sem perder a sensibilidade nas mãos.', '["Excelente tato e precisão","Alta resistência","Tecido respirável","Ótima aderência"]'::jsonb, 'Tamanho', true, true, 14, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'luva-multitato' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-luva-multitato', 'Luva multitato poliuretano preta', 0 from public.products where slug = 'luva-multitato'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('luva-latex-mucambo', (select id from public.categories where slug = 'luvas'), 'Luva de látex Mucambo profissional', 'Mucambo', 'Luva de látex preta para argamassa, cimento, óleos, solventes, detergentes, limpeza e coleta de resíduos.', '["Preparação de argamassa e cimento","Manuseio de óleo e solventes","Limpeza e coleta de resíduos"]'::jsonb, 'Tamanho', false, true, 15, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'luva-latex-mucambo' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-luva-latex-mucambo', 'Luva de látex Mucambo profissional', 0 from public.products where slug = 'luva-latex-mucambo'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('luva-latex-amarela', (select id from public.categories where slug = 'luvas'), 'Luva de látex verniz silver amarela', 'Volk do Brasil', 'Luva de látex para serviços de higiene, limpeza e postos de trabalho na indústria alimentícia.', '["Higiene e limpeza","Indústria alimentícia","Proteção impermeável"]'::jsonb, 'Tamanho', false, true, 16, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'luva-latex-amarela' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-luva-latex-amarela', 'Luva de látex verniz silver amarela', 0 from public.products where slug = 'luva-latex-amarela'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('luva-latex-neoprene-bicolor', (select id from public.categories where slug = 'luvas'), 'Luva de látex e neoprene bicolor', 'Volk do Brasil', 'Luva para trabalhos gerais médios e severos, com proteção contra agentes químicos.', '["Trabalhos médios e severos","Agentes químicos","Agroquímicos, pintura, limpeza e manutenção"]'::jsonb, 'Tamanho', false, true, 17, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'luva-latex-neoprene-bicolor' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-luva-latex-neoprene-bicolor', 'Luva de látex e neoprene bicolor', 0 from public.products where slug = 'luva-latex-neoprene-bicolor'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('luva-latex-neoprene-laranja', (select id from public.categories where slug = 'luvas'), 'Luva de látex e neoprene laranja super reforçada', 'Volk do Brasil', 'Luva super reforçada para indústrias químicas, automotivas, alimentícias e construção civil.', '["Super reforçada","Indústria química e automotiva","Agroquímicos, pintura, limpeza e manutenção"]'::jsonb, 'Tamanho', false, true, 18, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'luva-latex-neoprene-laranja' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-luva-latex-neoprene-laranja', 'Luva de látex e neoprene laranja super reforçada', 0 from public.products where slug = 'luva-latex-neoprene-laranja'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('luva-nitrilica', (select id from public.categories where slug = 'luvas'), 'Luva nitrílica', 'Volk do Brasil', 'Luva nitrílica para manuseio de solventes, químicos, cáusticos, óleos, graxas, detergentes e combustíveis.', '["Solventes e químicos","Óleos, graxas e combustíveis","Indústria química, automotiva e alimentícia"]'::jsonb, 'Tamanho', false, true, 19, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'luva-nitrilica' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-luva-nitrilica', 'Luva nitrílica', 0 from public.products where slug = 'luva-nitrilica'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('colete-refletivo', (select id from public.categories where slug = 'vestimentas'), 'Colete refletivo', 'Linha CR', 'Colete de alta visibilidade com faixas refletivas, nas cores amarelo e laranja fluorescente.', '["Faixas refletivas de alta visibilidade","Leve e resistente","Bolso frontal","Amarelo ou laranja fluorescente"]'::jsonb, 'Tamanho', true, true, 20, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'colete-refletivo' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-colete-refletivo', 'Colete refletivo', 0 from public.products where slug = 'colete-refletivo'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('vestimenta-camara-fria', (select id from public.categories where slug = 'vestimentas'), 'Conjunto para câmara fria', 'Linha térmica', 'Vestimenta térmica para câmaras frias, frigoríficos, freezers e centros de distribuição.', '["Isolamento térmico","Impermeável e resistente à umidade","Bloqueia o vento","Branco ou azul-marinho"]'::jsonb, 'Tamanho', false, true, 21, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'vestimenta-camara-fria' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-camara-fria-branca', 'Conjunto para câmara fria', 0 from public.products where slug = 'vestimenta-camara-fria'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-camara-fria-azul', 'Conjunto para câmara fria', 1 from public.products where slug = 'vestimenta-camara-fria'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('avental-vinil', (select id from public.categories where slug = 'vestimentas'), 'Avental de vinil com cordão', 'Linha impermeável', 'Avental de vinil com cobertura frontal ampla e cordão de ajuste.', '["Impermeável","Cordão de ajuste","Fácil de limpar"]'::jsonb, null, false, true, 22, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'avental-vinil' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-avental-vinil', 'Avental de vinil com cordão', 0 from public.products where slug = 'avental-vinil'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('avental-vinil-fitilho', (select id from public.categories where slug = 'vestimentas'), 'Avental de vinil com fitilho', 'Linha impermeável', 'Avental de vinil com fitilho em vinil, que não desfia e não absorve umidade. Para açougues, cozinhas, indústrias e laboratórios.', '["100% impermeável","Fitilho em vinil","Fácil de limpar"]'::jsonb, null, false, true, 23, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'avental-vinil-fitilho' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-avental-vinil-fitilho', 'Avental de vinil com fitilho', 0 from public.products where slug = 'avental-vinil-fitilho'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('avental-pvc-branco', (select id from public.categories where slug = 'vestimentas'), 'Avental de PVC branco', 'Linha impermeável', 'Avental de PVC branco para proteção e higiene em açougues, cozinhas, indústrias e laboratórios.', '["Impermeável","PVC resistente","Limpeza com pano úmido"]'::jsonb, null, false, true, 24, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'avental-pvc-branco' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-avental-pvc-branco', 'Avental de PVC branco', 0 from public.products where slug = 'avental-pvc-branco'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('avental-trevira', (select id from public.categories where slug = 'vestimentas'), 'Avental de trevira super resistente', 'Linha CR', 'Avental de trevira com revestimento em PVC, resistente a rasgos, furos e abrasão. Para soldagem, serralherias, oficinas e mecânicas.', '["Revestimento em PVC","Impermeável a líquidos e graxas","Alta durabilidade"]'::jsonb, null, false, true, 25, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'avental-trevira' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-avental-trevira', 'Avental de trevira super resistente', 0 from public.products where slug = 'avental-trevira'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('avental-raspa', (select id from public.categories where slug = 'vestimentas'), 'Avental de raspa', 'Linha CR', 'Avental de couro raspa para soldagem, serralheria, metalurgia, funilaria e manutenção.', '["Couro de raspa","Resistente a abrasão e respingos","Tiras reforçadas"]'::jsonb, null, false, true, 26, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'avental-raspa' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-avental-raspa', 'Avental de raspa', 0 from public.products where slug = 'avental-raspa'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('conjunto-chuva-transparente', (select id from public.categories where slug = 'vestimentas'), 'Conjunto de chuva transparente', 'Linha CR', 'Conjunto impermeável para motociclistas, entregadores e trabalhadores externos.', '["Impermeável","Capuz integrado","Punhos com elástico","Fácil de transportar"]'::jsonb, 'Tamanho', false, true, 27, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'conjunto-chuva-transparente' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-conjunto-chuva-transparente', 'Conjunto de chuva transparente', 0 from public.products where slug = 'conjunto-chuva-transparente'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('capa-chuva-standard', (select id from public.categories where slug = 'vestimentas'), 'Capa de chuva Standard amarela', 'Linha CR', 'Capa de chuva longa com capuz fixo e mangas longas.', '["Capuz fixo","Mangas longas","Fechamento por botões de pressão","Costura em solda eletrônica"]'::jsonb, 'Tamanho', false, true, 28, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'capa-chuva-standard' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-capa-chuva-standard', 'Capa de chuva Standard amarela', 0 from public.products where slug = 'capa-chuva-standard'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('capa-chuva-morcego', (select id from public.categories where slug = 'vestimentas'), 'Capa de chuva Morcego', 'Linha CR', 'Capa de chuva modelo morcego, com capuz fixo e manga curta.', '["Capuz fixo","Manga curta","Botões de pressão","Costura em solda eletrônica"]'::jsonb, 'Tamanho', false, true, 29, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'capa-chuva-morcego' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-capa-chuva-morcego', 'Capa de chuva Morcego', 0 from public.products where slug = 'capa-chuva-morcego'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('bata-calca-polietileno', (select id from public.categories where slug = 'vestimentas'), 'Bata e calça em polietileno', 'Linha CR', 'Conjunto leve contra chuva, umidade e vento, reutilizável e fácil de limpar.', '["Reutilizável","Leve e confortável","Elástico nas extremidades"]'::jsonb, 'Tamanho', false, true, 30, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'bata-calca-polietileno' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-bata-calca-polietileno', 'Bata e calça em polietileno', 0 from public.products where slug = 'bata-calca-polietileno'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('vestimenta-apicultor', (select id from public.categories where slug = 'vestimentas'), 'Vestimenta para apicultor', 'Linha CR', 'Macacão para apicultura com tela de visão ampla, costuras duplas e zíper resistente.', '["Tecido que impede picadas","Tela de alta visibilidade","Bolsos funcionais"]'::jsonb, 'Tamanho', false, true, 31, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'vestimenta-apicultor' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-vestimenta-apicultor', 'Vestimenta para apicultor', 0 from public.products where slug = 'vestimenta-apicultor'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('conjunto-herbicidas', (select id from public.categories where slug = 'vestimentas'), 'Conjunto para aplicação de herbicidas', 'Linha CR', 'Conjunto para aplicação de herbicidas, inseticidas e defensivos agrícolas, com capuz e visor.', '["Tecido hidrorrepelente","Capuz com visor","Avental impermeável frontal"]'::jsonb, 'Tamanho', false, true, 32, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'conjunto-herbicidas' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-conjunto-herbicidas', 'Conjunto para aplicação de herbicidas', 0 from public.products where slug = 'conjunto-herbicidas'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('uniforme-nr10', (select id from public.categories where slug = 'uniformes'), 'Uniforme NR10', 'Linha profissional', 'Uniforme para eletricistas e serviços com eletricidade, com faixas refletivas e tecido de alta resistência.', '["Proteção contra riscos elétricos","Faixas refletivas","Atende às exigências da NR10"]'::jsonb, 'Tamanho', true, true, 33, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'uniforme-nr10' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-uniforme-nr10', 'Uniforme NR10', 0 from public.products where slug = 'uniforme-nr10'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('uniforme-brim-cinza', (select id from public.categories where slug = 'uniformes'), 'Uniforme de brim cinza', 'Linha profissional', 'Uniforme de brim 100% algodão, leve e resistente, para indústria, construção civil, manutenção e serviços gerais.', '["Brim 100% algodão","Acabamento reforçado","Bolso frontal"]'::jsonb, 'Tamanho', false, true, 34, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'uniforme-brim-cinza' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-uniforme-brim-cinza', 'Uniforme de brim cinza', 0 from public.products where slug = 'uniforme-brim-cinza'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('uniforme-brim-azul', (select id from public.categories where slug = 'uniformes'), 'Uniforme de brim azul royal', 'Linha profissional', 'Uniforme de brim 100% algodão na cor azul royal, para indústria, construção civil, manutenção e serviços gerais.', '["Brim 100% algodão","Acabamento reforçado","Bolso frontal"]'::jsonb, 'Tamanho', false, true, 35, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'uniforme-brim-azul' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-uniforme-brim-azul', 'Uniforme de brim azul royal', 0 from public.products where slug = 'uniforme-brim-azul'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('protetor-auditivo-plug', (select id from public.categories where slug = 'auditiva'), 'Protetor auditivo plug de silicone', 'Protect Plug', 'Protetor tipo plug de silicone, com cordão e estojo, reutilizável.', '["Silicone macio e hipoalergênico","Cordão integrado","Reutilizável"]'::jsonb, null, false, true, 36, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'protetor-auditivo-plug' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-protetor-auditivo-plug', 'Protetor auditivo plug de silicone', 0 from public.products where slug = 'protetor-auditivo-plug'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('protetor-auditivo-concha', (select id from public.categories where slug = 'auditiva'), 'Protetor auditivo tipo concha', 'Linha CR', 'Abafador tipo concha com hastes ajustáveis e conchas acolchoadas, para ruídos intensos.', '["Alta atenuação","Conchas acolchoadas","Hastes ajustáveis"]'::jsonb, null, false, true, 37, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'protetor-auditivo-concha' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-protetor-auditivo-concha', 'Protetor auditivo tipo concha', 0 from public.products where slug = 'protetor-auditivo-concha'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('protetor-concha-capacete', (select id from public.categories where slug = 'auditiva'), 'Protetor auditivo concha para capacete', '3M', 'Protetor tipo concha para acoplar no capacete, para construção civil, indústria e mineração.', '["Acoplamento ao capacete","Alta atenuação","Conchas confortáveis para uso prolongado"]'::jsonb, null, false, true, 38, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'protetor-concha-capacete' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-protetor-concha-capacete', 'Protetor auditivo concha para capacete', 0 from public.products where slug = 'protetor-concha-capacete'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('oculos-steelflex-preto', (select id from public.categories where slug = 'ocular'), 'Óculos de segurança SteelFlex preto', 'SteelFlex', 'Óculos de segurança com lentes escuras e hastes laterais reforçadas.', '["Lentes escuras","Hastes reforçadas"]'::jsonb, null, false, true, 39, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'oculos-steelflex-preto' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/oculos-steelflex-preto-v1.webp', 'Óculos de segurança SteelFlex preto', 0 from public.products where slug = 'oculos-steelflex-preto'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('cinto-paraquedista', (select id from public.categories where slug = 'altura'), 'Cinto paraquedista com talabarte duplo', 'Lifecintos', 'Cinto paraquedista de três pontos com talabarte duplo e absorvedor de energia, para trabalho em altura.', '["3 pontos de ancoragem","Talabarte duplo com absorvedor","Regulagem ajustável","Equipamento certificado"]'::jsonb, null, true, true, 40, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'cinto-paraquedista' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-cinto-paraquedista', 'Cinto paraquedista com talabarte duplo', 0 from public.products where slug = 'cinto-paraquedista'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('linha-limpeza-profissional', (select id from public.categories where slug = 'limpeza'), 'Vassoura profissional', 'Linha CR', 'Vassoura de cerdas densas para áreas internas e externas. A loja também tem baldes, rodos e pás.', '["Cabo de madeira","Cerdas densas","Cabeça larga"]'::jsonb, null, false, true, 41, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'linha-limpeza-profissional' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-vassoura', 'Vassoura profissional', 0 from public.products where slug = 'linha-limpeza-profissional'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('sabao-desengraxante-creme', (select id from public.categories where slug = 'limpeza'), 'Sabão desengraxante e creme protetor', 'Pinheiro e Help Hand', 'Sabão desengraxante que remove graxa e óleo, e cremes protetores que criam uma barreira na pele das mãos.', '["Remove graxa e óleo","Creme protetor para as mãos","Para oficinas e trabalho pesado"]'::jsonb, null, false, true, 42, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'sabao-desengraxante-creme' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-sabao-desengraxante-creme', 'Sabão desengraxante e creme protetor', 0 from public.products where slug = 'sabao-desengraxante-creme'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('protetor-solar-cremes', (select id from public.categories where slug = 'limpeza'), 'Protetor solar e cremes de proteção', 'Sunlau e Help Hand', 'Linha de proteção para quem trabalha exposto ao sol, a agentes químicos e a insetos.', '["Protetor solar FPS 30 e 60","Creme protetor","Repelente"]'::jsonb, null, false, true, 43, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'protetor-solar-cremes' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-protetor-solar-cremes', 'Protetor solar e cremes de proteção', 0 from public.products where slug = 'protetor-solar-cremes'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('extintor-incendio', (select id from public.categories where slug = 'incendio'), 'Extintores de 1, 4 e 6 kg', 'Linha de prevenção', 'Extintores de incêndio para empresas, comércios e residências, com suportes.', '["Capacidades de 1, 4 e 6 kg","Manômetro","Suporte para extintor"]'::jsonb, null, false, true, 44, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'extintor-incendio' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-extintores', 'Extintores de 1, 4 e 6 kg', 0 from public.products where slug = 'extintor-incendio'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-extintores-ig', 'Extintores de 1, 4 e 6 kg', 1 from public.products where slug = 'extintor-incendio'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('placas-sinalizacao', (select id from public.categories where slug = 'incendio'), 'Placas de sinalização', 'Linha de prevenção', 'Placas de advertência, proibição, orientação, emergência e incêndio para indústrias, comércios e condomínios.', '["Advertência e proibição","Orientação e emergência","Incêndio","Cavaletes de piso molhado"]'::jsonb, null, false, true, 45, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'placas-sinalizacao' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-placas-sinalizacao', 'Placas de sinalização', 0 from public.products where slug = 'placas-sinalizacao'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('kit-ambiental', (select id from public.categories where slug = 'incendio'), 'Kit ambiental', 'CR Soluções em EPIs', 'Kit para contenção de vazamentos e emergências ambientais em indústrias, oficinas, transportadoras, postos e operações agrícolas.', '["Contenção de resíduos","Pronto para uso","Ajuda a manter a empresa dentro das normas"]'::jsonb, null, false, true, 46, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'kit-ambiental' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, 'w-kit-ambiental', 'Kit ambiental', 0 from public.products where slug = 'kit-ambiental'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('caixa-ferramentas-stanley', (select id from public.categories where slug = 'ferramentas'), 'Caixa de ferramentas Stanley', 'Stanley', 'Caixa de ferramentas rígida Stanley, com fechos metálicos e alça superior para transporte e organização.', '["Estrutura rígida","Fechos metálicos","Alça superior"]'::jsonb, null, false, true, 47, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'caixa-ferramentas-stanley' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/caixa-ferramentas-stanley-v1.webp', 'Caixa de ferramentas Stanley', 0 from public.products where slug = 'caixa-ferramentas-stanley'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('bota-pvc-sola-amarela', (select id from public.categories where slug = 'calcados'), 'Bota de PVC com solado amarelo', 'Linha profissional', 'Bota de PVC cano longo com biqueira reforçada e solado amarelo de alta visibilidade, para áreas molhadas, obras e limpeza pesada.', '["Impermeável","Solado antiderrapante","Cano longo"]'::jsonb, null, false, true, 48, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'bota-pvc-sola-amarela' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/bota-pvc-sola-amarela.webp', 'Bota de PVC com solado amarelo', 0 from public.products where slug = 'bota-pvc-sola-amarela'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('bota-pvc-cano-forrado', (select id from public.categories where slug = 'calcados'), 'Bota de PVC com perneira de nylon', 'Linha profissional', 'Bota de PVC azul com perneira de nylon e cordão de ajuste no cano, que impede a entrada de água, lama e resíduos.', '["Perneira com cordão de ajuste","Impermeável","Solado antiderrapante"]'::jsonb, null, false, true, 49, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'bota-pvc-cano-forrado' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/bota-pvc-cano-forrado.webp', 'Bota de PVC com perneira de nylon', 0 from public.products where slug = 'bota-pvc-cano-forrado'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('bota-soft-works-preta', (select id from public.categories where slug = 'calcados'), 'Bota Soft Works preta', 'Soft Works', 'Bota de borracha de cano médio, leve e confortável, para indústria alimentícia, limpeza e áreas úmidas.', '["Leve e flexível","Fácil de higienizar","Solado antiderrapante"]'::jsonb, null, false, true, 50, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'bota-soft-works-preta' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/bota-soft-works-preta.webp', 'Bota Soft Works preta', 0 from public.products where slug = 'bota-soft-works-preta'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('bota-soft-works-branca', (select id from public.categories where slug = 'calcados'), 'Bota Soft Works branca', 'Soft Works', 'Bota branca de cano médio para indústria alimentícia, frigoríficos, cozinhas e serviços de saúde.', '["Cor branca para áreas limpas","Fácil de higienizar","Solado antiderrapante"]'::jsonb, null, false, true, 51, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'bota-soft-works-branca' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/bota-soft-works-branca.webp', 'Bota Soft Works branca', 0 from public.products where slug = 'bota-soft-works-branca'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('capacete-abafador-acoplado', (select id from public.categories where slug = 'capacetes'), 'Capacete com abafador acoplado', 'Linha profissional', 'Capacete branco com protetor auditivo tipo concha acoplado, para atividades que exigem proteção da cabeça e da audição ao mesmo tempo.', '["Abafador acoplado","Conchas reguláveis","Proteção da cabeça e audição"]'::jsonb, null, false, true, 52, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'capacete-abafador-acoplado' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/capacete-abafador-acoplado.webp', 'Capacete com abafador acoplado', 0 from public.products where slug = 'capacete-abafador-acoplado'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('luva-impacto-super-safety', (select id from public.categories where slug = 'luvas'), 'Luva de impacto Super Safety', 'Super Safety', 'Luva tricotada com proteções de TPR no dorso e banho na palma, para montagem, mineração, petróleo e manuseio pesado.', '["Proteção contra impactos no dorso","Palma emborrachada","Ótima pegada"]'::jsonb, null, false, true, 53, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'luva-impacto-super-safety' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/luva-impacto-super-safety.webp', 'Luva de impacto Super Safety', 0 from public.products where slug = 'luva-impacto-super-safety'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('luva-impacto-amarela', (select id from public.categories where slug = 'luvas'), 'Luva de impacto com dorso amarelo', 'Linha profissional', 'Luva tricotada com proteções amarelas no dorso e palma revestida, para manuseio de peças e ferramentas pesadas.', '["Dorso reforçado","Palma revestida","Boa destreza"]'::jsonb, null, false, true, 54, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'luva-impacto-amarela' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/luva-impacto-amarela.webp', 'Luva de impacto com dorso amarelo', 0 from public.products where slug = 'luva-impacto-amarela'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('luva-nitrilica-preta-tricotada', (select id from public.categories where slug = 'luvas'), 'Luva tricotada com nitrílico preta', 'Linha profissional', 'Luva de malha com banho nitrílico na palma, resistente a óleo e abrasão, para mecânica, montagem e manutenção.', '["Banho nitrílico","Resistente a óleo","Punho em malha"]'::jsonb, null, false, true, 55, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'luva-nitrilica-preta-tricotada' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/luva-nitrilica-preta-tricotada.webp', 'Luva tricotada com nitrílico preta', 0 from public.products where slug = 'luva-nitrilica-preta-tricotada'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('luva-latex-verde-tricotada', (select id from public.categories where slug = 'luvas'), 'Luva tricotada com látex verde', 'Linha profissional', 'Luva de algodão com banho de látex corrugado na palma, ideal para construção civil, carga e descarga.', '["Látex corrugado","Alta aderência","Boa ventilação no dorso"]'::jsonb, null, false, true, 56, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'luva-latex-verde-tricotada' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/luva-latex-verde-tricotada.webp', 'Luva tricotada com látex verde', 0 from public.products where slug = 'luva-latex-verde-tricotada'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('luva-anticorte-volk', (select id from public.categories where slug = 'luvas'), 'Luva anticorte Volk', 'Volk do Brasil', 'Luva tricotada anticorte com pontos de borracha, para manuseio de chapas, vidros e peças com bordas cortantes.', '["Proteção contra cortes","Pontos antiderrapantes","Ajuste firme"]'::jsonb, null, false, true, 57, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'luva-anticorte-volk' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/luva-anticorte-volk.webp', 'Luva anticorte Volk', 0 from public.products where slug = 'luva-anticorte-volk'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('luva-termica-latex-azul', (select id from public.categories where slug = 'luvas'), 'Luva térmica com látex azul', 'Linha profissional', 'Luva com forro térmico e banho de látex azul, para câmaras frias, trabalho em clima frio e manuseio de peças úmidas.', '["Forro térmico","Látex de alta aderência","Punho alto visível"]'::jsonb, null, false, true, 58, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'luva-termica-latex-azul' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/luva-termica-latex-azul.webp', 'Luva térmica com látex azul', 0 from public.products where slug = 'luva-termica-latex-azul'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('luva-raspa-solda-volk', (select id from public.categories where slug = 'luvas'), 'Luva de raspa para solda Weld Smart', 'Volk do Brasil', 'Luva de raspa de couro com cano longo e reforço na palma, para soldagem e trabalhos com fagulhas e calor.', '["Couro de raspa","Cano longo","Reforço na palma"]'::jsonb, null, false, true, 59, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'luva-raspa-solda-volk' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/luva-raspa-solda-volk.webp', 'Luva de raspa para solda Weld Smart', 0 from public.products where slug = 'luva-raspa-solda-volk'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('luva-nitrilica-superglove', (select id from public.categories where slug = 'luvas'), 'Luva nitrílica Superglove Mechanics', 'Supermax', 'Caixa de luvas nitrílicas de alta resistência com textura diamante, para mecânica, oficinas e manutenção.', '["Textura para pegada","Resistente a óleos","Caixa com 50 unidades"]'::jsonb, null, false, true, 60, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'luva-nitrilica-superglove' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/luva-nitrilica-superglove.webp', 'Luva nitrílica Superglove Mechanics', 0 from public.products where slug = 'luva-nitrilica-superglove'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('luva-procedimento-supermax', (select id from public.categories where slug = 'luvas'), 'Luva de procedimento Supermax', 'Supermax', 'Luva descartável para procedimentos, limpeza, cozinha e serviços de saúde.', '["Descartável","Ambidestra","Caixa com 100 unidades"]'::jsonb, null, false, true, 61, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'luva-procedimento-supermax' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/luva-procedimento-supermax.webp', 'Luva de procedimento Supermax', 0 from public.products where slug = 'luva-procedimento-supermax'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('luva-vinil-volk', (select id from public.categories where slug = 'luvas'), 'Luva de vinil sem amido', 'Volk do Brasil', 'Luva descartável de vinil sem amido, para manipulação de alimentos, limpeza e procedimentos rápidos.', '["Sem amido","Descartável","Caixa com 100 unidades"]'::jsonb, null, false, true, 62, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'luva-vinil-volk' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/luva-vinil-volk.webp', 'Luva de vinil sem amido', 0 from public.products where slug = 'luva-vinil-volk'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('oculos-sobrepor-incolor', (select id from public.categories where slug = 'ocular'), 'Óculos de sobrepor incolor', 'Linha profissional', 'Óculos de segurança que podem ser usados por cima de óculos de grau, com proteção frontal e lateral.', '["Usa sobre óculos de grau","Proteção lateral","Lente incolor"]'::jsonb, null, false, true, 63, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'oculos-sobrepor-incolor' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/oculos-sobrepor-incolor.webp', 'Óculos de sobrepor incolor', 0 from public.products where slug = 'oculos-sobrepor-incolor'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('oculos-lente-verde', (select id from public.categories where slug = 'ocular'), 'Óculos de segurança lente verde', 'Linha profissional', 'Óculos com lente verde para atividades com luminosidade intensa, como corte e solda leve.', '["Lente verde","Hastes ajustáveis","Leve e confortável"]'::jsonb, null, false, true, 64, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'oculos-lente-verde' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/oculos-lente-verde.webp', 'Óculos de segurança lente verde', 0 from public.products where slug = 'oculos-lente-verde'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('oculos-incolor-armacao-preta', (select id from public.categories where slug = 'ocular'), 'Óculos de segurança incolor com armação preta', 'Linha profissional', 'Óculos incolor com armação preta e proteção lateral para obra, indústria e manutenção.', '["Lente incolor","Proteção lateral","Armação resistente"]'::jsonb, null, false, true, 65, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'oculos-incolor-armacao-preta' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/oculos-incolor-armacao-preta.webp', 'Óculos de segurança incolor com armação preta', 0 from public.products where slug = 'oculos-incolor-armacao-preta'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('oculos-steelflex-espelhado', (select id from public.categories where slug = 'ocular'), 'Óculos SteelFlex espelhado', 'SteelFlex', 'Óculos esportivo com lente espelhada, para trabalho ao ar livre com sol forte.', '["Lente espelhada","Design esportivo","Proteção contra raios UV"]'::jsonb, null, false, true, 66, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'oculos-steelflex-espelhado' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/oculos-steelflex-espelhado.webp', 'Óculos SteelFlex espelhado', 0 from public.products where slug = 'oculos-steelflex-espelhado'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('oculos-steelflex-fume-verde', (select id from public.categories where slug = 'ocular'), 'Óculos SteelFlex fumê com detalhe verde', 'SteelFlex', 'Óculos com lente fumê e hastes com detalhe verde, para trabalho externo e alta luminosidade.', '["Lente fumê","Hastes confortáveis","Proteção contra raios UV"]'::jsonb, null, false, true, 67, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'oculos-steelflex-fume-verde' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/oculos-steelflex-fume-verde.webp', 'Óculos SteelFlex fumê com detalhe verde', 0 from public.products where slug = 'oculos-steelflex-fume-verde'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('oculos-steelflex-branco-azul', (select id from public.categories where slug = 'ocular'), 'Óculos SteelFlex branco e azul', 'SteelFlex', 'Óculos de armação branca com lente azulada, leve e confortável para longas jornadas ao ar livre.', '["Armação leve","Lente azulada","Proteção contra raios UV"]'::jsonb, null, false, true, 68, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'oculos-steelflex-branco-azul' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/oculos-steelflex-branco-azul.webp', 'Óculos SteelFlex branco e azul', 0 from public.products where slug = 'oculos-steelflex-branco-azul'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('oculos-steelflex-fume-espuma', (select id from public.categories where slug = 'ocular'), 'Óculos SteelFlex fumê com espuma', 'SteelFlex', 'Óculos fumê com vedação de espuma ao redor dos olhos, que reduz a entrada de poeira e vento.', '["Vedação de espuma","Lente fumê","Ajuste confortável"]'::jsonb, null, false, true, 69, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'oculos-steelflex-fume-espuma' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/oculos-steelflex-fume-espuma.webp', 'Óculos SteelFlex fumê com espuma', 0 from public.products where slug = 'oculos-steelflex-fume-espuma'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('oculos-steelflex-fume', (select id from public.categories where slug = 'ocular'), 'Óculos SteelFlex fumê armação cinza', 'SteelFlex', 'Óculos fumê com armação cinza, design moderno e proteção para trabalho em áreas abertas.', '["Lente fumê","Armação cinza","Proteção contra raios UV"]'::jsonb, null, false, true, 70, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'oculos-steelflex-fume' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/oculos-steelflex-fume.webp', 'Óculos SteelFlex fumê armação cinza', 0 from public.products where slug = 'oculos-steelflex-fume'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('oculos-vedacao-espuma', (select id from public.categories where slug = 'ocular'), 'Óculos com vedação de espuma azul', 'Linha profissional', 'Óculos incolor com vedação de espuma removível, para ambientes com poeira e partículas em suspensão.', '["Espuma de vedação","Lente incolor","Hastes com detalhe azul"]'::jsonb, null, false, true, 71, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'oculos-vedacao-espuma' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/oculos-vedacao-espuma.webp', 'Óculos com vedação de espuma azul', 0 from public.products where slug = 'oculos-vedacao-espuma'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('oculos-preto-incolor', (select id from public.categories where slug = 'ocular'), 'Óculos incolor armação preta esportiva', 'Linha profissional', 'Óculos com lente incolor e armação preta de linhas esportivas, para uso diário em obra e indústria.', '["Lente incolor","Armação esportiva","Leve e resistente"]'::jsonb, null, false, true, 72, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'oculos-preto-incolor' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/oculos-preto-incolor.webp', 'Óculos incolor armação preta esportiva', 0 from public.products where slug = 'oculos-preto-incolor'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('oculos-ampla-visao-kalipso', (select id from public.categories where slug = 'ocular'), 'Óculos ampla visão Kalipso', 'Kalipso', 'Óculos de ampla visão com elástico ajustável, para respingos de produtos químicos, poeira e partículas.', '["Vedação ao redor dos olhos","Elástico ajustável","Pode ser usado com óculos de grau"]'::jsonb, null, false, true, 73, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'oculos-ampla-visao-kalipso' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/oculos-ampla-visao-kalipso.webp', 'Óculos ampla visão Kalipso', 0 from public.products where slug = 'oculos-ampla-visao-kalipso'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('oculos-macariqueiro-kalipso', (select id from public.categories where slug = 'ocular'), 'Óculos de maçariqueiro Kalipso', 'Kalipso', 'Óculos com lentes escuras para oxicorte, maçarico e solda leve, com elástico ajustável.', '["Lentes escuras","Elástico ajustável","Uso em oxicorte"]'::jsonb, null, false, true, 74, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'oculos-macariqueiro-kalipso' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/oculos-macariqueiro-kalipso.webp', 'Óculos de maçariqueiro Kalipso', 0 from public.products where slug = 'oculos-macariqueiro-kalipso'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('abafador-concha-cinza', (select id from public.categories where slug = 'auditiva'), 'Abafador tipo concha cinza', 'Linha profissional', 'Protetor auditivo tipo concha com arco ajustável e almofadas macias, para uso contínuo em ambientes ruidosos.', '["Arco ajustável","Almofadas macias","Uso contínuo"]'::jsonb, null, false, true, 75, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'abafador-concha-cinza' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/abafador-concha-cinza.webp', 'Abafador tipo concha cinza', 0 from public.products where slug = 'abafador-concha-cinza'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('kit-respirador-3m', (select id from public.categories where slug = 'respiratoria'), 'Kit respirador 3M para serviços gerais', '3M', 'Kit com respirador semifacial e filtros para serviços gerais como pintura, limpeza e manutenção.', '["Respirador semifacial","Filtros inclusos","Uso em pintura e limpeza"]'::jsonb, null, false, true, 76, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'kit-respirador-3m' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/kit-respirador-3m.webp', 'Kit respirador 3M para serviços gerais', 0 from public.products where slug = 'kit-respirador-3m'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('mascara-tripla-prevemax', (select id from public.categories where slug = 'respiratoria'), 'Máscara tripla camada Prevemax', 'Prevemax', 'Máscara descartável de tripla camada com elástico, para uso diário, saúde e manipulação de alimentos.', '["Tripla camada","Descartável","Caixa com 50 unidades"]'::jsonb, null, false, true, 77, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'mascara-tripla-prevemax' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/mascara-tripla-prevemax.webp', 'Máscara tripla camada Prevemax', 0 from public.products where slug = 'mascara-tripla-prevemax'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('colete-salva-vidas-ativa', (select id from public.categories where slug = 'vestimentas'), 'Colete salva-vidas Ativa', 'Ativa', 'Colete salva-vidas laranja com fitas de ajuste, para trabalho próximo à água, barcos e travessias.', '["Alta visibilidade","Fitas de ajuste","Flutuação garantida"]'::jsonb, null, false, true, 78, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'colete-salva-vidas-ativa' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/colete-salva-vidas-ativa.webp', 'Colete salva-vidas Ativa', 0 from public.products where slug = 'colete-salva-vidas-ativa'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('mosquetao-aco', (select id from public.categories where slug = 'altura'), 'Mosquetão de aço com trava', 'Linha profissional', 'Mosquetão de aço com trava de rosca, para ancoragem e conexão de equipamentos de trabalho em altura.', '["Trava de rosca","Aço resistente","Uso em altura"]'::jsonb, null, false, true, 79, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'mosquetao-aco' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/mosquetao-aco.webp', 'Mosquetão de aço com trava', 0 from public.products where slug = 'mosquetao-aco'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('creme-protetor-nutriex', (select id from public.categories where slug = 'limpeza'), 'Creme protetor para as mãos Nutriex', 'Nutriex', 'Creme de proteção grupo 3 para as mãos, que forma barreira contra água, óleo e pintura. Visível sob luz negra.', '["Grupo 3","Água, óleo e pintura","Frasco de 200 g"]'::jsonb, null, false, true, 80, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'creme-protetor-nutriex' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/creme-protetor-nutriex.webp', 'Creme protetor para as mãos Nutriex', 0 from public.products where slug = 'creme-protetor-nutriex'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('protetor-solar-nutriex-fps60', (select id from public.categories where slug = 'limpeza'), 'Protetor solar Nutriex FPS 60', 'Nutriex', 'Protetor solar FPS 60 com repelente, para quem trabalha exposto ao sol.', '["FPS 60","Com repelente","Frasco de 120 ml"]'::jsonb, null, false, true, 81, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'protetor-solar-nutriex-fps60' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/protetor-solar-nutriex-fps60.webp', 'Protetor solar Nutriex FPS 60', 0 from public.products where slug = 'protetor-solar-nutriex-fps60'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('protetor-solar-nutriex-fps30-1l', (select id from public.categories where slug = 'limpeza'), 'Protetor solar Nutriex FPS 30 1 litro', 'Nutriex', 'Protetor solar FPS 30 com repelente em embalagem de 1 litro com válvula, ideal para equipes no campo.', '["FPS 30","Com repelente","Embalagem de 1 litro"]'::jsonb, null, false, true, 82, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'protetor-solar-nutriex-fps30-1l' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/protetor-solar-nutriex-fps30-1l.webp', 'Protetor solar Nutriex FPS 30 1 litro', 0 from public.products where slug = 'protetor-solar-nutriex-fps30-1l'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('cone-sinalizacao', (select id from public.categories where slug = 'sinalizacao'), 'Cone de sinalização', 'Linha profissional', 'Cone laranja com faixas refletivas brancas para isolar áreas, obras e vagas.', '["Faixas refletivas","Base estável","Alta visibilidade"]'::jsonb, null, false, true, 83, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'cone-sinalizacao' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/cone-sinalizacao.webp', 'Cone de sinalização', 0 from public.products where slug = 'cone-sinalizacao'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('bastao-sinalizador', (select id from public.categories where slug = 'sinalizacao'), 'Bastão sinalizador PL 6010', 'Linha profissional', 'Bastão luminoso para orientar o trânsito e sinalizar manobras de veículos e máquinas.', '["Luz de alta visibilidade","Leve","Uso em pátios e vias"]'::jsonb, null, false, true, 84, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'bastao-sinalizador' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/bastao-sinalizador.webp', 'Bastão sinalizador PL 6010', 0 from public.products where slug = 'bastao-sinalizador'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('giroflex-led-vonder', (select id from public.categories where slug = 'sinalizacao'), 'Giroflex LED âmbar Vonder', 'Vonder', 'Sinalizador rotativo de LED na cor âmbar, para veículos, máquinas e áreas de manobra.', '["LED de alto brilho","Cor âmbar","Baixo consumo"]'::jsonb, null, false, true, 85, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'giroflex-led-vonder' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/giroflex-led-vonder.webp', 'Giroflex LED âmbar Vonder', 0 from public.products where slug = 'giroflex-led-vonder'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('fita-antiderrapante-vonder', (select id from public.categories where slug = 'sinalizacao'), 'Fita antiderrapante Vonder', 'Vonder', 'Fita adesiva antiderrapante para escadas, rampas e pisos escorregadios.', '["Superfície abrasiva","Fácil aplicação","50 mm de largura"]'::jsonb, null, false, true, 86, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'fita-antiderrapante-vonder' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/fita-antiderrapante-vonder.webp', 'Fita antiderrapante Vonder', 0 from public.products where slug = 'fita-antiderrapante-vonder'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('cadeado-bloqueio-jgb', (select id from public.categories where slug = 'sinalizacao'), 'Cadeado de bloqueio JGB', 'JGB', 'Cadeado de segurança com corpo isolante para bloqueio e etiquetagem de energia em manutenções (NR10/NR12).', '["Corpo isolante","Haste longa","Bloqueio de energia"]'::jsonb, null, false, true, 87, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'cadeado-bloqueio-jgb' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/cadeado-bloqueio-jgb.webp', 'Cadeado de bloqueio JGB', 0 from public.products where slug = 'cadeado-bloqueio-jgb'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('marcador-industrial', (select id from public.categories where slug = 'manutencao'), 'Marcador industrial', 'Linha profissional', 'Marcador de tinta para metal, madeira, concreto e superfícies ásperas.', '["Alta cobertura","Diversas superfícies","Cores vivas"]'::jsonb, null, false, true, 88, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'marcador-industrial' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/marcador-industrial.webp', 'Marcador industrial', 0 from public.products where slug = 'marcador-industrial'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('fita-veda-rosca-tekbond', (select id from public.categories where slug = 'manutencao'), 'Fita veda rosca Tekbond', 'Tekbond', 'Fita veda rosca para conexões hidráulicas, evitando vazamentos em roscas.', '["Vedação de roscas","Fácil aplicação","Diversas medidas"]'::jsonb, null, false, true, 89, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'fita-veda-rosca-tekbond' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/fita-veda-rosca-tekbond.webp', 'Fita veda rosca Tekbond', 0 from public.products where slug = 'fita-veda-rosca-tekbond'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('durepoxi-loctite', (select id from public.categories where slug = 'manutencao'), 'Durepoxi Loctite', 'Loctite', 'Massa epóxi para colar, vedar e reconstruir peças de metal, madeira, cerâmica e outros materiais.', '["Alta resistência","Moldável","Embalagem de 50 g"]'::jsonb, null, false, true, 90, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'durepoxi-loctite' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/durepoxi-loctite.webp', 'Durepoxi Loctite', 0 from public.products where slug = 'durepoxi-loctite'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('cola-instantanea-tekbond-793', (select id from public.categories where slug = 'manutencao'), 'Cola instantânea Tekbond 793', 'Tekbond', 'Cola instantânea de secagem rápida para reparos em diversos materiais.', '["Secagem rápida","Uso geral","Frasco de 20 g"]'::jsonb, null, false, true, 91, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'cola-instantanea-tekbond-793' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/cola-instantanea-tekbond-793.webp', 'Cola instantânea Tekbond 793', 0 from public.products where slug = 'cola-instantanea-tekbond-793'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('super-lub-loctite', (select id from public.categories where slug = 'manutencao'), 'Super Lub Loctite multiuso', 'Loctite', 'Lubrificante e desengripante multiuso em spray, para soltar peças, lubrificar e proteger contra umidade.', '["Desengripa","Lubrifica","Protege contra umidade"]'::jsonb, null, false, true, 92, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'super-lub-loctite' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/super-lub-loctite.webp', 'Super Lub Loctite multiuso', 0 from public.products where slug = 'super-lub-loctite'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('silicone-acetico-kala', (select id from public.categories where slug = 'manutencao'), 'Silicone acético Kala', 'Kala', 'Silicone acético para vedação de vidros, box, pias e esquadrias.', '["Alta aderência","Resistente à água","Tubo de 280 g"]'::jsonb, null, false, true, 93, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'silicone-acetico-kala' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/silicone-acetico-kala.webp', 'Silicone acético Kala', 0 from public.products where slug = 'silicone-acetico-kala'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('espuma-expansiva-dryko', (select id from public.categories where slug = 'manutencao'), 'Espuma expansiva PU Dryko', 'Dryko', 'Espuma de poliuretano que cola, fixa, isola e preenche vãos em portas, janelas e tubulações.', '["Rendimento expansivo","Isolamento térmico e acústico","Lata de 500 ml"]'::jsonb, null, false, true, 94, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'espuma-expansiva-dryko' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/espuma-expansiva-dryko.webp', 'Espuma expansiva PU Dryko', 0 from public.products where slug = 'espuma-expansiva-dryko'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('tinta-spray-alta-temperatura-vonder', (select id from public.categories where slug = 'manutencao'), 'Tinta spray alta temperatura Vonder', 'Vonder', 'Tinta spray para superfícies quentes como escapamentos, motores, churrasqueiras e fornos.', '["Resiste a altas temperaturas","Secagem rápida","Lata de 350 ml"]'::jsonb, null, false, true, 95, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'tinta-spray-alta-temperatura-vonder' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/tinta-spray-alta-temperatura-vonder.webp', 'Tinta spray alta temperatura Vonder', 0 from public.products where slug = 'tinta-spray-alta-temperatura-vonder'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('tinta-spray-kala-cor', (select id from public.categories where slug = 'manutencao'), 'Tinta spray Kala Cor', 'Kala', 'Tinta spray de uso geral para interno e externo, com secagem rápida e várias cores.', '["Secagem rápida","Uso interno e externo","Lata de 350 ml"]'::jsonb, null, false, true, 96, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'tinta-spray-kala-cor' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/tinta-spray-kala-cor.webp', 'Tinta spray Kala Cor', 0 from public.products where slug = 'tinta-spray-kala-cor'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('cola-contato-cascola', (select id from public.categories where slug = 'manutencao'), 'Adesivo de contato Cascola', 'Cascola', 'Adesivo de contato tradicional para fórmica, couro, borracha, madeira e laminados.', '["Alta aderência","Uso profissional","Lata de 195 g"]'::jsonb, null, false, true, 97, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'cola-contato-cascola' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/cola-contato-cascola.webp', 'Adesivo de contato Cascola', 0 from public.products where slug = 'cola-contato-cascola'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('pasta-solda-vonder', (select id from public.categories where slug = 'manutencao'), 'Pasta para soldar Vonder', 'Vonder', 'Pasta fluxo para soldagem de componentes eletrônicos e fios com estanho.', '["Facilita a soldagem","Uso em eletrônica","Pote de 110 g"]'::jsonb, null, false, true, 98, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'pasta-solda-vonder' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/pasta-solda-vonder.webp', 'Pasta para soldar Vonder', 0 from public.products where slug = 'pasta-solda-vonder'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('aplicador-silicone', (select id from public.categories where slug = 'manutencao'), 'Aplicador de silicone', 'Linha profissional', 'Pistola aplicadora para tubos de silicone, selantes e adesivos em cartucho.', '["Gatilho com alavanca","Estrutura metálica","Uso com cartuchos"]'::jsonb, null, false, true, 99, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'aplicador-silicone' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/aplicador-silicone.webp', 'Aplicador de silicone', 0 from public.products where slug = 'aplicador-silicone'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('lanterna-vonder-recarregavel', (select id from public.categories where slug = 'ferramentas'), 'Lanterna recarregável Vonder', 'Vonder', 'Lanterna recarregável de LED com corpo emborrachado, para manutenção, vigilância e emergências.', '["LED de alto brilho","Recarregável","Corpo emborrachado"]'::jsonb, null, false, true, 100, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'lanterna-vonder-recarregavel' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/lanterna-vonder-recarregavel.webp', 'Lanterna recarregável Vonder', 0 from public.products where slug = 'lanterna-vonder-recarregavel'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('lanterna-vonder-lrv-300l', (select id from public.categories where slug = 'ferramentas'), 'Lanterna Vonder LRV 300L', 'Vonder', 'Lanterna recarregável de LED com cordão para pulso, para uso profissional e doméstico.', '["Recarregável","LED de alto brilho","Cordão de pulso"]'::jsonb, null, false, true, 101, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'lanterna-vonder-lrv-300l' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/lanterna-vonder-lrv-300l.webp', 'Lanterna Vonder LRV 300L', 0 from public.products where slug = 'lanterna-vonder-lrv-300l'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('lanterna-vonder-lrv-400', (select id from public.categories where slug = 'ferramentas'), 'Lanterna Vonder LRV 400', 'Vonder', 'Lanterna recarregável de LED compacta e potente, para manutenção e uso no campo.', '["Recarregável","Compacta","LED de alto brilho"]'::jsonb, null, false, true, 102, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'lanterna-vonder-lrv-400' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/lanterna-vonder-lrv-400.webp', 'Lanterna Vonder LRV 400', 0 from public.products where slug = 'lanterna-vonder-lrv-400'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('lanterna-cabeca-nove54', (select id from public.categories where slug = 'ferramentas'), 'Lanterna de cabeça recarregável Nove54', 'Nove54', 'Lanterna de cabeça de LED recarregável que deixa as mãos livres para trabalhar.', '["Mãos livres","Recarregável","Elástico ajustável"]'::jsonb, null, false, true, 103, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'lanterna-cabeca-nove54' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/lanterna-cabeca-nove54.webp', 'Lanterna de cabeça recarregável Nove54', 0 from public.products where slug = 'lanterna-cabeca-nove54'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('radio-baofeng-bf777s', (select id from public.categories where slug = 'ferramentas'), 'Rádio comunicador Baofeng BF-777S', 'Baofeng', 'Par de rádios comunicadores com bases carregadoras, para equipes de obra, segurança e eventos.', '["Par de rádios","Bases carregadoras","Comunicação entre equipes"]'::jsonb, null, false, true, 104, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'radio-baofeng-bf777s' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/radio-baofeng-bf777s.webp', 'Rádio comunicador Baofeng BF-777S', 0 from public.products where slug = 'radio-baofeng-bf777s'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('alicate-universal-vonder', (select id from public.categories where slug = 'ferramentas'), 'Alicate universal isolado Vonder', 'Vonder', 'Alicate universal com cabo isolado, para cortar, dobrar e segurar fios e peças.', '["Cabo isolado","Corte e pressão","Aço resistente"]'::jsonb, null, false, true, 105, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'alicate-universal-vonder' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/alicate-universal-vonder.webp', 'Alicate universal isolado Vonder', 0 from public.products where slug = 'alicate-universal-vonder'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('ferro-solda-vonder', (select id from public.categories where slug = 'ferramentas'), 'Ferro de solda Vonder 30 W', 'Vonder', 'Ferro de solda de 30 W para eletrônica, fios e pequenos reparos.', '["30 W","Ponta fina","Uso em eletrônica"]'::jsonb, null, false, true, 106, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'ferro-solda-vonder' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/ferro-solda-vonder.webp', 'Ferro de solda Vonder 30 W', 0 from public.products where slug = 'ferro-solda-vonder'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('jogo-chave-allen-vonder', (select id from public.categories where slug = 'ferramentas'), 'Jogo de chaves allen Vonder', 'Vonder', 'Jogo com 9 chaves allen de aço cromo vanádio com ponta abaulada.', '["9 peças","Aço cromo vanádio","Ponta abaulada"]'::jsonb, null, false, true, 107, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'jogo-chave-allen-vonder' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/jogo-chave-allen-vonder.webp', 'Jogo de chaves allen Vonder', 0 from public.products where slug = 'jogo-chave-allen-vonder'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('chave-ajustavel-vonder', (select id from public.categories where slug = 'ferramentas'), 'Chave ajustável Vonder', 'Vonder', 'Chave ajustável (inglesa) de aço forjado com regulagem precisa de abertura.', '["Aço forjado","Abertura regulável","Uso profissional"]'::jsonb, null, false, true, 108, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'chave-ajustavel-vonder' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/chave-ajustavel-vonder.webp', 'Chave ajustável Vonder', 0 from public.products where slug = 'chave-ajustavel-vonder'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('chave-ajustavel-belzer', (select id from public.categories where slug = 'ferramentas'), 'Chave ajustável Belzer 6"', 'Belzer', 'Chave ajustável de 6 polegadas com acabamento fosfatizado e regulagem suave.', '["6 polegadas","Regulagem suave","Acabamento resistente"]'::jsonb, null, false, true, 109, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'chave-ajustavel-belzer' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/chave-ajustavel-belzer.webp', 'Chave ajustável Belzer 6"', 0 from public.products where slug = 'chave-ajustavel-belzer'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('chave-ajustavel-nove54', (select id from public.categories where slug = 'ferramentas'), 'Chave ajustável Nove54 6"', 'Nove54', 'Chave ajustável de 6 polegadas com acabamento cromado para manutenção em geral.', '["6 polegadas","Acabamento cromado","Uso geral"]'::jsonb, null, false, true, 110, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'chave-ajustavel-nove54' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/chave-ajustavel-nove54.webp', 'Chave ajustável Nove54 6"', 0 from public.products where slug = 'chave-ajustavel-nove54'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('multimetro-digital-worker', (select id from public.categories where slug = 'ferramentas'), 'Multímetro digital Worker', 'Worker', 'Multímetro digital com pontas de prova para medir tensão, corrente e resistência.', '["Visor digital","Pontas de prova","Medições elétricas básicas"]'::jsonb, null, false, true, 111, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'multimetro-digital-worker' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/multimetro-digital-worker.webp', 'Multímetro digital Worker', 0 from public.products where slug = 'multimetro-digital-worker'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('esmerilhadeira-dewalt', (select id from public.categories where slug = 'ferramentas'), 'Esmerilhadeira angular DeWalt DWE4020', 'DeWalt', 'Esmerilhadeira angular de 4 1/2" para corte e desbaste de metais.', '["Disco de 4 1/2\"","Corte e desbaste","Uso profissional"]'::jsonb, null, false, true, 112, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'esmerilhadeira-dewalt' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/esmerilhadeira-dewalt.webp', 'Esmerilhadeira angular DeWalt DWE4020', 0 from public.products where slug = 'esmerilhadeira-dewalt'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('balanca-digital-vonder', (select id from public.categories where slug = 'ferramentas'), 'Balança digital de precisão Vonder 10 kg', 'Vonder', 'Balança digital compacta para pesagem de pequenos objetos até 10 kg.', '["Até 10 kg","Visor digital","Desligamento automático"]'::jsonb, null, false, true, 113, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'balanca-digital-vonder' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/balanca-digital-vonder.webp', 'Balança digital de precisão Vonder 10 kg', 0 from public.products where slug = 'balanca-digital-vonder'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('trena-stanley-5m', (select id from public.categories where slug = 'ferramentas'), 'Trena Stanley 5 m', 'Stanley', 'Trena de 5 metros com trava e clipe para cinto.', '["5 metros","Trava da fita","Clipe para cinto"]'::jsonb, null, false, true, 114, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'trena-stanley-5m' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/trena-stanley-5m.webp', 'Trena Stanley 5 m', 0 from public.products where slug = 'trena-stanley-5m'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('trena-worker-8m', (select id from public.categories where slug = 'ferramentas'), 'Trena Worker 8 m', 'Worker', 'Trena emborrachada de 8 metros com trava e cordão.', '["8 metros","Corpo emborrachado","Trava da fita"]'::jsonb, null, false, true, 115, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'trena-worker-8m' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/trena-worker-8m.webp', 'Trena Worker 8 m', 0 from public.products where slug = 'trena-worker-8m'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('trena-collins-5m', (select id from public.categories where slug = 'ferramentas'), 'Trena ABS Collins 5 m', 'Collins', 'Trena de 5 metros com corpo em ABS e fita de 19 mm.', '["5 metros","Fita de 19 mm","Corpo em ABS"]'::jsonb, null, false, true, 116, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'trena-collins-5m' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/trena-collins-5m.webp', 'Trena ABS Collins 5 m', 0 from public.products where slug = 'trena-collins-5m'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('jogo-trenas-vonder', (select id from public.categories where slug = 'ferramentas'), 'Jogo de trenas Vonder', 'Vonder', 'Jogo com duas trenas Vonder para obra e manutenção.', '["2 trenas","Trava da fita","Clipe para cinto"]'::jsonb, null, false, true, 117, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'jogo-trenas-vonder' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/jogo-trenas-vonder.webp', 'Jogo de trenas Vonder', 0 from public.products where slug = 'jogo-trenas-vonder'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('trena-fibra-50m-nove54', (select id from public.categories where slug = 'ferramentas'), 'Trena de fibra 50 m Nove54', 'Nove54', 'Trena longa de fibra de vidro com 50 metros, para medição de terrenos e obras.', '["50 metros","Fita de fibra","Manivela de recolhimento"]'::jsonb, null, false, true, 118, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'trena-fibra-50m-nove54' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/trena-fibra-50m-nove54.webp', 'Trena de fibra 50 m Nove54', 0 from public.products where slug = 'trena-fibra-50m-nove54'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('estilete-worker', (select id from public.categories where slug = 'ferramentas'), 'Estilete Worker 18 mm', 'Worker', 'Estilete profissional de 18 mm com corpo emborrachado e trava da lâmina.', '["Lâmina de 18 mm","Trava de segurança","Corpo emborrachado"]'::jsonb, null, false, true, 119, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'estilete-worker' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/estilete-worker.webp', 'Estilete Worker 18 mm', 0 from public.products where slug = 'estilete-worker'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('estilete-nove54', (select id from public.categories where slug = 'ferramentas'), 'Estilete Nove54 9 mm', 'Nove54', 'Estilete compacto de 9 mm para cortes precisos em papel, plástico e fitas.', '["Lâmina de 9 mm","Compacto","Trava da lâmina"]'::jsonb, null, false, true, 120, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'estilete-nove54' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/estilete-nove54.webp', 'Estilete Nove54 9 mm', 0 from public.products where slug = 'estilete-nove54'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('estilete-seguranca-starrett', (select id from public.categories where slug = 'ferramentas'), 'Estilete de segurança Starrett', 'Starrett', 'Estilete com retração automática da lâmina, que reduz o risco de cortes acidentais.', '["Retração automática","Corpo metálico","Uso profissional"]'::jsonb, null, false, true, 121, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'estilete-seguranca-starrett' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/estilete-seguranca-starrett.webp', 'Estilete de segurança Starrett', 0 from public.products where slug = 'estilete-seguranca-starrett'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('estilete-seguranca-vonder', (select id from public.categories where slug = 'ferramentas'), 'Estilete de segurança Vonder', 'Vonder', 'Cortador de segurança com lâmina protegida, para abrir caixas, filmes e fitas sem expor a lâmina.', '["Lâmina protegida","Abre caixas e filmes","Ergonômico"]'::jsonb, null, false, true, 122, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'estilete-seguranca-vonder' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/estilete-seguranca-vonder.webp', 'Estilete de segurança Vonder', 0 from public.products where slug = 'estilete-seguranca-vonder'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('canivete-inox-kala', (select id from public.categories where slug = 'ferramentas'), 'Canivete inox Kala', 'Kala', 'Canivete com lâmina de aço inox e cabo com acabamento em madeira.', '["Lâmina inox","Cabo em madeira","Dobrável"]'::jsonb, null, false, true, 123, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'canivete-inox-kala' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/canivete-inox-kala.webp', 'Canivete inox Kala', 0 from public.products where slug = 'canivete-inox-kala'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('bainha-couro-canivete', (select id from public.categories where slug = 'ferramentas'), 'Bainha de couro para canivete', 'Linha profissional', 'Bainha de couro trabalhado com botão de fechamento e passador para cinto.', '["Couro legítimo","Botão de pressão","Passador para cinto"]'::jsonb, null, false, true, 124, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'bainha-couro-canivete' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/bainha-couro-canivete.webp', 'Bainha de couro para canivete', 0 from public.products where slug = 'bainha-couro-canivete'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('facao-bainha-couro', (select id from public.categories where slug = 'ferramentas'), 'Bainha de couro para facão', 'Linha profissional', 'Bainha de couro trabalhado com costura reforçada para facões de até 14 polegadas. O facão também está disponível na loja.', '["Couro legítimo","Costura reforçada","Passador para cinto"]'::jsonb, null, false, true, 125, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'facao-bainha-couro' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/facao-bainha-couro.webp', 'Bainha de couro para facão', 0 from public.products where slug = 'facao-bainha-couro'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('pedra-afiar-carborundum', (select id from public.categories where slug = 'ferramentas'), 'Pedra de afiar Carborundum', 'Carborundum', 'Pedra combinada de dupla granulação para afiar facas, facões e ferramentas de corte.', '["Dupla granulação","Afiação e acabamento","Uso doméstico e profissional"]'::jsonb, null, false, true, 126, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'pedra-afiar-carborundum' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/pedra-afiar-carborundum.webp', 'Pedra de afiar Carborundum', 0 from public.products where slug = 'pedra-afiar-carborundum'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('tesouras-multiuso', (select id from public.categories where slug = 'ferramentas'), 'Tesoura multiuso', 'Vonder / Worker', 'Tesouras multiuso de aço inox com cabo emborrachado, para cortes de papel, plástico, tecido e fitas.', '["Lâminas de aço inox","Cabo emborrachado","Uso geral"]'::jsonb, null, false, true, 127, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'tesouras-multiuso' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/tesouras-multiuso.webp', 'Tesoura multiuso', 0 from public.products where slug = 'tesouras-multiuso'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('tesoura-poda-robust', (select id from public.categories where slug = 'ferramentas'), 'Tesoura de poda Robust', 'Robust', 'Tesoura de poda com lâminas de aço e cabo laranja, para jardinagem e pomares.', '["Lâminas de aço","Mola de retorno","Trava de segurança"]'::jsonb, null, false, true, 128, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'tesoura-poda-robust' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/tesoura-poda-robust.webp', 'Tesoura de poda Robust', 0 from public.products where slug = 'tesoura-poda-robust'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('tesoura-poda-cerca-viva', (select id from public.categories where slug = 'ferramentas'), 'Tesoura para cerca viva', 'Linha profissional', 'Tesoura de lâmina longa com cabos de madeira, para aparar cercas vivas e arbustos.', '["Lâminas longas","Cabos de madeira","Corte uniforme"]'::jsonb, null, false, true, 129, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'tesoura-poda-cerca-viva' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/tesoura-poda-cerca-viva.webp', 'Tesoura para cerca viva', 0 from public.products where slug = 'tesoura-poda-cerca-viva'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('kit-jardinagem-vonder', (select id from public.categories where slug = 'ferramentas'), 'Kit de jardinagem Vonder', 'Vonder', 'Kit de ferramentas manuais para jardinagem com cabos de madeira.', '["Cabos de madeira","Peças para plantio","Uso em jardins e vasos"]'::jsonb, null, false, true, 130, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'kit-jardinagem-vonder' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/kit-jardinagem-vonder.webp', 'Kit de jardinagem Vonder', 0 from public.products where slug = 'kit-jardinagem-vonder'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('serrote-vonder', (select id from public.categories where slug = 'ferramentas'), 'Serrote Vonder', 'Vonder', 'Serrote com cabo ergonômico bimaterial, para cortes em madeira.', '["Dentes temperados","Cabo ergonômico","Corte em madeira"]'::jsonb, null, false, true, 131, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'serrote-vonder' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/serrote-vonder.webp', 'Serrote Vonder', 0 from public.products where slug = 'serrote-vonder'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('lamina-rocadeira-3-pontas-vonder', (select id from public.categories where slug = 'ferramentas'), 'Lâmina 3 pontas para roçadeira Vonder', 'Vonder', 'Lâmina de 3 pontas com 255 mm para roçadeiras, para mato alto e vegetação densa.', '["3 pontas","255 mm","Aço temperado"]'::jsonb, null, false, true, 132, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'lamina-rocadeira-3-pontas-vonder' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/lamina-rocadeira-3-pontas-vonder.webp', 'Lâmina 3 pontas para roçadeira Vonder', 0 from public.products where slug = 'lamina-rocadeira-3-pontas-vonder'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('lamina-rocadeira-vonder', (select id from public.categories where slug = 'ferramentas'), 'Lâmina 2 pontas para roçadeira Vonder', 'Vonder', 'Lâmina de 2 pontas para roçadeiras, para capina e limpeza de terrenos.', '["2 pontas","Aço temperado","Uso em roçadeiras"]'::jsonb, null, false, true, 133, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'lamina-rocadeira-vonder' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/lamina-rocadeira-vonder.webp', 'Lâmina 2 pontas para roçadeira Vonder', 0 from public.products where slug = 'lamina-rocadeira-vonder'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('broca-sds-worker', (select id from public.categories where slug = 'ferramentas'), 'Broca SDS Plus Worker', 'Worker', 'Broca SDS Plus para concreto e alvenaria em marteletes.', '["Encaixe SDS Plus","Concreto e alvenaria","Ponta de metal duro"]'::jsonb, null, false, true, 134, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'broca-sds-worker' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/broca-sds-worker.webp', 'Broca SDS Plus Worker', 0 from public.products where slug = 'broca-sds-worker'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('mangueira-suporte-vonder', (select id from public.categories where slug = 'ferramentas'), 'Mangueira com suporte Vonder', 'Vonder', 'Mangueira laranja com suporte enrolador de piso, prática para guardar e transportar.', '["Suporte enrolador","Mangueira flexível","Fácil de transportar"]'::jsonb, null, false, true, 135, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'mangueira-suporte-vonder' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/mangueira-suporte-vonder.webp', 'Mangueira com suporte Vonder', 0 from public.products where slug = 'mangueira-suporte-vonder'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('cantil-militar', (select id from public.categories where slug = 'ferramentas'), 'Cantil com capa', 'Linha profissional', 'Cantil preto com capa de nylon e alça para cinto, para trabalho no campo e longas jornadas.', '["Capa de nylon","Alça para cinto","Tampa rosqueável"]'::jsonb, null, false, true, 136, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'cantil-militar' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/cantil-militar.webp', 'Cantil com capa', 0 from public.products where slug = 'cantil-militar'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/cantil-militar-2.webp', 'Cantil com capa', 1 from public.products where slug = 'cantil-militar'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('garrafao-termico-soprano', (select id from public.categories where slug = 'ferramentas'), 'Garrafão térmico Soprano Aspen 12 L', 'Soprano', 'Garrafão térmico de 12 litros com torneira, para manter água fresca para a equipe.', '["12 litros","Torneira frontal","Alça de transporte"]'::jsonb, null, false, true, 137, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'garrafao-termico-soprano' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/garrafao-termico-soprano.webp', 'Garrafão térmico Soprano Aspen 12 L', 0 from public.products where slug = 'garrafao-termico-soprano'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;
insert into public.products (slug, category_id, name, brand, description, features, size_hint, featured, active, sort_order, source)
  values ('repelente-roedores-solar', (select id from public.categories where slug = 'ferramentas'), 'Repelente solar ultrassônico', 'Linha profissional', 'Repelente ultrassônico com placa solar para afastar roedores e pragas de quintais, hortas e jardins.', '["Energia solar","Ultrassônico","Uso externo"]'::jsonb, null, false, true, 138, 'site')
  on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, brand = excluded.brand, description = excluded.description, features = excluded.features, size_hint = excluded.size_hint, featured = excluded.featured, sort_order = excluded.sort_order, updated_at = now()
  where public.products.source = 'site';
delete from public.product_images where product_id = (select id from public.products where slug = 'repelente-roedores-solar' and source = 'site');
insert into public.product_images (product_id, path, alt_text, sort_order)
  select id, '/images/catalog/repelente-roedores-solar.webp', 'Repelente solar ultrassônico', 0 from public.products where slug = 'repelente-roedores-solar'
  on conflict (product_id, path) do update set sort_order = excluded.sort_order;

commit;
notify pgrst, 'reload schema';
