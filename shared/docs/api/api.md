# API 명세서


## 인증

### 비밀번호 확인

카테고리: 인증
설명: 로그인 합니다.
Method: POST
URL: /api/
사용자: 유저

### Request

| key | 설명 | value 타입 | 옵션 | Nullable | 예시 |
| --- | --- | --- | --- | --- | --- |
| username | 로그인 아이디 | String |  | X | "foo" |
| password | 로그인 비밀번호 | String |  | X | "foo" |

**Query parameter**

### Response

| key | 설명 | value 타입 | 옵션 | Nullable | 예시 |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |
|  |  |  |  |  |  |

**Example**

```json
{

}
```

### Status

| status | response content |
| --- | --- |
| 200 |  |
| 400 |  |

---

## 로그

### 로그 목록 조회

카테고리: 로그
설명: keyword로 name으로 검색, sort 최신순, 오래된 순, 포인트 순(내림차순,오름차순) 정렬
Method: GET
URL: /api/logs
param: (query) keyword, sort, cursor, size
사용자: 유저

**Query parameter**

`/api/logs?keyword=개발공장&sort=points_desc&cursor=&size=6`

- `keyword` — 로그 이름(`name`) 검색어 (없으면 전체 조회)
- `sort` — `latest`(최신순, 기본값) / `oldest`(오래된순) / `points_desc`(포인트 내림차순) / `points_asc`(포인트 오름차순)
- `cursor` — 다음 페이지 조회용 커서 (최초 조회 시 생략) [무한페이지네이션]
- `size` — 페이지당 개수 (기본값 6)

정렬 규칙

- `latest`/`oldest`: `created_at` 기준 + 동점 시 `id` 2차 정렬
- `points_desc`/`points_asc`: `points` 기준 + 동점 시 `id` 2차 정렬
- 커서는 정렬 기준 컬럼 값과 `id`를 함께 인코딩해서 사용 (예: `points_desc`일 때 `points=120,id=45`)

### Response

| key | 설명 | value 타입 | Nullable | 예시 |
| --- | --- | --- | --- | --- |
| content | 로그 목록 | Array | X | `[{}]` |
| content[].logId | 로그 id | Number | X | "1" |
| content[].name | 로그 이름 | String | X | "연우의 개발공장" |
| content[].nickname | 생성자 닉네임 | String | X | "연우" |
| content[].description | 로그 소개 | String | X | "Slow And Steady Wins The Race!" |
| content[].background | 배경 테마 | String | X | "workspace" |
| content[].points | 현재 포인트 | Number | X | 310 |
| content[].topReactions | 상위 이모지 (최대 3개) | Array | X | `[{"reactionType":"🔥","count":37}]` |
| content[].createdAt | 생성일시 | String | X | "2026-07-01T00:00:00+09:00" |
| nextCursor | 다음 페이지 커서(없으면 null) | String | O | "points:120,id:45" |
| hasNext | 다음 페이지 존재 여부 | Boolean | X | true |

**Example**

```json
{
  "content": [
    {
      "logId": 1,
      "name": "연우의 개발공장",
      "nickname": "연우",
      "description": "Slow And Steady Wins The Race!",
      "background": "workspace",
      "points": 310,
      "topReactions": [
        { "reactionType": "🔥", "count": 37 },
        { "reactionType": "😄", "count": 11 },
        { "reactionType": "😢", "count": 9 }
      ],
      "createdAt": "2026-07-01T00:00:00+09:00"
    }
  ],
  "nextCursor": "points:120,id:45",
  "hasNext": true
}
```

### Status

| status | response content |
| --- | --- |
| 200 | 정상 조회 |
| 400 | 잘못된 sort 값 / size 범위 초과 |

---

### 로그 생성

카테고리: 로그
설명: 로그를 생성합니다. description을 제외하고 전부 필수값입니다.
Method: POST
URL: /api/logs
Body: nickname, name, description, background, password, passwordConfirm
사용자: 유저

### Request Body

| key | 설명 | value 타입 | Nullable | 예시 |
| --- | --- | --- | --- | --- |
| nickname | 생성자 닉네임 | String | X | "연우" |
| name | 로그 이름 | String | X | "연우의 개발공장" |
| description | 로그 소개 | String | O | "Slow And Steady Wins The Race!" |
| background | 배경 테마 | String | X | "workspace" |
| password | 관리 비밀번호 | String | X | "1234" |
| passwordConfirm | 비밀번호 확인 | String | X | "1234" |

