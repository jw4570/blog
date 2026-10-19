import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import JournalIcon from './JournalIcon'

export default function NavBar() {
  const router = useRouter()
  const { isDarkMode, toggleDarkMode } = useGlobal()
  const [searching, setSearching] = useState(false)
  const input = useRef(null)
  useEffect(() => {
    if (searching) input.current?.focus()
  }, [searching])
  useEffect(() => {
    setSearching(false)
  }, [router.asPath])
  const links = [
    { href: '/', text: '전체 글' },
    { href: '/archive', text: '보관함' },
    { href: '/category', text: '카테고리' },
    { href: '/tag', text: '태그' }
  ]
  function search(event) {
    event.preventDefault()
    const value = input.current?.value.trim()
    if (value) router.push({ pathname: '/search', query: { s: value } })
  }
  return (
    <nav className='journal-nav' aria-label='주 메뉴'>
      <div className='journal-nav-inner'>
        <SmartLink href='/' className='journal-brand' aria-label='블로그 홈'>
          <span className='journal-brand-icon'>
            j<span>·</span>
          </span>
          <span>
            {siteConfig('AUTHOR')}
            <span className='journal-brand-suffix'>.log</span>
          </span>
        </SmartLink>
        <div className='journal-nav-links'>
          {links.map(link => (
            <SmartLink
              key={link.href}
              href={link.href}
              className={`journal-nav-link ${router.asPath.split('?')[0] === link.href ? 'is-active' : ''}`}
              aria-current={
                router.asPath.split('?')[0] === link.href ? 'page' : undefined
              }
            >
              {link.text}
            </SmartLink>
          ))}
        </div>
        <div className='journal-nav-actions'>
          <button
            className={`journal-icon-button ${searching ? 'is-active' : ''}`}
            aria-label={searching ? '검색 닫기' : '검색 열기'}
            aria-expanded={searching}
            onClick={() => setSearching(!searching)}
          >
            <JournalIcon name={searching ? 'close' : 'search'} />
          </button>
          <button
            className='journal-icon-button'
            aria-label={isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
            onClick={toggleDarkMode}
          >
            <JournalIcon name={isDarkMode ? 'sun' : 'moon'} />
          </button>
        </div>
      </div>
      {searching && (
        <form className='journal-nav-search' onSubmit={search} role='search'>
          <JournalIcon name='search' />
          <input
            ref={input}
            type='search'
            aria-label='글 검색'
            placeholder='어떤 기록을 찾고 있나요?'
            onKeyDown={event => {
              if (event.key === 'Escape') setSearching(false)
            }}
          />
          <button type='submit'>
            검색 <JournalIcon name='arrow' size={16} />
          </button>
        </form>
      )}
    </nav>
  )
}
