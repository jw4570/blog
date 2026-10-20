import { normalizePostId } from '@/lib/utils/publicPost'

function findPost(props, fullSlug, lastSegment) {
  const pages = props?.allPages || []
  return pages.find(page => page && !page.type?.includes('Menu') && page.slug === fullSlug) ||
    pages.find(page => /^[a-f0-9-]{32,36}$/i.test(lastSegment || '') &&
      normalizePostId(page?.id) === normalizePostId(lastSegment)) || null
}

// Home and article routes can run in different server instances with old catalogs.
// Refresh once before treating a newly published path as absent.
export async function resolveCatalogPost({ loadCatalog, fullSlug, lastSegment, refreshOnMiss }) {
  let props = await loadCatalog(false)
  let post = findPost(props, fullSlug, lastSegment)
  if (!post && refreshOnMiss) {
    props = await loadCatalog(true)
    post = findPost(props, fullSlug, lastSegment)
  }
  return { props, post }
}
