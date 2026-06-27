# Manutenção de conteúdo — Hemissul

Este projeto concentra os dados que mudam com mais frequência em dois arquivos:

- `src/config/site.js`: contatos, endereço, redes sociais, campanha, links de
  cotação, canais do associado, métricas e integrações;
- `src/content/posts.js`: textos, datas, imagens e rotas do blog.

## Antes de publicar

1. Confirme telefones, horários, endereço e números institucionais.
2. Revise a validade, o texto e as condições de campanhas.
3. Teste cotação, login da Hinova, recuperação de senha e links das lojas.
4. Confirme parceiros e condições do Clube de Benefícios.
5. Valide juridicamente privacidade, cookies e termos de uso.
6. Substitua os pedidos por download assim que o regulamento, o estatuto e o
   termo de adesão oficiais forem fornecidos.
7. Ao migrar o domínio principal, troque `siteUrl` em `src/config/site.js` e
   atualize `index.html`, `public/robots.txt` e `public/sitemap.xml`.

## Limites atuais

O projeto não possui painel administrativo. As atualizações são feitas nos
arquivos acima e publicadas pela esteira do repositório/Vercel. Um CMS pode ser
integrado depois, caso a equipe precise publicar sem alterar código.

Não publique números, condições de cobertura, prazos, parceiros ou documentos
que não tenham sido confirmados pela Hemissul.

## Deploy

O projeto Vercel está configurado com:

- **Root Directory**: `hemissul-site`
- **Framework**: Vite
- **Branch de produção**: `main`

A partir disso, todo `git push origin main` dispara build automático e
substitui `hemissul.vercel.app`. Não é mais necessário rodar `vercel deploy`
manualmente.

Para deploys manuais (rollback, hotfix urgente), ainda funciona:

```bash
cd hemissul-site
npx vercel deploy --prod --yes
```
