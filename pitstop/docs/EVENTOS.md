# Plano de eventos (GTM-NGFZ298)

Mesmo contêiner do site oficial. Todo evento do Pitstop leva `pitstop: true`
para filtrar no GA4. **Nenhum dado pessoal** (nome, telefone) vai ao dataLayer:
`track` descarta `nome`, `telefone`, `leadId` e textos com cara de telefone.

| Evento | Quando | Parâmetros |
| --- | --- | --- |
| `pitstop_view` | Abertura do app | `posto`, `visitas`, `cadastrado` |
| `pitstop_game_start` | Início de partida | `jogo`, `posto` |
| `pitstop_game_end` | Fim de partida | `jogo`, `pontos`, `recorde`, `posto` |
| `pitstop_lead` | Cadastro concluído | `posto`, `jogo` |
| `pitstop_profile` | Resposta de perfil | `app`, `atividade` |
| `pitstop_protection_answer` | Resposta sobre proteção | `resposta`, `perfil` |
| `pitstop_quote_view` | Tela de cotação aberta | `perfil`, `posto` |
| `whatsapp_click` | Clique no WhatsApp da cotação | `perfil`, `posto`, `origem: pitstop` |
| `start_quote` | Clique na cotação online | `perfil`, `posto`, `origem: pitstop` |
| `pitstop_charge_timer` | Motorista define tempo de carga | `minutes` |

`whatsapp_click` e `start_quote` reaproveitam os nomes do site oficial, então as
conversões do Google Ads ("Lead WhatsApp - Site", "Inicio de Cotacao - Site")
podem ser filtradas por `origem = pitstop` ou ganhar conversões próprias.

## Configuração no GTM (a fazer)

1. Variáveis de camada de dados: `jogo`, `posto`, `perfil`, `resposta`, `pontos`, `origem`.
2. Acionador de evento personalizado com regex `^pitstop_`.
3. Tag GA4 de evento `{{Event}}` com os parâmetros acima.
4. Marcar `pitstop_lead` como evento principal no GA4.

## Consentimento

O `index.html` replica o Consent Mode v2 do site com a chave
`hemissul-cookie-consent`. Como o Pitstop roda em outro subdomínio, o aceite
feito no site não é compartilhado (localStorage é por origem). Se a Hemissul
quiser banner de cookies no Pitstop, portar `CookieConsent.jsx` do site.
