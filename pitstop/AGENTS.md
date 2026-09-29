# AGENTS.md · Pitstop Hemissul

Instruções para agentes de código (Codex, Claude Code) que trabalham neste
repositório. Leia inteiro antes da primeira alteração.

## O que é

Web app mobile que roda no navegador quando o motorista escaneia o QR Code
num eletroposto parceiro da Hemissul em Boa Vista (RR). Oferece jogos curtos
enquanto o carro carrega e, no caminho, capta o lead (nome, WhatsApp, se roda
por aplicativo, se a proteção atual cobre uso por aplicativo) e leva à cotação.

Cliente: Hemissul, associação de proteção veicular mutualista.
Agência: Metry. Público provável: motorista profissional de aplicativo com
carro elétrico, em intervalo de trabalho, com uma mão no celular.

Detalhes de produto: `docs/PRODUTO.md`. Marca: `docs/BRAND.md`.
Eventos: `docs/EVENTOS.md`. Backend: `docs/BACKEND.md`.

## Stack

- React 19 + Vite, JavaScript (ESM), CSS puro com tokens. Sem framework de UI.
- Vercel: front estático + Vercel Functions em `api/`.
- Testes: Vitest (`npm test`) sobre os motores em `src/games/*/engine.js`.

## Arquitetura (respeite as fronteiras)

```
src/
  games/<jogo>/engine.js   lógica pura do jogo. Sem React, sem DOM, sem Date.now/Math.random direto (recebe rng)
  games/<jogo>/<Jogo>.jsx  interface do jogo: desenha o estado e envia entradas ao motor
  games/registry.js        catálogo (lazy load) e contrato { paused, onScore, onEnd }
  core/lead.js             regras da jornada de captação (etapas, validação, perfis, mensagens)
  core/api.js              envio de lead e ranking, com fila offline
  core/tracking.js         dataLayer (GTM-NGFZ298)
  core/storage.js          localStorage com try/catch
  content/cruzadas.js      grades de palavras cruzadas (conteúdo editável)
  config/pitstop.js        links, WhatsApp, postos
  config/brand.js          paleta oficial em hex para <canvas>
  styles/tokens.css        CÓPIA dos tokens do site oficial. Não editar valores
  styles/app.css           interface do Pitstop
api/lead.js, api/ranking.js  Vercel Functions
```

Regras:

1. **Inteligência dos jogos fica nos `engine.js`.** Mudou regra, pontuação,
   dificuldade ou geração? Altere o motor e o teste em
   `src/games/engines.test.js`. Os componentes `.jsx` só desenham e repassam
   toques. `npm test` precisa passar antes de qualquer commit.
2. **Jornada do lead fica em `core/lead.js`.** O `App.jsx` só orquestra telas.
   A ordem das etapas está documentada no topo do arquivo; não mude sem
   atualizar `docs/PRODUTO.md`.
3. **Novo jogo:** crie `src/games/<id>/engine.js` + `<Nome>.jsx`, registre em
   `registry.js` (lazy), adicione a miniatura em `components/GameArt.jsx`,
   testes no `engines.test.js` e o id em `api/ranking.js` (JOGOS).
4. Cada jogo é carregado sob demanda. Não importe um jogo no bundle principal.

## Padrão visual (obrigatório)

O Pitstop é uma extensão do site oficial www.hemissul.com.br (repositório
`iotiagopace/hemissul`, pasta `hemissul-site`). Fontes de verdade, nesta ordem:

1. `hemissul-site/tokens.css` (copiado em `src/styles/tokens.css`)
2. `hemissul-site/src/index.css` (componentes: botões, nav, foco)
3. Manual de Identidade Visual Hemissul v1.0 (paleta abaixo)

Atenção: `hemissul-site/design.md` e `DOCUMENTACAO-HANDOFF-CLAUDE.md` ainda
citam Bricolage Grotesque + IBM Plex Sans. **Isso está desatualizado.** O site
no ar usa **Neue Montreal** em tudo e a paleta do manual. Siga os tokens.

Resumo aplicado (detalhes em `docs/BRAND.md`):

