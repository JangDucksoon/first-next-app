# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 참고할 가이드입니다.

## 언어 설정

**중요: 고유명사를 제외하고는 모든 응답을 한글로 작성해주세요.**

## 개발 명령어

- `npm run dev` - Turbopack을 사용한 개발 서버 시작 (Next.js 15.4.5)
- `npm run build` - 프로덕션 빌드 (standalone 출력)
- `npm run start` - 프로덕션 서버 시작
- `npm run lint` - Next.js 설정으로 ESLint 실행
- `npm run check-format` - Prettier로 코드 포맷 확인
- `npm run do-format` - Prettier와 Tailwind 플러그인으로 코드 포맷팅

## 아키텍처 개요

이 프로젝트는 TypeScript와 서버 사이드 인증을 사용하는 Next.js 15 App Router 애플리케이션입니다. 별도의 백엔드 API 서버와 통신하는 풀스택 웹 앱으로, 사용자 인증, 데이터 시각화 대시보드, 게시물 CRUD 기능을 제공합니다.

### 라우트 구조

Next.js App Router를 사용하며 세 개의 주요 라우트 그룹으로 구성:

- **`(dynamic)`**: 인증이 필요한 동적 콘텐츠 라우트
  - `/data` - 데이터 시각화 및 관리
  - `/login` - 사용자 인증 (방문 시 쿠키 삭제)
  - `/post` - 게시물 CRUD 작업 (중첩 라우트)
  - `/user` - 사용자 프로필 관리

- **`(static)`**: 인증이 필요한 정적/캐시된 콘텐츠 라우트
  - `/dashboard` - SSG/ISR 렌더링과 분석 차트가 있는 메인 대시보드
  - `/help` - 도움말 문서

- **`(prepare)`**: 설정을 위한 특수 라우트
  - `/settings` - 애플리케이션 설정
  - 커스텀 not-found 처리

### 인증 시스템

- **미들웨어 기반**: `src/middleware.ts`에서 보호된 라우트의 토큰 검증 처리
- **쿠키 기반 세션**: Authentication과 Refresh 토큰 사용
- **토큰 갱신**: 쿠키 업데이트와 함께 자동 refresh 토큰 처리
- **상태 관리**: 클라이언트 사이드 사용자 상태용 Zustand store (`user-store.ts`)

### 주요 기술 스택

- **UI 프레임워크**: React 19 with Next.js 15
- **스타일링**: Tailwind CSS with Flowbite React 컴포넌트
- **상태 관리**: 전역 상태용 Zustand
- **데이터 시각화**: 대시보드 분석용 Recharts
- **3D 그래픽**: Three.js with React Three Fiber
- **HTTP 클라이언트**: 커스텀 인스턴스 설정이 있는 Axios
- **배포**: standalone 출력을 사용한 Docker, PNPM 패키지 매니저

### 백엔드 API 통신

- **별도 백엔드 서버**: Kubernetes 환경에서 실행 (`KUBE_API_URL`)
- **API 엔드포인트**:
  - 인증: `/user/login`, `/user/logout`, `/user/status`
  - 게시물: `/posts`, `/posts/[id]`
  - 토큰 관리: access token과 refresh token

### 프로젝트 구조

- **`src/component/`**: 기능별로 구성된 재사용 가능한 UI 컴포넌트 (dashboard, elements, header 등)
- **`src/lib/`**: API 클라이언트, 스토어, 설정을 포함한 유틸리티 모듈
- **`src/type/`**: 기능별로 구성된 TypeScript 타입 정의
- **환경변수**: `KUBE_API_URL`과 `PUBLIC_BASE_URL` 사용

### 개발 참고사항

- 커스텀 경로 별칭 사용 (`@/*`는 `src/*`에 매핑)
- New York 스타일로 구성된 Shadcn/ui 통합
- Flowbite React 컴포넌트는 설치 후 패치 필요
- Kubernetes 배포용 Docker 빌드 구성
- 혼합 렌더링: 대시보드는 SSG/ISR, 인터랙티브 콘텐츠는 동적 렌더링
