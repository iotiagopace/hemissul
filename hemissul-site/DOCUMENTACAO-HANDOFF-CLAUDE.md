# Handoff do projeto Hemissul para o Claude

Atualizado em 28 de junho de 2026.

Este documento registra o estado atual do novo site Hemissul, as decisões já
implementadas e os cuidados necessários para continuar o desenvolvimento sem
regredir o trabalho aprovado.

## 1. Estado do projeto

- Produção: `https://hemissul.vercel.app`
- Repositório local: `hemissul/hemissul-site`
- Projeto Vercel: `hemissul`
- Root Directory configurado na Vercel: `hemissul-site`
- Stack: React 19, Vite 8, React Router, Framer Motion e Lucide React.
- O site é uma SPA com carregamento sob demanda das páginas.
- O projeto não possui CMS. Conteúdo frequente é mantido em arquivos de
  configuração e publicado pelo Git/Vercel.
- Existem alterações locais ainda não consolidadas em commit. Antes de editar,
  execute `git status` e preserve o trabalho existente.

## 2. Direção visual aprovada

O site anterior, escuro e baseado em grades repetidas de cards, foi substituído
por um sistema editorial contemporâneo e institucional:

- fundo claro predominante;
- azul Hemissul usado como acento e resposta de interação;
- Bricolage Grotesque nos títulos;
- IBM Plex Sans nos textos;
- fotografia real como principal elemento visual;
- composições assimétricas, listas editoriais, faixas e hairlines;
- áreas escuras apenas para contraste;
- cards somente quando representam destinos ou ações independentes;
- movimento com propósito e suporte a `prefers-reduced-motion`.

Fontes de verdade:

- `design.md`: princípios do sistema visual;
- `tokens.css`: tokens de cor, tipografia, espaçamento, raio e movimento;
- `src/index.css`: implementação do sistema e responsividade;
- `figma-tokens.json`: exportação auxiliar; não é a fonte principal do runtime.

Não transformar páginas internas em temas diferentes e não voltar ao padrão de
grade genérica com ícones grandes. Em páginas de produto, priorizar fotografias
reais e manter a leitura alinhada à esquerda.

## 3. Arquitetura e rotas

O roteamento está em `src/App.jsx`. As páginas são carregadas por
`React.lazy`/`Suspense`.

Rotas públicas:

- `/`
- `/protecao-veicular`
- `/protecao-veicular/carros`
- `/protecao-veicular/motos`
- `/protecao-veicular/caminhoes`
- `/assistencia-24h`
- `/rastreamento-veicular`
- `/aplicativo`
- `/central-do-associado`
- `/comunicar-evento`
- `/quem-somos`
- `/boa-vista-rr`
- `/duvidas-frequentes`
- `/cotacao`
- `/contato`
- `/blog`
- `/blog/:slug`
- `/documentos`
- `/clube-de-beneficios`
- `/podcast`
- `/trabalhe-conosco`
- `/privacidade`
- `/cookies`
- `/termos-de-uso`

Há uma página 404 com `noindex`. Redirecionamentos de URLs antigas e o fallback
da SPA ficam em `vercel.json`.

Componentes globais montados em `src/App.jsx`:

- `Navbar`
- `CampaignBanner`
- `ScrollProgress`
- `RouteSeo`
- `Analytics`
- `WhatsAppFloat`
- `CookieConsent`
- `Footer`

## 4. Home e hero

O hero da Home é full-bleed e funciona como carrossel editorial:

1. primeiro slide: vídeo institucional, que continua sendo o asset principal;
2. segundo slide: promoção vigente de caminhonetes.

Arquivos:

- `src/components/HomeHero.jsx`: comportamento do carrossel;
- `src/content/homeHero.js`: conteúdo, mídia, ações e enquadramento dos slides;
- `public/video/hero-protecao.mp4`: vídeo otimizado;
- `public/video/hero-protecao-poster.jpg`: poster/fallback.

Regras já implementadas:

- rotação automática a cada 9 segundos;
- pausa e reprodução acessíveis;
- vídeo sem áudio, com autoplay, loop e `playsInline`;
- posição de mídia específica para desktop e mobile;
- slide promocional com expiração automática;
- ao expirar a campanha, o vídeo volta a ser o único slide;
- a campanha não deve substituir o vídeo como asset principal.

