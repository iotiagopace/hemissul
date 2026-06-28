# Prompt registrado — Redesign Hemissul

Use este documento como briefing obrigatório para continuar o desenvolvimento do
site Hemissul. Ele substitui a direção visual inicialmente gerada a partir do
Figma “AutoLab — Dark Automotive Landing Page”.

## Objetivo

Construir um site institucional contemporâneo, confiável, humano e específico
para a Hemissul — Associação de Proteção Patrimonial Mutualista.

O site não deve parecer:

- template automotivo genérico;
- site de oficina;
- site de seguradora;
- landing page de startup;
- interface produzida por IA com grades repetitivas de cards.

A percepção desejada é de uma associação sólida, próxima, transparente e capaz
de responder quando o associado precisa.

## Mudança central de direção

Abandonar o layout predominantemente escuro, centralizado e baseado em cards
utilizado na primeira versão.

Adotar:

- fundo claro predominante;
- azul Hemissul usado com moderação;
- áreas escuras somente para contraste e serviços importantes;
- composições assimétricas;
- fotografia real;
- títulos alinhados à esquerda;
- listas editoriais e faixas horizontais;
- variação de ritmo entre as seções;
- linguagem visual institucional, local e humana.

## Sistema visual obrigatório

### Cores

Usar os tokens existentes em `tokens.css`.

- Papel principal: `oklch(97% 0.010 245)`
- Papel secundário: `oklch(94% 0.016 245)`
- Texto principal: `oklch(20% 0.035 245)`
- Texto secundário: `oklch(34% 0.030 245)`
- Azul Hemissul: `oklch(56% 0.170 245)`
- Azul escuro: `oklch(43% 0.145 245)`

Não improvisar novas cores diretamente nos componentes. Qualquer cor nova deve
primeiro virar um token semântico.

### Tipografia

- Display e títulos: **Bricolage Grotesque**, peso 700–800.
- Textos e interface: **IBM Plex Sans**, pesos 400–600.
- Títulos grandes com tracking negativo e alinhamento à esquerda.
- Não usar palavras azuis no final de todos os títulos.
- Não retornar para Space Grotesk + Inter como sistema principal.

### Forma

- Botões com cantos discretos, não pills em todos os lugares.
- Hairlines e mudanças de superfície em vez de sombras decorativas.
- Cards somente quando forem semanticamente necessários.
- Nenhum `transition-all`.
- Movimento mínimo e funcional.

## Navbar redesenhada

Substituir a navbar tradicional com vários links em linha por uma navegação
minimalista:

- logo azul à esquerda;
- telefone 0800 visível no desktop;
- CTA “Cotação” sempre acessível;
- botão “Menu”;
- painel escuro expansível com os links organizados em quatro grupos:
  Proteção, Serviços, Associado e Hemissul;
- no mobile, manter Cotação e Menu acessíveis;
- menu com `aria-expanded`, foco visível e área rolável.

Não voltar para o padrão:

`Logo | cinco links | telefone | botão arredondado`.

## Home redesenhada

### 1. Hero assimétrico

- Divisão aproximada de 47% para texto e 53% para imagem.
- Texto alinhado à esquerda em fundo claro.
- Imagem `hero-bg.png` ocupando o painel direito.
- Headline:
  **“Não conte com a sorte. Conte com a Hemissul.”**
- Texto de apoio factual sobre carros, motos e caminhões.
- CTA primário “Fazer cotação”.
- CTA secundário “Acessar área do associado”.
- Legenda da imagem: “Boa Vista, Roraima · Desde 2019”.
- O hero e a navbar devem caber na primeira dobra em desktop.

Não usar novamente:

- hero centralizado;
- overlay preto sobre imagem de fundo;
- heading com última palavra azul;
- barra de estatísticas sobreposta ao rodapé do hero.

### 2. Prova institucional

Apresentar os números em uma faixa tipográfica, sem cards:

- 13 mil+ veículos protegidos;
- R$ 12 mi+ investidos em reparos e indenizações;
- assistência 24 h em todo o Brasil.

Os números devem permanecer sujeitos à validação antes da publicação definitiva.

### 3. Benefícios

Usar lista editorial numerada com divisores:

1. Colisão
2. Roubo e furto
3. Perda total
4. Proteção para terceiros
5. Assistência 24 horas
6. Rastreamento

Não usar grade 3 × 2 de cards iguais com ícone acima do título.

### 4. Modalidades de veículos

Usar uma seção escura com três faixas horizontais:

- Carros
- Motos
- Caminhões

Cada faixa contém número, ícone, título, descrição curta e seta. Não transformar
as modalidades em três cards idênticos.

