/** @jest-environment node */
import {
  commentIdentity,
  normalizeCommentPostId,
  numberComments,
  publicComments
} from '@/lib/server/anonymousComments'

const text = value => ({ rich_text: [{ plain_text: value }] })
const page = (id, visitor, sequence, status = 'Public') => ({
  id,
  created_time: '2026-10-19T12:00:00Z',
  properties: {
    anonymousKey: text(visitor),
    rateKey: text('private-rate'),
    submissionId: text(id),
    sequence: { unique_id: { number: sequence } },
    content: { title: [{ plain_text: `<script>${id}</script>` }] },
    status: { select: { name: status } }
  }
})

it('keeps one visitor number across repeated comments and moderation changes', () => {
  const pages = [
    page('third', 'A', 3),
    page('second', 'B', 2, 'Pending'),
    page('first', 'A', 1, 'Hidden')
  ]
  expect(numberComments(pages).map(item => item.number)).toEqual([1, 2, 1])
  expect(publicComments(pages)).toEqual([
    {
      id: 'third',
      author: '익명1',
      content: '<script>third</script>',
      createdTime: '2026-10-19T12:00:00Z'
    }
  ])
  pages[1].properties.status.select.name = 'Public'
  expect(publicComments(pages).map(item => item.author)).toEqual([
    '익명2',
    '익명1'
  ])
})
it('assigns separate numbers to simultaneous visitors using the automatic sequence', () => {
  expect(
    publicComments([page('B', 'B', 2), page('A', 'A', 1)]).map(
      item => item.author
    )
  ).toEqual(['익명1', '익명2'])
})
it('never includes Pending, Hidden, or missing moderation states in public responses', () => {
  const pages = [
    page('a', 'A', 1, 'Pending'),
    page('b', 'B', 2, 'Hidden'),
    page('c', 'C', 3)
  ]
  delete pages[2].properties.status
  expect(publicComments(pages)).toEqual([])
})
it('redacts all internal identifiers from public responses', () => {
  expect(
    Object.keys(publicComments([page('one', 'secret-browser', 1)])[0]).sort()
  ).toEqual(['author', 'content', 'createdTime', 'id'])
})
it('suppresses duplicate submission records', () => {
  const first = page('one', 'A', 1)
  const duplicate = page('two', 'A', 2)
  duplicate.properties.submissionId = first.properties.submissionId
  expect(publicComments([duplicate, first])).toHaveLength(1)
})
it('accepts only canonicalizable UUIDs', () => {
  expect(normalizeCommentPostId('3fe7633d9bef8026b268f81122c654ef')).toBe(
    '3fe7633d-9bef-8026-b268-f81122c654ef'
  )
  expect(normalizeCommentPostId('../pages/other')).toBeNull()
  expect(normalizeCommentPostId(['a'])).toBeNull()
})
it('reuses a signed browser cookie and replaces a tampered one', () => {
  const res = { setHeader: jest.fn() }
  const original = commentIdentity({ headers: {} }, res, 'test-secret')
  const header = res.setHeader.mock.calls[0][1]
  const cookie = header.split(';')[0]
  expect(header).toContain('HttpOnly; SameSite=Lax')
  res.setHeader.mockClear()
  expect(commentIdentity({ headers: { cookie } }, res, 'test-secret')).toBe(
    original
  )
  expect(res.setHeader).not.toHaveBeenCalled()
  expect(
    commentIdentity(
      {
        headers: {
          cookie: cookie.slice(0, -1) + (cookie.endsWith('a') ? 'b' : 'a')
        }
      },
      res,
      'test-secret'
    )
  ).not.toBe(original)
  expect(res.setHeader).toHaveBeenCalled()
})
