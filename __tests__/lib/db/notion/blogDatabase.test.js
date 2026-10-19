/** @jest-environment node */
import BLOG from '@/blog.config'
import getPageProperties from '@/lib/db/notion/getPageProperties'

jest.mock('notion-utils', () => ({
  getTextContent: chunks => chunks.map(chunk => chunk[0]).join(''),
  getDateValue: jest.fn()
}))

jest.mock('@/lib/db/notion/getNotionAPI', () => ({
  __esModule: true, default: { getUsers: jest.fn() }
}))
jest.mock('@/lib/db/notion/mapImage', () => ({ mapImgUrl: () => '' }))

const schema = {
  title: { name: BLOG.NOTION_PROPERTY_NAME.title, type: 'title' },
  state: { name: BLOG.NOTION_PROPERTY_NAME.status, type: 'status' }
}
const read = (status, extraSchema = {}, extraProperties = {}) =>
  getPageProperties('test-page', {
    properties: { title: [['테스트 글']], ...(status ? { state: [[status]] } : {}), ...extraProperties },
    created_time: 1792401643450, last_edited_time: 1792401643450
  }, { ...schema, ...extraSchema }, null, [])

describe('personal blog database mapping', () => {
  it('maps a native Notion Public status to Published and defaults missing type column to Post', async () => {
    expect(await read('Public')).toMatchObject({ title: '테스트 글', status: 'Published', type: 'Post' })
  })
  it('maps Unlisted to Invisible without including it in the published list', async () => {
    expect(await read('Unlisted')).toMatchObject({ status: 'Invisible' })
  })
  it.each(['Private', undefined, 'Draft'])('does not publish %s entries', async status => {
    const post = await read(status)
    expect(post.status).not.toBe('Published')
    expect(post.status).not.toBe('Invisible')
  })
  it('respects an existing type column and does not turn blank types into posts', async () => {
    expect(await read('Public', { kind: { name: BLOG.NOTION_PROPERTY_NAME.type, type: 'select' } }))
      .toMatchObject({ type: '' })
  })
  it('preserves explicit Page types', async () => {
    expect(await read('Public', { kind: { name: BLOG.NOTION_PROPERTY_NAME.type, type: 'select' } }, { kind: [['Page']] }))
      .toMatchObject({ type: 'Page' })
  })
})
