/** @jest-environment node */
import handler from '@/pages/api/notion-comments'
import {
  createAnonymousComment,
  getPublicPostComments,
  requireCommentPost,
  CommentError
} from '@/lib/server/commentStore'
import {
  isSameOriginRequest,
  allowPasswordAttempt
} from '@/lib/server/requestSecurity'
jest.mock('@/lib/server/commentStore', () => {
  class CommentError extends Error {
    constructor(status, message) {
      super(message)
      this.status = status
    }
  }
  return {
    CommentError,
    createAnonymousComment: jest.fn(),
    getPublicPostComments: jest.fn(),
    requireCommentPost: jest.fn()
  }
})
jest.mock('@/lib/server/requestSecurity', () => ({
  isSameOriginRequest: jest.fn(),
  allowPasswordAttempt: jest.fn()
}))
const postId = '3fe7633d-9bef-8026-b268-f81122c654ef'
const makeRes = () => {
  const res = { setHeader: jest.fn(), status: jest.fn(), json: jest.fn() }
  res.status.mockReturnValue(res)
  res.json.mockReturnValue(res)
  return res
}
const request = overrides => ({
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  query: {},
  socket: { remoteAddress: 'test' },
  body: {
    postId,
    content: '댓글',
    submissionId: '01234567-0123-0123-0123-0123456789ab'
  },
  ...overrides
})
beforeEach(() => {
  jest.clearAllMocks()
  process.env.NOTION_COMMENTS_SECRET = 'test-secret'
  process.env.NOTION_COMMENTS_TOKEN = 'test-token'
  isSameOriginRequest.mockReturnValue(true)
  allowPasswordAttempt.mockReturnValue(true)
  requireCommentPost.mockResolvedValue(undefined)
  createAnonymousComment.mockResolvedValue({ pending: true })
  getPublicPostComments.mockResolvedValue({ comments: [], nextOffset: null })
})
it('rejects cross-origin writes before reading the database', async () => {
  isSameOriginRequest.mockReturnValue(false)
  const res = makeRes()
  await handler(request(), res)
  expect(res.status).toHaveBeenCalledWith(403)
  expect(requireCommentPost).not.toHaveBeenCalled()
})
it('rejects oversized or empty comments without writing', async () => {
  for (const content of ['', 'a'.repeat(2001)]) {
    const res = makeRes()
    await handler(request({ body: { ...request().body, content } }), res)
    expect(res.status).toHaveBeenCalledWith(400)
  }
  expect(createAnonymousComment).not.toHaveBeenCalled()
})
it('never trusts client-selected nicknames, moderation state, or anonymous numbers', async () => {
  const res = makeRes()
  await handler(
    request({
      body: {
        ...request().body,
        author: '관리자',
        status: 'Public',
        anonymousNumber: 99
      }
    }),
    res
  )
  expect(createAnonymousComment.mock.calls[0][0]).not.toHaveProperty('status')
  expect(createAnonymousComment.mock.calls[0][0]).not.toHaveProperty(
    'anonymousNumber'
  )
  expect(createAnonymousComment.mock.calls[0][0]).not.toHaveProperty('author')
  expect(res.status).toHaveBeenCalledWith(202)
})
it('returns only the safe public response on reads', async () => {
  const res = makeRes()
  await handler(request({ method: 'GET', query: { postId } }), res)
  expect(res.json).toHaveBeenCalledWith({ comments: [], nextOffset: null })
})
it('rejects non-public articles and does not query their comments', async () => {
  requireCommentPost.mockRejectedValue(new CommentError(404, '비공개'))
  const res = makeRes()
  await handler(request({ method: 'GET', query: { postId } }), res)
  expect(res.status).toHaveBeenCalledWith(404)
  expect(getPublicPostComments).not.toHaveBeenCalled()
})
it('rejects method, malformed post ID, and invalid pagination', async () => {
  for (const [overrides, status] of [
    [{ method: 'DELETE' }, 405],
    [{ method: 'GET', query: { postId: '../private' } }, 400],
    [{ method: 'GET', query: { postId, offset: '-1' } }, 400]
  ]) {
    const res = makeRes()
    await handler(request(overrides), res)
    expect(res.status).toHaveBeenCalledWith(status)
  }
})
it('does not write honeypot submissions', async () => {
  const res = makeRes()
  await handler(request({ body: { ...request().body, website: 'spam' } }), res)
  expect(res.status).toHaveBeenCalledWith(202)
  expect(createAnonymousComment).not.toHaveBeenCalled()
})
