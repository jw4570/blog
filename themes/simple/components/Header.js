import { siteConfig } from '@/lib/config'
import { useRouter } from 'next/router'
import JournalIcon from './JournalIcon'

export default function Header({ post, postCount, posts }) {
  const { pathname } = useRouter()
  if (post) return null
  const isHome =
    pathname === '/' || pathname === '/page/[page]' || pathname === '/[prefix]'
  const title = pathname.includes('search')
    ? '어떤 기록을 찾고 있나요?'
    : pathname.includes('archive')
      ? '차곡차곡 쌓인 기록.'
      : pathname.includes('category')
        ? '관심사를 따라, 한 걸음.'
        : pathname.includes('tag')
          ? '작은 주제로 연결된 생각.'
          : '모든 기록'
  return (
    <header className={`journal-hero ${isHome ? '' : 'journal-hero-compact'}`}>
      <div className='journal-hero-copy'>
        <div className='journal-eyebrow'>
          <span className='journal-status-dot' />{' '}
          {isHome ? '작은 발견을 모으는 공간' : 'JUWON’S JOURNAL'}
        </div>
        <h1>
          {isHome ? (
            <>
              배우고, 만들고.
              <br />
              <span>그 과정을 기록합니다.</span>
            </>
          ) : (
            title
          )}
        </h1>
        <p>
          {isHome
            ? '코드 한 줄부터 일상의 작은 생각까지.\n어제보다 조금 더 나아지는 과정을 남깁니다.'
            : '언제든 다시 꺼내 읽을 수 있도록.'}
        </p>
      </div>
      {isHome && (
        <aside className='journal-profile' aria-label='블로그 소개'>
          <div className='journal-profile-top'>
            <span className='journal-app-icon'>
              <JournalIcon name='book' size={28} />
            </span>
            <span className='journal-profile-label'>나의 기록장</span>
            <span className='journal-profile-dots'>···</span>
          </div>
          <div className='journal-profile-author'>
            {siteConfig('AUTHOR')}의 노트
          </div>
          <p>{siteConfig('BIO')}</p>
          <div className='journal-profile-bottom'>
            <span>
              <strong>{postCount ?? posts?.length ?? 0}</strong>개의 공개된 기록
            </span>
            <span className='journal-profile-avatar'>J</span>
          </div>
        </aside>
      )}
    </header>
  )
}
