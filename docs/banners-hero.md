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
  promoção de 50% OFF na adesão durante novembro de 2026. Segundo destaque,
  com link para `/cotacao` e expiração automática em 01/12/2026 às 00h
  (horário de Boa Vista e Manaus, UTC−4).
- `black-november-2026-mobile.webp` — adaptação vertical de 1024 × 1536 px,
  baseada na arte da campanha, com o selo de desconto em destaque. Exportação
  WebP de aproximadamente 193 KB, usada abaixo de 640 px por `srcMobile`.

## Artes com texto pronto

Para preservar uma arte horizontal que já contém a oferta, configure
`layout: 'artwork'` e informe `mediaWidth` e `mediaHeight` em
`src/content/homeHero.js`. Esse modo usa a **mesma altura do carrossel** dos
demais destaques, exibe a imagem inteira com `object-fit: contain` e mantém
o botão fora da arte. Não aplica o véu escuro nem sobrepõe os títulos.
O campo opcional `srcMobile` permite carregar uma composição própria para
celular usando `<picture>`. A Black November usa a arte vertical nessa faixa,
com a oferta incluída na imagem e botão HTML dourado. Título e descrição
continuam acessíveis a leitores de tela sem duplicar visualmente a oferta.
As dimensões do arquivo original desktop são preservadas: isso não é uma
nova arte de 1920 × 1080 px.

Atenção ao nome do arquivo de origem: a pasta do design tem dois conjuntos
parecidos, `banner_1080x1920_*` (vertical, story) e `banner_1920x1080_*`
(horizontal). O hero usa o **horizontal**.

Para trocar um banner, sobrescreva o arquivo mantendo o mesmo nome. Para
adicionar um novo, salve aqui e acrescente um item em `src/content/homeHero.js`.
