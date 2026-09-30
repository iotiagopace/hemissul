import { BRAND } from '../config/brand.js'

/** Ilustrações vetoriais da marca, sem imagens ou bibliotecas adicionais. */
export default function GameArt({ id }) {
  const common = {
    className: 'game-card__art',
    viewBox: id === 'corrida' ? '0 0 280 64' : '0 0 80 64',
    'aria-hidden': true,
    focusable: false,
  }
  if (id === 'corrida')
    return (
      <svg {...common}>
        <rect width="280" height="64" fill="var(--color-rule)" />
        {[0, 36, 72, 108, 144, 180, 216, 252].map((x) => (
          <g key={x} fill={BRAND.navy}>
            <rect x={x} y="20" width="20" height="2" />
            <rect x={x + 12} y="43" width="20" height="2" />
          </g>
        ))}
        {[
          [45, 3, BRAND.branco],
          [128, 47, BRAND.branco],
          [200, 26, BRAND.azul],
        ].map(([x, y, color]) => (
          <g key={x}>
            <rect
              x={x}
              y={y}
              width="40"
              height="14"
              rx="4"
              fill={color}
              stroke={BRAND.navy}
            />
            <rect
              x={x + 25}
              y={y + 2}
              width="6"
              height="10"
              rx="2"
              fill={color === BRAND.azul ? BRAND.branco : BRAND.navy}
            />
            <rect
              x={x + 7}
              y={y + 2}
              width="5"
              height="10"
              rx="2"
              fill={color === BRAND.azul ? BRAND.branco : BRAND.navy}
            />
          </g>
        ))}
      </svg>
    )
  if (id === 'blocos')
    return (
      <svg {...common}>
        <rect width="80" height="64" fill="var(--color-paper-2)" />
        {[
          [0, 3],
          [1, 3],
          [2, 3],
          [3, 3],
          [4, 3],
          [1, 2],
          [2, 2],
          [4, 2],
          [4, 1],
          [2, 0],
          [3, 0],
          [3, 1],
        ].map(([x, y], i) => (
          <rect
            key={i}
            x={11 + x * 12}
            y={8 + y * 12}
            width="11"
            height="11"
            rx="1"
            fill={[BRAND.azul, BRAND.branco, BRAND.navy][i % 3]}
            stroke={BRAND.navy}
          />
        ))}
      </svg>
    )
  if (id === 'sudoku')
    return (
      <svg {...common}>
        <rect width="80" height="64" fill="var(--color-paper-2)" />
        {'5 3 7  2 '.split('').map((v, i) => (
          <g key={i}>
            <rect
              x={16 + (i % 3) * 16}
              y={8 + Math.floor(i / 3) * 16}
              width="16"
              height="16"
              fill={BRAND.branco}
              stroke={BRAND.periwinkle}
            />
            <text
              x={24 + (i % 3) * 16}
              y={20 + Math.floor(i / 3) * 16}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={BRAND.navy}
            >
              {v}
            </text>
          </g>
        ))}
      </svg>
    )
  return (
    <svg {...common}>
      <rect width="80" height="64" fill="var(--color-paper-2)" />
      {'RODA'.split('').map((ch, i) => (
        <g key={i}>
          <rect
            x={8 + i * 16}
            y="8"
            width="15"
            height="15"
            fill={BRAND.branco}
          />
          <text
            x={15.5 + i * 16}
            y="20"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={BRAND.navy}
          >
            {ch}
          </text>
        </g>
      ))}
      {'UA'.split('').map((ch, i) => (
        <g key={ch}>
          <rect
            x="8"
            y={24 + i * 16}
            width="15"
            height="15"
            fill={i === 0 ? BRAND.azul : BRAND.branco}
          />
          <text
            x="15.5"
            y={36 + i * 16}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={i === 0 ? BRAND.branco : BRAND.navy}
          >
            {ch}
          </text>
        </g>
      ))}
    </svg>
  )
}
