import React from "react";
import { BsSuitDiamond } from "react-icons/bs";

const Player2Board = ({ randomplayer2Hand, randomCard }) => {
  console.log(randomplayer2Hand);
  return (
    <div className="Player2Board">
      {randomplayer2Hand.map((card) => {
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
  );
};

export default Player2Board;
