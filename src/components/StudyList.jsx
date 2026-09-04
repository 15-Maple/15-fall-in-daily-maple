import { useState } from "react";
import StudyCard from "./studyCard";

function StudyList() {
  const [sort, setSort] = useState("recent");

  const studies = [];

  const getSortLabel = () => {
    if (sort === "pointDesc" || sort === "pointAsc") {
      return "포인트순";
    }
    if (sort === "recent") {
      return "최근순";
    }
    if (sort === "oldest") {
      return "과거순";
    }
    return "최근순";
  };

  return (
    <section className="logs-list">
      <h2 className="section-title">스터디 둘러보기</h2>

      <div className="logs-list-controls">
        <input type="text" placeholder="검색" className="logs-search-input" />

        <div className="logs-sort-box">
          <span className="logs-sort-label">{getSortLabel()}</span>

          <select
            className="logs-sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            disabled={studies.length === 0}
          >
            <option value="recent">최근순</option>
            <option value="oldest">과거순</option>
            <option value="pointDesc">많은 포인트 순</option>
            <option value="pointAsc">적은 포인트 순</option>
          </select>
        </div>
      </div>

      <div className="logs-grid">
        <p className="empty-message">아직 둘러볼 스터디가 없어요</p>
      </div>
    </section>
  );
}

export default StudyList;
