import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Dispara um page view no dataLayer a cada troca de rota.
 *
 * Num SPA o navegador só carrega a página uma vez, então o page view nativo do
 * GTM conta apenas a primeira URL da sessão — toda navegação seguinte passaria
 * despercebida. Este hook empurra o evento `spa_page_view` a cada mudança de
 * rota para o container contar a navegação inteira.
 *
 * Precisa ser chamado por um componente dentro do <BrowserRouter>, senão o
 * useLocation() quebra.
 */
export function usePageTracking() {
  const location = useLocation()

  useEffect(() => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'spa_page_view',
      page_path: location.pathname + location.search,
      page_title: document.title,
      page_location: window.location.href,
    })
  }, [location])
}