### Response

| key | 설명 | value 타입 | Nullable | 예시 |
| --- | --- | --- | --- | --- |
| logId | 생성된 로그 id | Number | X | 1 |
| name | 로그 이름 | String | X | "연우의 개발공장" |
| nickname | 생성자 닉네임 | String | X | "연우" |
| description | 로그 소개 | String | O | "Slow And Steady Wins The Race!" |
| background | 배경 테마 | String | X | "workspace" |
| points | 초기 포인트 (항상 0) | Number | X | 0 |
| createdAt | 생성일시 | String | X | "2026-09-02T13:10:00+09:00" |

**Example**

```json
{
  "logId": 1,
  "name": "연우의 개발공장",
  "nickname": "연우",
  "description": "Slow And Steady Wins The Race!",
  "background": "workspace",
  "points": 0,
  "createdAt": "2026-09-02T13:10:00+09:00"
}
```

### Status

| status | response content |
| --- | --- |
| 201 | 생성 성공 |
| 400 | 필수값 누락 / `password != passwordConfirm` |

---

### 로그 상세 조회

카테고리: 로그
설명: 닉네임/이름/소개/배경/포인트 등 기본 정보 조회
Method: GET
URL: /api/logs/{logId}
param: logId
사용자: 유저

### Response

| key | 설명 | value 타입 | Nullable | 예시 |
| --- | --- | --- | --- | --- |
| logId | 로그 id | Number | X | 1 |
| name | 로그 이름 | String | X | "연우의 개발공장" |
| nickname | 생성자 닉네임 | String | X | "연우" |
| description | 로그 소개 | String | O | "Slow And Steady Wins The Race!" |
| background | 배경 테마 | String | X | "workspace" |
| points | 현재 포인트 | Number | X | 310 |
| createdAt | 생성일시 | String | X | "2026-07-01T00:00:00+09:00" |

**Example**

```json
{
  "logId": 1,
  "name": "연우의 개발공장",
  "nickname": "연우",
  "description": "Slow And Steady Wins The Race!",
  "background": "workspace",
  "points": 310,
  "createdAt": "2026-07-01T00:00:00+09:00"
}
```

### Status

| status | response content |
| --- | --- |
| 200 | 정상 조회 |
| 404 | 존재하지 않는 logId |

---

### 로그 수정

카테고리: 로그
설명: 비밀번호 확인 후 정보 수정
Method: PATCH
URL: /api/logs/{logId}
param: logId / (body) password, name, description, background
사용자: 유저

### Request Body

| key | 설명 | value 타입 | Nullable | 예시 |
| --- | --- | --- | --- | --- |
| password | 로그 관리 비밀번호 (검증용) | String | X | "1234" |
| name | 수정할 이름 | String | O | "연우의 개발공장 v2" |
| description | 수정할 소개 | String | O | "매일 성장하는 중" |
| background | 수정할 배경 테마 | String | O | "plant" |

### Response

| key | 설명 | value 타입 | Nullable | 예시 |
| --- | --- | --- | --- | --- |
| logId | 로그 id | Number | X | 1 |
| name | 수정된 이름 | String | X | "연우의 개발공장 v2" |
| description | 수정된 소개 | String | O | "매일 성장하는 중" |
| background | 수정된 배경 테마 | String | X | "plant" |
| updatedAt | 수정일시 | String | X | "2026-09-02T13:20:00+09:00" |

**Example**

```json
{
  "logId": 1,
  "name": "연우의 개발공장 v2",
  "description": "매일 성장하는 중",
  "background": "plant",
  "updatedAt": "2026-09-02T13:20:00+09:00"
}
```

### Status

| status | response content |
| --- | --- |
| 200 | 수정 성공 |
| 400 | 유효성 오류 (name 빈 문자열 등) |
| 403 | 비밀번호 불일치 |
| 404 | 존재하지 않는 logId |

---

### 로그 삭제

카테고리: 로그
설명: 비밀번호 확인 후 로그 삭제
Method: DELETE
URL: /api/logs/{logId}
param: logId / (body) password
사용자: 유저

