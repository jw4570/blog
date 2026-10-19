/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { siteConfig } from '@/lib/config'

export function getPostAuthors(post) {
  return post?.authors?.length
    ? post.authors
    : [{ name: siteConfig('AUTHOR'), picture: '' }]
}

export default function AuthorAvatar({ author, small = false }) {
  const [failedSource, setFailedSource] = useState(null)
  const showPhoto = author.picture && failedSource !== author.picture
  return (
    <span
      className={`journal-author-avatar${small ? ' journal-author-avatar-small' : ''}`}
      aria-hidden='true'
    >
      {showPhoto ? (
        <img
          src={author.picture}
          alt=''
          width={small ? 24 : 36}
          height={small ? 24 : 36}
          decoding='async'
          referrerPolicy='no-referrer'
          onError={() => setFailedSource(author.picture)}
        />
      ) : (
        author.name?.trim().slice(0, 1)
      )}
    </span>
  )
}
