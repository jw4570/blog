/** @jest-environment node */
import {
  attachNotionAuthors,
  getAuthorRelationIds,
  readAuthorProfiles
} from '@/lib/db/notion/authors'
import { fetchNotionPageBlocks } from '@/lib/db/notion/getPostBlocks'

jest.mock('notion-utils', () => ({
  getTextContent: chunks => chunks.map(chunk => chunk[0]).join(''),
  idToUuid: id =>
    id
      .replaceAll('-', '')
      .replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5')
}))
jest.mock('@/lib/db/notion/getPostBlocks', () => ({
  fetchNotionPageBlocks: jest.fn()
}))
jest.mock('@/lib/db/notion/mapImage', () => ({
  mapImgUrl: (source, page) =>
    `https://notion.so/image/${encodeURIComponent(source)}?id=${page.id}`,
  compressImage: source => source
}))
const id = '3fe7633d-9bef-80cb-8b0d-d3a48059a97c'
const relation = [['‣', [['p', id, 'space']]]]
const records = {
  collection: {
    profile: {
      value: {
        id: 'profile',
        schema: {
          title: { name: 'name', type: 'title' },
          photo: { name: 'picture', type: 'file' }
        }
      }
    }
  },
  block: {
    [id]: {
      value: {
        id,
        type: 'page',
        parent_id: 'profile',
        properties: {
          title: [['Heisenberg']],
          photo: [['photo.jpg', [['a', 'attachment:photo:photo.jpg']]]]
        }
      }
    }
  }
}
it('extracts relation page IDs without treating workspace IDs as authors', () => {
  expect(getAuthorRelationIds([...relation, ...relation])).toEqual([id])
  expect(getAuthorRelationIds(undefined)).toEqual([])
})
it('reads names and file properties from the profile database', () => {
  expect(readAuthorProfiles(records).get(id)).toEqual({
    name: 'Heisenberg',
    picture: `https://notion.so/image/attachment%3Aphoto%3Aphoto.jpg?id=${id}`
  })
})
it('attaches only selected profiles and removes raw relations', async () => {
  fetchNotionPageBlocks.mockResolvedValue(records)
  const posts = [
    { authorPageIds: [id], Author: '‣' },
    { authorPageIds: ['unknown'] }
  ]
  await attachNotionAuthors(posts)
  expect(posts[0].authors[0].name).toBe('Heisenberg')
  expect(posts[0]).not.toHaveProperty('Author')
  expect(posts[0]).not.toHaveProperty('authorPageIds')
  expect(posts[1].authors).toEqual([])
})
it('does not fetch an author database when no author is selected', async () => {
  fetchNotionPageBlocks.mockClear()
  await attachNotionAuthors([{}])
  expect(fetchNotionPageBlocks).not.toHaveBeenCalled()
})
