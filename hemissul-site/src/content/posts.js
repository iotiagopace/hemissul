import indenizacaoImg from '../assets/blog/indenizacao.jpeg'
import manausImg from '../assets/blog/manaus.jpg'
import amarrImg from '../assets/blog/amarr.jpg'
import skyfitImg from '../assets/blog/skyfit.jpg'

export const posts = [
  {
    slug: 'indenizacao-hemissul-mais-um-processo-concluido-com-sucesso',
    date: '9 de junho de 2026',
    category: 'Atendimento',
    title: 'Hemissul conclui mais um processo de indenização com sucesso',
    excerpt:
      'Atendimento, análise documental e acompanhamento até a conclusão do processo de um associado.',
    image: indenizacaoImg,
    paragraphs: [
      'A Hemissul concluiu mais um processo de indenização e reafirmou seu compromisso com a proteção dos associados.',
      'Após o evento, a equipe responsável recebeu a documentação, avaliou as circunstâncias e acompanhou as etapas previstas pela associação.',
      'Com a análise concluída e as informações confirmadas, o processo foi autorizado e encerrado. Cada atendimento segue o regulamento, os limites e as condições do plano contratado.',
    ],
  },
  {
    slug: 'o-ano-da-expansao-hemissul-chega-a-manaus-em-breve',
    date: '20 de abril de 2026',
    category: 'Expansão',
    title: 'Hemissul prepara sua chegada a Manaus',
    excerpt:
      'A expansão para Manaus marca uma nova etapa de crescimento da associação na região Norte.',
    image: manausImg,
    paragraphs: [
      'O ano de 2026 marca uma nova fase para a Hemissul, construída com estratégia, propósito e foco em gerar valor para mais pessoas.',
      'A chegada a Manaus representa a ampliação da presença da associação na região Norte, com proteção veicular, assistência 24 horas, rastreamento e atendimento próximo.',
      'As datas, condições comerciais e detalhes da operação serão divulgados nos canais oficiais da Hemissul.',
    ],
  },
  {
    slug: 'evento-amarr-pascoa-com-proposito-para-empresas-transformam-sorrisos-em-futuro',
    date: '20 de abril de 2026',
    category: 'Comunidade',
    title: 'Páscoa com propósito: Hemissul participa de ação com a AMARR',
    excerpt:
      'Uma ação social de acolhimento, diversão e cuidado realizada para crianças de Boa Vista.',
    image: amarrImg,
    paragraphs: [
      'Quando propósito se une à atitude, o resultado vai além de uma data comemorativa e gera impacto real na comunidade.',
      'A Hemissul participou de uma ação especial de Páscoa ao lado da AMARR, com atividades, alimentação e momentos de acolhimento para as crianças presentes.',
      'A associação acredita que empresas locais também podem fortalecer comunidades e inspirar novas iniciativas de responsabilidade social.',
    ],
  },
  {
    slug: 'club-de-beneficios-sky-fit-vantagens-exclusivas',
    date: '20 de abril de 2026',
    category: 'Clube de Benefícios',
    title: 'Associados Hemissul têm condições especiais na Sky Fit',
    excerpt:
      'Parceria amplia as vantagens para saúde e bem-estar dos participantes do Clube de Benefícios.',
    image: skyfitImg,
    paragraphs: [
      'A proteção veicular Hemissul também reúne vantagens que apoiam a rotina e ajudam o associado a economizar.',
      'A parceria com a Sky Fit da Avenida Ville Roy oferece condições especiais para musculação, aulas coletivas e acesso à estrutura da academia.',
      'Valores e disponibilidade podem mudar. Consulte o aplicativo ou a equipe Hemissul antes de utilizar o benefício.',
    ],
  },
]

export function findPost(slug) {
  return posts.find((post) => post.slug === slug)
}
