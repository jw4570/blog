import NotionPage from '@/components/NotionPage'
import SmartLink from '@/components/SmartLink'
import { createContext, useContext, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Header from './components/Header'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import BlogListPage from './components/BlogListPage'
import SearchInput from './components/SearchInput'
import ArticleInfo from './components/ArticleInfo'
import JournalIcon from './components/JournalIcon'
import CONFIG from './config'
import { Style } from './style'
import ArticleStyle from './components/ArticleStyle'

const ArticleLock = dynamic(() => import('./components/ArticleLock'), {
  ssr: false
})
const Comment = dynamic(() => import('@/components/Comment'), { ssr: false })
const ThemeGlobalSimple = createContext()
export const useSimpleGlobal = () => useContext(ThemeGlobalSimple)

const LayoutBase = props => {
  const searchModal = useRef(null)
  return (
    <ThemeGlobalSimple.Provider value={{ searchModal }}>
      <div id='theme-simple' className='journal'>
        <Style />
        <ArticleStyle />
        <a className='journal-skip-link' href='#main-content'>
          본문으로 건너뛰기
        </a>
        <NavBar {...props} />
        <Header {...props} />
        <main
          id='main-content'
          className={`journal-main ${props.post ? 'journal-reading' : ''}`}
        >
          {props.children}
        </main>
        <Footer />
      </div>
    </ThemeGlobalSimple.Provider>
  )
}
const LayoutIndex = props => <LayoutPostList {...props} />
const LayoutPostList = props => (
  <>
    {(props.tag || props.category) && (
      <div className='journal-filter-heading'>
        <span>{props.tag ? '태그' : '카테고리'}</span>
        <h2>{props.tag || props.category}</h2>
        <SmartLink href='/'>
          전체 글 보기 <JournalIcon name='arrow' size={16} />
        </SmartLink>
      </div>
    )}
    <BlogListPage {...props} />
  </>
)
const LayoutSearch = props => (
  <>
    <SearchInput {...props} />
    {props.keyword && (
      <p className='journal-search-result'>‘{props.keyword}’ 검색 결과</p>
    )}
    <BlogListPage {...props} />
  </>
)
const LayoutArchive = ({ archivePosts = {} }) => (
  <section className='journal-archive' aria-label='기록 보관함'>
    {Object.keys(archivePosts).length ? (
      Object.entries(archivePosts).map(([month, posts]) => (
        <section key={month} className='journal-archive-month' id={month}>
          <h2>
            {month.replace('-', '. ')}
            <span>{posts.length}개의 기록</span>
          </h2>
          <div className='journal-archive-list'>
            {posts.map(post => (
              <SmartLink
                key={post.id}
                href={post.href || `/${post.slug}`}
                className='journal-archive-row'
              >
                <span>{post.title}</span>
                <span className='journal-archive-date'>
                  {post.publishDay}
                  <JournalIcon name='next' size={16} />
                </span>
              </SmartLink>
            ))}
          </div>
        </section>
      ))
    ) : (
      <p className='journal-empty'>아직 공개된 기록이 없습니다.</p>
    )}
  </section>
)
const LayoutSlug = ({ post, lock, validPassword, prev, next }) => {
  const [copied, setCopied] = useState(false)
  const around = [prev, next].filter(
    (item, index, list) =>
      item &&
      item.id !== post?.id &&
      list.findIndex(other => other?.id === item.id) === index
  )
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }
  return (
    <>
      {lock && <ArticleLock validPassword={validPassword} />}
      {!lock && post && (
        <article className='journal-article'>
          <ArticleInfo post={post} />
          <div id='article-wrapper'>
            <NotionPage post={post} />
          </div>
          <div className='journal-article-end'>
            <span>읽어주셔서 감사합니다.</span>
            <button onClick={copyLink}>
              <JournalIcon name='copy' size={16} />
              {copied ? '복사했어요' : '링크 복사'}
            </button>
          </div>
          {around.length > 0 && (
            <nav className='journal-related' aria-label='다른 기록'>
              <span className='journal-section-label'>이어서 읽기</span>
              {around.map(item => (
                <SmartLink key={item.id} href={item.href || `/${item.slug}`}>
                  {item.title}
                  <JournalIcon name='arrow' size={18} />
                </SmartLink>
              ))}
            </nav>
          )}
          <Comment frontMatter={post} />
        </article>
      )}
    </>
  )
}
const Layout404 = () => (
  <div className='journal-empty'>
    <h1>이 기록은 찾을 수 없어요.</h1>
    <p>주소가 변경되었거나 아직 공개되지 않은 글입니다.</p>
    <SmartLink href='/' className='journal-text-link'>
      홈으로 돌아가기 <JournalIcon name='arrow' size={18} />
    </SmartLink>
  </div>
)
const LayoutCategoryIndex = ({ categoryOptions = [] }) => (
  <div className='journal-topic-grid'>
    {categoryOptions.length ? (
      categoryOptions.map(category => (
        <SmartLink
          key={category.name}
          href={`/category/${encodeURIComponent(category.name)}`}
          className='journal-topic'
        >
          <span className='journal-post-symbol'>
            <JournalIcon name='book' />
          </span>
          <h2>{category.name}</h2>
          <span>{category.count}개의 기록</span>
          <JournalIcon name='arrow' />
        </SmartLink>
      ))
    ) : (
      <div className='journal-empty'>
        <h2>아직 분류한 기록이 없어요.</h2>
        <p>관심사가 모이면 이곳에서 만나볼 수 있어요.</p>
        <SmartLink href='/' className='journal-text-link'>
          전체 글 둘러보기 <JournalIcon name='arrow' size={16} />
        </SmartLink>
      </div>
    )}
  </div>
)
const LayoutTagIndex = ({ tagOptions = [] }) => (
  <div className='journal-tag-list'>
    {tagOptions.length ? (
      tagOptions.map(tag => (
        <SmartLink
          key={tag.name}
          href={`/tag/${encodeURIComponent(tag.name)}`}
          className='journal-tag'
        >
          #{tag.name}
          <span>{tag.count || 0}</span>
        </SmartLink>
      ))
    ) : (
      <div className='journal-empty'>
        <h2>아직 등록된 태그가 없어요.</h2>
        <p>지금은 전체 글에서 기록을 둘러보세요.</p>
        <SmartLink href='/' className='journal-text-link'>
          전체 글 보기 <JournalIcon name='arrow' size={16} />
        </SmartLink>
      </div>
    )}
  </div>
)
export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
