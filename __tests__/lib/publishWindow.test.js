/** @jest-environment node */
import { isInPublishWindow } from '@/lib/utils/publishWindow'

describe('Korean blog publication schedule', () => {
  it('publishes a date-only post at midnight in Seoul', () => {
    const date = { start_date: '2026-10-21' }
    expect(isInPublishWindow(date, Date.parse('2026-10-20T14:59:59Z'))).toBe(false)
    expect(isInPublishWindow(date, Date.parse('2026-10-20T15:00:00Z'))).toBe(true)
  })

  it('honors an explicit Notion timezone and time', () => {
    const date = { start_date: '2026-10-21', start_time: '10:30', time_zone: 'UTC' }
    expect(isInPublishWindow(date, Date.parse('2026-10-21T10:29:59Z'))).toBe(false)
    expect(isInPublishWindow(date, Date.parse('2026-10-21T10:30:00Z'))).toBe(true)
  })

  it('keeps undated posts visible and honors the end date in Seoul', () => {
    expect(isInPublishWindow()).toBe(true)
    expect(isInPublishWindow({ end_date: '2026-10-21' }, Date.parse('2026-10-21T15:00:00Z'))).toBe(false)
  })
})
