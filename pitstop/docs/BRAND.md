# Marca aplicada ao Pitstop

Referência: site oficial www.hemissul.com.br, repositório
`iotiagopace/hemissul` (pasta `hemissul-site`), arquivos `tokens.css` e
`src/index.css`, que implementam o Manual de Identidade Visual Hemissul v1.0.

## Paleta

| Papel | Hex | Token CSS | Uso no Pitstop |
| --- | --- | --- | --- |
| Azul institucional | `#28325B` | `--color-accent` | Botão primário, rótulos, acento de seleção |
| Navy escuro | `#1C2441` | `--color-ink`, `--color-accent-dark` | Texto principal, pista da Corrida, bordas do Sudoku |
| Royal | `#4F5F9E` | `--color-royal`, `--color-focus` | Links, anel de foco, números digitados no Sudoku |
| Periwinkle | `#7D8CC4` | `--color-accent-light` | Hover de card, carros do trânsito |
| Lavanda | `#DCE3F3` | `--color-accent-wash`, `--color-paper-3` | Destaque de palavra/casa, faixas da pista |
| Branco | `#FFFFFF` | `--color-paper-bright` | Superfície de cards e sheets |
| Verde de apoio | `#47AB7F` | `--color-brand-green` | Barra do contador de carga, indicador positivo |
| Verde CTA | verde do manual escurecido | `--color-cta` | **Somente** botão de WhatsApp/cotação |

Proporção do manual: azul 50%, branco 25%, azuis secundários 15%, cinzas 8%,
verde 2%. Se a tela parecer verde, está errada.

O verde puro do manual com texto branco dá contraste 2,84:1 (reprova WCAG). Por
isso o site oficial criou `--color-cta` (mesma matiz, mais escuro, 4,76:1).
Use o mesmo token.

## Tipografia

- Família única: **Neue Montreal** (400 texto, 500 botões e rótulos, 700 títulos).
- Escala do site: `--text-xs` 12 px até `--text-3xl` 48,8 px (razão 1,25).
- Títulos: 700, `letter-spacing: -0.015em`, `text-wrap: balance`.
- Rótulos (eyebrow): 12 px, 700, caixa alta, `letter-spacing: 0.1em`, cor `--color-muted`.
- Números de placar e ranking: `font-variant-numeric: tabular-nums`.

## Componentes equivalentes ao site

| Site oficial | Pitstop | Observação |
| --- | --- | --- |
| `.button-primary` | `.btn.btn--primary` | Azul, texto branco |
| `.button-cta` | `.btn.btn--cta` | Verde CTA, só conversão |
| `.button-secondary` | `.btn.btn--quiet` | Contorno |
| `.site-nav` (vidro, hairline) | `.topbar` | Mesmo fundo translúcido e borda |
| Foco global | igual | `outline 3px var(--color-focus)` + offset 3px |

Raios: `--radius-sm` (0,375rem) em botões e campos, `--radius-md` em cards,
`--radius-card` em sheets. Bordas hairline `--color-rule`.

## Logo

- `public/brand/logo-azul.png`: fundo claro (padrão do Pitstop).
- `public/brand/logo-branca.png`: fundo azul.
- `public/brand/simbolo-azul.png`: avatar do personagem nas falas.
- Originais em várias resoluções: `hemissul-site/src/assets/logo/`.

## Personagem

Hoje o personagem é o símbolo da Hemissul num balão de fala (componente
`Bubble`). Quando houver ilustração aprovada, substitua a imagem no `Bubble`
sem mudar o texto das falas.

## Display do posto (QR Code)

Peça impressa fora deste repositório, mas com o mesmo sistema: fundo azul
`#28325B`, logo branca, título em Neue Montreal 700, QR Code apontando para
`https://pitstop.hemissul.com.br/?posto=<id>` (um QR por posto).
Chamada sugerida: "Enquanto seu carro carrega, veja se sua proteção acompanha
sua jornada."
