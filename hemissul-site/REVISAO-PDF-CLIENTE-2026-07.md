# Revisão Hemissul — PDF do cliente (jul/2026)

> Documento de auditoria: cruza cada item pedido pelo cliente (PDF + mensagens no chat) com o que foi de fato implementado no código, commit a commit. Feito para revisão externa (Codex).
>
> Repositório: `hemissul-site/` · Branch: `main` · Deploy: Vercel (auto, a cada push)
> Período coberto: commits `9134c87` → `185bdfc` (10 commits de conteúdo + 1 de limpeza)

---

## 1. Contexto

O cliente enviou um PDF com uma lista numerada de 11 seções para reorganizar a Home, mais uma série de ajustes textuais/visuais item a item (highlights verde/vermelho no próprio PDF). Depois disso, mandou várias correções pontuais direto no chat (cores, espaçamento, menu, paleta). Este documento cobre **só o site principal** (`hemissul.vercel.app`), não a LP separada (`landing.hemissul.com.br`), que o cliente disse estar pronta e não deve ser alterada.

---

## 2. Pedido original do PDF — ordem das 11 seções da Home

| # | Seção pedida | Status | Onde está no código |
|---|---|---|---|
| 01 | Hero com banners/vídeos rodando | ✅ Feito (1 vídeo ativo; 2 banners extras aguardando arquivo do cliente) | `src/components/HomeHero.jsx`, `src/content/homeHero.js` |
| 02 | Apresentação das coberturas | ✅ Feito, layout cards estilo LP | `src/pages/Home.jsx` (`coberturas`), `.coverage-*` em `src/index.css` |
| 03 | Antes e depois | ✅ Feito, sem legenda de modelo, placas com blur | `src/pages/Home.jsx` (`beforeAfterCases`) |
| 04 | Indenizações foto e vídeo | ✅ Feito (fotos em marquee + `VideoTestimonials` já existente) | seção `indemnity-section` em `Home.jsx` |
| 05 | Proteção por cada tipo de veículo | ✅ Feito, 4 cards com foto (Carros, Motorista de app, Motos, Frotas — trocou Caminhões) | `vehicles` em `Home.jsx`, nova página `ProtecaoFrotas.jsx` |
| 06 | Rastreamento | ✅ Feito, seção nova com vídeo embed | seção `tracking-section` em `Home.jsx` |
| 07 | Clube de benefícios | ✅ Feito, teaser com parceiros + CTA | seção `clube-section` em `Home.jsx` |
| 08 | App do associado | ✅ Feito, título "Sua proteção na palma da mão" | seção `app-section` em `Home.jsx` |
| 09 | O que falam nossos associados | ⏸️ Mantido — cliente pediu para **analisar depois** se fica na Home | seção `testimonials-section` em `Home.jsx` |
| 10 | Onde estamos + Dúvidas | ✅ Feito, unidade Manaus incluída | seção `presence-section` em `Home.jsx` |
| 11 | Redes sociais e blog | ✅ Feito, sem embed de Instagram (confirmado explicitamente com o cliente) | seção `home-teasers` em `Home.jsx` |

**Regras transversais do PDF:**
- ✅ Linguagem em 1ª pessoa aplicada nos textos principais (hero, time, antes/depois, indenizações, app, clube)
- ✅ Botão "Fazer cotação" distribuído em cada seção comercial (não colocado em "Onde estamos" nem "Redes/Blog" por decisão de não poluir — não confirmado explicitamente com o cliente, ver pendências)

---

## 3. Itens específicos do PDF, item a item

