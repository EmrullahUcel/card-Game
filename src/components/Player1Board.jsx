import "../style/player1.css";

const Player1Board = ({
  randomplayer1Hand,
  setBoardHand,
  setRandomplayer1Hand,
  setTurn,
  turn,
  setTakeCard,
  player1winCards,
}) => {
  const playedCardHandle = (card) => {
    setBoardHand((prevState) => [...prevState, card]);
    setRandomplayer1Hand((prevHand) =>
      prevHand.filter((c) => c.title !== card.title)
    );
    setTurn(false);
    setTakeCard(card);
  };

  return (
    <div className="Player1Board">
      <div className="playersWinBoard">
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
              onClick={() => playedCardHandle(card)}
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
      <div className="score-Board">
        <h5>Toplam kazanılan kart</h5>
        <p>{player1winCards.length}</p>
      </div>
    </div>
  );
};

export default Player1Board;
