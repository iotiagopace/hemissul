# Banners do hero da Home

Coloque aqui as artes de banner do carrossel do topo da Home.

Os arquivos são servidos direto pela raiz do site, então o caminho usado em
`src/content/homeHero.js` é `/banners/nome-do-arquivo.jpg` (sem `public/`).

## Especificação

| Item | Valor |
|---|---|
| Resolução | 1920 × 1080 px (16:9 — o horizontal, não o de story) |
| Formato | `.webp` (o PNG de origem costuma ter 3-4 MB, pesado demais) |
| Peso alvo | até 400 KB — acima disso o hero demora a aparecer |
| Área de texto | o terço esquerdo fica coberto pelo título e pelos botões |

Para converter o PNG entregue pelo design (qualidade 80 fica visualmente
idêntica ao original e corta o peso em ~95%):

```
python3 -c "from PIL import Image; im=Image.open('entrada.png').convert('RGB'); im.save('saida.webp','WEBP',quality=80,method=6)"
```

O terço esquerdo da arte precisa ser limpo (a curva azul da marca funciona bem),
porque é ali que o título, o texto de apoio e os botões do hero se apoiam. Todo o
assunto principal da foto deve ficar no centro ou à direita.

## Arquivos em uso hoje

- `banner_1920x1080_03.webp` — Manaus / Teatro Amazonas (slide 3)
- `banner_1920x1080_01.webp` — família saindo de casa com o carro (slide 4)
- `black-november-2026.png` — arte original de 1140 × 470 px, sem alterações;
  promoção de 50% OFF na adesão durante novembro de 2026. Destaque exclusivo,
  com link para `/cotacao` e expiração automática em 01/12/2026 às 00h
  (horário de Boa Vista e Manaus, UTC−4).
- `black-november-2026-mobile.webp` — adaptação vertical de 1024 × 1536 px,
  baseada na arte da campanha, com o selo de desconto em destaque. Exportação
  WebP de aproximadamente 193 KB, usada abaixo de 640 px por `srcMobile`.

## Artes com texto pronto

Para preservar uma arte horizontal que já contém a oferta, configure
`layout: 'artwork'` e informe `mediaWidth` e `mediaHeight` em
`src/content/homeHero.js`. Esse modo não aplica o véu escuro nem sobrepõe os
títulos. No desktop (a partir de 960 px), a arte preenche toda a área com
`object-fit: cover`, e o botão fica sobre a parte inferior da arte. A altura
é limitada em telas proporcionalmente estreitas para preservar a leitura da
oferta. No celular, a composição vertical aparece inteira e o botão fica
separado da arte.
O campo opcional `srcMobile` permite carregar uma composição própria para
celular usando `<picture>`. A Black November usa a arte vertical nessa faixa,
com a oferta incluída na imagem e botão HTML dourado. Título e descrição
continuam acessíveis a leitores de tela sem duplicar visualmente a oferta.
As dimensões do arquivo original desktop são preservadas: isso não é uma
nova arte de 1920 × 1080 px.

## Exibição exclusiva e retorno automático

O campo `exclusive: true` mantém somente a campanha vigente na Home, sem
rotação, paginação ou botão de pausa. A Black November permanece exclusiva
até `2026-12-01T00:00:00-04:00` (fim de 30/11 no horário de Boa Vista/Manaus).
Nesse instante, a campanha sai e o vídeo institucional, Manaus e confiança
voltam automaticamente, na ordem anterior, inclusive com a página aberta.
Os destaques institucionais continuam configurados e não precisam de novo deploy.

## Cores da Home na Black November

A Home usa a paleta aprovada em preto, grafite e dourado, com a marca branca
no cabeçalho. As demais páginas mantêm a identidade institucional.
O tema está isolado pela classe `.black-november-theme` e não modifica os
estilos originais. A data `BLACK_NOVEMBER_ENDS_AT`, em `src/content/blackNovember.js`,
é compartilhada entre o tema e o banner: em **01/12/2026 às 00h de Boa Vista/Manaus
(UTC−4)**, voltam as cores anteriores, a marca azul e os três destaques originais.

O relógio é compartilhado pela Home e pelo carrossel. A troca funciona com a
página aberta, reprograma prazos maiores que o limite de `setTimeout` e confere
novamente o horário quando o visitante retorna à aba. Não requer publicação
manual em dezembro. O parâmetro da antiga prévia não força o tema após o prazo.

Atenção ao nome do arquivo de origem: a pasta do design tem dois conjuntos
parecidos, `banner_1080x1920_*` (vertical, story) e `banner_1920x1080_*`
(horizontal). O hero usa o **horizontal**.

Para trocar um banner, sobrescreva o arquivo mantendo o mesmo nome. Para
adicionar um novo, salve aqui e acrescente um item em `src/content/homeHero.js`.
