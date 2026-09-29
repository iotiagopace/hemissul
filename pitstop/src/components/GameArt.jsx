import { BRAND } from '../config/brand.js'

/** Miniaturas vetoriais leves dos jogos (sem imagens para baixar). */
export default function GameArt({ id }) {
  const common = { className: 'game-card__art', viewBox: '0 0 180 56', 'aria-hidden': true, preserveAspectRatio: 'xMidYMid slice' }
  if (id === 'corrida')
    return (
      <svg {...common}>
        <rect width="180" height="56" fill={BRAND.navy} />
        {[0, 26, 52, 78, 104, 130, 156].map((x) => (
          <g key={x} fill={BRAND.lavanda}>
            <rect x={x} y="18" width="14" height="3" />
            <rect x={x + 10} y="36" width="14" height="3" />
          </g>
        ))}
        <rect x="118" y="22" width="34" height="12" rx="3" fill={BRAND.branco} />
        <rect x="40" y="4" width="34" height="12" rx="3" fill={BRAND.periwinkle} />
        <rect x="70" y="40" width="34" height="12" rx="3" fill={BRAND.royal} />
      </svg>
    )
  if (id === 'blocos')
    return (
      <svg {...common}>
        <rect width="180" height="56" fill={BRAND.lavanda} />
        {[[3, 2], [4, 2], [5, 2], [4, 1], [8, 3], [8, 2], [9, 3], [10, 3], [0, 3], [1, 3], [2, 3], [3, 3], [5, 3], [6, 3], [7, 3], [11, 3], [12, 1], [12, 2], [12, 3], [13, 3]].map(([x, y], i) => (
          <rect key={i} x={6 + x * 12} y={4 + y * 12} width="11" height="11" fill={[BRAND.azul, BRAND.royal, BRAND.periwinkle, BRAND.verde][i % 4]} />
        ))}
      </svg>
    )
  if (id === 'sudoku')
    return (
      <svg {...common}>
        <rect width="180" height="56" fill={BRAND.branco} />
        {Array.from({ length: 27 }).map((_, i) => {
          const r = Math.floor(i / 9)
          const c = i % 9
          const v = '5.3.7....6..195....98....6.'[i]
          return (
            <g key={i}>
              <rect x={36 + c * 12} y={6 + r * 15} width="12" height="15" fill="none" stroke={BRAND.lavanda} />
              {v !== '.' && (
                <text x={42 + c * 12} y={17 + r * 15} textAnchor="middle" fontSize="10" fontWeight="700" fill={c % 3 === 1 ? BRAND.royal : BRAND.navy}>
                  {v}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    )
  return (
    <svg {...common}>
      <rect width="180" height="56" fill={BRAND.lavanda} />
      {'CARGA'.split('').map((ch, i) => (
        <g key={'a' + i}>
          <rect x={40 + i * 14} y="8" width="13" height="11" fill={BRAND.branco} />
          <text x={46.5 + i * 14} y="17" textAnchor="middle" fontSize="9" fontWeight="700" fill={BRAND.navy}>{ch}</text>
        </g>
      ))}
      {'ODA'.split('').map((ch, i) => (
        <g key={'d' + i}>
          <rect x="68" y={20 + i * 12} width="13" height="11" fill={i === 0 ? BRAND.azul : BRAND.branco} />
          <text x="74.5" y={29 + i * 12} textAnchor="middle" fontSize="9" fontWeight="700" fill={i === 0 ? BRAND.branco : BRAND.navy}>{ch}</text>
        </g>
      ))}
    </svg>
  )
}
