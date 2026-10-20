/** @jest-environment node */
import { resolveCatalogPost } from '@/lib/server/postCatalog'

const post = { id: '3ff7633d-9bef-812e-a9cf-e7ff4cf3064e', type: 'Post', slug: 'article/new-post' }
const options = { fullSlug: post.slug, lastSegment: 'new-post', refreshOnMiss: true }

it('refreshes a stale catalog once to resolve a newly published slug', async () => {
  const loadCatalog = jest.fn().mockResolvedValueOnce({ allPages: [] }).mockResolvedValueOnce({ allPages: [post] })
  expect((await resolveCatalogPost({ ...options, loadCatalog })).post).toEqual(post)
  expect(loadCatalog.mock.calls).toEqual([[false], [true]])
})

it('resolves a new UUID path after refreshing the catalog', async () => {
  const loadCatalog = jest.fn().mockResolvedValueOnce({ allPages: [] }).mockResolvedValueOnce({ allPages: [post] })
  expect((await resolveCatalogPost({ ...options, lastSegment: post.id, fullSlug: `article/${post.id}`, loadCatalog })).post).toEqual(post)
})

it('does not refresh an existing post or retry indefinitely for a missing post', async () => {
  const loadCatalog = jest.fn().mockResolvedValue({ allPages: [post] })
  expect((await resolveCatalogPost({ ...options, loadCatalog })).post).toEqual(post)
  expect(loadCatalog).toHaveBeenCalledTimes(1)
  const missing = jest.fn().mockResolvedValue({ allPages: [] })
  expect((await resolveCatalogPost({ ...options, loadCatalog: missing })).post).toBeNull()
  expect(missing).toHaveBeenCalledTimes(2)
})

it('keeps build-time generation on its shared catalog', async () => {
  const loadCatalog = jest.fn().mockResolvedValue({ allPages: [] })
  await resolveCatalogPost({ ...options, loadCatalog, refreshOnMiss: false })
  expect(loadCatalog).toHaveBeenCalledTimes(1)
})
