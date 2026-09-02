# 습관 트래커 API 명세

> 리소스명은 `study` → `log`로 변경 예정 (확정 시 재확인 필요)

## 1. 테이블 구조 (안)


### habits
| 컬럼명 | 타입 | 설명 |
|---|---|---|
| id | PK | 습관 ID |
| log_id | FK → logs.id | 소속 로그 |
| name | varchar | 습관 이름 |
| is_active | boolean | 활성 여부 (기본 true) |
| created_at | timestamp | 생성일 |
| updated_at | timestamp | 수정일 |

### habit_checks (습관 기록)
| 컬럼명 | 타입 | 설명 |
|---|---|---|
| id | PK | 체크 기록 ID |
| habit_id | FK → habits.id | 대상 습관 |
| check_date | date | 체크 날짜 |
| is_checked | boolean | 체크 여부 |
| created_at | timestamp | 최초 생성일 |
| updated_at | timestamp | 수정일 |
| (제약) | unique(habit_id, check_date) | 습관+날짜 조합은 유일 |

---

## 2. API 명세

| 기능 | 리소스 | Method | URL | Path Param | Query Param | Request Body | 설명 |
|---|---|---|---|---|---|---|---|
| 오늘의 습관 목록 조회 | 로그 | GET | `/api/logs/:logId/habits` | `logId` | `date` (선택, 미지정 시 서버 오늘) | - | 로그의 습관 목록과 해당 날짜의 체크 여부를 함께 조회. is_active=true 습관을 최신순으로 우선 정렬하고, 7개 미만이면 is_active=false 습관을 최신순으로 이어서 채움 |
| 습관 체크/체크 해제 | 습관 기록 | PUT | `/api/habits/:habitId/checks/:date` | `habitId`, `date` | - | `{ "isChecked": boolean }` | habitId+date 조합의 habit_checks row가 없으면 생성(upsert), 있으면 업데이트. 상태를 통째로 지정하므로 PUT 사용. is_active=false인 습관도 체크 자체는 가능 |
| 습관 생성 | 습관 | POST | `/api/logs/:logId/habits` | `logId` | - | `{ "name": string }` | 새 습관 추가. is_active는 서버에서 true로 기본 생성 |
| 습관 이름 수정 | 습관 | PATCH | `/api/habits/:habitId` | `habitId` | - | `{ "name": string }` | 기존 습관의 이름만 부분 수정 |
| 습관 비활성화(삭제) | 습관 | PATCH | `/api/habits/:habitId/deactivate` | `habitId` | - | - | is_active를 false로 업데이트 (row 삭제 아님). body 없이 path param만으로 처리 |



### 미확정 / 확인 필요 사항
- [ ] `logId`가 최종 리소스명(테이블명)으로 맞는지 확인
- [ ] 체크 API의 `date`를 **path param**(`/checks/:date`)으로 둘지, **query param**(`/checks?date=...`)으로 둘지 팀 컨벤션 확인
- [ ] 습관 목록 조회 시 `date` query param을 지원할지, 항상 오늘 날짜 고정으로 갈지 결정