// setTimeout aceita no máximo aproximadamente 24,8 dias.
export const MAX_TIMEOUT_MS = 2_147_483_647

export function nextDeadlineDelay(deadlines, now) {
  const future = deadlines.map((date) => new Date(date).getTime()).filter((time) => time > now)
  if (!future.length) return null
  return Math.min(Math.min(...future) - now, MAX_TIMEOUT_MS)
}
