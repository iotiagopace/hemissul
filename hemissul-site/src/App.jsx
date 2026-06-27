import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import ScrollProgress from './components/ScrollProgress'
import RouteSeo from './components/RouteSeo'
import Analytics from './components/Analytics'
import CookieConsent from './components/CookieConsent'
import WhatsAppFloat from './components/WhatsAppFloat'
import CampaignBanner from './components/CampaignBanner'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
const Home = lazy(() => import('./pages/Home'))
const ProtecaoVeicular = lazy(() => import('./pages/ProtecaoVeicular'))
const ProtecaoCarros = lazy(() => import('./pages/ProtecaoCarros'))
const ProtecaoMotos = lazy(() => import('./pages/ProtecaoMotos'))
const ProtecaoCaminhoes = lazy(() => import('./pages/ProtecaoCaminhoes'))
const Assistencia24h = lazy(() => import('./pages/Assistencia24h'))
const Rastreamento = lazy(() => import('./pages/Rastreamento'))
const Aplicativo = lazy(() => import('./pages/Aplicativo'))
const CentralAssociado = lazy(() => import('./pages/CentralAssociado'))
const ComunicarEvento = lazy(() => import('./pages/ComunicarEvento'))
const QuemSomos = lazy(() => import('./pages/QuemSomos'))
const BoaVistaRR = lazy(() => import('./pages/BoaVistaRR'))
const DuvidasFrequentes = lazy(() => import('./pages/DuvidasFrequentes'))
const Cotacao = lazy(() => import('./pages/Cotacao'))
const Contato = lazy(() => import('./pages/Contato'))
const Blog = lazy(() => import('./pages/Blog'))
const Documentos = lazy(() => import('./pages/Documentos'))
const ClubeBeneficios = lazy(() => import('./pages/ClubeBeneficios'))
const Podcast = lazy(() => import('./pages/Podcast'))
const TrabalheConosco = lazy(() => import('./pages/TrabalheConosco'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const LegalPage = lazy(() => import('./pages/LegalPage'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <>
      <ScrollToTop />
      <RouteSeo />
      <Analytics />
      <Navbar />
      <ScrollProgress />
      <main className="pt-20">
        <CampaignBanner />
        <Suspense fallback={<div className="route-loading" aria-label="Carregando página" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/protecao-veicular" element={<ProtecaoVeicular />} />
            <Route path="/protecao-veicular/carros" element={<ProtecaoCarros />} />
            <Route path="/protecao-veicular/motos" element={<ProtecaoMotos />} />
            <Route path="/protecao-veicular/caminhoes" element={<ProtecaoCaminhoes />} />
            <Route path="/assistencia-24h" element={<Assistencia24h />} />
            <Route path="/rastreamento-veicular" element={<Rastreamento />} />
            <Route path="/aplicativo" element={<Aplicativo />} />
            <Route path="/central-do-associado" element={<CentralAssociado />} />
            <Route path="/comunicar-evento" element={<ComunicarEvento />} />
            <Route path="/quem-somos" element={<QuemSomos />} />
            <Route path="/boa-vista-rr" element={<BoaVistaRR />} />
            <Route path="/duvidas-frequentes" element={<DuvidasFrequentes />} />
            <Route path="/cotacao" element={<Cotacao />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/documentos" element={<Documentos />} />
            <Route path="/clube-de-beneficios" element={<ClubeBeneficios />} />
            <Route path="/podcast" element={<Podcast />} />
            <Route path="/trabalhe-conosco" element={<TrabalheConosco />} />
            <Route path="/privacidade" element={<LegalPage type="privacidade" />} />
            <Route path="/cookies" element={<LegalPage type="cookies" />} />
            <Route path="/termos-de-uso" element={<LegalPage type="termos" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <WhatsAppFloat />
      <CookieConsent />
      <Footer />
    </>
  )
}