A campanha vigente está centralizada em `src/config/site.js`:

- título: “Proteja sua caminhonete e ganhe 1 ano de rastreamento.”;
- validade: até 30 de junho de 2026;
- expiração técnica: `2026-07-01T03:00:00.000Z`.

O banner horizontal de campanha foi removido da Home para não duplicar a
mensagem, mas permanece em páginas comerciais relacionadas.

## 5. Navegação

A Navbar foi redesenhada para agrupar “Cotação” e “Menu” em um único controle.
O menu expandido possui:

- animação de entrada;
- grupos editoriais;
- atalhos de proteção e assistência;
- Área do Associado;
- fechamento com `Escape`;
- bloqueio de scroll no fundo;
- hierarquia responsiva;
- rótulo “Menu” visível também no celular.

O WhatsApp flutuante é ocultado enquanto o menu ou o aviso de cookies estiverem
abertos para não criar sobreposição.

Não restaurar o menu hamburger isolado do layout anterior sem revisar a
composição completa.

## 6. Páginas de carros e caminhões

### Carros

Arquivo: `src/pages/ProtecaoCarros.jsx`.

A página agora usa somente fotografia real nos blocos principais:

- Onix real no cabeçalho;
- Gol real em “Carros particulares”;
- HB20 real em “Motoristas de aplicativo”;
- S10 real em “Frotistas”.

As imagens pertencem ao acervo fornecido pela Hemissul e mostram veículos após
reparo. As artes ilustradas e os ícones decorativos foram removidos desse bloco.

### Caminhões

Arquivo: `src/pages/ProtecaoCaminhoes.jsx`.

O acervo Hemissul não contém fotografia própria de caminhão. Para não continuar
usando a ilustração de frotistas e não apresentar uma picape como caminhão, foi
incorporada uma fotografia real de caminhão em movimento:

- arquivo local:
  `src/assets/fotos-reais/caminhao-estrada-unsplash.jpg`;
- autor: Artem Balashevsky;
- fonte:
  `https://unsplash.com/photos/a-white-semi-truck-driving-down-a-rural-road-ZhNYKwjRMh4`;
- licença: Unsplash License, com uso comercial permitido.

Se a Hemissul enviar uma fotografia própria de caminhão, ela deve substituir a
imagem stock mantendo o mesmo enquadramento e texto alternativo adequado.

## 7. Conteúdo e configurações editáveis

### `src/config/site.js`

Centraliza:

- nome e CNPJ;
- URL canônica;
- endereço e horários;
- telefones e WhatsApps;
- links de cotação, Hinova e redes sociais;
- métrica de veículos protegidos;
- Google Tag Manager;
- ativação, conteúdo e validade da campanha.

### `src/content/homeHero.js`

Centraliza os slides da Home, permitindo:

- imagem ou vídeo;
- título, descrição e eyebrow;
- CTA primário e secundário;
- enquadramento desktop/mobile;
- ativação e expiração.

### `src/content/posts.js`

Centraliza os posts atualmente disponíveis no blog.

Para instruções rápidas de manutenção, consulte
`CONTENT-MAINTENANCE.md`.

## 8. Componentes e experiências implementadas

- `BeforeAfterSlider`: comparador de reparos arrastável e operável por teclado;
- `VideoEmbed`: player do YouTube em 16:9 com carregamento sob demanda;
- `AppMockupStory`: mockup do aplicativo com contexto de boletos, atendimento e
  rede credenciada;
- `StoreBadges`: links das lojas;
- `FadeIn`: entrada em viewport;
- `ScrollProgress`: progresso de leitura em azul;
- `ScrollMarquee`: faixa visual vinculada ao scroll;
- `StickyStack`: narrativa empilhada;
- `SocialIcons`: redes sociais;
- `CookieConsent`: consentimento de cookies opcionais;
- `Analytics`: Google Tag Manager somente após consentimento;
- `RouteSeo`: SEO por rota.

O vídeo do aplicativo é
`https://www.youtube.com/watch?v=qC25dUJfqyQ`.

