/** Só confirma um envio quando a API devolve esse resultado explicitamente. */
export default function DeliveryStatus({ delivery }) {
  if (!delivery) return null
  const { lead, score, queue, localSaved } = delivery
  const messages = []
  for (const [result, count, label] of [
    [lead, queue.leads, 'Cadastro'],
    [score, queue.partidas, 'Pontuação'],
  ]) {
    if (result?.status === 'recusado') {
      messages.push(
        `${label} ${label === 'Cadastro' ? 'não aceito' : 'não aceita'} pelo servidor. Você pode continuar jogando.`,
      )
    } else if (result?.status === 'sending') {
      messages.push(
        label === 'Cadastro'
          ? 'Enviando seu cadastro…'
          : 'Enviando sua pontuação…',
      )
    } else if (count > 0) {
      messages.push(`${label} na fila de envio.`)
    } else if (result?.status === 'enviado') {
      messages.push(
        label === 'Cadastro' ? 'Cadastro enviado.' : 'Pontuação enviada.',
      )
    } else if (result?.status === 'na_fila') {
      // A contagem não identifica qual item foi confirmado ou recusado.
      messages.push(`${label}: não há mais envios na fila.`)
    }
  }
  if (queue.leads > 0 || queue.partidas > 0) {
    messages.push(
      'O envio recomeça automaticamente quando a conexão volta. Se o serviço estiver indisponível, tentaremos de novo.',
    )
  }
  if (
    queue.recusados > 0 &&
    ![lead, score].some((r) => r?.status === 'recusado')
  ) {
    messages.push(
      'Há envios anteriores não aceitos pelo servidor. Eles não serão reenviados automaticamente.',
    )
  }
  const notSaved =
    localSaved === false ||
    queue.salvo === false ||
    lead?.salvo === false ||
    score?.salvo === false
  return (
    <div
      className="delivery-status"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {messages.map((message) => (
        <p className="status-note" key={message}>
          {message}
        </p>
      ))}
      {notSaved && (
        <p className="status-note">
          <strong>Não foi possível guardar seus dados neste aparelho.</strong>{' '}
          {queue.leads > 0 ||
          queue.partidas > 0 ||
          [lead, score].some((r) => r?.status === 'sending')
            ? 'Mantenha esta página aberta até o envio terminar. Ao fechar, você pode perder o cadastro e as partidas pendentes.'
            : 'O cadastro e os recordes podem não estar disponíveis neste aparelho na próxima visita.'}
        </p>
      )}
    </div>
  )
}
