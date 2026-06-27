import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Radio } from 'lucide-react'
import { SITE } from '../config/site'

export default function CampaignBanner() {
  const { pathname } = useLocation()
  const campaign = SITE.campaign
  const isCommercialRoute =
    pathname === '/' || pathname === '/cotacao' || pathname.startsWith('/protecao-veicular')
  const isActive =
    isCommercialRoute &&
    campaign.enabled &&
    Date.now() < new Date(campaign.endsAt).getTime()
  if (!isActive) return null

  return (
    <aside className="campaign-banner">
      <span><Radio size={16} aria-hidden="true" /> {campaign.eyebrow}</span>
      <strong>{campaign.title}</strong>
      <small>{campaign.note}</small>
      <Link to="/cotacao">
        Ver condição <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </aside>
  )
}
