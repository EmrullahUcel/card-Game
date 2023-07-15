import React from "react";
import { BsSuitDiamond } from "react-icons/bs";

const Player2Board = ({
  randomplayer2Hand,
  randomCard,
  setRandomplayer2Hand,
  setRandomHand,
  setTurn,
  turn,
}) => {
  const playedCardHandle = (card) => {
    setRandomHand((prevState) => [...prevState, card]);
    setRandomplayer2Hand((prevHand) =>
      prevHand.filter((c) => c.title !== card.title)
    );
    setTurn(true);
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
    </div>
  );
};

export default Player2Board;