- Tipografia: Neue Montreal 400, 500 e 700 (arquivos em `public/fonts`).
  Títulos 700 com `letter-spacing: -0.015em`. Rótulos em caixa alta 700 com
  `letter-spacing: 0.1em`. Nada de outra família.
- Cores (proporção do manual): azul institucional `#28325B` 50%, branco 25%,
  azuis secundários (`#1C2441`, `#4F5F9E`, `#7D8CC4`, `#DCE3F3`) 15%, cinzas
  8%, verde `#47AB7F` 2%.
- Fundo claro (`--color-paper`), texto navy (`--color-ink`), azul como acento.
- **Verde só em conversão**: botão de WhatsApp/cotação usa `--color-cta`
  (verde do manual escurecido para contraste AA com texto branco). Não usar
  verde em decoração nem em botões comuns.
- Botões: mesma família do site (`.button-primary`, `.button-cta`): altura
  mínima 3rem, `border-radius: var(--radius-sm)`, peso 500, texto numa linha.
  Aqui: `.btn`, `.btn--primary`, `.btn--cta`, `.btn--quiet`, `.btn--option`.
- Alvos de toque >= 44px. Foco visível (`outline 3px var(--color-focus)`).
- Texto alinhado à esquerda. Sem hero centralizado em tela cheia.
- Cards só quando são destinos (os cards de jogo são destinos). Sem grade de
  três cards iguais, sem ícones gigantes, sem gradiente, sem sombra pesada.
- Logo: `public/brand/logo-azul.png` sobre fundo claro,
  `logo-branca.png` sobre azul. Não recolorir, não distorcer.
- Movimento mínimo; respeitar `prefers-reduced-motion`.
- Canvas dos jogos usa `config/brand.js` (hex da paleta). Não inventar cores.

## Tom de voz e conteúdo

- A Hemissul é **proteção veicular**, associação mutualista. **Nunca** escreva
  "seguro", "seguradora", "apólice" ou "segurado" em nenhum texto.
- Português do Brasil, frases curtas, direto, adulto. O motorista está em
  intervalo de trabalho: nada infantil, nada de "passar o tempo" como promessa.
- Não prometer brinde, prêmio ou sorteio. As recompensas são do jogo
  (recorde, ranking).
- Só publicar fatos confirmados pela Hemissul: assistência 24h, cobertura
  nacional, rastreamento, 13 mil+ veículos protegidos. Nada de preços,
  prazos ou coberturas específicas sem confirmação.
- Jogos com nome e visual próprios. Não usar nomes ou marcas de terceiros
  (ex.: não chamar o Blocos de "Tetris", não usar personagens conhecidos).
- Botões dizem a ação: "Salvar recorde", "Pedir cotação pelo WhatsApp".

## Dados e privacidade

- Nome e telefone só vão para `api/lead.js`. **Nunca** para o dataLayer, logs
  do navegador ou URLs de analytics.
- Aceite LGPD obrigatório no cadastro, com link para
  https://www.hemissul.com.br/privacidade.
- Segredos (webhook, Supabase service role) só em variáveis de ambiente do
  servidor, sem prefixo `VITE_`.

## Requisitos de uso

- Primeira tela visível em até 3 s no 4G. Bundle inicial enxuto: nada de
  biblioteca pesada no carregamento inicial.
- Tela vertical, uma mão, sem som. Todo jogo pode ser pausado.
- Largura base 360 a 430 px. Testar em 360 px.

## Comandos

```bash
npm install
npm run dev      # http://localhost:5173/?posto=01
npm test         # motores e jornada
npm run build
```

As funções em `api/` só rodam na Vercel (ou com `vercel dev`). Localmente o
front trata a ausência delas: o lead vai para uma fila local.

## Antes de abrir PR

- [ ] `npm test` e `npm run build` passando
- [ ] Nenhuma ocorrência de "seguro", "apólice", "seguradora"
- [ ] Nenhuma cor fora dos tokens / `config/brand.js`
- [ ] Nenhum dado pessoal no dataLayer
- [ ] Testado em 360 px de largura
