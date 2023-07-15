import Player2Board from "./components/Player2Board";
import Player1Board from "./components/Player1Board";
import Board from "./components/Board";
import React, { useState, useEffect } from "react";
import shuffledCards from "./components/Cards/ShuffledCards";
import "./App.css";

function App() {
  const [cards, setCards] = useState(shuffledCards);
  const [randomHand, setRandomHand] = useState([]);
  const [randomplayer1Hand, setRandomplayer1Hand] = useState([]);
  const [randomplayer2Hand, setRandomplayer2Hand] = useState([]);
  const [turn, setTurn] = useState(true);
  const [takeCard, setTakeCard] = useState([]);
  const [winCards, setWinCards] = useState([]);

  useEffect(() => {
    const randomCard = shuffledCards.splice(0, 4);
    setRandomHand(randomCard);
    setCards([...shuffledCards]);
  }, []);

  const lastCard = () => {
    if (
      randomHand.length > 1 &&
      takeCard.value === randomHand[randomHand.length - 2].value
    ) {
      console.log("aldın");
      setWinCards([...randomHand.splice(0, randomHand.length)]);
      console.log(winCards);
    } else {
      console.log("alamadın");
    }
    console.log(winCards);
  };

  useEffect(() => {
    lastCard();
  }, [turn]);

  const randomCards = () => {
    const player1hand = cards.splice(0, 4);
    setRandomplayer1Hand([...player1hand]);
    const player2hand = cards.splice(0, 4);
    setRandomplayer2Hand([...player2hand]);
    if (cards.length < 1) {
      alert("oyun bitti");
    }
  };
  if (randomplayer1Hand.length < 1 && randomplayer2Hand.length < 1) {
    randomCards();
  }

  return (
    <div className="App">
      <Player2Board
        randomplayer2Hand={randomplayer2Hand}
        setRandomplayer2Hand={setRandomplayer2Hand}
        setRandomHand={setRandomHand}
        turn={turn}
        setTurn={setTurn}
        setTakeCard={setTakeCard}
      />

      <Board randomHand={randomHand} setRandomHand={setRandomHand} />
      <Player1Board
        randomplayer1Hand={randomplayer1Hand}
        randomCards={randomCards}
        setRandomHand={setRandomHand}
        setRandomplayer1Hand={setRandomplayer1Hand}
        setTurn={setTurn}
        turn={turn}
        setTakeCard={setTakeCard}
      />
    </div>
  );
}
export default App;
