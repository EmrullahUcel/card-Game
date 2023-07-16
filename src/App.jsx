import Player2Board from "./components/Player2Board";
import Player1Board from "./components/Player1Board";
import Board from "./components/Board";
import React, { useState, useEffect } from "react";
import shuffledCards from "./components/Cards/ShuffledCards";
import "./App.css";

function App() {
  const [cards, setCards] = useState(shuffledCards); // Karıştırılmış desteyi tutan state
  const [boardHand, setBoardHand] = useState([]); // Yerdeki kartları tutan ve güncelleyen state
  const [randomplayer1Hand, setRandomplayer1Hand] = useState([]); // 1. oyuncuya dağıtılan kartları tutan state
  const [randomplayer2Hand, setRandomplayer2Hand] = useState([]); // 2. oyuncuya dağıtılan kartları tutan state
  const [turn, setTurn] = useState(true); // Sıranın hangi oyuncuda olduğunu kontrol eden state
  const [takeCard, setTakeCard] = useState([]); // Oyunculardan gelen kartları tutan state
  const [player1winCards, setPlayer1WinCards] = useState([]); // 1. oyuncunun kazandığı kartları tutan state
  const [player2winCards, setPlayer2WinCards] = useState([]); // 2. oyuncunun kazandığı kartları tutan state

  useEffect(() => {
    firstCards(); // İlk kartları dağıtma işlemini gerçekleştirir
  }, []);

  const firstCards = () => {
    const randomCard = cards.splice(0, 4);
    setBoardHand(randomCard); // 4 kartı yerdeki kartlara atar
    setCards([...cards]); // Destede kalan kartları günceller
  };

  const lastCard = () => {
    // bu if bloğunda kazanma koşullarını belirliyoruz
    if (
      (boardHand.length > 1 &&
        takeCard.value === boardHand[boardHand.length - 2].value) ||
      (boardHand.length > 1 && boardHand[boardHand.length - 1].value === "J")
      // oyuncudan gelen kartla yerdeki kartların sonundakiyle eşleşip eşleşmediğini kontrol ediyoruz
    ) {
      if (
        boardHand.length > 1 &&
        boardHand.length < 3 &&
        takeCard.value === boardHand[0].value
        //eğer yerde hiç kart yoksa oyuncudan gelen kartla yerdeki son kartın eşleşip eşleşmediğini kontrol ediyoruz
        //--bu sayede pişti durumuna bakıyoruz
      ) {
        alert("pişti");
        if (!turn) {
          const removedCards = boardHand.splice(0, boardHand.length);
          setPlayer1WinCards([...player1winCards, ...removedCards]);
        } else {
          const removedCards = boardHand.splice(0, boardHand.length);
          setPlayer2WinCards([...player2winCards, ...removedCards]);
        }
      }
      if (!turn) {
        const removedCards = boardHand.splice(0, boardHand.length);
        setPlayer1WinCards([...player1winCards, ...removedCards]);
      } else {
        const removedCards = boardHand.splice(0, boardHand.length);
        setPlayer2WinCards([...player2winCards, ...removedCards]);
      }
    }
  };

  useEffect(() => {
    lastCard(); // Tur değiştikten sonra kazanma koşullarını kontrol eder
  }, [turn]);

  const randomCards = () => {
    const player1hand = cards.splice(0, 4);
    setRandomplayer1Hand(player1hand); // Desteden 1. oyuncuya 4 kart verir

    const player2hand = cards.splice(0, 4);
    setRandomplayer2Hand(player2hand); // Desteden 2. oyuncuya 4 kart verir

    if (cards.length < 1) {
      alert("oyun bitti");
      player1winCards.length > player2winCards.length
        ? alert("1.oyuncu kazandı")
        : alert("2.oyuncu kazandı");
      window.location.reload();
      firstCards();
    }
  };

  if (randomplayer1Hand.length < 1 && randomplayer2Hand.length < 1) {
    randomCards(); // Oyuncuların elinde kart kalmadığında kartları tekrar dağıtır
  }

  return (
    <div className="App">
      <Player2Board
        randomplayer2Hand={randomplayer2Hand}
        setRandomplayer2Hand={setRandomplayer2Hand}
        setBoardHand={setBoardHand}
        turn={turn}
        setTurn={setTurn}
        setTakeCard={setTakeCard}
        player2winCards={player2winCards}
        boardHand={boardHand}
      />
      <Board
        boardHand={boardHand}
        setBoardHand={setBoardHand}
        flipCards={firstCards}
      />
      <Player1Board
        randomplayer1Hand={randomplayer1Hand}
        randomCards={randomCards}
        setBoardHand={setBoardHand}
        setRandomplayer1Hand={setRandomplayer1Hand}
        setTurn={setTurn}
        turn={turn}
        setTakeCard={setTakeCard}
        player1winCards={player1winCards}
      />
    </div>
  );
}

export default App;
