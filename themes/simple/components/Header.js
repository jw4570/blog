import { siteConfig } from '@/lib/config'
import { useRouter } from 'next/router'

export default function Header({ post }) {
  const { pathname } = useRouter()
  if (post) return null
  const isHome =
    pathname === '/' || pathname === '/page/[page]' || pathname === '/[prefix]'
  const title = pathname.includes('search')
    ? '글 검색'
    : pathname.includes('archive')
      ? '글 보관함'
      : pathname.includes('category')
        ? '카테고리'
        : pathname.includes('tag')
          ? '태그'
          : '모든 글'
  return (
    <header className='journal-hero journal-hero-compact'>
      <div className='journal-hero-copy'>
        <h1>{isHome ? `${siteConfig('AUTHOR')}의 블로그` : title}</h1>
        <p>
          {isHome
            ? siteConfig('BIO')
            : '배우고 생각한 것들을 모아둔 공간입니다.'}
        </p>
      </div>
    </header>
  )
}
