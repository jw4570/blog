/** @jest-environment node */
import {
  createAnonymousComment,
  requireCommentPost
} from '@/lib/server/commentStore'
import BLOG from '@/blog.config'

const postId = '3fe7633d-9bef-8026-b268-f81122c654ef'
const mockFetch = jest.fn()
const result = data => Promise.resolve({ ok: true, json: async () => data })
beforeEach(() => {
  global.fetch = mockFetch
  mockFetch.mockReset()
  process.env.NOTION_COMMENTS_TOKEN = 'test-token'
  process.env.NOTION_COMMENTS_SECRET = 'test-secret'
  process.env.NOTION_COMMENTS_DATABASE_ID = 'test-database'
})
it.each(['Private', 'Unlisted', undefined])(
  'rejects comments on a %s post',
  async status => {
    mockFetch.mockImplementation(() =>
      result({
        parent: { database_id: BLOG.NOTION_PAGE_ID },
        properties: { status: { status: { name: status } } }
      })
    )
    await expect(requireCommentPost(postId)).rejects.toMatchObject({
      status: 404
    })
  }
)
it('rejects pages outside the configured blog', async () => {
  mockFetch.mockImplementation(() =>
    result({
      parent: { database_id: '00000000-0000-0000-0000-000000000000' },
      properties: { status: { status: { name: 'Public' } } }
    })
  )
  await expect(requireCommentPost(postId)).rejects.toMatchObject({
    status: 404
  })
})
it('rejects password-protected articles', async () => {
  mockFetch.mockImplementation(() =>
    result({
      parent: { database_id: BLOG.NOTION_PAGE_ID },
      properties: {
        status: { status: { name: 'Public' } },
        password: { rich_text: [{ plain_text: 'secret' }] }
      }
    })
  )
  await expect(requireCommentPost(postId)).rejects.toMatchObject({
    status: 404
  })
})
it('does not create a duplicate when a saved submission is retried', async () => {
  mockFetch.mockImplementation(() => result({ results: [{ id: 'existing' }] }))
  await expect(
    createAnonymousComment({
      postId,
      content: 'hello',
      visitorId: 'visitor',
      ip: 'test',
      submissionId: 'submission'
    })
  ).resolves.toEqual({ pending: true })
  expect(mockFetch).toHaveBeenCalledTimes(1)
  expect(mockFetch.mock.calls[0][0]).toContain('/query')
})
it('persists only Pending and a one-page post relation without storing a raw IP', async () => {
  const saved = {
    id: 'saved',
    created_time: '2026-10-19T12:00:00Z',
    properties: { sequence: { unique_id: { number: 1 } } }
  }
  mockFetch.mockImplementation((url, options) => {
    if (url.endsWith('/pages')) return result(saved)
    return result({ results: [] })
  })
  await createAnonymousComment({
    postId,
    content: 'hello',
    visitorId: 'visitor',
    ip: '192.0.2.1',
    submissionId: 'submission'
  })
  const creation = mockFetch.mock.calls.find(([url]) => url.endsWith('/pages'))
  const body = JSON.parse(creation[1].body)
  expect(body.properties.status).toEqual({ select: { name: 'Pending' } })
  expect(body.properties.post.relation).toEqual([{ id: postId }])
  expect(body.properties.anonymousNumber.number).toBe(1)
  expect(creation[1].body).not.toContain('192.0.2.1')
})
it('checks a durable recent-comment limit before creating a page', async () => {
  mockFetch
    .mockImplementationOnce(() => result({ results: [] }))
    .mockImplementationOnce(() => result({ results: [{}, {}, {}] }))
  await expect(
    createAnonymousComment({
      postId,
      content: 'hello',
      visitorId: 'visitor',
      ip: 'test',
      submissionId: 'submission'
    })
  ).rejects.toMatchObject({ status: 429 })
  expect(mockFetch.mock.calls.some(([url]) => url.endsWith('/pages'))).toBe(
    false
  )
})
