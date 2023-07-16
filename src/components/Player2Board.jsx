import React from "react";

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
      {randomplayer2Hand.map((card) => {
        return (
          <button
            style={{ color: card.color }}
            key={card.title}
            className="Board-Cards"
            onClick={() => playedCardHandle(card)}
            disabled={turn ? true : false}
          >
            <span className="card-title-top">{card.value}</span>
            <span className="card-icon">
              <div>{card.icon}</div>
            </span>
            <span className="card-title-bottom">{card.value}</span>
          </button>
        );
      })}
      {
        <div>
          {player2winCards.map((card) => {
            return (
              <div
                style={{ color: card.color }}
                key={card.title}
                className="Board-Cards"
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
