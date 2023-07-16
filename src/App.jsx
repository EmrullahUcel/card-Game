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
  const [takeCard, setTakeCard] = useState([]); // oyunculardan gelen kartları tutan state
  const [winCards, setWinCards] = useState([]);

  useEffect(() => {
    //4 tane kartı ortaya koyuyoruz
    firstCards();
  }, []);
  const firstCards = () => {
    //4 tane kartı ortaya koyuyoruz
    const randomCard = shuffledCards.splice(0, 4);
    setRandomHand(randomCard);
    setCards([...shuffledCards]);
  };

  const lastCard = () => {
    // bu if bloğunda kazanma koşullarını gösteriyoruz
    // oyuncudan gelen kartla yerdeki kartların sonundakiyle eşleşip eşleşmediğini kontrol ediyoruz
    if (
      (randomHand.length > 1 &&
        takeCard.value === randomHand[randomHand.length - 2].value) ||
      (randomHand.length > 1 && randomHand[randomHand.length - 1].value === "J")
    ) {
      if (
        randomHand.length > 1 &&
        randomHand.length < 3 &&
        takeCard.value === randomHand[0].value
      ) {
        alert("pişti");
        setWinCards([...randomHand.splice(0, randomHand.length)]);
      }
      setWinCards([...randomHand.splice(0, randomHand.length)]);
    }
  };

  useEffect(() => {
    // tur her değiştiğinde lastCard fonksiyonu ile kazanıp kazanmadığını kontrol ediyoruz
    lastCard();
  }, [turn]);

  const randomCards = () => {
    const player1hand = cards.splice(0, 4);
    setRandomplayer1Hand([...player1hand]);
    // desteden 1.oyuncuya 4 kart veriyoruz

    const player2hand = cards.splice(0, 4);
    setRandomplayer2Hand([...player2hand]);
    // desteden 2.oyuncuya 4 kart veriyoruz
    if (cards.length < 1) {
      alert("oyun bitti");
      window.location.reload(); // oyun bittiğinde sayfayı yeniliyoruz
      firstCards(); // oyunu tekrar başlatmak için tekrar ilk kartları dağıtıyoruz ve oyun tekrardan başlıyor
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
