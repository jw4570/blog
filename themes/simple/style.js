/* eslint-disable react/no-unknown-property */
const Style = () => (
  <style jsx global>{`
    #theme-simple {
      --j-bg: #f5f5f7;
      --j-card: #fff;
      --j-text: #1d1d1f;
      --j-secondary: #6e6e73;
      --j-line: rgba(60, 60, 67, 0.1);
      --j-blue: #007aff;
      --j-soft: #eef5ff;
      --j-nav: rgba(250, 250, 252, 0.82);
      --j-shadow: 0 4px 24px rgba(28, 39, 60, 0.035);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: var(--j-bg);
      color: var(--j-text);
      font-family:
        -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo',
        'Noto Sans KR', 'Malgun Gothic', sans-serif;
      font-size: 15px;
      font-weight: 400;
      line-height: 1.6;
      letter-spacing: -0.025em;
      -webkit-font-smoothing: antialiased;
    }
    .dark #theme-simple {
      --j-bg: #141416;
      --j-card: #202023;
      --j-text: #f5f5f7;
      --j-secondary: #a1a1a6;
      --j-line: rgba(255, 255, 255, 0.1);
      --j-blue: #409cff;
      --j-soft: #203044;
      --j-nav: rgba(23, 23, 25, 0.86);
      --j-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
      color-scheme: dark;
    }
    body:has(#theme-simple) {
      margin: 0;
      background: #f5f5f7;
    }
    .dark body:has(#theme-simple) {
      background: #141416;
    }
    #theme-simple * {
      box-sizing: border-box;
    }
    #theme-simple a {
      color: inherit;
      text-decoration: none;
    }
    #theme-simple button,
    #theme-simple input {
      font: inherit;
      letter-spacing: inherit;
    }
    #theme-simple button {
      cursor: pointer;
    }
    #theme-simple button:focus-visible,
    #theme-simple a:focus-visible,
    #theme-simple input:focus-visible {
      outline: 3px solid var(--j-blue);
      outline-offset: 5px;
    }
    #theme-simple ::selection {
      background: #cce4ff;
      color: #133b68;
    }
    #theme-simple .journal-skip-link {
      position: fixed;
      top: -60px;
      left: 20px;
      background: var(--j-card);
      padding: 12px 20px;
      border-radius: 12px;
      z-index: 100;
    }
    #theme-simple .journal-skip-link:focus {
      top: 12px;
    }
    #theme-simple .journal-nav {
      position: sticky;
      top: 0;
      z-index: 40;
      background: var(--j-nav);
      border-bottom: 1px solid var(--j-line);
      backdrop-filter: blur(24px) saturate(160%);
      -webkit-backdrop-filter: blur(24px) saturate(160%);
    }
    #theme-simple .journal-nav-inner {
      max-width: 1128px;
      padding: 0 24px;
      height: 76px;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 32px;
    }
    #theme-simple .journal-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 19px;
      font-weight: 650;
      letter-spacing: -0.6px;
      white-space: nowrap;
    }
    #theme-simple .journal-brand-suffix {
      font-weight: 400;
      color: var(--j-secondary);
    }
    #theme-simple .journal-brand-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: var(--j-text);
      color: var(--j-bg);
      border-radius: 10px;
      font-size: 25px;
      font-weight: 650;
      padding-bottom: 5px;
      letter-spacing: -4px;
      padding-right: 4px;
    }
    #theme-simple .journal-brand-icon span {
      color: #66b0ff;
    }
    #theme-simple .journal-nav-links {
      display: flex;
      gap: 5px;
      margin-left: auto;
    }
    #theme-simple .journal-nav-link {
      padding: 8px 15px;
      border-radius: 10px;
      font-size: 13px;
      color: var(--j-secondary);
      font-weight: 550;
      transition:
        background 0.2s,
        color 0.2s;
      white-space: nowrap;
    }
    #theme-simple .journal-nav-link:hover {
      background: var(--j-line);
      color: var(--j-text);
    }
    #theme-simple .journal-nav-link.is-active {
      background: var(--j-card);
      color: var(--j-text);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.045);
    }
    #theme-simple .journal-nav-actions {
      display: flex;
      gap: 5px;
      padding-left: 18px;
      border-left: 1px solid var(--j-line);
    }
    #theme-simple .journal-icon-button {
      border: 0;
      background: none;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      color: var(--j-secondary);
    }
    #theme-simple .journal-icon-button:hover,
    #theme-simple .journal-icon-button.is-active {
      background: var(--j-line);
      color: var(--j-text);
    }
    #theme-simple .journal-nav-search {
      max-width: 1080px;
      margin: 0 auto 18px;
      display: flex;
      gap: 12px;
      align-items: center;
      padding: 10px 16px;
      background: var(--j-card);
      border: 1px solid var(--j-line);
      border-radius: 14px;
      color: var(--j-secondary);
    }
    #theme-simple .journal-nav-search input {
      width: 100%;
      min-width: 0;
      background: none;
      border: 0;
      outline: none;
      color: var(--j-text);
      padding: 8px 0;
    }
    #theme-simple .journal-nav-search button {
      display: flex;
      align-items: center;
      gap: 6px;
      border: 0;
      background: none;
      color: var(--j-blue);
      white-space: nowrap;
      font-weight: 600;
    }
    #theme-simple .journal-hero {
      width: 100%;
      max-width: 1128px;
      margin: 0 auto;
      padding: 94px 24px 78px;
      display: grid;
      grid-template-columns: 1fr 300px;
      gap: 72px;
      align-items: center;
    }
    #theme-simple .journal-eyebrow {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--j-secondary);
      font-size: 12px;
      font-weight: 550;
      letter-spacing: 0.015em;
      margin-bottom: 24px;
    }
    #theme-simple .journal-status-dot {
      width: 6px;
      height: 6px;
      background: #30b971;
      border-radius: 50%;
      box-shadow: 0 0 0 4px rgba(48, 185, 113, 0.08);
    }
    #theme-simple .journal-hero h1 {
      font-size: clamp(38px, 4.1vw, 54px);
      font-weight: 720;
      letter-spacing: -2.7px;
      line-height: 1.26;
      margin: 0;
    }
    #theme-simple .journal-hero h1 span {
      color: var(--j-secondary);
    }
    #theme-simple .journal-hero-copy > p {
      color: var(--j-secondary);
      font-size: 15px;
      line-height: 1.85;
      margin: 24px 0 0;
      white-space: pre-line;
      letter-spacing: -0.35px;
    }
    #theme-simple .journal-profile {
      background: var(--j-card);
      border: 1px solid var(--j-line);
      border-radius: 26px;
      padding: 25px;
      box-shadow: 0 16px 48px rgba(34, 55, 85, 0.055);
      transform: rotate(3deg);
      position: relative;
    }
    #theme-simple .journal-profile:before {
      content: '';
      position: absolute;
      inset: 12px -9px -11px 9px;
      border: 1px solid var(--j-line);
      border-radius: 26px;
      background: var(--j-card);
      transform: rotate(-6deg);
      z-index: -1;
    }
    #theme-simple .journal-profile-top {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    #theme-simple .journal-app-icon {
      width: 49px;
      height: 49px;
      border-radius: 15px;
      background: linear-gradient(145deg, #67b4ff, #007aff);
      display: grid;
      place-items: center;
      color: white;
      box-shadow: 0 5px 12px rgba(0, 122, 255, 0.18);
    }
    #theme-simple .journal-profile-label {
      font-size: 12px;
      color: var(--j-secondary);
    }
    #theme-simple .journal-profile-dots {
      margin-left: auto;
      font-size: 23px;
      color: var(--j-secondary);
      letter-spacing: 2px;
    }
    #theme-simple .journal-profile-author {
      margin-top: 27px;
      font-size: 23px;
      font-weight: 650;
      letter-spacing: -0.8px;
    }
    #theme-simple .journal-profile p {
      margin: 5px 0 26px;
      color: var(--j-secondary);
      font-size: 12px;
    }
    #theme-simple .journal-profile-bottom {
      padding-top: 16px;
      border-top: 1px solid var(--j-line);
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--j-secondary);
      font-size: 11px;
    }
    #theme-simple .journal-profile-bottom strong {
      color: var(--j-text);
      margin-right: 3px;
      font-weight: 650;
    }
    #theme-simple .journal-profile-avatar {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: #eaf2ff;
      color: #3184df;
      display: grid;
      place-items: center;
      font-size: 12px;
      font-weight: 650;
    }
    #theme-simple .journal-hero-compact {
      display: block;
      padding: 68px 24px 44px;
    }
    #theme-simple .journal-hero-compact h1 {
      font-size: 38px;
      letter-spacing: -1.8px;
    }
    #theme-simple .journal-main {
      width: 100%;
      max-width: 1128px;
      padding: 0 24px 80px;
      margin: 0 auto;
      flex: 1;
    }
    #theme-simple .journal-section-heading {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 23px;
      gap: 15px;
    }
    #theme-simple .journal-section-label {
      display: block;
      color: var(--j-secondary);
      font-size: 10px;
      letter-spacing: 1.6px;
      font-weight: 600;
      margin-bottom: 8px;
    }
    #theme-simple .journal-section-heading h2 {
      font-size: 23px;
      font-weight: 650;
      letter-spacing: -0.8px;
      line-height: 1.4;
      margin: 0;
    }
    #theme-simple .journal-section-heading h2 > span {
      font-size: 13px;
      font-weight: 500;
      color: var(--j-secondary);
      margin-left: 10px;
      vertical-align: middle;
    }
    #theme-simple .journal-text-link {
      color: var(--j-secondary);
      display: inline-flex;
      gap: 4px;
      align-items: center;
      font-size: 12px;
    }
    #theme-simple .journal-text-link:hover {
      color: var(--j-blue);
    }
    #theme-simple .journal-post-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 18px;
    }
    #theme-simple .journal-post {
      background: var(--j-card);
      border: 1px solid var(--j-line);
      border-radius: 22px;
      box-shadow: var(--j-shadow);
      min-width: 0;
      transition:
        transform 0.2s,
        box-shadow 0.2s;
      overflow: hidden;
    }
    #theme-simple .journal-post:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 30px rgba(20, 35, 60, 0.07);
    }
    #theme-simple .journal-post-link {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 220px;
      padding: 26px 28px 23px;
    }
    #theme-simple .journal-post-featured {
      grid-column: 1/-1;
    }
    #theme-simple .journal-post-featured .journal-post-link {
      min-height: 236px;
      padding: 30px 34px 27px;
    }
    #theme-simple .journal-post-top {
      display: flex;
      align-items: center;
      gap: 11px;
    }
    #theme-simple .journal-post-symbol {
      width: 36px;
      height: 36px;
      border-radius: 11px;
      background: var(--j-soft);
      color: var(--j-blue);
      display: grid;
      place-items: center;
      flex-shrink: 0;
    }
    #theme-simple .journal-symbol-1 {
      background: #f1edff;
      color: #8e70cf;
    }
    #theme-simple .journal-symbol-2 {
      background: #eaf6ee;
      color: #369966;
    }
    #theme-simple .journal-symbol-3 {
      background: #fff1e5;
      color: #c88843;
    }
    .dark #theme-simple .journal-symbol-1 {
      background: #322944;
      color: #baa0f1;
    }
    .dark #theme-simple .journal-symbol-2 {
      background: #203b2d;
      color: #77bd94;
    }
    .dark #theme-simple .journal-symbol-3 {
      background: #3f3021;
      color: #e0b183;
    }
    #theme-simple .journal-post-kicker {
      font-size: 11px;
      color: var(--j-secondary);
      font-weight: 500;
    }
    #theme-simple .journal-post-featured .journal-post-kicker {
      color: var(--j-blue);
    }
    #theme-simple .journal-post-arrow {
      margin-left: auto;
      color: #a1a1a6;
      transition:
        transform 0.2s,
        color 0.2s;
    }
    #theme-simple .journal-post:hover .journal-post-arrow {
      transform: translate(2px, -2px);
      color: var(--j-blue);
    }
    #theme-simple .journal-post h2 {
      font-size: 23px;
      line-height: 1.4;
      font-weight: 650;
      letter-spacing: -0.8px;
      margin: 22px 0 12px;
      overflow-wrap: anywhere;
    }
    #theme-simple .journal-post-featured h2 {
      font-size: 32px;
      letter-spacing: -1.2px;
      margin-top: 20px;
    }
    #theme-simple .journal-post-summary {
      color: var(--j-secondary);
      font-size: 14px;
      line-height: 1.8;
      margin: 0 0 20px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    #theme-simple .journal-post-bottom {
      margin-top: auto;
      padding-top: 17px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    #theme-simple .journal-post-meta {
      color: var(--j-secondary);
      font-size: 11px;
    }
    #theme-simple .journal-meta-dot {
      margin: 0 7px;
      opacity: 0.5;
    }
    #theme-simple .journal-post-read {
      display: flex;
      align-items: center;
      gap: 3px;
      color: var(--j-secondary);
      font-size: 11px;
      white-space: nowrap;
    }
    #theme-simple .journal-footer {
      width: calc(100% - 48px);
      max-width: 1080px;
      margin: 0 auto;
      padding: 30px 0 36px;
      border-top: 1px solid var(--j-line);
      display: flex;
      justify-content: space-between;
      gap: 24px;
      color: var(--j-secondary);
      font-size: 11px;
    }
    #theme-simple .journal-footer-brand {
      color: var(--j-text);
      font-size: 13px;
      font-weight: 600;
    }
    #theme-simple .journal-footer p {
      margin: 5px 0 0;
    }
    #theme-simple .journal-footer-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 9px;
    }
    #theme-simple .journal-rss {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    #theme-simple .journal-reading {
      max-width: 900px;
      padding-top: 42px;
    }
    #theme-simple .journal-article {
      background: var(--j-card);
      border: 1px solid var(--j-line);
      border-radius: 26px;
      padding: 48px 56px;
      box-shadow: var(--j-shadow);
    }
    #theme-simple .journal-back-link {
      display: inline-flex;
      gap: 5px;
      align-items: center;
      color: var(--j-secondary);
      font-size: 12px;
      margin-bottom: 38px;
    }
    #theme-simple .journal-article-category {
      color: var(--j-blue);
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    #theme-simple .journal-article-header h1 {
      font-size: 38px;
      letter-spacing: -1.5px;
      line-height: 1.35;
      font-weight: 700;
      margin: 0 0 24px;
      overflow-wrap: anywhere;
    }
    #theme-simple .journal-article-meta {
      display: flex;
      align-items: center;
      gap: 10px;
      padding-bottom: 32px;
      border-bottom: 1px solid var(--j-line);
    }
    #theme-simple .journal-author-avatar {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      background: var(--j-soft);
      color: var(--j-blue);
      font-weight: 600;
    }
    #theme-simple .journal-article-meta > span:last-child {
      display: flex;
      flex-direction: column;
      gap: 1px;
      font-size: 11px;
      color: var(--j-secondary);
    }
    #theme-simple .journal-article-meta strong {
      font-size: 12px;
      color: var(--j-text);
      font-weight: 600;
    }
    #theme-simple .journal-article-summary {
      color: var(--j-secondary);
      font-size: 17px;
      line-height: 1.8;
    }
    #theme-simple #article-wrapper {
      padding-top: 28px;
    }
    #theme-simple .notion {
      background: transparent;
      color: var(--j-text);
      font-family: inherit;
      font-size: 16px;
      line-height: 1.9;
      letter-spacing: -0.25px;
    }
    #theme-simple .notion-page {
      width: 100%;
      padding: 0;
      margin: 0;
    }
    #theme-simple .notion-text {
      padding: 5px 0;
    }
    #theme-simple .notion-h {
      color: var(--j-text);
      letter-spacing: -0.6px;
      margin-top: 30px;
    }
    #theme-simple .notion-code {
      border-radius: 16px;
      box-shadow: none;
    }
    #theme-simple .notion-table {
      max-width: 100%;
      overflow-x: auto;
    }
    #theme-simple .notion a {
      text-decoration: underline;
      text-underline-offset: 3px;
    }
    #theme-simple .journal-article-end {
      border-top: 1px solid var(--j-line);
      margin-top: 44px;
      padding-top: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--j-secondary);
      font-size: 12px;
      gap: 12px;
    }
    #theme-simple .journal-article-end button {
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 9px 13px;
      border: 0;
      border-radius: 10px;
      background: var(--j-bg);
      color: var(--j-text);
      font-size: 12px;
    }
    #theme-simple .journal-related {
      margin-top: 36px;
      border-top: 1px solid var(--j-line);
      padding-top: 25px;
    }
    #theme-simple .journal-related a {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      padding: 13px 0;
      font-size: 14px;
    }
    #theme-simple .journal-related a:hover {
      color: var(--j-blue);
    }
    #theme-simple .journal-empty {
      grid-column: 1/-1;
      width: 100%;
      padding: 64px 24px;
      border: 1px solid var(--j-line);
      background: var(--j-card);
      border-radius: 22px;
      text-align: center;
      color: var(--j-secondary);
    }
    #theme-simple .journal-empty > svg {
      margin: 0 auto 20px;
      color: var(--j-blue);
    }
    #theme-simple .journal-empty h2,
    #theme-simple .journal-empty h3 {
      font-size: 19px;
      color: var(--j-text);
      font-weight: 600;
      margin: 0 0 8px;
    }
    #theme-simple .journal-empty p {
      font-size: 13px;
      margin-bottom: 16px;
    }
    #theme-simple .journal-search-form {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 17px 20px;
      border: 1px solid var(--j-line);
      border-radius: 17px;
      background: var(--j-card);
      margin-bottom: 30px;
      color: var(--j-secondary);
    }
    #theme-simple .journal-search-form input {
      width: 100%;
      min-width: 0;
      background: none;
      border: 0;
      outline: none;
      color: var(--j-text);
      padding: 5px 0;
    }
    #theme-simple .journal-search-form button {
      border: 0;
      border-radius: 9px;
      padding: 8px 17px;
      background: var(--j-blue);
      color: white;
      white-space: nowrap;
      font-size: 12px;
    }
    #theme-simple .journal-search-result {
      color: var(--j-secondary);
      margin-bottom: 25px;
      font-size: 13px;
    }
    #theme-simple .journal-archive-month {
      margin-bottom: 35px;
    }
    #theme-simple .journal-archive-month h2 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 20px;
      font-weight: 650;
      margin: 0 0 16px;
    }
    #theme-simple .journal-archive-month h2 span {
      color: var(--j-secondary);
      font-weight: 400;
      font-size: 12px;
    }
    #theme-simple .journal-archive-list {
      background: var(--j-card);
      border: 1px solid var(--j-line);
      padding: 0 24px;
      border-radius: 20px;
    }
    #theme-simple .journal-archive-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 21px 0;
      gap: 20px;
      font-weight: 500;
      border-bottom: 1px solid var(--j-line);
    }
    #theme-simple .journal-archive-row:last-child {
      border-bottom: 0;
    }
    #theme-simple .journal-archive-row:hover {
      color: var(--j-blue);
    }
    #theme-simple .journal-archive-date {
      display: flex;
      align-items: center;
      gap: 15px;
      font-size: 11px;
      color: var(--j-secondary);
      flex-shrink: 0;
    }
    #theme-simple .journal-filter-heading {
      margin-bottom: 32px;
      padding: 20px 0;
    }
    #theme-simple .journal-filter-heading > span {
      color: var(--j-secondary);
      font-size: 12px;
    }
    #theme-simple .journal-filter-heading h2 {
      font-size: 32px;
      margin: 8px 0;
    }
    #theme-simple .journal-filter-heading a {
      color: var(--j-blue);
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 12px;
    }
    #theme-simple .journal-topic-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    #theme-simple .journal-topic {
      border: 1px solid var(--j-line);
      border-radius: 20px;
      background: var(--j-card);
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    #theme-simple .journal-topic h2 {
      font-size: 21px;
      margin: 20px 0 3px;
      font-weight: 600;
    }
    #theme-simple .journal-topic > span:last-of-type {
      font-size: 12px;
      color: var(--j-secondary);
    }
    #theme-simple .journal-topic > svg {
      align-self: flex-end;
      color: var(--j-blue);
    }
    #theme-simple .journal-tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    #theme-simple .journal-tag {
      background: var(--j-card);
      padding: 12px 20px;
      border: 1px solid var(--j-line);
      border-radius: 13px;
    }
    #theme-simple .journal-tag > span {
      margin-left: 10px;
      color: var(--j-secondary);
      font-size: 12px;
    }
    #theme-simple .journal-pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 26px;
      font-size: 12px;
      color: var(--j-secondary);
    }
    #theme-simple .journal-pagination > div {
      display: flex;
      gap: 10px;
    }
    #theme-simple .journal-pagination a {
      display: flex;
      align-items: center;
      gap: 5px;
      background: var(--j-card);
      border: 1px solid var(--j-line);
      border-radius: 10px;
      padding: 9px 14px;
    }
    @media (min-width: 1500px) {
      #theme-simple .journal-hero {
        padding-top: 110px;
        padding-bottom: 92px;
      }
    }
    @media (max-width: 900px) {
      #theme-simple .journal-hero {
        gap: 32px;
        grid-template-columns: 1fr 250px;
      }
      #theme-simple .journal-hero h1 {
        font-size: 41px;
        letter-spacing: -2px;
      }
      #theme-simple .journal-profile {
        padding: 21px;
      }
      #theme-simple .journal-nav-inner {
        gap: 12px;
      }
      #theme-simple .journal-nav-link {
        padding: 8px 10px;
      }
      #theme-simple .journal-nav-actions {
        padding-left: 10px;
      }
    }
    @media (max-width: 700px) {
      #theme-simple .journal-nav-inner {
        height: 65px;
        flex-wrap: wrap;
        padding: 0 20px;
        gap: 0;
      }
      #theme-simple .journal-brand {
        font-size: 17px;
      }
      #theme-simple .journal-brand-icon {
        width: 29px;
        height: 29px;
        border-radius: 9px;
        font-size: 23px;
      }
      #theme-simple .journal-nav-actions {
        border: 0;
        margin-left: auto;
        padding-left: 0;
      }
      #theme-simple .journal-nav-links {
        order: 3;
        width: 100%;
        margin: 0;
        padding: 9px 0 11px;
        border-top: 1px solid var(--j-line);
        justify-content: space-between;
      }
      #theme-simple .journal-nav:has(.journal-nav-links) {
        padding-bottom: 51px;
      }
      #theme-simple .journal-nav-link {
        font-size: 12px;
        padding: 7px 16px;
      }
      #theme-simple .journal-nav-search {
        margin: 58px 20px 0;
      }
      #theme-simple .journal-nav:has(.journal-nav-search) {
        padding-bottom: 16px;
      }
      #theme-simple .journal-hero {
        grid-template-columns: 1fr;
        padding: 53px 22px 44px;
        gap: 0;
      }
      #theme-simple .journal-hero h1 {
        font-size: 37px;
        letter-spacing: -1.8px;
      }
      #theme-simple .journal-eyebrow {
        font-size: 11px;
        margin-bottom: 20px;
      }
      #theme-simple .journal-hero-copy > p {
        font-size: 13px;
        margin-top: 20px;
      }
      #theme-simple .journal-profile {
        display: none;
      }
      #theme-simple .journal-main {
        padding: 0 20px 55px;
      }
      #theme-simple .journal-section-heading {
        margin-bottom: 18px;
      }
      #theme-simple .journal-section-heading h2 {
        font-size: 21px;
      }
      #theme-simple .journal-post-grid {
        grid-template-columns: 1fr;
        gap: 13px;
      }
      #theme-simple .journal-post-link {
        padding: 22px;
        min-height: 205px;
      }
      #theme-simple .journal-post-featured .journal-post-link {
        padding: 24px;
        min-height: 224px;
      }
      #theme-simple .journal-post h2 {
        font-size: 22px;
        margin-top: 21px;
      }
      #theme-simple .journal-post-featured h2 {
        font-size: 27px;
      }
      #theme-simple .journal-post-bottom {
        align-items: flex-end;
      }
      #theme-simple .journal-post-meta {
        font-size: 10px;
      }
      #theme-simple .journal-footer {
        width: calc(100% - 40px);
        padding-top: 24px;
      }
      #theme-simple .journal-reading {
        padding-top: 25px;
      }
      #theme-simple .journal-article {
        padding: 28px 22px;
        border-radius: 21px;
      }
      #theme-simple .journal-article-header h1 {
        font-size: 29px;
        letter-spacing: -1.2px;
      }
      #theme-simple .journal-back-link {
        margin-bottom: 28px;
      }
      #theme-simple .notion {
        font-size: 15px;
      }
      #theme-simple .journal-hero-compact h1 {
        font-size: 30px;
        letter-spacing: -1.2px;
      }
      #theme-simple .journal-topic-grid {
        grid-template-columns: 1fr;
      }
      #theme-simple .journal-archive-row {
        gap: 10px;
        padding: 18px 0;
        font-size: 13px;
      }
      #theme-simple .journal-archive-date {
        font-size: 10px;
        gap: 4px;
      }
      #theme-simple .journal-archive-list {
        padding: 0 18px;
      }
    }
    @media (max-width: 700px) {
      #theme-simple .journal-nav-inner {
        height: auto;
        min-height: 64px;
        padding: 14px 20px 0;
      }
      #theme-simple .journal-nav-links {
        margin-top: 14px;
        padding: 10px 0;
      }
      #theme-simple .journal-nav:has(.journal-nav-links) {
        padding-bottom: 0;
      }
      #theme-simple .journal-nav-search {
        margin: 0 20px 16px;
      }
      #theme-simple .journal-nav:has(.journal-nav-search) {
        padding-bottom: 0;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      #theme-simple *,
      #theme-simple *:before {
        transition: none !important;
        animation: none !important;
        scroll-behavior: auto !important;
      }
    }
  `}</style>
)
export { Style }
