# Life Circle (인생 시간 계산기)

사용자의 시간 사용 패턴을 분석하고, 남은 인생에서 각 활동에 투자할 시간을 시각화해주는 웹 애플리케이션입니다.

## 🌟 주요 기능

### 1. 나이 입력 및 분석
- 사용자의 현재 나이 입력
- 기대 수명(80세) 기준 남은 시간 계산
- 실시간 유효성 검사

### 2. 시간 사용 패턴 입력
- 카테고리별 시간 투자량 설정
- 일간/주간 단위 자유로운 전환
- 실시간 자유 시간 계산
- 주 168시간 초과 방지 로직

### 3. 결과 시각화
- 남은 인생 시간을 월 단위 아이콘으로 시각화
- 카테고리별 예상 투자 시간 분석
- 자유 시간과 계획된 시간의 균형 확인

## 🛠 기술 스택

### Frontend
- React 18.3
- TypeScript
- Tailwind CSS
- shadcn/ui

### 개발 도구
- Vite
- ESLint
- Prettier

### 테스팅
- Vitest (단위 테스트)
- Cypress (E2E 테스트)
- Testing Library

## 🚀 시작하기

### 필수 조건
- Node.js (18.0.0 이상)
- npm 또는 yarn

### 설치 및 실행
의존성 설치
```bash
$ npm install
```

개발 서버 실행
```bash
$ npm run dev
```

테스트 실행
```bash
$ npm run test # 단위 테스트
$ npm run cy:run # E2E 테스트
$ npm run test:coverage # 테스트 커버리지
```
## 📁 프로젝트 구조
```
src/
├── components/ # 공통 컴포넌트
├── features/ # 기능별 모듈
│ ├── category/ # 카테고리 관련 기능
│ └── result/ # 결과 계산 관련 기능
├── pages/ # 페이지 컴포넌트
├── utils/ # 유틸리티 함수
└── types/ # TypeScript 타입 정의
```

## 🧪 테스트

- 단위 테스트: 유틸리티 함수, 컴포넌트
- E2E 테스트: 사용자 시나리오
- 시간 계산 정확성 검증

## 🌐 모바일 지원

- 반응형 디자인 적용
- 모바일 친화적 UI/UX
- 터치 인터랙션 최적화
