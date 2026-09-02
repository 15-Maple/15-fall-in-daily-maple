erDiagram
LOG ||--o{ HABIT : "습관을 정의한다"
HABIT ||--o{ HABIT_RECORD : "매일 체크된다"
LOG ||--o{ FOCUS_RECORD : "집중 기록을 남긴다"
LOG ||--o{ EMOJI : "응원을 받는다"

    LOG {
        int id PK
        string nickname "생성자 닉네임"
        string name "로그 이름"
        string description "소개글"
        string background "배경 선택값"
        string password "수정/삭제용 비밀번호"
        int point "누적 포인트"
        datetime created_at "생성일"
        int accumulateDays "누적 일자"
        string emoji_id FK "이모지 종류"
    }

STUDY_EMOJI {
id BIGINT PK
study_id BIGINT FK
emoji_type VARCHAR(30) NOT NULL
created_at TIMESTAMP NOT NULL
}
