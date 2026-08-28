# 🌲 공부의 숲 (studyForest)

> 함께 공부하고 함께 성장하는 스터디 플랫폼

## 📌 프로젝트 소개

`공부의 숲`

- **진행 기간**: 2026.09.01~
- **팀 인원**:  6명
- **진행 방식**: GitHub Flow 기반 협업 (이슈 → 브랜치 → PR → 리뷰 → 병합)

## 🛠 기술 스택

| 분야 | 스택 |
| --- | --- |
| Frontend  |  React |
| Backend   |  Expres |
| Database  | postgreSQL |
| 협업 도구  | GitHub, Discord |
| 배포      | - |

## ✨ 주요 기능

- [ ] 기능 1
- [ ] 기능 2
- [ ] 기능 3

## 👥 팀원 및 역할

| 박수환 | (역할) | [@pionsuhwan-hub](pionsuhwan@gmail.com) |
| 황규리 | (역할) | [@HwangGyuri](gyuriyuri2580@gmail.com ) |
| 배기홍 | (역할) | [@Kihong-s](golden7kihong@gmail.com) |
| 김경래 | (역할) | [@kkr6293](kkr6293@gmail.com) |
| 민승재 | (역할) | [@tmdwosktn](tmdwosktn@gmail.comb) |
| 김수지 | (역할) | [@cloud2-k](susie.k.works@gmail.com) |

## 🌿 브랜치 전략

```
main        # 배포 가능한 안정 버전
 └─ develop # 기능 통합 브랜치
     └─ feature/이슈번호-기능이름   # 개별 기능 개발
     └─ fix/이슈번호-버그내용       # 버그 수정
```

- 모든 작업은 `develop`에서 브랜치를 분기하여 진행합니다.
- 작업 완료 후 `develop`으로 Pull Request를 생성합니다.
- 최소 1명 이상의 리뷰 승인 후 병합합니다.
- 일정 주기로 `develop` → `main` 병합 및 릴리즈를 진행합니다.

## 📝 커밋 컨벤션

| 태그 | 설명 |
| --- | --- |
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `docs` | 문서 수정 |
| `style` | 코드 포맷팅, 세미콜론 누락 등 (기능 변경 없음) |
| `refactor` | 코드 리팩토링 |
| `test` | 테스트 코드 추가/수정 |
| `chore` | 빌드 업무, 패키지 매니저 설정 등 |

예시: `feat: 로그인 기능 구현`

## 🚀 시작하기

```bash
# 저장소 클론
git clone https://github.com/pionsuhwan-hub/studyForest.git
cd studyForest

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev


## 📂 폴더 구조


studyForest/
├── src/
│   ├── components/
│   ├── pages/
│   └── ...
├── ~.js
└── README.md

## 📋 이슈 및 프로젝트 관리

- 작업은 [Issues](../../issues) 탭에서 관리합니다.
- 진행 상황은 [Projects](../../projects) 칸반보드에서 확인할 수 있습니다.

## 🤝 기여 방법

1. 이슈를 생성하거나 기존 이슈를 확인합니다.
2. `develop`에서 브랜치를 생성합니다. (`feature/이슈번호-내용`)
3. 작업 후 커밋 컨벤션에 맞게 커밋합니다.
4. `develop`으로 Pull Request를 생성합니다.
5. 코드 리뷰 후 병합합니다.

## 📄 라이선스

이 프로젝트는 코드잇 초급 프로젝트 과정입니다.
