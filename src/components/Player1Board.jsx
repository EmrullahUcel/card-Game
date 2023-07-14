import { BsSuitDiamond } from "react-icons/bs";
import { useEffect, useState } from "react";

const Player1Board = ({ randomHand, randomCards, randomplayer1Hand }) => {
  return (
    <div className="Player1Board">
      {randomplayer1Hand.map((card) => {
        return (
          <div key={card.title} className="Board-Cards">
            <span className="card-title-top">{card.value}</span>
            <span className="card-icon">
              <div>{card.title}</div>
            </span>
            <span className="card-title-bottom">{card.value}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Player1Board;
