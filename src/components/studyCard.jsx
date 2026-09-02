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
            <h3>{name}</h3>
            <p>{discription}</p>
            <div className="logs-card-info">
                <span>{point}P 획득</span>
                <span>{emojiCount}</span>
            </div>
            <p>{elapsedDays}일째 진행중</p>
        </div>
    </article>
  );
}

export default StudyCard;
