# Design — Hemissul

Sistema visual unificado para o site institucional. As páginas devem ampliar este
sistema, não criar temas independentes.

## Genre

Editorial contemporâneo, institucional e humano.

## Macrostructure family

- Marketing: Photographic + Split Diptych, com fotografia real e composição assimétrica.
- Serviço: Long Document, com orientação clara e ações operacionais visíveis.
- Conteúdo: Editorial, com leitura contínua e poucos elementos de interface.

## Theme

- `--color-paper`: `oklch(97% 0.010 245)`
- `--color-paper-2`: `oklch(94% 0.016 245)`
- `--color-ink`: `oklch(20% 0.035 245)`
- `--color-ink-2`: `oklch(34% 0.030 245)`
- `--color-rule`: `oklch(82% 0.020 245)`
- `--color-muted`: `oklch(42% 0.022 245)`
- `--color-accent`: `oklch(56% 0.170 245)`
- `--color-focus`: `oklch(24% 0.180 245)`

## Typography

- Display: Bricolage Grotesque, peso 700.
- Body: IBM Plex Sans, pesos 400–600.
- Display tracking: `-0.045em`.
- Escala: razão aproximada de 1.25, com display fluido.

## Spacing

Escala nominal de 4 pontos definida em `tokens.css`. Evitar repetição de
espaçamento idêntico entre todas as seções.

## Motion

- Movimento mínimo: apenas estado de botões e abertura do menu.
- Easings nomeados em `tokens.css`.
- `prefers-reduced-motion` reduz tudo a mudanças instantâneas ou até 150 ms.

## CTA voice

- Primário: azul Hemissul, cantos discretos, verbo direto.
- Secundário: link tipográfico sublinhado ou botão de contorno.
- Nenhum CTA pode quebrar em duas linhas.

## What pages MUST share

- Azul Hemissul usado com parcimônia.
- Bricolage Grotesque + IBM Plex Sans.
- Fotografia real, texto alinhado à esquerda e ritmo assimétrico.
- Foco visível e alvos de toque de pelo menos 44 px.

## What pages MUST avoid

- Hero centralizado em tela cheia.
- Grade de três cards iguais.
- Palavra final azul em todos os títulos.
- Eyebrow decorativa em todas as seções.
- Footer de quatro colunas com aparência de template.

## Exports

### tokens.css

O arquivo [`tokens.css`](tokens.css) na raiz é a fonte de verdade para cores,
tipografia, espaçamento, movimento e raios.

### Tailwind v4

```css
@theme {
  --color-paper: oklch(97% 0.010 245);
  --color-paper-2: oklch(94% 0.016 245);
  --color-paper-3: oklch(90% 0.022 245);
  --color-ink: oklch(20% 0.035 245);
  --color-ink-2: oklch(34% 0.030 245);
  --color-rule: oklch(82% 0.020 245);
  --color-muted: oklch(42% 0.022 245);
  --color-accent: oklch(56% 0.170 245);
  --font-display: "Bricolage Grotesque", ui-sans-serif, sans-serif;
  --font-body: "IBM Plex Sans", ui-sans-serif, sans-serif;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2.5rem;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### DTCG

```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "color": {
    "paper": { "$value": "oklch(97% 0.010 245)", "$type": "color" },
    "ink": { "$value": "oklch(20% 0.035 245)", "$type": "color" },
    "accent": { "$value": "oklch(56% 0.170 245)", "$type": "color" }
  },
  "font": {
    "display": { "$value": "Bricolage Grotesque", "$type": "fontFamily" },
    "body": { "$value": "IBM Plex Sans", "$type": "fontFamily" }
  }
}
```

### shadcn/ui

```css
:root {
  --background: 97% 0.010 245;
  --foreground: 20% 0.035 245;
  --card: 94% 0.016 245;
  --card-foreground: 20% 0.035 245;
  --primary: 56% 0.170 245;
  --primary-foreground: 98% 0.008 245;
  --muted: 82% 0.020 245;
  --muted-foreground: 42% 0.022 245;
  --border: 82% 0.020 245;
  --ring: 24% 0.180 245;
  --radius: 0.75rem;
}
```
