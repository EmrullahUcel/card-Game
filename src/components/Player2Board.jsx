import "../player2.css";

const Player2Board = ({
  randomplayer2Hand,
  setRandomplayer2Hand,
  setBoardHand,
  setTurn,
  turn,
  setTakeCard,
  player2winCards,
}) => {
  const playedCardHandle = (card) => {
    setBoardHand((prevState) => [...prevState, card]);
    setRandomplayer2Hand((prevHand) =>
      prevHand.filter((c) => c.title !== card.title)
    );
    setTurn(true);
    setTakeCard(card);
  };

  return (
    <div className="Player2Board">
      <div className="score-Board">
        <h5>Toplam kazanılan kart</h5>
        {player2winCards.length}
      </div>
      <div className="player2Hand">
        {randomplayer2Hand.map((card) => {
          return (
            <button
              style={{ color: card.color }}
              key={card.title}
              className="cards"
              onClick={() => playedCardHandle(card)}
              disabled={turn ? true : false}
            >
              <div className="content">
                <div className="card-front">
                  <span className="card-title-top">{card.value}</span>
                  <span className="card-icon">
                    <div>{card.icon}</div>
                  </span>
                  <span className="card-title-bottom">{card.value}</span>
                </div>
                <div className="card-back"></div>
              </div>
            </button>
          );
        })}
      </div>
      {
        <div className="playersWinBoard">
          {player2winCards.map((card) => {
            return (
              <div
                style={{ color: card.color }}
                key={card.title}
                className="cards"
              >
                <span className="card-title-top">{card.value}</span>
                <span className="card-icon">
                  <div>{card.icon}</div>
                </span>
                <span className="card-title-bottom">{card.value}</span>
              </div>
            );
          })}
        </div>
      }
    </div>
  );
};

export default Player2Board;
