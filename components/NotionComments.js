import { useCallback, useEffect, useRef, useState } from 'react'

const formatTime = value =>
  new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Seoul'
  }).format(new Date(value))

export default function NotionComments({ postId }) {
  const [comments, setComments] = useState([])
  const [nextOffset, setNextOffset] = useState(null)
  const [content, setContent] = useState('')
  const [website, setWebsite] = useState('')
  const [loading, setLoading] = useState(true)
  const [ready, setReady] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const submission = useRef(null)
  const busy = useRef(false)
  const activePost = useRef(postId)
  activePost.current = postId

  const loadComments = useCallback(
    async (offset = 0, signal) => {
      setLoading(true)
      setError('')
      try {
        const response = await fetch(
          `/api/notion-comments?postId=${encodeURIComponent(postId)}&offset=${offset}`,
          { signal, cache: 'no-store' }
        )
        const result = await response.json()
        if (!response.ok)
          throw new Error(result.error || '댓글을 불러오지 못했습니다.')
        if (activePost.current !== postId || signal?.aborted) return
        setComments(current =>
          offset ? [...current, ...result.comments] : result.comments
        )
        setNextOffset(result.nextOffset)
        setReady(true)
      } catch (err) {
        if (err.name !== 'AbortError' && activePost.current === postId)
          setError(err.message || '댓글을 불러오지 못했습니다.')
      } finally {
        if (!signal?.aborted && activePost.current === postId) setLoading(false)
      }
    },
    [postId]
  )

  useEffect(() => {
    const controller = new AbortController()
    setComments([])
    setReady(false)
    setNextOffset(null)
    setContent('')
    setNotice('')
    submission.current = null
    void loadComments(0, controller.signal)
    return () => controller.abort()
  }, [loadComments])

  async function submitComment(event) {
    event.preventDefault()
    const text = content.trim()
    if (!text || !ready || busy.current) return
    busy.current = true
    setSubmitting(true)
    setError('')
    setNotice('')
    if (submission.current?.content !== text)
      submission.current = { content: text, id: crypto.randomUUID() }
    try {
      const response = await fetch('/api/notion-comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          content: text,
          website,
          submissionId: submission.current.id
        })
      })
      const result = await response.json()
      if (!response.ok)
        throw new Error(result.error || '댓글을 등록하지 못했습니다.')
      if (activePost.current !== postId) return
      setContent('')
      submission.current = null
      setNotice('댓글이 접수되었습니다. 작성자가 승인하면 이곳에 표시됩니다.')
    } catch (err) {
      if (activePost.current === postId)
        setError(err.message || '연결을 확인한 뒤 다시 시도해 주세요.')
    } finally {
      busy.current = false
      setSubmitting(false)
    }
  }

  return (
    <section className='nc-wrap' aria-labelledby={`comments-heading-${postId}`}>
      <div className='nc-heading'>
        <h2 id={`comments-heading-${postId}`}>댓글</h2>
        <button
          type='button'
          onClick={() => void loadComments()}
          disabled={loading || submitting}
          aria-label='댓글 새로고침'
        >
          새로고침
        </button>
      </div>
      <p className='nc-intro'>로그인 없이 익명으로 이야기 나눌 수 있어요.</p>
      <form onSubmit={submitComment} className='nc-form'>
        <label className='nc-label' htmlFor={`comment-content-${postId}`}>
          댓글 남기기
        </label>
        <textarea
          id={`comment-content-${postId}`}
          value={content}
          onChange={event => setContent(event.target.value)}
          placeholder='글을 읽고 떠오른 생각을 남겨주세요.'
          maxLength={2000}
          required
          rows={4}
          disabled={submitting}
          aria-describedby={`comment-guide-${postId}`}
        />
        <label className='nc-trap' aria-hidden='true'>
          웹사이트
          <input
            name='website'
            value={website}
            onChange={event => setWebsite(event.target.value)}
            tabIndex={-1}
            autoComplete='off'
          />
        </label>
        <div className='nc-form-bottom'>
          <span>{content.length.toLocaleString('ko-KR')} / 2,000</span>
          <button
            type='submit'
            disabled={submitting || !ready || !content.trim()}
          >
            {submitting ? '등록 중…' : '댓글 등록'}
          </button>
        </div>
      </form>
      <p className='nc-guide' id={`comment-guide-${postId}`}>
        댓글은 승인 후 공개됩니다. 같은 브라우저에서는 이 글의 익명 번호가
        유지됩니다.
      </p>
      {notice && (
        <p className='nc-notice' role='status'>
          {notice}
        </p>
      )}
      {error && (
        <p className='nc-error' role='alert'>
          {error}
        </p>
      )}
      <div className='nc-list' aria-busy={loading}>
        {comments.map(comment => (
          <article className='nc-comment' key={comment.id}>
            <div className='nc-comment-meta'>
              <strong>{comment.author}</strong>
              <time dateTime={comment.createdTime}>
                {formatTime(comment.createdTime)}
              </time>
            </div>
            <p>{comment.content}</p>
          </article>
        ))}
        {!loading && !comments.length && !error && (
          <p className='nc-empty'>
            아직 공개된 댓글이 없습니다. 첫 이야기를 남겨보세요.
          </p>
        )}
        {loading && (
          <p className='nc-empty' role='status'>
            댓글을 불러오는 중입니다…
          </p>
        )}
        {nextOffset !== null && (
          <button
            className='nc-more'
            disabled={loading}
            onClick={() => void loadComments(nextOffset)}
          >
            댓글 더 보기
          </button>
        )}
      </div>
      <style jsx>{`
        .nc-wrap {
          margin-top: 48px;
          padding-top: 32px;
          border-top: 1px solid var(--r-line, #e7e9ed);
          color: var(--r-text, #30343b);
          font: inherit;
        }
        .nc-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .nc-heading h2 {
          margin: 0;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.025em;
          color: var(--r-heading, #171b22);
        }
        .nc-heading button {
          background: none;
          border: 0;
          font: inherit;
          font-size: 13px;
          color: var(--r-muted, #707782);
          cursor: pointer;
        }
        .nc-intro {
          font-size: 15px;
          color: var(--r-muted, #707782);
          margin: 8px 0 24px;
          line-height: 1.7;
        }
        .nc-form {
          border: 1px solid var(--r-line, #e7e9ed);
          border-radius: 12px;
          padding: 16px;
          background: var(--r-soft, #f6f7f9);
        }
        .nc-label {
          display: block;
          margin-bottom: 10px;
          font-size: 14px;
          font-weight: 600;
        }
        textarea {
          width: 100%;
          display: block;
          min-height: 120px;
          resize: vertical;
          border: 0;
          background: transparent;
          color: inherit;
          padding: 0;
          font: inherit;
          font-size: 16px;
          line-height: 1.8;
          outline-offset: 4px;
        }
        textarea::placeholder {
          color: var(--r-muted, #707782);
        }
        .nc-form-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-top: 14px;
          font-size: 12px;
          color: var(--r-muted, #707782);
        }
        .nc-form-bottom button {
          border: 0;
          border-radius: 8px;
          background: var(--r-link, #2863bd);
          color: var(--r-soft, #fff);
          padding: 10px 16px;
          font: inherit;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }
        button:disabled {
          opacity: 0.5;
          cursor: default;
        }
        .nc-guide {
          margin: 12px 0 24px;
          font-size: 13px;
          line-height: 1.7;
          color: var(--r-muted, #707782);
        }
        .nc-trap {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
        }
        .nc-notice {
          padding: 14px 16px;
          background: var(--r-soft, #f6f7f9);
          border-radius: 8px;
          color: var(--r-link, #2863bd);
          font-size: 14px;
          line-height: 1.7;
        }
        .nc-error {
          color: #b44c4c;
          font-size: 14px;
          line-height: 1.7;
        }
        .nc-comment {
          padding: 24px 0;
          border-bottom: 1px solid var(--r-line, #e7e9ed);
        }
        .nc-comment-meta {
          display: flex;
          gap: 14px;
          align-items: center;
          flex-wrap: wrap;
        }
        .nc-comment-meta strong {
          font-size: 15px;
          font-weight: 650;
        }
        time {
          font-size: 12px;
          color: var(--r-muted, #707782);
        }
        .nc-comment p {
          margin: 10px 0 0;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
          font-size: 16px;
          line-height: 1.85;
        }
        .nc-empty {
          padding: 20px 0;
          color: var(--r-muted, #707782);
          font-size: 14px;
          line-height: 1.7;
        }
        .nc-more {
          display: block;
          margin: 24px auto 0;
          padding: 10px 18px;
          border: 1px solid var(--r-line, #e7e9ed);
          border-radius: 8px;
          background: transparent;
          color: inherit;
          font: inherit;
          font-size: 14px;
          cursor: pointer;
        }
      `}</style>
    </section>
  )
}
