import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import FadeIn from '../components/FadeIn'

const faqs = [
  ['O que é proteção patrimonial mutualista?', 'É um modelo em que participantes vinculados a uma associação compartilham os custos dos eventos previstos, conforme contrato e regulamento.'],
  ['A Hemissul é uma seguradora?', 'Não. A Hemissul é uma associação de proteção patrimonial mutualista. A relação com o participante segue o termo de adesão, o regulamento e a legislação aplicável.'],
  ['Quais veículos podem ser protegidos?', 'Há opções para carros, motos e caminhões. A aceitação depende da categoria, uso, valor, vistoria e regras vigentes.'],
  ['Quais benefícios estão disponíveis?', 'Podem incluir colisão, roubo, furto, perda total, danos materiais a terceiros, assistência 24 horas, rastreamento e outros benefícios previstos no plano.'],
  ['O carro reserva está incluído?', 'A disponibilidade, o período de uso e as situações cobertas dependem do plano e do tipo de evento. Confirme as condições na cotação, no termo de adesão e no regulamento vigente.'],
  ['A adesão exige análise de crédito?', 'A Hemissul divulga adesão sem consulta de crédito. Ainda assim, a participação depende de elegibilidade, documentos, vistoria, aceite das condições e confirmação da associação.'],
  ['Quando a proteção começa?', 'O início ocorre após o cumprimento das etapas de adesão e a confirmação da Hemissul. Consulte o termo de adesão para o prazo aplicável.'],
  ['Como funciona o rateio?', 'Os custos dos eventos e as despesas do grupo são compartilhados conforme as regras definidas no contrato e no regulamento.'],
  ['Como aciono a assistência 24 horas?', 'Ligue para 0800 940 2163 e informe CPF, placa, localização e o problema apresentado pelo veículo.'],
  ['Como acesso meus boletos?', 'Os boletos digitais ficam disponíveis no aplicativo Hemissul. Se precisar, fale com o canal financeiro.'],
  ['O rastreador é obrigatório?', 'Pode ser exigido conforme valor, uso e categoria do veículo. A equipe informa essa condição durante a adesão.'],
  ['O que fazer em caso de roubo ou furto?', 'Registre a ocorrência policial, acione imediatamente o rastreamento e avise a Hemissul. Não tente recuperar o veículo por conta própria.'],
  ['A assistência funciona fora de Roraima?', 'Sim. O atendimento é nacional, sujeito à rede, aos limites e às condições do plano contratado.'],
]

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  const contentId = useId()

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
        <motion.span animate={{ rotate: open ? 180 : 0 }} aria-hidden="true">
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
            <h1 className="page-header__title">Respostas diretas para decidir com clareza.</h1>
            <p className="page-header__lede">
              As condições específicas sempre devem ser confirmadas no seu plano,
              termo de adesão e regulamento vigente.
            </p>
          </FadeIn>
        </div>
      </header>
      <section className="page-section page-section--paper">
        <div className="site-container">
          <FadeIn className="faq-list">
            {faqs.map(([question, answer]) => (
              <FaqItem key={question} question={question} answer={answer} />
            ))}
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
