import assert from 'node:assert/strict'
import test from 'node:test'
import { getVisibleHeroSlides } from './heroSchedule.js'

const expiry = new Date('2026-12-01T00:00:00-04:00').getTime()
const institutional = [
  { id: 'video', type: 'video' },
  { id: 'manaus', type: 'image' },
  { id: 'confianca', type: 'image' },
]
const campaign = { id: 'promotion', exclusive: true, expiresAt: new Date(expiry).toISOString() }
const slides = [
  institutional[0],
  campaign,
  institutional[1],
  institutional[2],
  { id: 'disabled', enabled: false },
  { id: 'expired', expiresAt: '2026-07-01T00:00:00-04:00' },
]

test('only the exclusive campaign appears until its final millisecond', () => {
  assert.deepEqual(getVisibleHeroSlides(slides, expiry - 1), [campaign])
})

test('the original carousel returns in its original order at midnight', () => {
  assert.deepEqual(getVisibleHeroSlides(slides, expiry), institutional)
})

test('the original carousel remains available after campaign expiry', () => {
  assert.deepEqual(getVisibleHeroSlides(slides, expiry + 86_400_000), institutional)
})

test('a disabled exclusive campaign never hides the institutional slides', () => {
  const disabledCampaign = { ...campaign, enabled: false }
  assert.deepEqual(
    getVisibleHeroSlides([...institutional, disabledCampaign], expiry - 1),
    institutional,
  )
})
