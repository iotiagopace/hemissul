# Auditoria do WordPress atual (hemissul.com.br) + Solução de painel

> Análise feita em modo **somente leitura** via API REST do WordPress (`/wp-json`).
> Nada foi alterado no site atual.

---

## 1. Stack técnico do site atual

| Camada | O que é |
|---|---|
| **Tema** | Hello Elementor |
| **Construção de páginas** | **Elementor Pro + ElementsKit** (page builder visual) |
| **SEO** | Yoast SEO v26.1.1 |
| **Segurança** | Wordfence |
| **Home** | Página estática (ID 39) |
| **Mídia** | `/wp-content/uploads/` (ex.: `2025/08/LOGO-HEMISSUL-1-scaled.webp`) |

### ⚠️ Achado mais importante
O site **não tem tipos de conteúdo estruturados** (não existe CPT de "Depoimentos", "Parceiros", "Banners" etc.). **Todo o conteúdo visual é montado dentro do Elementor.**

Consequência para migração: o Elementor guarda o conteúdo como **layout** (HTML/JSON de builder), não como **dado limpo**. Via API, o `content.rendered` das páginas vem cheio de `<div>`, classes e estilos do Elementor — **não é reaproveitável como conteúdo estruturado**. Só o texto puro e as imagens são recuperáveis.

Ou seja: **manter este WordPress (com Elementor) como painel do site novo (React headless) não é o caminho** — o Elementor não entrega conteúdo estruturado para o front consumir.

---

## 2. Cópia do conteúdo (inventário completo)

### Páginas (10)
| ID | Página | URL |
|---|---|---|
| 39 | Home | `/` |
| 578 | Sobre a Hemissul | `/sobre-a-hemissul/` |
| 681 | Clube de Benefícios | `/clube-de-beneficios/` |
| 726 | Contatos | `/contatos/` |
| 946 | Trabalhe Conosco | `/trabalhe-conosco/` |
| 977 | Área do Associado | `/area-do-associado/` |
| 1025 | Blog | `/blog/` |
| 1043 | Podcast | `/podcast/` |
| 1618 | LP – Proteção Veicular | `/lp-protecao-veicular/` |
| 1865 | protecao-veicular-lp | `/protecao-veicular-lp/` |

### Posts / Blog (4) — já migrados para o site React
| Data | Título |
|---|---|
| 09/06/2026 | Hemissul Conclui Mais Uma Indenização com Sucesso |
| 20/04/2026 | O ANO DA EXPANSÃO: Hemissul chega a Manaus em breve |
| 20/04/2026 | EVENTO AMARR: Páscoa com Propósito |
| 20/04/2026 | CLUB DE BENEFÍCIOS: SKY FIT vantagens exclusivas |

### Segmentos na LP (copy de conversão — já refletida no site novo)
- **Particulares:** "Proteção + Rastreador para veículos particulares"
- **Motoristas de app:** "Proteja agora a sua ferramenta de trabalho / Trabalhe sem preocupações"
- **Frotistas:** "Proteja sua frota / Proteção completa para frotistas"
- **Motos:** "Proteja sua moto / Ande sem preocupação"
- FAQ (SUSEP, cobertura, rastreamento, assistência 24h) — já no site novo.

> A maior parte deste conteúdo **já foi migrada/reescrita** no site React ao longo das últimas rodadas. O que existe de exclusivo no WP (texto de páginas, imagens em uploads) é recuperável, mas **não a diagramação** (que é Elementor e foi substituída pelo layout React aprovado).

---

## 3. Solução ideal para o painel

O site novo é **React/Vite** (layout aprovado, inegociável) hospedado na Vercel. O painel precisa **alimentar os "slots" de conteúdo do site React**, não recriar layout.

### ❌ O que NÃO fazer
- **Reaproveitar o WordPress atual com Elementor como painel headless.** O Elementor é layout-first; não entrega dado estruturado. Misturar Elementor + headless vira um Frankenstein.
- **Recriar o site como tema WordPress.** Jogaria fora o layout React.

