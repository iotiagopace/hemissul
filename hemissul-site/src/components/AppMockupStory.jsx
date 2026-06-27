import { BellRing, FileText, MapPinned } from 'lucide-react'
import FadeIn from './FadeIn'
import mockupApp from '../assets/mockups/app-associado.png'

const actions = [
  {
    icon: FileText,
    title: 'Boletos sem espera',
    description: 'Consulte vencimentos e acesse a segunda via pelo celular.',
  },
  {
    icon: BellRing,
    title: 'Atendimento à mão',
    description: 'Encontre assistência e os canais certos quando precisar.',
  },
  {
    icon: MapPinned,
    title: 'Rede credenciada',
    description: 'Localize oficinas, bases e benefícios disponíveis.',
  },
]

export default function AppMockupStory() {
  return (
    <div className="app-showcase">
      <FadeIn className="app-showcase__visual" x={-36}>
        <span className="app-showcase__signal" aria-hidden="true">
          Serviços do associado
        </span>
        <img
          src={mockupApp}
          alt="Aplicativo Hemissul exibindo os serviços disponíveis ao associado"
          loading="lazy"
        />
      </FadeIn>

      <div className="app-showcase__content">
        <FadeIn x={36}>
          <p className="page-header__eyebrow">Na prática</p>
          <h3>Menos procura. Mais resolução.</h3>
          <p className="app-showcase__intro">
            O aplicativo concentra as tarefas mais frequentes do associado e
            leva cada solicitação ao caminho correto.
          </p>
        </FadeIn>

        <div className="app-showcase__actions">
          {actions.map(({ icon: Icon, title, description }, index) => (
            <FadeIn key={title} delay={index * 0.08} x={28}>
              <article className="app-showcase__feature">
                <span>
                  <Icon size={19} aria-hidden="true" />
                </span>
                <div>
                  <h4>{title}</h4>
                  <p>{description}</p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  )
}