### Request Body

| key | 설명 | value 타입 | Nullable | 예시 |
| --- | --- | --- | --- | --- |
| password | 로그 관리 비밀번호 (검증용) | String | X | "1234" |

### Response

없음 (204 No Content)

### Status

| status | response content |
| --- | --- |
| 204 | 삭제 성공 |
| 403 | 비밀번호 불일치 |
| 404 | 존재하지 않는 logId |

---

### 응원 이모지 조회

카테고리: 로그
설명: 이모지 종류별로 조회
Method: GET
URL: /api/logs/{logId}/reactions
param: logId
사용자: 유저

### Query parameter

`/api/logs/1/reactions?limit=3`

- `limit` — 조회할 개수 (기본값 3)

### Response

| key | 설명 | value 타입 | Nullable | 예시 |
| --- | --- | --- | --- | --- |
| logId | 로그 id | Number | X | 1 |
| reactions | 이모지별 집계 목록 | Array | X | `[{}]` |
| reactions[].reactionType | 이모지 종류 | String | X | "🔥" |
| reactions[].count | 개수 | Number | X | 37 |

**Example**

```json
{
  "logId": 1,
  "reactions": [
    { "reactionType": "🔥", "count": 37 },
    { "reactionType": "😄", "count": 11 },
    { "reactionType": "😢", "count": 9 }
  ]
}
```

### Status

| status | response content |
| --- | --- |
| 200 | 정상 조회 |
| 404 | 존재하지 않는 logId |

---

### 응원 이모지 추가

카테고리: 로그
설명: 해당 로그에 이모지 반응 1건 추가
Method: POST
URL: /api/logs/{logId}/reactions
param: logId
Body: reactionType
사용자: 유저

### Request Body

| key | 설명 | value 타입 | Nullable | 예시 |
| --- | --- | --- | --- | --- |
| reactionType | 이모지 종류 | String | X | "🔥" |

### Response

| key | 설명 | value 타입 | Nullable | 예시 |
| --- | --- | --- | --- | --- |
| logId | 로그 id | Number | X | 1 |
| reactionType | 추가된 이모지 종류 | String | X | "🔥" |
| count | 해당 이모지 현재 누적 개수 | Number | X | 38 |

**Example**

```json
{
  "logId": 1,
  "reactionType": "🔥",
  "count": 38
}
```

### Status

| status | response content |
| --- | --- |
| 201 | 추가 성공 |
| 400 | 잘못된 reactionType |
| 404 | 존재하지 않는 logId |

---

### 습관 기록표(주간뷰) 조회

카테고리: 로그
설명: 로그 상세 페이지에 표시되는 요일별 체크 매트릭스(습관 기록표)를 조회합니다. 이번 주(월~일) 7일치를 습관별로 한 번에 내려줍니다.
Method: GET
URL: /api/logs/{logId}/habit-records
param: logId
query: week

> ※ 원본에는 GET 요청인데도 `week`가 `Body:`로 적혀 있었습니다. 쿼리스트링(`?week=...`)이므로 `query:`로 정정했습니다.

사용자: 유저

**Query parameter**

`/api/logs/1/habit-records?week=2026-08-31`

- `week` — 조회할 주의 월요일 날짜(`YYYY-MM-DD`). 생략 시 이번 주(월요일 기준)로 조회합니다.

**정렬/노출 규칙**

- `habits`는 `deleted_at IS NULL`(활성)인 습관을 `created_at` 최신순으로, 그 다음 `deleted_at IS NOT NULL`(과거에 삭제된) 습관 중 해당 주간에 `habit_histories` 기록이 1건이라도 있는 습관을 이어서 반환합니다.
- 습관이 아직 생성되지 않은 날짜(해당 주 안에서 `record_date < habits.created_at`인 날)는 `records[].exists`를 `false`로 내려주고 `isChecked`는 `null`입니다.
- 습관이 삭제된 이후 날짜(`record_date > habits.deleted_at`)도 `exists: false`로 내려줍니다.

**Response**

