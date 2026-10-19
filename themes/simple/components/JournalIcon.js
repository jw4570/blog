const paths = {
  arrow: 'M7 17 17 7M7 7h10v10',
  next: 'm9 5 7 7-7 7',
  back: 'm15 5-7 7 7 7',
  search: 'm21 21-4.4-4.4M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  sun: 'M12 3V1m0 22v-2M3 12H1m22 0h-2M4.2 4.2 2.8 2.8m18.4 18.4-1.4-1.4m0-15.6 1.4-1.4M2.8 21.2l1.4-1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  moon: 'M20.5 13A8.5 8.5 0 0 1 11 3.5 8.5 8.5 0 1 0 20.5 13Z',
  book: 'M4 4h6a3 3 0 0 1 3 3v14a4 4 0 0 0-4-3H4V4Zm16 0h-4a3 3 0 0 0-3 3v14a4 4 0 0 1 4-3h3V4Z',
  rss: 'M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16M5 20h.01',
  copy: 'M9 9h11v11H9V9ZM15 5V3H3v12h2',
  close: 'm6 6 12 12M6 18 18 6'
}
export default function JournalIcon({ name = 'arrow', size = 20, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.7'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      {...props}
    >
      <path d={paths[name] || paths.arrow} />
    </svg>
  )
}
