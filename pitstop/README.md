# Pitstop Hemissul

Jogos rápidos para o motorista que espera a recarga do carro elétrico, com
captação de lead e cotação de proteção veicular. Projeto da Metry para a
Hemissul Proteção Veicular (Boa Vista, RR).

- Jogos: Corrida, Blocos, Sudoku e Palavras cruzadas
- Jornada: primeira partida livre, cadastro para salvar o recorde, perfil em
  duas perguntas, pergunta sobre a proteção atual, cotação por WhatsApp
- Stack: React 19 + Vite, Vercel Functions, Vitest

## Rodar

```bash
npm install
npm run dev     # abre em http://localhost:5173/?posto=01
npm test
npm run build
```

## Publicar na Vercel

1. Suba este repositório no GitHub.
2. Na Vercel: New Project > importar o repositório. Framework: Vite.
3. Environment Variables: `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` (acesso do time em `docs/BACKEND.md`).
4. Domains: adicionar `pitstop.hemissul.com.br` e criar o CNAME no DNS da Hemissul.
5. Gerar um QR Code por posto apontando para `https://pitstop.hemissul.com.br/?posto=<id>`
   e cadastrar o posto em `src/config/pitstop.js`.

## Onde mexer

| Quero... | Arquivo |
| --- | --- |
| Mudar regra ou pontuação de um jogo | `src/games/<jogo>/engine.js` (+ teste) |
| Mudar a aparência de um jogo | `src/games/<jogo>/<Jogo>.jsx` e `src/styles/app.css` |
| Mudar etapas, perguntas ou mensagens | `src/core/lead.js` |
| Nova grade de palavras cruzadas | `src/content/cruzadas.js` |
| Links, WhatsApp, postos | `src/config/pitstop.js` |
| Eventos do GTM | `src/core/tracking.js` e `docs/EVENTOS.md` |

Guia para agentes de código e padrões de marca: [`AGENTS.md`](AGENTS.md).