| Item do PDF | Pedido | Status |
|---|---|---|
| Hero — texto | "Roubo, furto, colisão ou perda total? A Hemissul tem a cobertura completa pra você." | ✅ Aplicado (commit `3646898`) |
| Hero — botão verde | "Fazer cotação (VERDE)" | ✅ Aplicado (commit `cabd678`, depois de ficar laranja por engano no 1º push) |
| Hero — botão laranja emergência | "Incluir botão (laranja) — em caso de acidente ou emergência, clique aqui" → segue proposta do botão já no site | ✅ Aplicado, aponta para `/assistencia-24h` |
| Vídeo de indenizações pós-hero | Seção nova | ⏳ Estrutura pronta, **aguardando vídeo do cliente** |
| Vídeo do time/atendimento | "Time que resolve..." + botão "quero ser um licenciado" | ⏳ Estrutura pronta, **aguardando vídeo**; botão "licenciado" aponta para `/cotacao` como placeholder (cliente confirmou que será página futura) |
| Stats band | Trocar "Desde 2019" → "Sem análise de perfil"; incluir "cadastrada na SUSEP" | ✅ Aplicado — selo SUSEP como badge de destaque abaixo da stats band |
| Coberturas — layout | Seguir modelo da LP (cards com número, ícone, checklist) | ✅ Refeito 2x — 1ª versão simplificada, 2ª versão (commit `75d643b`) replica o header escuro com número translúcido + ícone verde, igual à LP |
| Proteção por tipo — layout | Cards horizontais com foto, 4 segmentos | ✅ Aplicado — Carros particulares, Motorista de aplicativo, Motos, Frotas e empresas |
| Antes/depois — texto | "Reparos feitos com compromisso..." + tirar modelo do carro e placas | ✅ Texto aplicado; placas com blur (`src/assets/antes-depois/*.jpeg` editadas via script Python/Pillow); legenda do modelo (Gol/Ranger/Onix) removida |
| Indenizações — texto | "Histórias reais." + texto de apoio | ✅ Aplicado |
| Rastreamento | Seguir formato do site no ar + vídeo de como funciona + depoimento | ⚠️ Seção nova criada do zero (não existia antes na Home) — vídeo é placeholder (reaproveita o vídeo do app), **aguardando vídeo definitivo** |
| Clube de benefícios | Título "Vantagens exclusivas...", 3-4 parceiros (não a lista toda) | ✅ Reduzido de 8 para 4 parceiros (Objetiva, Santo Remédio, Gaspartinho, JetFast) |
| App do associado | Título "Sua proteção na palma da mão" | ✅ Aplicado |
| "O que falam" | Analisar se mantém na Home | ⏸️ Mantido sem alteração, aguardando decisão do cliente |
| Onde estamos | Incluir unidade Manaus (Av. Tefé, 466, Cachoeirinha) | ✅ Aplicado em: Home (`SITE.units`), `Footer.jsx`, schema.org (`index.html`), `llms.txt` — **sem** telefone/horário próprios (cliente confirmou que só tem o endereço por enquanto) |

---

## 4. Correções feitas via chat (pós-PDF)

| Pedido do cliente (chat) | Commit | O que mudou |
|---|---|---|
| "Consultar regulamento" era engano — remover CTAs, manter só no rodapé | `e684c0c` | Removido botão do header de `/protecao-veicular`, botão "Acessar documentos" da seção Transparência, e item "Documentos" do menu hamburger. Rodapé mantido. |
| Botão de cotação estava laranja, tinha que ser **verde** (o PDF já pedia isso, foi erro nosso não aplicar de primeira) | `cabd678` | Token `--color-cta` trocado de laranja para verde; laranja isolado num token novo `--color-warn`, usado só na CTA de emergência |
| Menu hamburger: trocar "Caminhões" por "Frotas e empresas" | `88bf1d1` | Item do menu atualizado (a página `/protecao-veicular/caminhoes` continua existindo, só não aparece mais no menu principal) |
| Títulos de seção "centralizados para direita"; layout de coberturas abaixo do padrão da LP | `75d643b` | Bug de grid identificado: o eyebrow ocupava a 1ª coluna do grid de 2 colunas (título/texto), empurrando o título. Corrigido para o eyebrow ocupar a linha inteira. Cards de cobertura redesenhados no padrão da LP (header escuro + número translúcido + ícone + checklist verde) |
| "Espaços estranhos" entre seções da Home | `95965e9` | Padding de seção reduzido de `clamp(5-9rem)` para `clamp(3-5rem)`; grids internos e margens de CTA também reduzidos. Gap medido entre CTA de uma seção e título da próxima: ~350px → ~209px (desktop 1440) |
| Logos do clube "correndo e não voltando" no carrossel | `d1efdea` | Bug: com só 4 logos no teaser, metade do trilho da animação ficava mais estreita que a tela, abrindo um vão antes do loop reiniciar. Corrigido repetindo a sequência-base até cobrir telas largas |
| Logos "não centralizadas, não ocupando o espaço" | `e5f0b5c` | Célula do carrossel tinha padding + fundo branco + `object-fit: contain` (a arte 16:9 do parceiro ficava pequena, flutuando). Trocado para célula 16:9 com `object-fit: cover`, preenchendo 100% |
| Aplicar paleta oficial (swatch enviado) em todo o site | `e5f0b5c` | Tokens de cor migrados do azul-ciano genérico para o eixo navy/indigo do swatch (`#212B5B`, `#3A5397`, `#6D83C1`, `#D5DEF0`) + verde de conversão `#00A26F`. Contraste AA conferido nos pares críticos |
| "Cada hero de um tamanho (altura)" no desktop; pedido para conferir mobile também | `185bdfc` | Causa: container usava `min-height`, e o slide 1 (manchete mais longa + botão de emergência exclusivo) esticava o container. Trocado para `height` fixo + manchete com menos quebras de linha (max-width 11-12ch → 18ch). **Mobile também tinha o mesmo bug, mais grave** (conteúdo chegava a ultrapassar em ~100px) — corrigido junto |