### 5. Resultados reais

- Usar pares de fotografias “Antes” e “Depois”.
- Priorizar as imagens e reduzir o chrome ao redor.
- Manter o aviso de que cada atendimento segue análise, limites e condições do
  plano contratado.

### 6. Aplicativo

- Composição dividida e assimétrica.
- Mockup do aplicativo em superfície azul-escura.
- Texto claro sobre boletos, benefícios e serviços.
- Link para a página do aplicativo.

### 7. Presença institucional

- Usar a fotografia real da sede em largura ampla.
- Legenda:
  “Uma associação feita em Boa Vista.”
- Reforçar atendimento local e assistência nacional.

### 8. História e proximidade

Bloco textual curto:

- atuação desde 2019;
- regras claras;
- atendimento humano;
- link para “Quem somos”.

### 9. Localização

- Seção escura.
- Endereço completo;
- assistência 24 h;
- WhatsApp de atendimento;
- link para abrir o mapa;
- Google Maps ao lado.

### 10. CTA final

Usar uma composição ampla e clara, alinhada à esquerda:

**“Seu veículo merece um plano para os imprevistos.”**

Botão: “Solicitar cotação”.

Não usar uma seção inteira preenchida com azul vibrante.

## Footer redesenhado

Substituir o footer genérico de quatro colunas por um fechamento de marca:

- grande frase:
  **“Proteção se constrói com presença, clareza e resposta.”**
- três blocos de contato;
- links institucionais em uma faixa flexível;
- redes sociais como links de texto;
- CNPJ;
- disclaimer de associação mutualista.

Não retornar para:

- quatro colunas “Produto / Empresa / Recursos / Legal”;
- fileira de ícones sociais;
- CTA encaixado como mais uma coluna.

## Regras de responsividade

Validar obrigatoriamente em:

- 320 px;
- 375 px;
- 414 px;
- 768 px;
- desktop.

Requisitos:

- nenhuma rolagem horizontal;
- CTAs e links principais nunca quebram em duas linhas;
- alvos de toque com pelo menos 44 px;
- imagens dentro de grids usam `minmax(0, 1fr)`;
- `html` e `body` usam `overflow-x: clip`;
- headings permitem `overflow-wrap: anywhere`;
- menu mobile deve continuar navegável em telas baixas.

## Acessibilidade

- foco visível em todos os elementos interativos;
- contraste mínimo adequado;
- texto escuro sobre o botão azul Hemissul;
- `aria-hidden` em ícones decorativos;
- `aria-expanded` no menu;
- imagens com texto alternativo útil;
- respeitar `prefers-reduced-motion`;
- não depender apenas de cor para comunicar estado.

## Regras de conteúdo

- Hemissul nunca deve ser chamada de seguradora.
- Usar “proteção veicular”, “programa”, “associado” e “regulamento”.
- Não usar “apólice” ou “sinistro”.
- Preservar o disclaimer:
  “A Hemissul não é seguradora. É uma associação de proteção patrimonial
  mutualista.”
- Não inventar métricas, depoimentos ou coberturas.
- Condições e benefícios devem remeter ao regulamento vigente.

## Infraestrutura e deploy

- Stack mantida: React, Vite, Tailwind CSS v4 e React Router.
- O arquivo `vercel.json` contém o rewrite de todas as rotas para `index.html`.
- Isso é obrigatório para que acessos diretos como `/cotacao` não retornem 404.
- Produção atual: `https://hemissul.vercel.app`.

## Arquivos criados

- `design.md`
- `tokens.css`
- `.hallmark/log.json`
- `vercel.json`
- `PROMPT-REDESIGN-HEMISSUL.md`

## Arquivos alterados

- `src/pages/Home.jsx`
- `src/components/Navbar.jsx`
- `src/components/Footer.jsx`
- `src/index.css`
- `index.html`
- `.gitignore`

## Estado atual e continuação

A Home, a navbar e o footer já seguem este novo sistema.

As páginas internas ainda preservam grande parte do layout escuro e dos cards da
versão inicial. Ao refiná-las:

- ler primeiro `design.md`;
- usar os tokens de `tokens.css`;
- manter o mesmo sistema tipográfico e cromático;
- adaptar cada página ao seu propósito;
- não copiar mecanicamente a estrutura da Home;
- não criar um tema diferente para cada rota;
- substituir progressivamente os padrões antigos sem alterar lógica funcional,
  URLs ou conteúdo factual.

## Critério final de aprovação

O resultado deve parecer criado especificamente para uma associação de proteção
patrimonial de Boa Vista, com atuação nacional.

