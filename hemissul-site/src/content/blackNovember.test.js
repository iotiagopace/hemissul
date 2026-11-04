import assert from 'node:assert/strict'
import test from 'node:test'
import { BLACK_NOVEMBER_ENDS_AT, isBlackNovemberActive } from './blackNovember.js'
import { MAX_TIMEOUT_MS, nextDeadlineDelay } from './scheduledClock.js'
import { getVisibleHeroSlides } from './heroSchedule.js'

const expiry = new Date(BLACK_NOVEMBER_ENDS_AT).getTime()
const deadlines = [BLACK_NOVEMBER_ENDS_AT]
const original = [{ id: 'video' }, { id: 'manaus' }, { id: 'confianca' }]
const promotion = { id: 'black-november', exclusive: true, expiresAt: BLACK_NOVEMBER_ENDS_AT }
const slides = [original[0], promotion, ...original.slice(1)]

test('theme and promotion end together at midnight in Boa Vista, regardless of visitor timezone', () => {
  for (const time of ['2026-11-30T23:59:59.999-04:00', '2026-12-01T00:59:59.999-03:00']) {
    const now = new Date(time).getTime()
    assert.equal(isBlackNovemberActive('/', now), true)
    assert.deepEqual(getVisibleHeroSlides(slides, now), [promotion])
  }
  for (const now of [expiry, expiry + 1, expiry + 86_400_000]) {
    assert.equal(isBlackNovemberActive('/', now), false)
    assert.deepEqual(getVisibleHeroSlides(slides, now), original)
  }
})

test('campaign colors are restricted to the approved home', () => {
  for (const route of ['/cotacao', '/quem-somos', '/protecao-veicular', '/pitstop']) {
    assert.equal(isBlackNovemberActive(route, expiry - 1), false)
  }
})

test('a page opened more than 25 days before expiry safely schedules a second timer', () => {
  const now = new Date('2026-11-04T10:00:00-04:00').getTime()
  assert.equal(nextDeadlineDelay(deadlines, now), MAX_TIMEOUT_MS)
  const next = now + MAX_TIMEOUT_MS
  assert.equal(nextDeadlineDelay(deadlines, next), expiry - next)
})

test('the clock stops after the last deadline and ignores invalid and past entries', () => {
  assert.equal(nextDeadlineDelay(deadlines, expiry - 1), 1)
  assert.equal(nextDeadlineDelay(deadlines, expiry), null)
  assert.equal(nextDeadlineDelay(['invalid', '2026-10-01', ...deadlines], expiry - 100), 100)
})
