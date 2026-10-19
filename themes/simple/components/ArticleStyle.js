/* eslint-disable react/no-unknown-property */
export default function ArticleStyle() {
  return (
    <style jsx global>{`
      @font-face {
        font-family: 'Journal Pretendard';
        src: url('/fonts/pretendard/PretendardVariable.woff2') format('woff2');
        font-style: normal;
        font-weight: 100 900;
        font-display: swap;
      }
      /* A continuous reading surface, with one type scale for Notion blocks. */
      #theme-simple:has(.journal-reading) {
        --r-text: #30343b;
        --r-heading: #171b22;
        --r-muted: #707782;
        --r-line: #e7e9ed;
        --r-soft: #f6f7f9;
        --r-link: #2863bd;
        --r-code: #334155;
        --r-comment: #78828f;
        --r-keyword: #8250a4;
        --r-string: #21684d;
        --r-number: #975a16;
        --r-function: #255eb5;
        background: #fff;
      }
      .dark #theme-simple:has(.journal-reading) {
        --r-text: #cdd1d8;
        --r-heading: #f0f2f5;
        --r-muted: #969eaa;
        --r-line: #30353d;
        --r-soft: #20242b;
        --r-link: #8cb7f6;
        --r-code: #d5dce6;
        --r-comment: #929dab;
        --r-keyword: #ceb0f2;
        --r-string: #a4d5b4;
        --r-number: #e5c18c;
        --r-function: #99c3fa;
        background: #181b20;
      }
      #theme-simple .journal-main.journal-reading {
        width: 100%;
        max-width: 804px;
        padding: 44px 32px 80px;
        font-family:
          'Journal Pretendard',
          -apple-system,
          BlinkMacSystemFont,
          'Apple SD Gothic Neo',
          sans-serif;
        letter-spacing: -0.015em;
      }
      #theme-simple .journal-reading .journal-article {
        padding: 0;
        background: transparent;
        border: 0;
        border-radius: 0;
        box-shadow: none;
        color: var(--r-text);
      }
      #theme-simple .journal-reading .journal-back-link {
        color: var(--r-muted);
        margin-bottom: 40px;
      }
      #theme-simple .journal-reading .journal-article-header h1 {
        color: var(--r-heading);
        font-size: clamp(30px, 4vw, 42px);
        line-height: 1.35;
        font-weight: 750;
        letter-spacing: -0.035em;
        margin: 12px 0 26px;
        word-break: keep-all;
        overflow-wrap: anywhere;
      }
      #theme-simple .journal-reading .journal-article-category {
        color: var(--r-link);
        font-size: 14px;
      }
      #theme-simple .journal-reading .journal-article-meta {
        border-color: var(--r-line);
        padding-bottom: 30px;
      }
      #theme-simple .journal-reading .journal-article-meta strong {
        color: var(--r-text);
        font-weight: 600;
      }
      #theme-simple .journal-reading .journal-article-meta > span:last-child {
        color: var(--r-muted);
      }
      #theme-simple .journal-reading .journal-author-avatar {
        background: var(--r-soft);
        color: var(--r-muted);
      }
      #theme-simple .journal-reading .journal-article-summary {
        color: var(--r-muted);
        line-height: 1.8;
        margin: 24px 0 0;
      }
      #theme-simple .journal-reading #article-wrapper {
        padding-top: 32px;
      }
      #theme-simple .journal-reading .notion {
        --fg-color: var(--r-text);
        --fg-color-3: var(--r-muted);
        --bg-color: transparent;
        --bg-color-2: var(--r-soft);
        --notion-gray: var(--r-muted);
        --notion-blue: var(--r-link);
        --notion-red: #b44c4c;
        --notion-yellow_background: #fbf3d9;
        --notion-blue_background: #edf3fc;
        --notion-gray_background: var(--r-soft);
        color: var(--r-text);
        font-size: 18px;
        font-weight: 400;
        line-height: 1.85;
        letter-spacing: -0.012em;
        word-break: keep-all;
        overflow-wrap: anywhere;
        -webkit-font-smoothing: antialiased;
      }
      .dark #theme-simple .journal-reading .notion {
        --notion-red: #e69a9a;
        --notion-yellow_background: #3b3425;
        --notion-blue_background: #253347;
      }
      #theme-simple .journal-reading .notion-text {
        padding: 0 !important;
        margin: 0 0 16px !important;
        line-height: inherit !important;
        word-break: inherit;
      }
      #theme-simple .journal-reading .notion-text:empty {
        min-height: 0;
        margin-bottom: 8px !important;
      }
      #theme-simple .journal-reading .notion b,
      #theme-simple .journal-reading .notion strong {
        font-weight: 650;
      }
      #theme-simple .journal-reading .notion-h {
        color: var(--r-heading);
        font-weight: 720;
        line-height: 1.45;
        letter-spacing: -0.025em;
        padding: 0;
        margin: 48px 0 18px;
        scroll-margin-top: 100px;
        word-break: keep-all;
      }
      #theme-simple .journal-reading .notion-h1 {
        font-size: 30px;
      }
      #theme-simple .journal-reading .notion-h2 {
        font-size: 26px;
      }
      #theme-simple .journal-reading .notion-h3 {
        font-size: 22px;
        margin-top: 36px;
      }
      #theme-simple .journal-reading .notion-h4 {
        font-size: 20px;
        margin-top: 32px;
      }
      #theme-simple .journal-reading .notion-page > .notion-h:first-child {
        margin-top: 0;
      }
      #theme-simple .journal-reading .notion a:not(.notion-hash-link) {
        color: var(--r-link);
        text-decoration: underline;
        text-decoration-color: color-mix(
          in srgb,
          var(--r-link) 35%,
          transparent
        );
        text-underline-offset: 4px;
        text-decoration-thickness: 1px;
        border-bottom: 0;
      }
      #theme-simple .journal-reading .notion-list {
        margin: 4px 0 20px;
        padding-left: 1.4em;
      }
      #theme-simple .journal-reading .notion-list li {
        padding: 0 0 0 4px;
        margin: 6px 0;
        line-height: 1.85;
      }
      #theme-simple .journal-reading .notion-list li::marker {
        color: var(--r-muted);
      }
      #theme-simple .journal-reading .notion-list .notion-list {
        margin: 8px 0;
      }
      #theme-simple .journal-reading .notion-list .notion-text {
        margin-bottom: 8px !important;
      }
      #theme-simple .journal-reading .notion-quote {
        margin: 24px 0;
        padding: 12px 20px;
        border: 0 !important;
        border-left: 3px solid var(--r-muted) !important;
        border-radius: 0;
        background: var(--r-soft) !important;
        color: var(--r-text) !important;
        font-size: 1em;
        line-height: 1.85;
        word-break: inherit;
      }
      #theme-simple .journal-reading .notion-callout {
        margin: 24px 0;
        padding: 18px 20px;
        border: 1px solid var(--r-line) !important;
        border-radius: 8px;
        background: var(--r-soft) !important;
        color: var(--r-text) !important;
        align-items: flex-start;
      }
      #theme-simple .journal-reading .notion-callout-text,
      #theme-simple .journal-reading .notion-callout .notion-text {
        color: inherit !important;
        line-height: 1.85 !important;
        margin-bottom: 0 !important;
      }
      /* Section-sized Notion callouts read as article sections, not giant panels. */
      #theme-simple .journal-reading .notion-callout:has(.notion-h) {
        background: transparent !important;
        border: 0 !important;
        padding: 0;
        margin: 0 0 28px;
        border-radius: 0;
      }
      #theme-simple
        .journal-reading
        .notion-callout:has(.notion-h)
        > .notion-callout-text {
        margin-left: 0;
        width: 100%;
      }
      #theme-simple
        .journal-reading
        .notion-callout-text
        > .notion-h:first-child {
        margin-top: 0;
      }
      #theme-simple
        .journal-reading
        .notion-callout:has(.notion-h)
        .notion-text {
        margin-bottom: 16px !important;
      }
      #theme-simple .journal-reading .notion-inline-code {
        padding: 0.15em 0.38em !important;
        border-radius: 4px;
        background: var(--r-soft) !important;
        color: var(--r-code) !important;
        font-size: 0.86em;
        font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
        letter-spacing: -0.025em;
      }
      #theme-simple .journal-reading .code-toolbar {
        margin: 24px 0 28px;
        border: 1px solid var(--r-line);
        border-radius: 8px;
        background: var(--r-soft) !important;
        box-shadow: none;
        backdrop-filter: none;
      }
      #theme-simple .journal-reading .pre-mac {
        display: none;
      }
      #theme-simple .journal-reading pre.notion-code {
        max-width: 100%;
        padding: 48px 24px 24px !important;
        margin: 0 !important;
        border: 0 !important;
        border-radius: 8px !important;
        background: var(--r-soft) !important;
        color: var(--r-code) !important;
        font-size: 14px !important;
        line-height: 1.75 !important;
        font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
        letter-spacing: 0;
        text-shadow: none !important;
        white-space: pre;
        tab-size: 2;
        scrollbar-width: thin;
      }
      #theme-simple .journal-reading .notion-code code {
        color: var(--r-code);
        font: inherit;
        text-shadow: none;
      }
      #theme-simple .journal-reading .code-toolbar > .toolbar {
        top: 8px;
        right: 10px;
        opacity: 1;
        height: 26px;
      }
      #theme-simple .journal-reading .toolbar-item > button,
      #theme-simple .journal-reading .toolbar-item > span {
        color: var(--r-muted) !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
        font-size: 12px !important;
        font-family: inherit;
      }
      #theme-simple .journal-reading .token {
        text-shadow: none;
        background: none;
      }
      #theme-simple .journal-reading .token.comment,
      #theme-simple .journal-reading .token.prolog,
      #theme-simple .journal-reading .token.doctype {
        color: var(--r-comment);
      }
      #theme-simple .journal-reading .token.keyword,
      #theme-simple .journal-reading .token.atrule {
        color: var(--r-keyword);
      }
      #theme-simple .journal-reading .token.string,
      #theme-simple .journal-reading .token.char,
      #theme-simple .journal-reading .token.attr-value {
        color: var(--r-string);
      }
      #theme-simple .journal-reading .token.number,
      #theme-simple .journal-reading .token.boolean,
      #theme-simple .journal-reading .token.constant {
        color: var(--r-number);
      }
      #theme-simple .journal-reading .token.function,
      #theme-simple .journal-reading .token.class-name {
        color: var(--r-function);
      }
      #theme-simple .journal-reading .token.operator,
      #theme-simple .journal-reading .token.punctuation {
        color: var(--r-code);
      }
      #theme-simple .journal-reading .collapse-panel-wrapper {
        background: var(--r-soft);
        border-color: var(--r-line);
        border-radius: 8px;
        box-shadow: none;
        backdrop-filter: none;
      }
      #theme-simple .journal-reading .collapse-header,
      #theme-simple .journal-reading .collapse-side-panel-button {
        color: var(--r-muted);
      }
      #theme-simple .journal-reading .collapse-side-panel-button {
        height: 26px;
        padding: 0 9px;
        font-size: 12px;
        line-height: 1;
        background: transparent;
        border-color: var(--r-line);
      }
      #theme-simple .journal-reading .collapse-panel-wrapper .code-toolbar {
        border: 0;
        border-top: 1px solid var(--r-line);
        border-radius: 0;
      }
      #theme-simple .journal-reading .notion-hr {
        margin: 36px 0;
        border-color: var(--r-line);
      }
      #theme-simple .journal-reading .notion-asset-wrapper {
        margin: 28px 0;
      }
      #theme-simple .journal-reading .notion-asset-caption {
        color: var(--r-muted);
        font-size: 13px;
        line-height: 1.6;
        text-align: center;
        margin-top: 10px;
      }
      #theme-simple .journal-reading .notion-simple-table {
        margin: 24px 0;
        font-size: 15px;
        line-height: 1.7;
      }
      #theme-simple .journal-reading .notion-simple-table td,
      #theme-simple .journal-reading .notion-simple-table th {
        padding: 12px 16px;
        border-color: var(--r-line);
      }
      #theme-simple .journal-reading .journal-article-end,
      #theme-simple .journal-reading .journal-related {
        border-color: var(--r-line);
        color: var(--r-muted);
        margin-top: 48px;
      }
      @media (max-width: 700px) {
        #theme-simple .journal-main.journal-reading {
          padding: 28px 24px 56px;
        }
        #theme-simple .journal-reading .journal-back-link {
          margin-bottom: 30px;
        }
        #theme-simple .journal-reading .journal-article-header h1 {
          font-size: 30px;
        }
        #theme-simple .journal-reading .notion {
          font-size: 17px;
          line-height: 1.85;
        }
        #theme-simple .journal-reading .notion-h1 {
          font-size: 27px;
        }
        #theme-simple .journal-reading .notion-h2 {
          font-size: 24px;
        }
        #theme-simple .journal-reading .notion-h3 {
          font-size: 21px;
        }
        #theme-simple .journal-reading .notion-h4 {
          font-size: 19px;
        }
        #theme-simple .journal-reading .notion-h {
          margin-top: 36px;
        }
        #theme-simple .journal-reading pre.notion-code {
          padding: 44px 16px 18px !important;
          font-size: 13px !important;
        }
        #theme-simple .journal-reading .notion-callout {
          padding: 16px;
        }
      }
    `}</style>
  )
}
