# Directional Frontend Assignment
- 디렉셔널 과제 전형 리포지토리
## 프로젝트 실행 방법
1. env 파일 추가
``` 
NEXT_PUBLIC_API_URL = 'https://fe-hiring-rest-api.vercel.app'
```
2. pnpm 스크립트 실행
```
pnpm run dev
```
- 테스트 아이디: `sakedon2151@gmail.com`
- 테스트 비밀번호: `R6kX9fCpL8`
## 사용한 기술 스택
#### 핵심 프레임워크
- Next.js v16.0.3 App Router
- React v19.2.0
- TypeScript
#### 상태 관리, 데이터 페칭
- TanStack Query
- Zustand
- Axios
#### UI 라이브러리, 컴포넌트, 스타일링
- Shadcn UI (Radix UI 기반)
- TanStack Table
- Tailwind CSS
- Recharts
- clsx
#### 폼 관리, 검증, 유틸
- React Intersection Observer
- Hookform Resolvers
- React Hook Form
- Zod
#### 개발 환경
- Prettier (+ tailwindcss plugin)
- ESLint
## 주요 구현 기능 요약
- 토큰 기반 로그인
- 게시판
  - 게시글 CRUD
  - 넓이 조절 및 컬럼 숨김/보임 기능 제공 테이블
  - 게시글 필터 및 정렬
  - 무한 스크롤
- 차트 (미구현)
## 배포 링크
https://directional-frontend-assignment-eight.vercel.app/