| key | 설명 | value 타입 | Nullable | 예시 |
| --- | --- | --- | --- | --- |
| logId | 로그 id | Number | X | 1 |
| weekStart | 조회한 주의 월요일 날짜 | String | X | "2026-08-31" |
| weekEnd | 조회한 주의 일요일 날짜 | String | X | "2026-09-06" |
| habits | 습관별 기록 목록 | Array | X | `[{}]` |
| habits[].habitId | 습관 id | Number | X | 12 |
| habits[].name | 습관 이름 | String | X | "미라클모닝 6시 기상" |
| habits[].isActive | 습관 활성 여부 | Boolean | X | true |
| habits[].records | 월~일 7일치 기록 | Array(7) | X | `[{}]` |
| habits[].records[].date | 날짜 | String | X | "2026-08-31" |
| habits[].records[].exists | 그 날짜에 습관이 존재했는지 여부 | Boolean | X | true |
| habits[].records[].isChecked | 체크 여부(`exists=false`면 null) | Boolean | O | true |

**Example**

```json
{
  "logId": 1,
  "weekStart": "2026-08-31",
  "weekEnd": "2026-09-06",
  "habits": [
    {
      "habitId": 12,
      "name": "미라클모닝 6시 기상",
      "isActive": true,
      "records": [
        { "date": "2026-08-31", "exists": true, "isChecked": true },
        { "date": "2026-09-01", "exists": true, "isChecked": true },
        { "date": "2026-09-02", "exists": true, "isChecked": true },
        { "date": "2026-09-03", "exists": true, "isChecked": false },
        { "date": "2026-09-04", "exists": true, "isChecked": false },
        { "date": "2026-09-05", "exists": true, "isChecked": false },
        { "date": "2026-09-06", "exists": true, "isChecked": false }
      ]
    },
    {
      "habitId": 6,
      "name": "물 2L 먹기",
      "isActive": false,
      "records": [
        { "date": "2026-08-31", "exists": true, "isChecked": true },
        { "date": "2026-09-01", "exists": true, "isChecked": false },
        { "date": "2026-09-02", "exists": false, "isChecked": null },
        { "date": "2026-09-03", "exists": false, "isChecked": null },
        { "date": "2026-09-04", "exists": false, "isChecked": null },
        { "date": "2026-09-05", "exists": false, "isChecked": null },
        { "date": "2026-09-06", "exists": false, "isChecked": null }
      ]
    }
  ]
}
```

### Status

| status | response content |
| --- | --- |
| 200 | 정상 조회 |
| 400 | week 형식 오류(월요일이 아님 등) |
| 404 | 존재하지 않는 logId |

---

## 오늘의 습관

### 오늘의 습관 목록 조회

카테고리: 오늘의 습관
설명: 로그의 습관 목록과 오늘 날짜의 체크 여부를 함께 조회합니다.
deleted_at IS NULL인 습관을 created_at 최신순으로 우선 정렬하고, size를 못 채우면 deleted_at IS NOT NULL인 습관을 최신순으로 이어서 채웁니다.
Method: GET
URL: /api/logs/{logId}/habits
param: logId
Query: size, cursor
사용자: 유저

### Query parameter

`/api/logs/1/habits?cursor=&size=7`

- cursor — 다음 페이지 조회용 커서 (habitId, 최초 조회 시 생략) 무한 페이지네이션
- size — 페이지당 개수 (기본값 7)

### 정렬 규칙

1순위: `deleted_at IS NULL`(활성)인 습관을 `created_at` 최신순으로
2순위: 1순위로 size를 못 채우면 `deleted_at IS NOT NULL`(비활성)인 습관을 `created_at` 최신순으로 이어서

### Response

| key | 설명 | value 타입 | Nullable | 예시 |
| --- | --- | --- | --- | --- |
| logId | 로그 id | Number | X | 1 |
| currentTime | 서버 기준 현재 시각(Asia/Seoul) | String | X | "2026-09-02T15:06:32+09:00" |
| date | 조회 기준 날짜 (서버가 계산한 오늘, Asia/Seoul 기준) | String | X | "2026-09-02" |
| habits | 습관 목록 | Array | X | `[{}]` |
| habits[].habitId | 습관 id | Number | X | 12 |
| habits[].name | 습관 이름 | String | X | "아침 7시 기상" |
| habits[].isActive | 습관 활성 여부 (`deleted_at IS NULL`이면 true) | Boolean | X | true |
| habits[].isChecked | 오늘 체크 여부 | Boolean | X | true |
| nextCursor | 다음 페이지 커서(없으면 null) | String | O | "6" |
| hasNext | 다음 페이지 존재 여부 | Boolean | X | true |

