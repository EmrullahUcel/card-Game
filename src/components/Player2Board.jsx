import "../style/player2.css";

const Player2Board = ({
  randomplayer2Hand,
  player2winCards,
  onCardSelected,
}) => {
  const handleCardSelected = (card) => {
    if (onCardSelected) {
      onCardSelected(card);
    }
  };

  // const playedCardHandle = (card) => {
  //   setBoardHand((prevState) => [...prevState, card]);
  //   setRandomplayer2Hand((prevHand) =>
  //     prevHand.filter((c) => c.title !== card.title)
  //   );
  //   setTurn(true);
  //   setTakeCard(card);
  // };

  return (
    <div className="Player2Board">
      <div className="player2-score-Board"></div>
      <div className="player2Hand back">
        {randomplayer2Hand.map((card) => {
          return (
            <button
              style={{ color: card.color }}
              key={card.id}
              className="cards"
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
      {
        <div className="player2winBoard">
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
