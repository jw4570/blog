import BLOG from '@/blog.config'
import { getTextContent, idToUuid } from 'notion-utils'
import { fetchNotionPageBlocks } from './getPostBlocks'
import { normalizeCollection, normalizePageBlock } from './normalizeUtil'
import { compressImage, mapImgUrl } from './mapImage'

export { getAuthorRelationIds } from './authorRelation'

export function readAuthorProfiles(recordMap) {
  const profiles = new Map()
  for (const entry of Object.values(recordMap?.collection || {})) {
    const collection = normalizeCollection(entry)
    const columns = Object.entries(collection.schema || {})
    const titleKey = columns.find(([, column]) => column.type === 'title')?.[0]
    const pictureKey = columns.find(
      ([, column]) => column.name === 'picture'
    )?.[0]
    if (!titleKey) continue
    for (const block of Object.values(recordMap.block || {})) {
      const page = normalizePageBlock(block)
      if (!page || page.parent_id !== collection.id || page.alive === false)
        continue
      const name = getTextContent(page.properties?.[titleKey] || []).trim()
      if (!name) continue
      const pictureValue = page.properties?.[pictureKey]
      const fileUrl = pictureValue?.[0]?.[1]?.find(
        annotation => annotation[0] === 'a'
      )?.[1]
      const plainUrl = pictureValue ? getTextContent(pictureValue) : ''
      const source = fileUrl || (/^https?:\/\//.test(plainUrl) ? plainUrl : '')
      profiles.set(idToUuid(page.id), {
        name,
        picture: source ? compressImage(mapImgUrl(source, page), 160, 85) : ''
      })
    }
  }
  return profiles
}

export async function attachNotionAuthors(posts) {
  if (!posts.some(post => post.authorPageIds?.length)) return
  const recordMap = await fetchNotionPageBlocks(
    BLOG.NOTION_AUTHORS_PAGE_ID,
    'authors'
  )
  const profiles = readAuthorProfiles(recordMap)
  for (const post of posts) {
    post.authors = (post.authorPageIds || [])
      .map(id => profiles.get(id))
      .filter(Boolean)
    delete post.authorPageIds
    delete post[BLOG.NOTION_PROPERTY_NAME.author]
  }
}