Se a página puder receber o logo de qualquer empresa automotiva sem mudar sua
composição, ela ainda está genérica e precisa ser redesenhada.

## Atualização executada — refinamento integral

Esta seção registra as alterações realizadas depois do redesign inicial da Home.
Ela substitui a observação anterior de que as páginas internas ainda estavam no
tema escuro.

### Componentes e movimento

- Framer Motion foi adicionado ao projeto.
- Foi criado um componente reutilizável de entrada em viewport que respeita
  `prefers-reduced-motion`.
- O movimento horizontal de imagens passou a usar `useScroll`, `useTransform` e
  `useSpring`, sem listener manual de rolagem.
- Foi criado um comparador Antes/Depois arrastável, operável também por teclado.
- Foi criado um player de YouTube com carregamento sob demanda para o vídeo
  `qC25dUJfqyQ`.
- Foram adicionados botões com links reais para Google Play e App Store.

### Imagens e conteúdo real

- Foram reaproveitados os arquivos reais do site antigo: sede, equipe, públicos,
  mockups do aplicativo e seis pares de Antes/Depois.
- A fachada passou a usar enquadramento consistente no sistema de figuras.
- Carros e motos receberam imagens dos públicos correspondentes.
- A página de caminhões deixou de apresentar picapes como se fossem caminhões.
  Como o acervo não contém fotografia real de caminhão, foi usada a ilustração
  institucional de frotistas, sem criar uma evidência visual falsa.
- O conteúdo institucional passou a usar o marco de mais de 13 mil veículos,
  conforme o material legado, sujeito à validação comercial.

### Home e rodapé

- A Home ganhou comparadores Antes/Depois, faixa visual em movimento,
  depoimentos, vídeo do aplicativo, links das lojas e imagens institucionais.
- O rodapé recebeu iconografia e links de redes sociais.
- Foi adicionado “Desenvolvido por metry.cc” com link externo.
- Contatos foram separados entre assistência, pronta resposta, comercial,
  cotação e e-mail.

### Páginas internas refinadas

Todas as rotas abaixo agora usam o sistema claro, a tipografia institucional,
tokens e composição editorial:

- Proteção veicular;
- Proteção para carros;
- Proteção para motos;
- Proteção para caminhões;
- Assistência 24 horas;
- Rastreamento;
- Aplicativo;
- Central do associado;
- Comunicar evento;
- Quem somos;
- Boa Vista — RR;
- Dúvidas frequentes;
- Cotação;
- Contato;
- Blog;
- Documentos.

Grades genéricas foram substituídas por listas editoriais, linhas de contato,
faixas de conteúdo e composições divididas sempre que o conteúdo permitiu.
Cards foram mantidos apenas em ferramentas operacionais em que representam
destinos independentes.

### Correções funcionais e de acessibilidade

- O formulário de cotação agora tem `label`, `name`, `autocomplete`, campos
  responsivos e consentimento obrigatório.
- A cotação não exibe mais a mensagem falsa “Cotação enviada” apenas por abrir o
  WhatsApp. O botão agora descreve a ação correta: “Continuar no WhatsApp”.
- O FAQ usa `aria-expanded`, `aria-controls` e animação de abrir/fechar.
- Ícones decorativos usam `aria-hidden`.
- Foram verificados carregamento de imagens, ausência de overflow horizontal e
  erros de console nas rotas principais.

### Estado técnico validado

- `npm run lint`: aprovado, sem alertas.
- `npm run build`: aprovado.
- Teste visual realizado em desktop e viewport móvel de 390 × 844.
- Home, cotação, FAQ, modalidades, páginas institucionais, contato, blog e
  documentos foram abertos diretamente pelo React Router sem erros.

## Atualização executada — vídeo, movimento e presença do azul

- Corrigida a colisão de CSS que redimensionava e cortava a imagem do player.
- Player e iframe agora usam proporção real de 16:9.
- A capa do YouTube usa `maxresdefault` com fallback automático para
  `hqdefault`.
- As entradas em viewport ganharam mais deslocamento, leve escala e desfoque
  progressivo, mantendo suporte a `prefers-reduced-motion`.
- Foi adicionada uma linha azul de progresso de leitura sincronizada com o
  scroll.
- Cards operacionais, depoimentos e linhas editoriais receberam resposta azul
  no hover, com borda, deslocamento e movimento curto do ícone.
- A imagem solta do mockup foi substituída por uma composição explicativa com
  três ações concretas: boletos, atendimento e rede credenciada.
- A mesma narrativa do mockup foi reutilizada na Home e na página do
  aplicativo.
- Revisão visual confirmada em desktop e 390 × 844, sem overflow horizontal ou
  erros de console.