**Example**

```json
{
  "logId": 1,
  "currentTime": "2026-09-02T15:06:32+09:00",
  "date": "2026-09-02",
  "habits": [
    { "habitId": 12, "name": "미라클모닝 6시 기상", "isActive": true, "isChecked": true },
    { "habitId": 11, "name": "아침 챙겨 먹기", "isActive": true, "isChecked": true },
    { "habitId": 10, "name": "React 스터디 책 1챕터 읽기", "isActive": true, "isChecked": false },
    { "habitId": 9,  "name": "스트레칭", "isActive": true, "isChecked": false },
    { "habitId": 8,  "name": "영양제 챙겨 먹기", "isActive": true, "isChecked": false },
    { "habitId": 7,  "name": "사이드 프로젝트", "isActive": true, "isChecked": false },
    { "habitId": 6,  "name": "물 2L 먹기", "isActive": false, "isChecked": false }
  ],
  "nextCursor": "6",
  "hasNext": true
}
```

### Status

| status | response content |
| --- | --- |
| 200 | 정상 조회 |
| 400 | size 범위 오류 |
| 404 | 존재하지 않는 logId |

---

### 습관 생성

카테고리: 오늘의 습관
설명: 습관 수정 모달의 '+' 버튼으로 새 습관을 추가합니다. name만 입력받으며, deleted_at은 서버에서 null로 기본 생성
Method: POST
URL: /api/logs/{logId}/habits
param: logId
Body: name
사용자: 유저

### Request Body

| key | 설명 | value 타입 | Nullable | 예시 |
| --- | --- | --- | --- | --- |
| name | 습관 이름 | String | X | "물 2L 먹기" |

### Response

| key | 설명 | value 타입 | Nullable | 예시 |
| --- | --- | --- | --- | --- |
| habitId | 생성된 습관 id | Number | X | 13 |
| logId | 소속 로그 id | Number | X | 1 |
| name | 습관 이름 | String | X | "물 2L 먹기" |
| createdAt | 생성일시 | String | X | "2026-09-02T13:30:00+09:00" |

**Example**

```json
{
  "habitId": 13,
  "logId": 1,
  "name": "물 2L 먹기",
  "createdAt": "2026-09-02T13:30:00+09:00"
}
```

### Status

| status | response content |
| --- | --- |
| 201 | 생성 성공 |
| 400 | name 누락 |
| 404 | 존재하지 않는 logId |

---

### 습관 이름 수정

카테고리: 오늘의 습관
설명: 기존 습관의 name만 수정합니다. 연관된 모든 habit_histories는 habit_id로 join해서 조회되므로 과거 기록에도 자동으로 바뀐 이름이 반영됩니다.
Method: PATCH
URL: /api/habits/{habitId}
param: habitId
Body: name
사용자: 유저

### Request Body

| key | 설명 | value 타입 | Nullable | 예시 |
| --- | --- | --- | --- | --- |
| name | 수정할 습관 이름 | String | X | "물 2.5L 먹기" |

### Response

| key | 설명 | value 타입 | Nullable | 예시 |
| --- | --- | --- | --- | --- |
| habitId | 습관 id | Number | X | 13 |
| name | 수정된 이름 | String | X | "물 2.5L 먹기" |
| updatedAt | 수정일시 | String | X | "2026-09-02T13:35:00+09:00" |

**Example**

```json
{
  "habitId": 13,
  "name": "물 2.5L 먹기",
  "updatedAt": "2026-09-02T13:35:00+09:00"
}
```

### Status

| status | response content |
| --- | --- |
| 200 | 수정 성공 |
| 400 | name 누락/형식 오류 |
| 403 | 이 로그 세션에 속하지 않는 habitId |
| 404 | 존재하지 않는 habitId |

---

### 습관 삭제(비활성화)