### ✅ Recomendado: WordPress headless **LIMPO** (sem Elementor) + ACF

Um WordPress **enxuto**, focado só em conteúdo, com **ACF (Advanced Custom Fields)** modelando os campos que o site React consome. O cliente continua no wp-admin (que já conhece), mas editando **campos estruturados**, não páginas Elementor.

**Modelo de conteúdo (CPTs/campos via ACF):**
| Tipo | Campos |
|---|---|
| **Banners do Hero** | tipo (vídeo/imagem), mídia, eyebrow, título, descrição, CTAs, ativo, expira_em |
| **Blog** (nativo do WP) | título, conteúdo, categoria, capa |
| **Podcast** | número, video_id (YouTube), título, descrição, data |
| **Depoimentos** | autor, cargo, cidade, texto, nota, foto |
| **Parceiros do Clube** | nome, logo, categoria |
| **Indenizações** | foto, legenda |
| **FAQ** | grupo, pergunta, resposta |
| **Configurações do site** | telefones, e-mail, endereço, horários, redes sociais, métricas (13 mil, R$ 15 mi) |

**Como funciona:**
```
Cliente edita no wp-admin (campos ACF)
        ↓  /wp-json (API REST)
Site React (Vercel) faz fetch e renderiza no layout aprovado
```

**Plugins:** ACF (ou ACF Pro), CPT UI, WP CORS (liberar o domínio Vercel), WP REST Cache. **Remover** Elementor/ElementsKit do novo ambiente (só peso). Manter Yoast e Wordfence.

**Hospedagem:** WordPress num subdomínio (`cms.hemissul.com.br`) em hosting compartilhado (Hostgator/Hostinger, ~R$ 20–40/mês). O `hemissul.com.br` aponta para o React na Vercel.

**Esforço:** ~2–3 dias (WP limpo + ACF + modelar campos + adaptar componentes React de `src/content/*.js` para `fetch`).

### Alternativas (se não quiser WordPress)
| Opção | Prós | Contras |
|---|---|---|
| **WP headless + ACF** ⭐ | Cliente já conhece WP; barato; hosting comum | 2 hospedagens |
| **Directus / Strapi** | Painel moderno, cria coleções sozinho | Curva nova; precisa VPS |
| **CMS custom** (`hemissul-cms/` já iniciado) | Controle total; MySQL/Supabase/Turso | Eu mantenho o código |

### Caveat de indexação (SEO/IA)
O front React hoje é **SPA**. Para **indexação máxima / buscas de IA** (pedido do cliente), o ideal seria **SSR (Next.js)**. Combo definitivo: **WP headless + Next.js**. Mais esforço (~1 semana), mas é o "melhor dos mundos".

---

## 4. Recomendação final

**WordPress headless limpo + ACF** para o painel — mantém a familiaridade do cliente com WordPress, é barato, e entrega conteúdo estruturado para o site React sem o peso do Elementor. Se indexação for prioridade máxima agora, escalar para **WP headless + Next.js**.

---

## 5. Hospedagem atual (auditoria feita via cPanel — só leitura, nada alterado)

> Verificado com o cliente logado no painel (TurboCloud → cPanel `br.loki1040.com.br`). Nenhuma ação foi executada; apenas visualização de estrutura de arquivos e bancos de dados.

### Ambiente técnico
| Item | Detalhe |
|---|---|
| Painel | cPanel (via revenda TurboCloud) |
| Servidor | `br.loki1040.com.br` |
| Usuário do sistema | `mhymqcfe` |
| **WP Toolkit** | ✅ instalado — gerencia instalações WP com 1 clique (clone, staging, backup, novo site) |
| **Softaculous** | ✅ instalado — auto-instalador alternativo de WordPress |
| Backups | Pasta `wordpress-backups/` na raiz — já existe rotina de backup |
| WordPress atual | Instalado **na raiz** de `public_html` (padrão, sem subpasta) |
| Histórico | Pasta `#OLD (wordpress)` indica uma restauração/migração em 18/10/2025 |

