erDiagram
STUDY ||--o{ HABIT : "습관을 정의한다"
HABIT ||--o{ HABIT_RECORD : "매일 체크된다"
STUDY ||--o{ FOCUS_RECORD : "집중 기록을 남긴다"
STUDY ||--o{ EMOJI : "응원을 받는다"

    STUDY {
        int id PK
        string nickname FK "생성자 닉네임"
        string name "스터디 이름"
        string description "소개글"
        string background "배경 선택값"
        string password "수정/삭제용 비밀번호"
        int point "누적 포인트"
        datetime created_at
        datetime updated_at
    }

    HABIT {
        int id PK
        int study_id FK
        string name "습관 이름(수정 시 전체 반영)"
        datetime created_at
        datetime deleted_at "종료일(soft delete, null이면 진행중)"
    }

    HABIT_RECORD {
        int id PK
        int habit_id FK
        date record_date "체크 대상 날짜"
        boolean is_checked "체크 여부(매일 초기화)"
        datetime created_at
    }

    FOCUS_RECORD {
        int id PK
        int study_id FK
        int duration_minutes "설정한 공부 시간"
        int point "이 회차에서 획득한 포인트"
        string status "진행중/완료"
        datetime started_at
        datetime completed_at
    }

    EMOJI {
        int id PK
        int study_id FK
        string emoji_type "이모지 종류(unicode 등)"
        int count "눌린 횟수"
    }
