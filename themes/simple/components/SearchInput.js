import { useRouter } from 'next/router'
import { useRef, useImperativeHandle } from 'react'
import JournalIcon from './JournalIcon'
export default function SearchInput({ keyword, cRef }) {
  const input = useRef(null)
  const router = useRouter()
  useImperativeHandle(cRef, () => ({ focus: () => input.current?.focus() }))
  return (
    <form
      className='journal-search-form'
      role='search'
      onSubmit={event => {
        event.preventDefault()
        const value = input.current.value.trim()
        if (value) router.push({ pathname: '/search', query: { s: value } })
      }}
    >
      <JournalIcon name='search' size={22} />
      <input
        ref={input}
        key={keyword}
        defaultValue={keyword || ''}
        type='search'
        aria-label='글 검색'
        placeholder='제목이나 태그로 기록 찾기'
      />
      <button type='submit'>검색</button>
    </form>
  )
}
