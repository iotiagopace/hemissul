import FadeIn from '../components/FadeIn'
import { SITE } from '../config/site'

const content = {
  privacidade: {
    eyebrow: 'Privacidade',
    title: 'Aviso de Privacidade',
    intro: 'Este aviso explica como a Hemissul trata dados pessoais recebidos pelo site e por seus canais digitais.',
    sections: [
      ['Controlador e contato', `${SITE.legalName}, CNPJ ${SITE.cnpj}. Solicitações podem ser enviadas para ${SITE.email}.`],
      ['Dados tratados', 'Podemos receber nome, telefone, e-mail, cidade, informações do veículo, dados de navegação e o conteúdo enviado voluntariamente nos canais de atendimento.'],
      ['Finalidades', 'Responder solicitações, realizar cotações, prestar atendimento, manter segurança, cumprir obrigações legais e, mediante consentimento, medir o desempenho do site.'],
      ['Compartilhamento', 'Os dados podem ser encaminhados a prestadores necessários para cotação, atendimento, sistemas associativos, hospedagem e comunicação, sempre de acordo com a finalidade informada.'],
      ['Retenção e segurança', 'As informações são mantidas pelo período necessário para atendimento, cumprimento de obrigações e exercício regular de direitos, com medidas razoáveis de segurança.'],
      ['Direitos do titular', 'Você pode solicitar confirmação, acesso, correção, informação sobre compartilhamento, revogação do consentimento e eliminação quando aplicável.'],
    ],
  },
  cookies: {
    eyebrow: 'Cookies',
    title: 'Política de Cookies',
    intro: 'Cookies são pequenos arquivos usados para manter funções essenciais e, com sua autorização, medir o uso do site.',
    sections: [
      ['Cookies necessários', 'Permitem preferências essenciais, segurança e funcionamento básico. Não dependem de consentimento e não podem ser desativados pelo banner.'],
      ['Cookies opcionais', 'Ferramentas de medição, como Google Tag Manager e serviços relacionados, só são carregadas depois que você aceita cookies opcionais.'],
      ['Conteúdo de terceiros', 'YouTube, Spotify, mapas e outros serviços podem definir cookies próprios quando seus conteúdos são carregados ou acionados.'],
      ['Como alterar sua escolha', 'Você pode limpar o armazenamento e os cookies do navegador para exibir novamente as opções de consentimento.'],
    ],
  },
  termos: {
    eyebrow: 'Termos',
    title: 'Termos de Uso do Site',
    intro: 'Ao navegar neste site, você concorda com as condições abaixo para uso dos conteúdos e canais digitais Hemissul.',
    sections: [
      ['Natureza informativa', 'O site apresenta informações institucionais e comerciais. Benefícios, limites e condições válidas são os constantes no regulamento e no termo de adesão aplicáveis.'],
      ['Cotação e adesão', 'O envio de uma solicitação não garante aceitação nem início de proteção. A adesão depende das etapas, análises e confirmações informadas pela Hemissul.'],
      ['Serviços externos', 'Aplicativo, CRM de cotação, área Hinova, mapas, Spotify e redes sociais possuem termos e políticas próprios.'],
      ['Uso adequado', 'Não é permitido tentar comprometer a segurança, interferir no funcionamento ou utilizar o conteúdo de forma ilícita.'],
      ['Atualizações', 'Estes termos podem ser atualizados para refletir mudanças legais, operacionais ou nos serviços oferecidos.'],
    ],
  },
}

export default function LegalPage({ type }) {
  const page = content[type]
  return (
    <div className="page-light">
      <header className="page-header">
        <div className="site-container">
          <FadeIn className="page-header__inner">
            <p className="page-header__eyebrow">{page.eyebrow}</p>
            <h1 className="page-header__title">{page.title}</h1>
            <p className="page-header__lede">{page.intro}</p>
            <p className="legal-review-note">Versão publicada em 27 de junho de 2026. Conteúdo sujeito à validação jurídica da associação.</p>
          </FadeIn>
        </div>
      </header>
      <section className="page-section page-section--paper">
        <div className="site-container legal-content">
          {page.sections.map(([title, body], index) => (
            <FadeIn as="section" key={title} delay={index * 0.04}>
              <h2>{title}</h2>
              <p>{body}</p>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  )
}
