# 🗂 ER Diagram

## 테이블 요약

| 테이블 | 주요 컬럼 |
| --- | --- |
| studies | id, nickname, name, description, password, background, point, created_at |
| habits | id, study_id(FK), name, is_active, created_at |
| habit_checks | id, habit_id(FK), date, is_checked |
| focus_records | id, study_id(FK), duration, points_earned, created_at |
| emojis | id, study_id(FK), emoji_type, count |

## 다이어그램


```mermaid
erDiagram

studies ||--o{ habits : "하나의 스터디에 여러 습관"
habits  ||--o{ habit_checks : "하나의 습관은 매일 체크기록"
studies ||--o{ focus_records : "하나의 스터디에 집중 세션을 여러번 함"
studies ||--o{ emojis : "하나의 스터디에 여러 응원 함"

studies {
  Int     id PK
  String  nickname
  String  name
  String  description
  String  password
  String  background
  Int     point
  Date    created_at
}

habits {
  Int     id PK
  Int     study_id FK
  String  name
  Boolean is_active
  Date    created_at
}

habit_checks {
  Int     id PK
  Int     habit_id FK
  Date    date
  Boolean is_checked
}

focus_records {
  Int id PK
  Int study_id FK
  Int duration
  Int points_earned
  Date created_at
}

emojis {
  Int id PK
  Int study_id FK
  Int emoji_type
  Int count
}
```