### Bancos de dados MySQL existentes
| Banco | Tamanho | Observação |
|---|---|---|
| `mhymqcfe_novowebemissul` | 214,86 MB | Provável banco do WP em produção hoje |
| `mhymqcfe_wp57503` | 101,33 MB | Instalação WP adicional (possivelmente antiga) |
| `mhymqcfe_wp519` | 2,08 MB | Instalação pequena/vazia |

### Conclusão da auditoria de hospedagem
✅ **A hospedagem atual já suporta 100% a solução recomendada.** Não é preciso trocar de provedor nem pagar hospedagem nova — cPanel + WP Toolkit é exatamente o ambiente ideal para criar um WordPress novo, limpo, num subdomínio, sem tocar no site em produção. **Custo mensal adicional: R$ 0** (a hospedagem já é paga e tem capacidade).

### Achado extra: `cotacao-hemissul/` = PowerCRM (já resolve a integração de CRM)
Dentro de `public_html/cotacao-hemissul/` existe uma landing page estática (HTML + Bootstrap) integrada ao **PowerCRM** (`app.powercrm.com.br`), um SaaS de vendas feito especificamente para associações de proteção veicular. Já está com conta/token configurados (`PowerCRM.init(['H6miS5uldaj08'])`).

- Formulário de cotação em 3 etapas (dados pessoais → veículo/marca/modelo → estado/cidade + "usa em Uber/Aplicativo?").
- **Resolve o pedido da transcrição sobre integração com CRM** — não precisa integrar nada novo.
- É um arquivo estático, **completamente independente do WordPress** — a migração do painel não toca nesse fluxo.
- Lista benefícios mais granulares que vale avaliar incluir no site novo: Incêndio, Fenômenos naturais (granizo/alagamento), Cobertura de vidros, Hospedagem, Guarda do veículo.

---

## 6. Passo a passo técnico — implementação do painel (WP headless + ACF)

### Fase 0 — Preparação (30 min)
1. No cPanel, criar um **subdomínio**: `cms.hemissul.com.br` apontando para uma nova pasta, ex. `public_html/cms/`.
   - Menu lateral → **Domínios** → **Criar um Novo Domínio** → marcar como subdomínio.
2. Criar um **novo banco de dados MySQL** dedicado (não reaproveitar os 3 existentes):
   - `mhymqcfe_hemissul_cms` + usuário dedicado com todas as permissões nesse banco.
3. Confirmar a versão do **PHP** do subdomínio (recomendado PHP 8.1+) em **Selecionar Versão do PHP**.

### Fase 1 — Instalar WordPress limpo (15 min)
1. Via **WP Toolkit** (mais simples que Softaculous): **Instalar** → apontar para `cms.hemissul.com.br` → usar o banco criado na Fase 0.
2. **Não instalar** nenhum tema visual pesado — manter o tema padrão (Twenty Twenty-Four) ou instalar o **Hello Elementor** só pela leveza (sem usar o builder).
3. Definir usuário admin forte (não reaproveitar a senha do site atual).

### Fase 2 — Plugins (20 min)
Instalar via wp-admin → Plugins → Adicionar novo:
| Plugin | Função |
|---|---|
| **Advanced Custom Fields (ACF)** | Criação dos campos estruturados |
| **Custom Post Type UI (CPT UI)** | Criação dos tipos de conteúdo (Banners, Depoimentos, Parceiros, etc.) |
| **ACF to REST API** | Expõe os campos ACF na API REST (`/wp-json/wp/v2/...`) |
| **WP REST Cache** | Cache das respostas da API (performance) |
| **WP CORS** (ou header manual no `.htaccess`) | Libera `hemissul.vercel.app` / `hemissul.com.br` a consumir a API |
| Yoast SEO | manter, se for reaproveitar para o próprio painel (opcional aqui, pouco relevante headless) |

**Não instalar:** Elementor Pro, ElementsKit, Wordfence (redundante — o subdomínio novo não precisa do peso do site principal).

### Fase 3 — Modelar o conteúdo (CPT UI + ACF) — 3 a 4 horas
Criar em **CPT UI** os seguintes tipos de conteúdo customizados:

