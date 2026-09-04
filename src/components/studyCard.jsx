function StudyCard({
  name,
  description,
  point,
  emojiCount,
  elapsedDays,
  background
}) {
  return (
    <article className = "logs-card">
        <div className="logs-card-background">
            {background}
        </div>

        <div className = "logs-card-content">
            <h3 className="logs-card-title">{name}</h3>
            <p className="logs-card-description">{discription}</p>
            <div className="logs-card-info">
                <span>{point}P 획득</span>
                <span>{emojiCount}</span>
            </div>
            <p className="logs-card-date">{elapsedDays}일째 진행중</p>
        </div>
    </article>
  );
}

export default StudyCard;
