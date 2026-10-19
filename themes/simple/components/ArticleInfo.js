import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import JournalIcon from './JournalIcon'
export default function ArticleInfo({ post }) {
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
      <div className='journal-article-meta'>
        <span className='journal-author-avatar'>J</span>
        <span>
          <strong>{siteConfig('AUTHOR')}</strong>
          <span>
            {post.publishDay}
            {post.lastEditedDay !== post.publishDay
              ? ` · ${post.lastEditedDay} 수정`
              : ''}
          </span>
        </span>
      </div>
      {post.summary && (
        <p className='journal-article-summary'>{post.summary}</p>
      )}
    </header>
  )
}