카테고리: 오늘의 습관
설명: 습관 수정 모달의 휴지통 클릭 시 row를 지우지 않고 deleted_at을 현재 시각으로 업데이트합니다. 오늘 이후 "오늘의 습관" 목록에서는 빠지지만, 기존 habit_histories 기록은 그대로 남아 로그 상세의 습관 기록표에 영향을 주지 않습니다.
Method: PATCH
URL: /api/habits/{habitId}/deactivate
param: habitId
Query: row 삭제가 아니라 상태값(soft delete) 수정이므로 DELETE가 아닌 PATCH로 처리. Body 없이 PathParam만으로 처리. habitId가 로그 세션 소속인지 검증
사용자: 유저

### Response

| key | 설명 | value 타입 | Nullable | 예시 |
| --- | --- | --- | --- | --- |
| habitId | 습관 id | Number | X | 6 |
| isActive | 처리 후 상태 (항상 false) | Boolean | X | false |
| deletedAt | 삭제(비활성화) 처리 시각 | String | X | "2026-09-02T13:40:00+09:00" |

**Example**

```json
{
  "habitId": 6,
  "isActive": false,
  "deletedAt": "2026-09-02T13:40:00+09:00"
}
```

### Status

| status | response content |
| --- | --- |
| 200 | 비활성화 성공 |
| 403 | 이 로그 세션에 속하지 않는 habitId |
| 404 | 존재하지 않는 habitId |
| 409 | 이미 비활성화된 습관 |

---

### 습관 체크/체크 해제

카테고리: 오늘의 습관
설명: 오늘의 습관 화면에서 목록을 클릭하면 서버 기준 오늘 날짜(record_date)로 habit_histories에 upsert합니다.
Method: PUT
URL: /api/habits/{habitId}/check
param: habitId
Body: isChecked
Query: habitId + 오늘 record_date 조합의 habit_histories row가 없으면 생성, 있으면 is_checked 업데이트. (habit_id, record_date) unique 제약 필요. 호출한 habitId가 현재 인증된 세션의 logId 소속인지 서버에서 반드시 검증 (IDOR 방지). 로그 상세(공개 화면)에서는 호출 불가, 오늘의 습관 인증 세션에서만 사용.

> ※ 원본에는 파라미터 목록에 `date, isChecked`가 함께 적혀 있었는데, 바로 아래 설명은 "`record_date`는 항상 서버가 계산하며 클라이언트가 임의 날짜를 지정할 수 없다"였습니다. `date`는 클라이언트 입력값이 아니므로 파라미터 목록에서 제거했습니다.

사용자: 유저

### Request Body

| key | 설명 | value 타입 | Nullable | 예시 |
| --- | --- | --- | --- | --- |
| isChecked | 체크 여부 | Boolean | X | true |

> `date`는 오늘(Asia/Seoul 기준)로 고정합니다. 클라이언트가 임의 날짜를 지정할 수 있게 하면 과거 습관 기록표를 위조할 수 있으므로, `record_date`는 항상 서버가 계산합니다.
>

### Response

| key | 설명 | value 타입 | Nullable | 예시 |
| --- | --- | --- | --- | --- |
| habitId | 습관 id | Number | X | 12 |
| date | 체크된 날짜 (서버 기준 오늘) | String | X | "2026-09-02" |
| isChecked | 체크 여부 | Boolean | X | true |

**Example**

```json
{
  "habitId": 12,
  "date": "2026-09-02",
  "isChecked": true
}
```

### Status

| status | response content |
| --- | --- |
| 200 | 체크/해제 성공 |
| 400 | 잘못된 요청 (isChecked 누락 등) |
| 403 | 이 로그 세션에 속하지 않는 habitId |
| 404 | 존재하지 않는 habitId |

---

## 오늘의 집중

### 오늘의 집중 조회

카테고리: 오늘의 집중
설명: 로그의 현재 포인트, 진행 중인 세션 여부도 함께 조회
Method: GET
URL: /api/logs/{logId}/focus
param: logId
사용자: 유저

### Response

| key | 설명 | value 타입 | Nullable | 예시 |
| --- | --- | --- | --- | --- |
| logId | 로그 id | Number | X | 1 |
| points | 현재 포인트 | Number | X | 310 |
| activeSession | 진행 중인 세션 (없으면 null) | Object | O | `{}` |
| activeSession.focusId | 세션 id | Number | X | 8 |
| activeSession.targetSeconds | 목표 시간(초) | Number | X | 1500 |
| activeSession.status | 상태 | String | X | "진행중" |
| activeSession.createdAt | 시작 시각 | String | X | "2026-09-02T13:10:00+09:00" |

