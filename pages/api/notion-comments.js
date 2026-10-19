import {
  commentIdentity,
  normalizeCommentPostId
} from '@/lib/server/anonymousComments'
import {
  CommentError,
  createAnonymousComment,
  getPublicPostComments,
  requireCommentPost
} from '@/lib/server/commentStore'
import {
  allowPasswordAttempt,
  isSameOriginRequest
} from '@/lib/server/requestSecurity'

export const config = {
  api: { bodyParser: { sizeLimit: '12kb' } },
  maxDuration: 60
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store')
  res.setHeader('CDN-Cache-Control', 'no-store')
  res.setHeader('Vercel-CDN-Cache-Control', 'no-store')
  if (!['GET', 'POST'].includes(req.method)) {
    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: '지원하지 않는 요청입니다.' })
  }
  if (
    req.method === 'POST' &&
    (!isSameOriginRequest(req) ||
      !String(req.headers['content-type']).startsWith('application/json'))
  ) {
    return res.status(403).json({ error: '올바르지 않은 요청입니다.' })
  }
  const secret = process.env.NOTION_COMMENTS_SECRET
  if (!secret || !process.env.NOTION_COMMENTS_TOKEN)
    return res.status(503).json({ error: '댓글 기능을 준비하고 있습니다.' })
  const postId = normalizeCommentPostId(
    req.method === 'GET' ? req.query.postId : req.body?.postId
  )
  if (!postId)
    return res.status(400).json({ error: '글 주소가 올바르지 않습니다.' })
  const offset = req.query.offset === undefined ? 0 : Number(req.query.offset)
  if (!Number.isInteger(offset) || offset < 0 || offset > 10000)
    return res.status(400).json({ error: '잘못된 페이지입니다.' })
  if (!allowPasswordAttempt(req)) {
    res.setHeader('Retry-After', '60')
    return res
      .status(429)
      .json({ error: '요청이 많습니다. 잠시 후 다시 시도해 주세요.' })
  }
  const visitorId = commentIdentity(req, res, secret)
  try {
    if (req.method === 'POST' && req.body?.website)
      return res.status(202).json({ pending: true })
    const content =
      typeof req.body?.content === 'string' ? req.body.content.trim() : ''
    const submissionId = req.body?.submissionId
    if (
      req.method === 'POST' &&
      (!content ||
        content.length > 2000 ||
        typeof submissionId !== 'string' ||
        !/^[a-f0-9-]{36}$/i.test(submissionId))
    ) {
      return res
        .status(400)
        .json({ error: '댓글은 1~2,000자로 입력해 주세요.' })
    }
    await requireCommentPost(postId)
    if (req.method === 'GET')
      return res.status(200).json(await getPublicPostComments(postId, offset))
    const forwarded = process.env.VERCEL ? req.headers['x-forwarded-for'] : null
    const ip = String(forwarded || req.socket?.remoteAddress || 'unknown')
      .split(',')[0]
      .trim()
    return res
      .status(202)
      .json(
        await createAnonymousComment({
          postId,
          content,
          visitorId,
          ip,
          submissionId
        })
      )
  } catch (error) {
    const status = error instanceof CommentError ? error.status : 503
    if (status === 429) res.setHeader('Retry-After', '60')
    // Never log cookies, IP addresses, request content, or upstream credentials.
    return res
      .status(status)
      .json({
        error:
          error instanceof CommentError
            ? error.message
            : '댓글 연결이 지연되고 있습니다. 잠시 후 다시 시도해 주세요.'
      })
  }
}
