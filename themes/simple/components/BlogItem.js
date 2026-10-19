import SmartLink from '@/components/SmartLink'
import JournalIcon from './JournalIcon'
import AuthorAvatar, { getPostAuthors } from './AuthorAvatar'

export const BlogItem = ({ post }) => {
  const authors = getPostAuthors(post)
  const title =
    post.title?.replace(/^[\p{Extended_Pictographic}\uFE0F\u200D]+\s*/u, '') ||
    '제목 없는 글'
  const date = post.publishDate
    ? new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Seoul'
      }).format(new Date(post.publishDate))
    : post.publishDay
  return (
    <article className='journal-post'>
      <SmartLink
        href={post.href}
        className='journal-post-link'
        aria-label={`${title} 읽기`}
      >
        <div className='journal-post-top'>
          {post.category && (
            <span className='journal-post-kicker'>{post.category}</span>
          )}
          <time
            className='journal-post-meta'
            dateTime={
              post.publishDate
                ? new Date(post.publishDate).toISOString()
                : undefined
            }
          >
            {date}
          </time>
        </div>
        <h2>{title}</h2>
        {post.summary && <p className='journal-post-summary'>{post.summary}</p>}
        <div className='journal-post-bottom'>
          <span className='journal-post-meta'>
            <span className='journal-post-author'>
              <AuthorAvatar author={authors[0]} small />
              {authors.map(author => author.name).join(', ')}
            </span>
            {post.tags?.length > 0 && (
              <span className='journal-post-tags'>
                {post.tags.map(tag => `#${tag}`).join('  ')}
              </span>
            )}
          </span>
          <span className='journal-post-read'>
            글 읽기 <JournalIcon name='next' size={16} />
          </span>
        </div>
      </SmartLink>
    </article>
  )
}
