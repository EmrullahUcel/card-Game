import React, { useState, useEffect } from "react";
import { BsSuitDiamond } from "react-icons/bs";

const Board = ({ randomHand, randomCard }) => {
  return (
    <div className="Board">
      {randomHand.map((card) => {
        return (
          <div key={card.title} className="Board-Cards">
            <span className="card-title-top">{card.value}</span>
            <span className="card-icon">
              <BsSuitDiamond />
              <div>{card.title}</div>
            </span>
            <span className="card-title-bottom">{card.value}</span>
          </div>
        );
      })}
    </div>
  );
};
export default Board;
