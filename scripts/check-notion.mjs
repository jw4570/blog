// Read-only connection check. No Notion cookies or integration tokens required.
const pageId = process.env.NOTION_PAGE_ID?.split(',')[0]?.replaceAll('-', '')
if (!/^[a-f0-9]{32}$/i.test(pageId || '')) {
  console.error('NOTION_PAGE_ID를 .env.local에 설정해 주세요.')
  process.exit(1)
}
const unwrap = entry => {
  let value = entry
  for (let i = 0; i < 4 && value?.value; i++) value = value.value
  return value
}
try {
  const response = await fetch(`${process.env.API_BASE_URL || 'https://app.notion.com/api/v3'}/loadPageChunk`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pageId: pageId.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5'), limit: 100, cursor: { stack: [] }, chunkNumber: 0, verticalColumns: false }),
    signal: AbortSignal.timeout(30000)
  })
  if (!response.ok) throw new Error(`Notion HTTP ${response.status}`)
  const data = await response.json()
  const collections = Object.values(data.recordMap?.collection || {}).map(unwrap)
  const collection = collections.find(item => item?.schema)
  if (!collection) throw new Error('공개 데이터베이스를 읽을 수 없습니다. 노션의 웹 게시 상태와 페이지 ID를 확인해 주세요.')
  const columns = Object.values(collection.schema)
  const statusName = process.env.NEXT_PUBLIC_NOTION_PROPERTY_STATUS || 'status'
  const status = columns.find(column => column.name === statusName) ||
    (statusName === 'status' ? columns.find(column => column.name === '발행 상태') : null)
  if (!status || !['select', 'status'].includes(status.type)) throw new Error(`선택 또는 상태 속성 '${statusName}'가 필요합니다.`)
  const publicStatus = process.env.NEXT_PUBLIC_NOTION_PROPERTY_STATUS_PUBLISH || 'Public'
  if (!status.options?.some(option => option.value === publicStatus)) throw new Error(`발행 상태에 '${publicStatus}' 옵션이 필요합니다.`)
  console.log(`노션 연결 성공: ${collection.name?.flat().join('') || 'BLOG'}`)
  console.log(`속성: ${columns.map(column => `${column.name} (${column.type})`).join(', ')}`)
  console.log(`블로그 목록에는 '${publicStatus}' 상태인 글만 표시합니다.`)
} catch (error) {
  console.error(`노션 연결 실패: ${error.message}`)
  process.exitCode = 1
}
