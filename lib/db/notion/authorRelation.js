import { idToUuid } from 'notion-utils'

export function getAuthorRelationIds(value) {
  const ids = new Set()
  const visit = part => {
    if (!Array.isArray(part)) return
    if (part[0] === 'p' && /^[a-f0-9-]{32,36}$/i.test(part[1] || '')) {
      ids.add(idToUuid(part[1]))
      return
    }
    part.forEach(visit)
  }
  visit(value)
  return [...ids]
}
