import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import JournalIcon from './JournalIcon'

export const BlogItem = ({ post, featured = false, index = 0 }) => {
  const title =
    post.title?.replace(/^[\p{Extended_Pictographic}\uFE0F\u200D]+\s*/u, '') ||
    '제목 없는 기록'
  const date = post.publishDate
    ? new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(new Date(post.publishDate))
    : post.publishDay
  return (
    <article
      className={`journal-post ${featured ? 'journal-post-featured' : ''}`}
    >
      <SmartLink
        href={post.href}
        className='journal-post-link'
        aria-label={`${title} 읽기`}
      >
        <div className='journal-post-top'>
          <span className={`journal-post-symbol journal-symbol-${index % 4}`}>
            <JournalIcon name='book' size={featured ? 23 : 20} />
          </span>
          <span className='journal-post-kicker'>
            {featured ? '가장 최근의 기록' : post.category || '개발 노트'}
          </span>
          <span className='journal-post-arrow'>
            <JournalIcon name='arrow' size={20} />
          </span>
        </div>
        <h2>{title}</h2>
        {post.summary && <p className='journal-post-summary'>{post.summary}</p>}
        <div className='journal-post-bottom'>
          <span className='journal-post-meta'>
            {date}
            <span className='journal-meta-dot'>·</span>
            {siteConfig('AUTHOR')}
          </span>
          <span className='journal-post-read'>
            읽어보기 <JournalIcon name='next' size={14} />
          </span>
        </div>
      </SmartLink>
    </article>
  )
}
