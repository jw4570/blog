import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { BlogItem } from './BlogItem'
import JournalIcon from './JournalIcon'

export default function BlogListPage({ page = 1, posts = [], postCount = 0 }) {
  const router = useRouter()
  const { NOTION_CONFIG } = useGlobal()
  const totalPage = Math.ceil(
    postCount / siteConfig('POSTS_PER_PAGE', 12, NOTION_CONFIG)
  )
  const currentPage = +page
  const pagePrefix = router.asPath
    .split('?')[0]
    .replace(/\/page\/[1-9]\d*/, '')
    .replace(/\/$/, '')
    .replace('.html', '')
  const home =
    router.pathname === '/' ||
    router.pathname === '/page/[page]' ||
    router.pathname === '/[prefix]'
  return (
    <section className='journal-post-section' aria-label='글 목록'>
      <div className='journal-section-heading'>
        <div>
          <span className='journal-section-label'>
            {home ? 'RECENT NOTES' : 'COLLECTION'}
          </span>
          <h2>
            {home ? '최근의 기록' : '모아둔 기록'}
            <span>{postCount}</span>
          </h2>
        </div>
        <SmartLink href='/archive' className='journal-text-link'>
          모든 기록 <JournalIcon name='next' size={15} />
        </SmartLink>
      </div>
      {!posts.length && (
        <div className='journal-empty'>
          <JournalIcon name='book' size={32} />
          <h3>아직 기록이 없어요.</h3>
          <p>새로운 생각이 차곡차곡 쌓일 공간입니다.</p>
        </div>
      )}
      <div id='posts-wrapper' className='journal-post-grid'>
        {posts.map((post, index) => (
          <BlogItem
            key={post.id}
            post={post}
            index={index}
            featured={home && currentPage === 1 && index === 0}
          />
        ))}
      </div>
      {totalPage > 1 && (
        <nav className='journal-pagination' aria-label='글 페이지'>
          <span>
            {currentPage} / {totalPage}
          </span>
          <div>
            {currentPage > 1 && (
              <SmartLink
                href={
                  currentPage === 2
                    ? `${pagePrefix}/`
                    : `${pagePrefix}/page/${currentPage - 1}`
                }
              >
                <JournalIcon name='back' size={16} /> 이전
              </SmartLink>
            )}
            {currentPage < totalPage && (
              <SmartLink href={`${pagePrefix}/page/${currentPage + 1}`}>
                다음 <JournalIcon name='next' size={16} />
              </SmartLink>
            )}
          </div>
        </nav>
      )}
    </section>
  )
}
