# Juwon의 개인 블로그

공식 [NotionNext](https://github.com/notionnext-org/NotionNext) 4.11.0 기반입니다. 노션 `BLOG` 데이터베이스를 읽고, 한국어 `simple` 테마로 표시합니다.

## 로컬 실행

Node.js 22와 Yarn 1.22.22를 사용합니다. `.nvmrc`가 포함되어 있습니다.

```sh
cd /Users/juwon/Documents/Blog
nvm install
nvm use
npm install --global yarn@1.22.22
yarn install --frozen-lockfile
# .env.local이 없다면: cp .env.blog.example .env.local
yarn notion:check
yarn dev
```

`nvm`이나 Yarn을 설치하지 않고 현재 npm으로 실행할 수도 있습니다.

```sh
npm exec --yes --package=node@22 --package=yarn@1.22.22 -- yarn install --frozen-lockfile
npm exec --yes --package=node@22 --package=yarn@1.22.22 -- yarn notion:check
npm exec --yes --package=node@22 --package=yarn@1.22.22 -- yarn dev
```

브라우저에서 http://localhost:3000 을 엽니다.

## 노션에서 글 관리

연결된 페이지 ID: `3fe7633d9bef8001878ed9314427e027`.

| 현재 데이터베이스 속성 | 블로그 동작 |
| --- | --- |
| `이름` | 글 제목 |
| `발행 상태` = `Public` | 글 목록과 글 상세 표시 |
| `발행 상태` = `Unlisted` | 목록에서 숨김, 직접 주소로 접근 가능 |
| `발행 상태` = `Private` 또는 비어 있음 | 블로그에 표시하지 않음 |
| 생성 일시 / 최종 편집 일시 | 원본 페이지의 작성·수정 시각 사용 |

현재 DB에는 `type` 속성이 없으므로 각 항목을 `Post`로 취급하도록 맞췄습니다. 나중에 `type` 선택 속성을 추가하면 `Post`, `Page`, `Menu` 같은 NotionNext 타입을 지정할 수 있습니다. `slug`(텍스트), `summary`(텍스트), `category`(선택), `tags`(다중 선택), `date`(날짜) 속성은 필요할 때 추가하세요. `slug`가 없으면 페이지 ID로 글 주소를 만듭니다.

노션 데이터베이스의 웹 게시가 유지되어야 합니다. **발행 상태는 블로그의 노출 필터입니다. 공개된 노션 원본의 접근 권한을 변경하지 않으므로 민감한 초안은 별도 비공개 데이터베이스에 보관하세요.**

로컬에서는 `ENABLE_CACHE=false`로 설정되어 있습니다. 배포 후에는 캐시를 활성화하고 60초 재검증 주기를 사용합니다. 노션 수정 후 다음 요청에서 재검증이 시작되며, 실제 반영에는 추가 시간이 걸릴 수 있습니다.

패키지 잠금 파일의 다운로드 주소는 npm 공식 레지스트리로 통일했습니다. 패키지 버전과 무결성 값은 유지합니다.

## 개인 설정

- `.env.local`: 로컬 환경 설정, Git 제외.
- `.env.blog.example`: 이 블로그의 환경 설정 템플릿.
- `blog.config.js`: Juwon, 한국어, 시작 연도 등 기본값.
- `themes/simple/config.js`: 소개 문구와 테마 색상.
- `conf/notion.config.js`: 한글 속성과 상태 값 연결.
- `lib/lang/ko-KR.js`: 한국어 UI 번역.

사이트 제목과 아이콘은 노션 데이터베이스의 이름과 아이콘을 사용합니다. 노션에 `Notion_Config`를 추가하면 일부 로컬 설정보다 우선하므로, 의도하지 않은 테마·언어 변경이 생기면 이 테이블도 확인하세요.

## Vercel 배포

1. GitHub 저장소: https://github.com/jw4570/blog (`origin`). 공식 NotionNext 원본은 `upstream`으로 보관합니다.
2. Vercel에서 해당 저장소를 가져오고 Next.js 프로젝트로 설정합니다.
3. Node.js 버전을 **22.x**, 설치 명령을 `yarn install --frozen-lockfile`, 빌드 명령을 `yarn build`로 지정합니다.
4. `.env.blog.example`의 환경 변수를 Vercel에 등록하고 `ENABLE_CACHE=true`로 설정합니다. `NEXT_PUBLIC_LINK`는 로컬 주소를 복사하지 마세요. 미설정 시 Vercel의 프로덕션 도메인을 자동 사용합니다. 개인 도메인을 추가하면 `NEXT_PUBLIC_LINK`를 해당 주소로 설정하세요.
5. 배포 후 노션에서 `Public`인 글의 목록·상세와 검색을 확인합니다.

이 프로젝트는 노션 공개 페이지를 읽는 NotionNext 방식을 사용하므로 별도 노션 API 키가 필요하지 않습니다. 로컬 `.env.local`은 업로드하지 마세요.
