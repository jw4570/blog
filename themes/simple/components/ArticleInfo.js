import SmartLink from '@/components/SmartLink'
import JournalIcon from './JournalIcon'
import AuthorAvatar, { getPostAuthors } from './AuthorAvatar'
export default function ArticleInfo({ post }) {
  const authors = getPostAuthors(post)
  return (
    <header className='journal-article-header'>
      <SmartLink href='/' className='journal-back-link'>
        <JournalIcon name='back' size={16} /> 모든 기록으로
      </SmartLink>
      <div className='journal-article-category'>{post.category || '노트'}</div>
      <h1>
        {post.title?.replace(
          /^[\p{Extended_Pictographic}\uFE0F\u200D]+\s*/u,
          ''
        )}
      </h1>
      {post.summary && (
        <p className='journal-article-summary'>{post.summary}</p>
      )}
      <div className='journal-article-meta'>
        <div>
          <span className='journal-detail-label'>작성자</span>
          <span className='journal-detail-value journal-detail-author'>
            <span className='journal-author-avatars'>
              {authors.map(author => <AuthorAvatar key={author.name} author={author} />)}
            </span>
            {authors.map(author => author.name).join(', ')}
          </span>
        </div>
        <div>
          <span className='journal-detail-label'>발행일</span>
          <span className='journal-detail-value'>{post.publishDay}</span>
        </div>
        <div>
          <span className='journal-detail-label'>{post.tags?.length ? '태그' : '최근 수정'}</span>
          <span className='journal-detail-value'>
            {post.tags?.length ? post.tags.map(tag => (
              <SmartLink key={tag} href={`/tag/${encodeURIComponent(tag)}`}>{tag}</SmartLink>
            )) : post.lastEditedDay || post.publishDay}
          </span>
        </div>
      </div>
    </header>
  )
}
