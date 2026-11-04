// Mesma virada para as cores e o banner: meia-noite em Boa Vista/Manaus.
export const BLACK_NOVEMBER_ENDS_AT = '2026-12-01T00:00:00-04:00'

export function isBlackNovemberActive(pathname, now) {
  return pathname === '/' && now < new Date(BLACK_NOVEMBER_ENDS_AT).getTime()
}
