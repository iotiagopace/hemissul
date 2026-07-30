# Banners do hero da Home

Coloque aqui as artes de banner do carrossel do topo da Home.

Os arquivos são servidos direto pela raiz do site, então o caminho usado em
`src/content/homeHero.js` é `/banners/nome-do-arquivo.jpg` (sem `public/`).

## Especificação

| Item | Valor |
|---|---|
| Resolução | 1920 × 1080 px (16:9) |
| Formato | `.jpg` (ou `.webp`, se for mais leve) |
| Peso alvo | até 400 KB — acima disso o hero demora a aparecer |
| Área de texto | o terço esquerdo fica coberto pelo título e pelos botões |

O terço esquerdo da arte precisa ser limpo (a curva azul da marca funciona bem),
porque é ali que o título, o texto de apoio e os botões do hero se apoiam. Todo o
assunto principal da foto deve ficar no centro ou à direita.

## Arquivos esperados hoje

- `banner_1920x1080_03.jpg` — Manaus / Teatro Amazonas (slide 2)
- `banner_1920x1080_01.jpg` — família saindo de casa com o carro (slide 3)

Para trocar um banner, sobrescreva o arquivo mantendo o mesmo nome. Para
adicionar um novo, salve aqui e acrescente um item em `src/content/homeHero.js`.
