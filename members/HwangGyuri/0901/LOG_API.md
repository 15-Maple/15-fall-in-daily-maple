# 로그 만들기 API 명세서

## 1. 개요

| 항목   | 내용                                           |
| ------ | ---------------------------------------------- |
| 기능명 | 로그 생성( 로그 만들기)                        |
| method | `POST`                                         |
| URL    | /api/logs                                      |
| 설명   | 사용자가 입력한 정보로 새로운 로그를 생성한다. |

## 2. Header

| key          | value              |
| ------------ | ------------------ |
| Content-Type | `application/json` |

## 3. Body

| 필드명            | 타입                     | 필수 | 설명                        | 제약조건                                                                                                     |
| ----------------- | ------------------------ | ---- | --------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `nickname`        | string                   | Y    | 생성자 닉네임               | trim 후 2~12자, 공백만 입력 불가                                                                             |
| `name`            | string                   | Y    | 스터디 이름                 | trim 후 2~20자, 공백만 입력 불가                                                                             |
| `description`     | string                   | Y    | 소개 멘트                   | trim 후 최대 140자                                                                                           |
| `background`      | string                   | Y    | 배경값                      | `BG_GREEN`, `BG_YELLOW`, `BG_BLUE`, `BG_PINK`, `BG_IMG_DESK`, `BG_IMG_WINDOW`, `BG_IMG_TILE`, `BG_IMG_PLANT` |
| `password`        | string                   | Y    | 스터디 수정/삭제용 비밀번호 | 4~15자,                                                                                                      |
| 영문 + 숫자 조합  |
| `passwordConfirm` | string                   | Y    | 비밀번호 확인용.            |
| 저장하지 않음     | `password`와 일치해야 함 |

`passwordConfirm` 은 DB에 저장하지 않고, 생성 요청 시 검증만 하는 필드이다.

## 4. Request 예시

```jsx
{
  "nickname": "연우",
  "name": "연우의 개발공장",
  "description": "Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)",
  "background": "BG_YELLOW",
  "password": "abcd1234",
  "passwordConfirm": "abcd1234"
}
```

## 5. Response

### 5.1 성공 (201 Created)

| 필드명          | 타입     | 설명                   |
| --------------- | -------- | ---------------------- |
| `id`            | int      | 스터디 고유 ID (PK)    |
| `nickname`      | string   | 생성자 닉네임          |
| `name`          | string   | 스터디 이름            |
| `description`   | string   | 소개글                 |
| `background`    | string   | 배경 선택값            |
| `point`         | int      | 누적 포인트 (초기값 0) |
| `createdAt`     | datetime | 생성일                 |
| `accumulateDay` | int      | 누적 일자 (초기값 0)   |

응답 예시

```jsx
{
  "success": true,
  "data": {
    "id": 101,
    "nickname": "연우",
    "name": "연우의 개발공장",
    "description": "Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)",
    "background": "BG_YELLOW",
    "point": 0,
    "createdAt": "2026-09-01T10:20:00",
    "accumulateDay": 0
  }
}
```

### 5.2 실패

| HTTP Status | Code                 | 메시지                          | 발생 조건                         |
| ----------- | -------------------- | ------------------------------- | --------------------------------- |
| 400         | `INVALID_INPUT`      | 입력값이 유효하지 않습니다      | 필수값 누락, 글자수 초과 등       |
| 400         | `PASSWORD_MISMATCH`  | 비밀번호가 일치하지 않습니다    | password ≠ passwordConfirm        |
| 400         | `INVALID_BACKGROUND` | 존재하지 않는 배경 값입니다     | enum 외 값 전달                   |
| 409         | `DUPLICATE_NAME`     | 이미 존재하는 스터디 이름입니다 | 이름 중복 (정책에 따라 선택 적용) |
| 500         | `SERVER_ERROR`       | 서버 오류가 발생했습니다        | 서버 내부 오류                    |

실패 응답 예시

```jsx
{
  "success": false,
  "error": {
    "code": "PASSWORD_MISMATCH",
    "message": "비밀번호와 비밀번호 확인이 일치하지 않습니다."
  }
}
```
