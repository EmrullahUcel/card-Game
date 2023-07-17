import Player2Board from "./components/Player2Board";
import Player1Board from "./components/Player1Board";
import Board from "./components/Board";
import React, { useState, useEffect } from "react";
import shuffledCards from "./components/Cards/ShuffledCards";
import "./style/App.css";
const startDeck = [...shuffledCards];

function App() {
  const [deck, setDeck] = useState(shuffledCards); // Karıştırılmış desteyi tutan state
  const [boardHand, setBoardHand] = useState([]); // Yerdeki kartları tutan ve güncelleyen state
  const [randomplayer1Hand, setRandomplayer1Hand] = useState([]); // 1. oyuncuya dağıtılan kartları tutan state
  const [randomplayer2Hand, setRandomplayer2Hand] = useState([]); // 2. oyuncuya dağıtılan kartları tutan state
  const [turn, setTurn] = useState(true); // Sıranın hangi oyuncuda olduğunu kontrol eden state
  const [takeCard, setTakeCard] = useState([]); // Oyunculardan gelen kartları tutan state
  const [player1winCards, setPlayer1WinCards] = useState([]); // 1. oyuncunun kazandığı kartları tutan state
  const [player2winCards, setPlayer2WinCards] = useState([]); // 2. oyuncunun kazandığı kartları tutan state
  const [count, setCount] = useState(0);

  const firstCards = () => {
    const randomCard = deck.splice(0, 4);
    setBoardHand(randomCard); // 4 kartı yerdeki kartlara atar
    setDeck([...deck]); // Destede kalan kartları günceller
  };
  useEffect(() => {
    firstCards(); // İlk kartları dağıtma işlemini gerçekleştirir
  }, []);
  // const restartGame = () => {
  //   setDeck([...startDeck]);
  //   setBoardHand([]);
  //   setRandomplayer1Hand([]);
  //   setRandomplayer2Hand([]);
  //   setTurn(true);
  //   setTakeCard([]);
  //   setPlayer1WinCards([]);
  //   setPlayer2WinCards([]);
  //   setCount(0);
  // };
  const player1CardHandle = (card) => {
    setBoardHand((prevState) => [...prevState, card]);
    setRandomplayer1Hand((prevHand) =>
      prevHand.filter((c) => c.title !== card.title)
    );
    setTurn(false);
    setTakeCard(card);
  };
  const player2CardHandle = (card) => {
    setBoardHand((prevState) => [...prevState, card]);
    setRandomplayer2Hand((prevHand) =>
      prevHand.filter((c) => c.title !== card.title)
    );
    setTurn(true);
    setTakeCard(card);
  };

  const randomCards = () => {
    const player1hand = deck.splice(0, 4);
    setRandomplayer1Hand(player1hand); // Desteden 1. oyuncuya 4 kart verir
    const player2hand = deck.splice(0, 4);
    setRandomplayer2Hand(player2hand); // Desteden 2. oyuncuya 4 kart verir
    setCount(count + 1);
  };
  if (randomplayer1Hand.length < 1 && randomplayer2Hand.length < 1) {
    randomCards(); // Oyuncuların elinde kart kalmadığında kartları tekrar dağıtır
  }

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
  lastCard();

  useEffect(() => {
    console.log(randomplayer1Hand, randomplayer2Hand, deck);
    if (
      randomplayer1Hand.length < 1 &&
      randomplayer2Hand.length < 1 &&
      deck.length < 1
    ) {
      setDeck([...startDeck]);
      setBoardHand([]);
      setRandomplayer1Hand([]);
      setRandomplayer2Hand([]);
      setTurn(true);
      setTakeCard([]);
      setPlayer1WinCards([]);
      setPlayer2WinCards([]);
      setCount(0);
    }
  }, [turn]);

  return (
    <div className="App">
      <Player2Board
        onCardSelected={(card) => player2CardHandle(card)}
        randomplayer2Hand={randomplayer1Hand}
        turn={turn}
        player2winCards={player2winCards}
      />
      <p>{count}.Tur</p>
      <Board
        boardHand={boardHand}
        setBoardHand={setBoardHand}
        flipCards={firstCards}
      />
      <Player1Board
        onCardSelected={(card) => player1CardHandle(card)}
        randomplayer1Hand={randomplayer1Hand}
        turn={turn}
        player1winCards={player1winCards}
      />
    </div>
  );
}

export default App;