## Atualização executada — paridade funcional e preparação para migração

Esta etapa compara o novo projeto com o site institucional anterior e recupera
funções, conteúdos e caminhos que não poderiam desaparecer na troca.

### Conversão e autosserviço

- O CTA de cotação passou a abrir o fluxo oficial do PowerCRM, mantendo o
  WhatsApp como alternativa.
- A Central do Associado passou a enviar CPF e senha diretamente ao formulário
  oficial da Hinova, em uma nova aba, e recebeu o link real de recuperação de
  senha.
- O rastreamento deixou de apontar para um link vazio e passou a orientar o
  associado para o aplicativo e para o canal de suporte.
- Foi adicionado um botão flutuante de WhatsApp com contexto de atendimento.

### Conteúdo recuperado

- Foram criadas páginas próprias para Clube de Benefícios, Podcast e Trabalhe
  Conosco.
- O blog passou a exibir os quatro conteúdos públicos encontrados no site
  anterior, com páginas individuais e imagens reais.
- O Clube de Benefícios reutiliza as categorias e marcas presentes no acervo,
  deixando claro que disponibilidade e condições precisam ser confirmadas.
- A página de carreira recebeu vídeo institucional, imagem real da equipe,
  valores e canal para envio de currículo.

### Confiança, consistência e governança

- Informações de contato, endereço, métricas, links oficiais, campanha e
  integrações foram centralizadas em `src/config/site.js`.
- Posts foram centralizados em `src/content/posts.js`.
- Foi removida a data institucional conflitante entre os dois sites; o conteúdo
  agora usa apenas o marco seguro “Desde 2019”.
- Foi removida a métrica financeira sem fonte verificável.
- Depoimentos e identificação dos participantes foram corrigidos conforme o
  conteúdo público anterior.
- O FAQ passou a explicar natureza mutualista, elegibilidade, análise de
  crédito, início da proteção, rateio, carro reserva, rastreamento e atendimento
  nacional sem prometer condições que dependem do plano.

### Privacidade, métricas e documentos

- Foram adicionadas páginas de privacidade, cookies e termos de uso, marcadas
  como conteúdo sujeito à validação jurídica.
- O Google Tag Manager só é carregado depois do consentimento para cookies
  opcionais.
- O aviso de cookies permite aceitar ou recusar os opcionais.
- A área de documentos passou a indicar canais reais para solicitar regulamento,
  termo de adesão e estatuto. Esses documentos não foram inventados porque os
  arquivos oficiais não estavam disponíveis no repositório.

### SEO, rotas e campanha

- Cada rota recebeu título, descrição, canonical, Open Graph e regras de
  indexação adequadas.
- Foram adicionados `robots.txt`, `sitemap.xml`, imagem social e dados
  estruturados institucionais.
- Rotas inexistentes recebem uma página 404 útil e `noindex`.
- URLs relevantes do site anterior receberam redirecionamentos para as novas
  páginas, preservando acesso e histórico de busca.
- A campanha comercial vigente em junho de 2026 ganhou uma faixa com expiração
  automática e aparece somente nas páginas relacionadas a conversão.

### Performance e responsividade

- As páginas passaram a ser carregadas sob demanda com `React.lazy` e
  `Suspense`, reduzindo o JavaScript inicial.
- Imagens institucionais pesadas foram comprimidas sem alterar o conteúdo.
- O layout foi validado nas larguras de 320, 375, 390, 414 e 768 pixels.
- Foi corrigido o bloqueio de largura mínima que causava rolagem horizontal em
  celulares de 320 pixels.

## Atualização executada — paridade entre desktop e mobile

- Foram removidas regras mobile que ocultavam as imagens e descrições das
  modalidades Carros, Motos e Caminhões.
- O conteúdo da Home passou a preservar no celular a mesma hierarquia,
  informações, provas e recursos apresentados no desktop.
- As entradas no scroll foram recalibradas para telas pequenas, com menor
  deslocamento, sem desfoque inicial e gatilho antecipado para evitar áreas
  aparentemente vazias.
- Cards e linhas interativas receberam estados azuis próprios para toque,
  substituindo a dependência exclusiva de `hover`.
- Tipografia, espaçamento, mockup, campanha e blocos editoriais foram ajustados
  para manter presença visual sem alongar excessivamente a página.
- O aviso de cookies foi compactado no celular e os botões passaram a ocupar
  duas colunas, reduzindo a obstrução do conteúdo.
- Os SVGs sociais passaram a transformar corretamente a propriedade `size` em
  largura e altura, corrigindo o botão flutuante de WhatsApp vazio no mobile.
