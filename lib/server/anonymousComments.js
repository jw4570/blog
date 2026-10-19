import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'

export function normalizeCommentPostId(value) {
  if (typeof value !== 'string') return null
  const id = value.replaceAll('-', '').toLowerCase()
  return /^[a-f0-9]{32}$/.test(id)
    ? id.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5')
    : null
}
export const plainText = property =>
  (property?.title || property?.rich_text || [])
    .map(item => item.plain_text || item.text?.content || '')
    .join('')

export function commentIdentity(req, res, secret) {
  const name =
    process.env.NODE_ENV === 'production'
      ? '__Host-blog-anonymous'
      : 'blog-anonymous'
  const cookie = String(req.headers.cookie || '')
    .split(';')
    .map(v => v.trim())
    .find(v => v.startsWith(`${name}=`))
    ?.slice(name.length + 1)
  let [id, signature] = (cookie || '').split('.')
  const sign = value => createHmac('sha256', secret).update(value).digest('hex')
  if (
    !/^[a-f0-9]{64}$/.test(id || '') ||
    !/^[a-f0-9]{64}$/.test(signature || '') ||
    !timingSafeEqual(
      Buffer.from(signature || '', 'hex'),
      Buffer.from(sign(id || ''), 'hex')
    )
  ) {
    id = randomBytes(32).toString('hex')
    signature = sign(id)
    res.setHeader(
      'Set-Cookie',
      `${name}=${id}.${signature}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
    )
  }
  return id
}
export const anonymousKey = (secret, value) =>
  createHmac('sha256', secret).update(value).digest('hex')

/** Number first appearances before moderation filtering, so approval cannot renumber people. */
export function numberComments(pages) {
  const visitors = new Map()
  const submissions = new Set()
  return [...pages]
    .sort((a, b) => {
      const sequenceA = a.properties?.sequence?.unique_id?.number
      const sequenceB = b.properties?.sequence?.unique_id?.number
      if (sequenceA != null && sequenceB != null) return sequenceA - sequenceB
      return (
        String(a.created_time).localeCompare(String(b.created_time)) ||
        a.id.localeCompare(b.id)
      )
    })
    .filter(page => !page.archived && !page.in_trash)
    .map(page => {
      const key = plainText(page.properties?.anonymousKey) || page.id
      if (!visitors.has(key)) visitors.set(key, visitors.size + 1)
      return { page, number: visitors.get(key) }
    })
    .filter(({ page }) => {
      const submission = plainText(page.properties?.submissionId)
      if (!submission) return true
      if (submissions.has(submission)) return false
      submissions.add(submission)
      return true
    })
}
export function publicComments(pages) {
  return numberComments(pages)
    .filter(({ page }) => page.properties?.status?.select?.name === 'Public')
    .map(({ page, number }) => ({
      id: page.id,
      content: plainText(page.properties.content),
      author: `익명${number}`,
      createdTime: page.created_time
    }))
}