**Example**

```json
{
  "logId": 1,
  "points": 310,
  "activeSession": {
    "focusId": 8,
    "targetSeconds": 1500,
    "status": "진행중",
    "createdAt": "2026-09-02T13:10:00+09:00"
  }
}
```

> 진행 중인 세션이 없으면 `"activeSession": null` — 프론트는 이 경우 "25:00 Start" 초기 화면을 렌더합니다.
>

### Status

| status | response content |
| --- | --- |
| 200 | 정상 조회 |
| 404 | 존재하지 않는 logId |

---

### 오늘의 집중 시작

카테고리: 오늘의 집중
설명: focus_records row 생성 (status=진행중, created_at=now)
Method: POST
URL: /api/logs/{logId}/focus
param: logId
Body: targetSeconds
사용자: 유저

### Request Body

| key | 설명 | value 타입 | Nullable | 예시 |
| --- | --- | --- | --- | --- |
| targetSeconds | 설정한 목표 시간(초) | Number | X | 1500 |

### Response

| key | 설명 | value 타입 | Nullable | 예시 |
| --- | --- | --- | --- | --- |
| focusId | 생성된 세션 id | Number | X | 8 |
| logId | 로그 id | Number | X | 1 |
| targetSeconds | 목표 시간(초) | Number | X | 1500 |
| status | 상태 | String | X | "진행중" |
| createdAt | 시작 시각 | String | X | "2026-09-02T13:10:00+09:00" |

**Example**

```json
{
  "focusId": 8,
  "logId": 1,
  "targetSeconds": 1500,
  "status": "진행중",
  "createdAt": "2026-09-02T13:10:00+09:00"
}
```

### Status

| status | response content |
| --- | --- |
| 201 | 시작 성공 |
| 400 | targetSeconds 누락/범위 오류 |
| 404 | 존재하지 않는 logId |
| 409 | 이미 진행 중인 세션 존재 |

---

### 오늘의 집중 완료

카테고리: 오늘의 집중
설명: status=완료, ended_at=now 기록 + 포인트 지급
Method: PATCH
URL: /api/focus-records/{focusId}/complete
param: focusId
사용자: 유저

**포인트 계산식**: `pointsEarned = 3 + floor(targetSeconds / 600)` (기본 3P + 10분당 1P, 10분 미만 자투리는 버림). 지급된 포인트만큼 `logs.points`를 갱신하고, `point_histories`에 사유("오늘의 집중 완료")와 함께 적립 내역 1건을 남깁니다.

완료 처리 전 서버에서 `now - created_at >= target_seconds` 검증 (클라이언트가 타이머를 기다리지 않고 즉시 호출해 포인트를 부정 획득하는 것 방지)

### Response

| key | 설명 | value 타입 | Nullable | 예시 |
| --- | --- | --- | --- | --- |
| focusId | 세션 id | Number | X | 8 |
| logId | 로그 id | Number | X | 1 |
| status | 상태 | String | X | "완료" |
| targetSeconds | 목표 시간(초) | Number | X | 1500 |
| pointsEarned | 이번 세션으로 획득한 포인트 (기본 3P + 10분당 1P) | Number | X | 5 |
| totalPoints | 갱신된 로그 총 포인트 | Number | X | 315 |
| endedAt | 종료 시각 | String | X | "2026-09-02T13:35:00+09:00" |

**Example**

```json
{
  "focusId": 8,
  "logId": 1,
  "status": "완료",
  "targetSeconds": 1500,
  "pointsEarned": 5,
  "totalPoints": 315,
  "endedAt": "2026-09-02T13:35:00+09:00"
}
```

### Status

| status | response content |
| --- | --- |
| 200 | 완료 처리 성공 |
| 400 | 아직 목표 시간이 지나지 않음 |
| 403 | 이 로그 세션에 속하지 않는 focusId |
| 404 | 존재하지 않는 focusId |
| 409 | 이미 완료(또는 포기)된 세션 |
