/** @jest-environment node */
import formatDate from '@/lib/utils/formatDate'

describe('blog dates in Seoul', () => {
  it('shows the Korean edit date across the UTC midnight boundary', () => {
    expect(formatDate('2026-10-20T15:27:00.000Z', 'ko-KR')).toBe('2026년 10월 21일')
    expect(formatDate('2026-10-20T14:59:59.000Z', 'ko-KR')).toBe('2026년 10월 20일')
  })

  it('preserves a date-only publication date', () => {
    expect(formatDate('2026-10-21', 'ko-KR')).toBe('2026년 10월 21일')
  })
})
