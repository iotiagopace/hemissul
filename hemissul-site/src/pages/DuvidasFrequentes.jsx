import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, MessageCircle, ArrowRight } from 'lucide-react'
import FadeIn from '../components/FadeIn'

const grupos = [
  {
    tema: 'Sobre a Hemissul',
    items: [
      ['A Hemissul é uma seguradora?', 'Não. A Hemissul é uma associação de proteção patrimonial mutualista. A relação com o participante segue o termo de adesão, o regulamento e a legislação aplicável.'],
      ['O que é proteção patrimonial mutualista?', 'É um modelo em que participantes vinculados a uma associação compartilham os custos dos eventos previstos, conforme contrato e regulamento.'],
      ['Onde a Hemissul fica?', 'A sede fica em Boa Vista, Roraima. O atendimento da assistência é nacional, sujeito à rede e às condições do plano.'],
    ],
  },
  {
    tema: 'Sobre o programa',
    items: [
      ['Quais veículos podem ser protegidos?', 'Há opções para carros, motos e caminhões. A aceitação depende da categoria, uso, valor, vistoria e regras vigentes.'],
      ['Quais benefícios estão disponíveis?', 'Podem incluir colisão, roubo, furto, perda total, danos materiais a terceiros, assistência 24 horas, rastreamento e outros benefícios previstos no plano.'],
      ['O carro reserva está incluído?', 'A disponibilidade, o período de uso e as situações cobertas dependem do plano e do tipo de evento. Confirme as condições na cotação e no regulamento vigente.'],
      ['O rastreador é obrigatório?', 'Pode ser exigido conforme valor, uso e categoria do veículo. A equipe informa essa condição durante a adesão.'],
    ],
  },
  {
    tema: 'Adesão e cobranças',
    items: [
      ['A adesão exige análise de crédito?', 'A Hemissul divulga adesão sem consulta de crédito. Ainda assim, a participação depende de elegibilidade, documentos, vistoria, aceite das condições e confirmação da associação.'],
      ['Quando a proteção começa?', 'O início ocorre após o cumprimento das etapas de adesão e a confirmação da Hemissul. Consulte o termo de adesão para o prazo aplicável.'],
      ['Como funciona o rateio?', 'Os custos dos eventos e as despesas do grupo são compartilhados conforme as regras definidas no contrato e no regulamento.'],
      ['Como acesso meus boletos?', 'Os boletos digitais ficam disponíveis no aplicativo Hemissul. Se precisar, fale com o canal financeiro.'],
    ],
  },
  {
    tema: 'No uso do dia a dia',
    items: [
      ['Como aciono a assistência 24 horas?', 'Ligue para 0800 940 2163 e informe CPF, placa, localização e o problema apresentado pelo veículo.'],
      ['A assistência funciona fora de Roraima?', 'Sim. O atendimento é nacional, sujeito à rede, aos limites e às condições do plano contratado.'],
      ['O que fazer em caso de roubo ou furto?', 'Registre a ocorrência policial, acione imediatamente o rastreamento e avise a Hemissul. Não tente recuperar o veículo por conta própria.'],
    ],
  },
]

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  const contentId = useId()
  const reduce = useReducedMotion()

  return (
    <div className="faq-item">
      <button
        type="button"
        className="faq-item__btn"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{question}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.22 }}
          aria-hidden="true"
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={contentId}
            className="faq-item__answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.22 }}
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function DuvidasFrequentes() {
  return (
    <div className="page-light">
      <header className="page-header">
        <div className="site-container">
          <FadeIn className="page-header__inner">
            <p className="page-header__eyebrow">Dúvidas frequentes</p>
            <h1 className="page-header__title">
              Respostas diretas para decidir com clareza.
            </h1>
            <p className="page-header__lede">
              As condições específicas sempre devem ser confirmadas no seu
              plano, termo de adesão e regulamento vigente.
            </p>
          </FadeIn>
        </div>
      </header>

      <section className="page-section page-section--paper">
        <div className="site-container">
          {grupos.map(({ tema, items }, gi) => (
            <FadeIn
              as="section"
              className="faq-group"
              key={tema}
              delay={gi * 0.05}
            >
              <h2 className="faq-group__title">{tema}</h2>
              <div className="faq-list">
                {items.map(([question, answer]) => (
                  <FaqItem
                    key={question}
                    question={question}
                    answer={answer}
                  />
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="closing-section">
        <div className="site-container closing-section__inner">
          <FadeIn as="h2">Não encontrou sua dúvida?</FadeIn>
          <FadeIn delay={0.1}>
            <div className="home-hero__actions">
              <a
                href="https://wa.me/5595991381037"
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary"
              >
                <MessageCircle size={18} aria-hidden="true" /> Falar com a
                equipe
              </a>
              <Link to="/contato" className="button-secondary">
                Ver canais por assunto{' '}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