| CPT (slug) | Nome exibido | Campos ACF |
|---|---|---|
| `hero_banner` | Banners do Hero | tipo (select: vídeo/imagem), mídia (upload), eyebrow (texto), título (texto), descrição (textarea), cta_label_1, cta_link_1, cta_label_2, cta_link_2, ativo (true/false), expira_em (data) |
| `depoimento` | Depoimentos | nome, cargo, cidade, texto (textarea), nota (número 1–5), foto (upload) |
| `parceiro` | Parceiros do Clube | nome, logo (upload), categoria (texto) |
| `episodio_podcast` | Podcast | número, video_id (texto — ID do YouTube), título, descrição, data |
| `indenizacao` | Indenizações | foto (upload), legenda |
| `faq_item` | FAQ | grupo (texto), pergunta, resposta (textarea) |

Usar o **post nativo "Posts"** do WP para o Blog (já vem pronto — título, conteúdo, categoria, imagem destacada).

Criar um **Grupo de Opções** (ACF Options Page) chamado **"Configurações do Site"** com: telefones (assistência, WhatsApp, comercial), e-mail, endereço, horários, links de redes sociais, métricas (veículos protegidos, valor investido em indenizações).

### Fase 4 — Testar a API (30 min)
Validar cada endpoint no navegador, ex.:
```
https://cms.hemissul.com.br/wp-json/wp/v2/hero_banner
https://cms.hemissul.com.br/wp-json/wp/v2/depoimento
https://cms.hemissul.com.br/wp-json/wp/v2/parceiro
https://cms.hemissul.com.br/wp-json/acf/v3/options/configuracoes-do-site
```
Confirmar que os campos ACF aparecem no JSON (usando o plugin "ACF to REST API").

### Fase 5 — Adaptar o site React (1 a 2 dias)
Trocar os arquivos de conteúdo estático por chamadas à API. Principais pontos do código atual que mudam:

| Arquivo atual (estático) | Vira |
|---|---|
| `src/content/homeHero.js` | `fetch('https://cms.hemissul.com.br/wp-json/wp/v2/hero_banner')` dentro de um hook (`useHeroBanners`) |
| `src/content/posts.js` | `fetch('.../wp-json/wp/v2/posts')` (Blog nativo do WP) |
| Depoimentos hardcoded em `Home.jsx` | `fetch('.../wp-json/wp/v2/depoimento')` |
| Logos de parceiros em `ClubeBeneficios.jsx` | `fetch('.../wp-json/wp/v2/parceiro')` |
| Episódios do podcast em `Podcast.jsx` | `fetch('.../wp-json/wp/v2/episodio_podcast')` |
| `SITE` (config/site.js) — telefones, endereço, métricas | `fetch('.../wp-json/acf/v3/options/configuracoes-do-site')` num contexto global, com fallback para os valores estáticos atuais enquanto carrega |

Padrão de implementação: criar uma pasta `src/api/` com uma função por recurso (`getHeroBanners()`, `getTestimonials()`, `getPartners()`, `getPodcastEpisodes()`, `getSiteSettings()`), cada uma com cache leve em memória e fallback para os dados estáticos atuais em caso de erro (garante que o site nunca "quebra" se a API do WP cair).

### Fase 6 — Deploy e corte (30 min)
1. Configurar variável de ambiente na Vercel: `VITE_CMS_URL=https://cms.hemissul.com.br`.
2. Deploy de teste, validar todas as seções puxando do WP.
3. Treinar o cliente no wp-admin (gravação curta de 10–15 min mostrando como editar cada tipo de conteúdo).

### Resumo de esforço e custo
| Fase | Tempo |
|---|---|
| Preparação + instalação WP + plugins | ~1 hora |
| Modelagem ACF/CPT | ~3–4 horas |
| Adaptação do React | ~1–2 dias |
| Testes e corte | ~1 hora |
| **Total** | **~2 dias úteis** |
| **Custo de hospedagem adicional** | **R$ 0** (mesma conta, mesmo plano) |
