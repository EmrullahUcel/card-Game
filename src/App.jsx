import Player2Board from "./components/Player2Board";
import Player1Board from "./components/Player1Board";
import Board from "./components/Board";
import React, { useState, useEffect } from "react";

import "./App.css";

import shuffledCards from "./components/Cards/ShuffledCards";

function App() {
  const [cards, setCards] = useState(shuffledCards);
  const [randomHand, setRandomHand] = useState([]);
  const [randomplayer1Hand, setRandomplayer1Hand] = useState([]);
  const [randomplayer2Hand, setRandomplayer2Hand] = useState([]);

  const randomCards = () => {
    const randomCard = shuffledCards.splice(0, 4);
    setRandomHand(randomCard);
    setCards([...shuffledCards]);
    const player1hand = cards.splice(0, 4);
    setRandomplayer1Hand([...player1hand]);
    const player2hand = cards.splice(0, 4);
    setRandomplayer2Hand([...player2hand]);
  };

  return (
    <div className="App">
      <Player2Board randomplayer2Hand={randomplayer2Hand} />
      <button onClick={randomCards}>Dağıt</button>
      <Board randomHand={randomHand} />
      <Player1Board
        randomplayer1Hand={randomplayer1Hand}
        randomCards={randomCards}
      />
    </div>
  );
}
export default App;
