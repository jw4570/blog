import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import JournalIcon from './JournalIcon'
export default function Footer() {
  return (
    <footer className='journal-footer'>
      <div>
        <span className='journal-footer-brand'>{siteConfig('AUTHOR')}.log</span>
        <p>배우고 만들며, 차곡차곡.</p>
      </div>
      <div className='journal-footer-right'>
        <SmartLink href='/rss/feed.xml' className='journal-rss'>
          <JournalIcon name='rss' size={16} /> RSS 구독
        </SmartLink>
        <span>
          © {new Date().getFullYear()} {siteConfig('AUTHOR')}
        </span>
      </div>
    </footer>
  )
}