---

## 5. Incidente registrado (transparência)

**Commit `88bf1d1`** — ao trocar "Caminhões" por "Frotas e empresas" no menu, um `git add -A .` acidental subiu ~277 arquivos fora do escopo do site: a pasta `arquivos antigos/` (assets legados, incluindo vídeos de até 96MB) e o projeto separado `hemissul-cms/`. GitHub avisou sobre arquivos grandes (>50MB) mas aceitou o push.

**Correção**: commit `bbac995` removeu esses arquivos do controle de versão (`git rm --cached`, sem apagar do disco local) e adicionou `.gitignore` para as pastas `arquivos antigos/`, `hemissul-cms/` e `.claude/`. Repositório está limpo desde então — `git log --stat` de `bbac995` mostra só remoções, sem tocar em código do site.

---

## 6. Pendências (dependem de material do cliente)

- [ ] **2 vídeos novos do hero** — estrutura em `src/content/homeHero.js` pronta para receber, só falta os arquivos
- [ ] **Vídeo de indenizações** (seção pós-hero) — seção existe, sem vídeo ainda
- [ ] **Vídeo do time/atendimento** ("Time que resolve...") — seção ainda não implementada, aguardando o vídeo para definir o layout final
- [ ] **Vídeo definitivo do rastreamento** — hoje usa o vídeo do app como placeholder
- [ ] **Página "Quero ser um licenciado"** — cliente confirmou que será feita no futuro; link aponta para `/cotacao` por ora
- [ ] **Decisão sobre "O que falam nossos associados"** — manter ou remover da Home
- [ ] Confirmar se o cliente quer CTA de cotação também em "Onde estamos" e "Redes/Blog" (hoje propositalmente sem, por decisão nossa de não poluir — **não validado explicitamente**)

## 7. Pontos que merecem checagem do revisor

- A troca de paleta (`e5f0b5c`) foi feita **por aproximação visual** a partir de um screenshot do swatch, não de códigos hex fornecidos pelo cliente — vale confirmar os hex exatos e comparar com os valores OKLCH aplicados em `tokens.css`.
- O selo "Cadastrada na SUSEP" foi implementado como badge de destaque (`home-proof__badge-pill`) — não há CNPJ/registro/link de verificação junto; se houver exigência regulatória de comprovação, pode precisar de mais que um selo visual.
- Página `/protecao-veicular/frotas-empresas` foi criada nova, sem página equivalente na LP de referência — copy e estrutura foram compostos com base no padrão das outras páginas de segmento (`ProtecaoCaminhoes.jsx`, `ProtecaoMotoristaApp.jsx`), não vieram de material do cliente.
- Unidade Manaus está sem telefone, e-mail ou horário próprios no footer/schema — só endereço. Pode gerar inconsistência se um usuário tentar contatar especificamente a unidade de Manaus.
