import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import DeliveryStatus from './DeliveryStatus.jsx'

const render = (changes = {}) =>
  renderToStaticMarkup(
    createElement(DeliveryStatus, {
      delivery: {
        queue: { leads: 0, partidas: 0, recusados: 0, salvo: true },
        ...changes,
      },
    }),
  )

describe('Avisos de envio', () => {
  it('fila vazia não transforma uma recusa em envio confirmado', () => {
    const html = render({ lead: { status: 'recusado', salvo: true } })
    expect(html).toContain('Cadastro não aceito')
    expect(html).not.toContain('Cadastro enviado.')
  })
  it('pontuação recusada não muda a confirmação do cadastro', () => {
    const html = render({
      lead: { status: 'enviado', salvo: true },
      score: { status: 'recusado', salvo: true },
    })
    expect(html).toContain('Cadastro enviado.')
    expect(html).toContain('Pontuação não aceita')
  })
  it('novos itens na fila têm prioridade sobre confirmação anterior', () => {
    const html = render({
      lead: { status: 'enviado' },
      queue: { leads: 1, partidas: 0, recusados: 0, salvo: true },
    })
    expect(html).toContain('Cadastro na fila de envio.')
    expect(html).toContain('automaticamente')
    expect(html).not.toContain('Cadastro enviado.')
  })
  it('redução da contagem não é confirmação individual', () => {
    const html = render({
      lead: { status: 'na_fila' },
      queue: { leads: 0, partidas: 0, recusados: 1, salvo: true },
    })
    expect(html).toContain('não aceitos pelo servidor')
    expect(html).not.toContain('Cadastro enviado.')
  })
  it('fila em memória avisa sobre fechar a página', () => {
    const html = render({
      lead: { status: 'na_fila', salvo: false },
      queue: { leads: 1, partidas: 0, recusados: 0, salvo: false },
    })
    expect(html).toContain('Mantenha esta página aberta')
    expect(html).toContain('role="status"')
  })
  it('envio confirmado com armazenamento bloqueado não pede para esperar envio concluído', () => {
    const html = render({ lead: { status: 'enviado', salvo: false } })
    expect(html).toContain('Cadastro enviado.')
    expect(html).toContain('na próxima visita')
    expect(html).not.toContain('Mantenha esta página aberta')
  })
})
