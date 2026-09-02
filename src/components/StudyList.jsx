function studyList() {
  return (
    <section className="logs-list">
      <div className="logs-list-header">
        <h2>스터디 둘러보기</h2>

        <div className="logs-list-controls">
          <input type="text" placeholder="검색" />

          <select>
            <option>최근순</option>
            <option>과거순</option>
            <option>많은 포인트 순</option>
            <option>적은 포인트 순</option>
          </select>
        </div>
      </div>

      <div className="logs-grid">{/* {studyCard} */}</div>
    </section>
  );
}

export default studyList;
