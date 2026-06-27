import { Apple, Smartphone } from 'lucide-react'

const APP_LINKS = {
  android:
    'https://play.google.com/store/apps/details?id=br.com.hinovamobile.hemissul&hl=pt_BR&gl=US',
  ios: 'https://apps.apple.com/br/app/hemissul-clube-de-benef%C3%ADcios/id1525372223',
}

export default function StoreBadges({ variant = 'light' }) {
  return (
    <div className={`store-badges store-badges--${variant}`}>
      <a
        className="store-badge"
        href={APP_LINKS.android}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Baixar o aplicativo Hemissul no Google Play"
      >
        <Smartphone size={22} aria-hidden="true" />
        <span>
          <em>Disponível no</em>
          <strong>Google Play</strong>
        </span>
      </a>
      <a
        className="store-badge"
        href={APP_LINKS.ios}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Baixar o aplicativo Hemissul na App Store"
      >
        <Apple size={22} aria-hidden="true" />
        <span>
          <em>Baixar na</em>
          <strong>App Store</strong>
        </span>
      </a>
    </div>
  )
}
