import "../style/player1.css";

const Player1Board = ({
  randomplayer1Hand,
  turn,
  player1winCards,
  onCardSelected,
}) => {
  const handleCardSelected = (card) => {
    if (onCardSelected) {
      onCardSelected(card);
    }
  };
  return (
    <div className="Player1Board">
      <div className="player1WinBoard">
        {player1winCards.map((card) => {
          return (
            <div style={{ color: card.color }} key={card.id} className="cards">
              <span className="card-title-top">{card.value}</span>
              <span className="card-icon">
                <div>{card.icon}</div>
              </span>
              <span className="card-title-bottom">{card.value}</span>
            </div>
          );
        })}
      </div>
      <div className="player1Hand">
        {randomplayer1Hand.map((card) => {
          const cardClassName = `cards ${card.color.toLowerCase()}Shadow`;
          return (
            <button
              style={{ color: card.color }}
              key={card.title}
              className={cardClassName}
              onClick={() => handleCardSelected(card)}
              disabled={turn ? false : true}
            >
              <span className="card-title-top">{card.value}</span>
              <span className="card-icon">
                <div>{card.icon}</div>
              </span>
              <span className="card-title-bottom">{card.value}</span>
            </button>
          );
        })}
      </div>
      <div className="score-Board"></div>
    </div>
  );
};

export default Player1Board;
