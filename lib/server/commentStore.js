import BLOG from '@/blog.config'
import {
  anonymousKey,
  normalizeCommentPostId,
  numberComments,
  plainText,
  publicComments
} from './anonymousComments'

export class CommentError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}
const databaseId = () => process.env.NOTION_COMMENTS_DATABASE_ID
const richText = content => ({ rich_text: [{ text: { content } }] })
const cache = new Map()

export async function notionCommentRequest(
  path,
  { method = 'GET', body } = {}
) {
  const token = process.env.NOTION_COMMENTS_TOKEN
  if (!token || !databaseId() || !process.env.NOTION_COMMENTS_SECRET)
    throw new CommentError(503, '댓글 기능을 준비하고 있습니다.')
  const response = await fetch(`https://api.notion.com/v1/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json'
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(15000)
  })
  const data = await response.json()
  if (!response.ok) {
    // A timed-out write may have committed. Retrying uses the same submission ID.
    throw new CommentError(
      response.status === 429 ? 429 : 503,
      response.status === 429
        ? '잠시 후 다시 시도해 주세요.'
        : '노션 연결이 지연되고 있습니다. 잠시 후 다시 시도해 주세요.'
    )
  }
  return data
}

export async function requireCommentPost(postId) {
  const page = await notionCommentRequest(`pages/${postId}`)
  const properties = page.properties || {}
  const status = properties[BLOG.NOTION_PROPERTY_NAME.status]
  const statusName = status?.status?.name || status?.select?.name
  const kind = properties[BLOG.NOTION_PROPERTY_NAME.type]
  const password = plainText(properties[BLOG.NOTION_PROPERTY_NAME.password])
  const allowedParent = String(BLOG.NOTION_PAGE_ID)
    .split(',')
    .some(
      id =>
        normalizeCommentPostId(id) ===
        normalizeCommentPostId(page.parent?.database_id)
    )
  if (
    !allowedParent ||
    page.archived ||
    page.in_trash ||
    password ||
    statusName !== BLOG.NOTION_PROPERTY_NAME.status_publish ||
    (kind && kind.select?.name !== BLOG.NOTION_PROPERTY_NAME.type_post) ||
    properties.comment?.select?.name === 'Hide'
  )
    throw new CommentError(404, '댓글을 사용할 수 없는 글입니다.')
  const date = properties[BLOG.NOTION_PROPERTY_NAME.date]?.date?.start
  if (date && new Date(date).getTime() > Date.now())
    throw new CommentError(404, '아직 공개되지 않은 글입니다.')
}
async function queryComments(body) {
  return notionCommentRequest(`databases/${databaseId()}/query`, {
    method: 'POST',
    body
  })
}
export async function readPostComments(postId, fresh = false) {
  const saved = cache.get(postId)
  if (!fresh && saved?.expires > Date.now()) return saved.pages
  const pages = []
  let cursor
  do {
    const data = await queryComments({
      filter: { property: 'post', relation: { contains: postId } },
      sorts: [{ property: 'sequence', direction: 'ascending' }],
      page_size: 100,
      ...(cursor ? { start_cursor: cursor } : {})
    })
    pages.push(...data.results)
    cursor = data.has_more ? data.next_cursor : null
    if (pages.length >= 10000 && cursor)
      throw new CommentError(503, '댓글이 많아 불러오는 데 시간이 걸립니다.')
  } while (cursor)
  if (cache.size >= 100) cache.delete(cache.keys().next().value)
  cache.set(postId, { pages, expires: Date.now() + 10000 })
  return pages
}
export async function getPublicPostComments(postId, offset = 0) {
  const items = publicComments(await readPostComments(postId))
  return {
    comments: items.slice(offset, offset + 20),
    nextOffset: items.length > offset + 20 ? offset + 20 : null
  }
}
export async function createAnonymousComment({
  postId,
  content,
  visitorId,
  ip,
  submissionId
}) {
  const secret = process.env.NOTION_COMMENTS_SECRET
  const visitor = anonymousKey(secret, `visitor:${postId}:${visitorId}`)
  const requestId = anonymousKey(
    secret,
    `submission:${postId}:${visitorId}:${submissionId}`
  )
  const existing = await queryComments({
    filter: { property: 'submissionId', rich_text: { equals: requestId } },
    page_size: 1
  })
  if (existing.results.length) return { pending: true }
  const rate = anonymousKey(secret, `rate:${ip}`)
  const recent = await queryComments({
    filter: {
      and: [
        {
          or: [
            { property: 'rateKey', rich_text: { equals: rate } },
            { property: 'anonymousKey', rich_text: { equals: visitor } }
          ]
        },
        {
          timestamp: 'created_time',
          created_time: {
            on_or_after: new Date(Date.now() - 60000).toISOString()
          }
        }
      ]
    },
    page_size: 3
  })
  if (recent.results.length >= 3)
    throw new CommentError(429, '댓글은 1분에 3개까지 작성할 수 있습니다.')
  const pages = await readPostComments(postId, true)
  const numbered = numberComments(pages)
  const previous = numbered.find(
    ({ page }) => plainText(page.properties.anonymousKey) === visitor
  )
  const initialNumber =
    previous?.number || new Set(numbered.map(({ number }) => number)).size + 1
  const created = await notionCommentRequest('pages', {
    method: 'POST',
    body: {
      parent: { database_id: databaseId() },
      properties: {
        content: { title: [{ text: { content } }] },
        post: { relation: [{ id: postId }] },
        status: { select: { name: 'Pending' } },
        anonymousNumber: { number: initialNumber },
        createdAt: { date: { start: new Date().toISOString() } },
        anonymousKey: richText(visitor),
        rateKey: richText(rate),
        submissionId: richText(requestId)
      }
    }
  })
  cache.delete(postId)
  const after = await readPostComments(postId, true)
  const actualNumber = numberComments(after).find(
    ({ page }) => page.id === created.id
  )?.number
  // The public display always uses Notion's atomic automatic sequence; this
  // numeric column is a convenience for moderation across simultaneous writes.
  if (actualNumber && actualNumber !== initialNumber) {
    await notionCommentRequest(`pages/${created.id}`, {
      method: 'PATCH',
      body: { properties: { anonymousNumber: { number: actualNumber } } }
    })
  }
  return { pending: true }
}
