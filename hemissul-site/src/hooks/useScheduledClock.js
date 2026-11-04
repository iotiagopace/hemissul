import { useEffect, useState } from 'react'
import { nextDeadlineDelay } from '../content/scheduledClock'

export function useScheduledClock(deadlines) {
  const [clock, setClock] = useState(() => Date.now())

  useEffect(() => {
    let timeout
    const refresh = () => {
      window.clearTimeout(timeout)
      const now = Date.now()
      setClock(now)
      const delay = nextDeadlineDelay(deadlines, now)
      if (delay !== null) timeout = window.setTimeout(refresh, delay)
    }
    const onVisibility = () => {
      if (document.visibilityState === 'visible') refresh()
    }

    refresh()
    window.addEventListener('focus', refresh)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.clearTimeout(timeout)
      window.removeEventListener('focus', refresh)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [deadlines])

  return clock
}