## 9. Integrações e canais

- Cotação oficial/PowerCRM: `https://cotacao.me/B5G8N1Qk`
- Área do associado e recuperação de senha: Hinova/Boreal
- Google Tag Manager: `GTM-5C3GN7RM`, condicionado ao consentimento
- WhatsApp de cotação: `(95) 99138-1037`
- Pronta resposta: `(95) 99157-4355`
- Comercial: `(95) 4020-1719`
- Assistência: `0800 940 2163`
- Instagram, Facebook, YouTube e LinkedIn ficam em `src/config/site.js`
- Rodapé: “Desenvolvido por metry.cc”

Não substituir os links oficiais por formulários simulados. O formulário da
cotação deve descrever corretamente que a continuidade ocorre no canal externo.

## 10. SEO, privacidade e documentos

Já existem:

- title e description por rota;
- canonical;
- Open Graph;
- dados estruturados institucionais;
- `public/robots.txt`;
- `public/sitemap.xml`;
- imagem social;
- redirects das URLs antigas;
- páginas de privacidade, cookies e termos;
- consentimento antes do carregamento de tags opcionais.

As páginas legais precisam de validação jurídica final. Regulamento, estatuto e
termo de adesão não foram inventados: a página de documentos orienta o usuário
a solicitá-los nos canais oficiais até os arquivos serem fornecidos.

Ao migrar o domínio principal, atualizar:

- `SITE.siteUrl` em `src/config/site.js`;
- canonical e metadados em `index.html`;
- `public/robots.txt`;
- `public/sitemap.xml`.

## 11. Responsividade e acessibilidade

O site foi refinado para preservar o conteúdo do desktop no mobile. Cuidados:

- não ocultar imagens ou descrições essenciais em breakpoints pequenos;
- testar pelo menos 320, 375, 390, 414 e 768 px;
- manter alvos de toque com no mínimo 44 px;
- evitar CTAs quebrados em duas linhas;
- manter foco visível;
- preservar `aria-expanded`, `aria-controls` e textos alternativos;
- manter suporte a `prefers-reduced-motion`;
- verificar ausência de overflow horizontal.

## 12. Validação e deploy

Executar antes de publicar:

```bash
npm run lint
npm run build
```

Depois, validar visualmente:

- Home desktop e mobile;
- hero e expiração da campanha;
- menu desktop e mobile;
- `/protecao-veicular/carros`;
- `/protecao-veicular/caminhoes`;
- cotação, FAQ, cookies e WhatsApp;
- console do navegador;
- carregamento e dimensões naturais das imagens;
- overflow horizontal.

O deploy normal ocorre por push na branch de produção. Para deploy manual,
considerando que o repositório Git está um nível acima e a Vercel usa
`hemissul-site` como Root Directory:

```bash
npx vercel deploy .. --prod --yes --project hemissul --scope portfolio-tiago-paces-projects
```

## 13. Regras para continuar sem regressão

1. Execute `git status` antes de editar; há trabalho local em paralelo.
2. Não descarte alterações com reset ou checkout destrutivo.
3. Não recrie o hero antigo dividido ou remova o vídeo principal.
4. Não remova a promoção antes da expiração sem autorização do cliente.
5. Não volte a usar iconografia genérica como imagem principal de carros e
   caminhões.
6. Não use picape como evidência visual de caminhão.
7. Não invente coberturas, números, prazos, parceiros ou documentos.
8. Não carregue o GTM antes do consentimento.
9. Preserve o conteúdo e as ações no mobile.
10. Centralize mudanças frequentes nos arquivos de configuração existentes.
11. Revise `PROMPT-REDESIGN-HEMISSUL.md` para o histórico cronológico completo.

## 14. Pendências dependentes do cliente

- fotografia própria de caminhão;
- validação jurídica das páginas legais;
- arquivos oficiais de regulamento, estatuto e termo de adesão;
- confirmação periódica de contatos, horários, parceiros e números
  institucionais;
- decisão sobre CMS/painel para banners, blog e campanhas futuras;
- troca da URL canônica quando o domínio definitivo apontar para o novo site.

