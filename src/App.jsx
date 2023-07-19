import Player2Board from "./components/Player2Board";
import Player1Board from "./components/Player1Board";
import Board from "./components/Board";
import React, { useState, useEffect } from "react";
import shuffledCards from "./components/Cards/ShuffledCards";
import "./style/App.css";
import "./style/phone.css";

const startDeck = [...shuffledCards]; // başlangıç destesini burda tutuyoruz

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
  //   setDeck([]);
  //   setDeck([...startDeck]);
  //   setBoardHand([]);
  //   setRandomplayer1Hand([]);
  //   setRandomplayer2Hand([]);
  //   setTurn(true);
  //   setTakeCard([]);
  //   setPlayer1WinCards([]);
  //   setPlayer2WinCards([]);
  // };
  // const restartGame = () => {
  //   window.location.reload();
  // };

  const randomCards = () => {
    const player1hand = deck.splice(0, 4);
    setRandomplayer1Hand(player1hand); // Desteden 1. oyuncuya 4 kart verir
    setDeck([...deck]);
    const player2hand = deck.splice(0, 4);
    setRandomplayer2Hand(player2hand); // Desteden 2. oyuncuya 4 kart verir
    setDeck([...deck]);
    setCount(count + 1);
  };
  const isOver = () => {
    if (
      deck.length < 1 &&
      randomplayer1Hand.length < 1 &&
      randomplayer2Hand.length < 1
    ) {
      alert("oyun bitti");
      player1winCards.length > player2winCards.length
        ? alert("Sen kazandın")
        : alert(
            "Yazıklar olsun 30 satır koddan yazılmış bir BOT'a yenildin :D"
          );
      window.location.reload();
    }
  };

  const lastCard = () => {
    // bu if bloğunda kazanma koşullarını belirliyoruz
    if (
      (boardHand.length > 1 &&
        takeCard?.value === boardHand[boardHand.length - 2]?.value) ||
      (boardHand.length > 1 && boardHand[boardHand.length - 1]?.value === "J")
      // oyuncudan gelen kartla yerdeki kartların sonundakiyle eşleşip eşleşmediğini kontrol ediyoruz
    ) {
      if (
        boardHand.length > 1 &&
        boardHand.length < 3 &&
        takeCard?.value === boardHand[0]?.value
        //eğer yerde hiç kart yoksa oyuncudan gelen kartla yerdeki son kartın eşleşip eşleşmediğini kontrol ediyoruz
        //--bu sayede pişti durumuna bakıyoruz
      ) {
        alert("pişti");
        if (!turn) {
          const removedCards = boardHand.splice(0, boardHand.length);
          setPlayer1WinCards([...player1winCards, ...removedCards]);
          setDeck([...deck]);
        } else {
          const removedCards = boardHand.splice(0, boardHand.length);
          setPlayer2WinCards([...player2winCards, ...removedCards]);
          setDeck([...deck]);
        }
      }
      if (!turn) {
        const removedCards = boardHand.splice(0, boardHand.length);
        setPlayer1WinCards([...player1winCards, ...removedCards]);
        setDeck([...deck]);
      } else {
        const removedCards = boardHand.splice(0, boardHand.length);
        setPlayer2WinCards([...player2winCards, ...removedCards]);
        setDeck([...deck]);
      }
    }
  };

  const player1CardHandle = (card) => {
    setBoardHand((prevState) => [...prevState, card]);
    setRandomplayer1Hand((prevHand) =>
      prevHand.filter((c) => c.title !== card.title)
    );
    setTurn(false);
    setTakeCard(card);
  };

  const player2CardHandle = (card) => {
    const boardLastCard = boardHand[boardHand.length - 1];
    const findCard = randomplayer2Hand.find(
      (c) => c?.value === boardLastCard?.value
    );
    if (findCard) {
      setTimeout(() => {
        setBoardHand((prevBoardHand) => [...prevBoardHand, findCard]);
        setRandomplayer2Hand((prevRandomplayer2Hand) =>
          prevRandomplayer2Hand.filter((c) => c?.title !== findCard?.title)
        );
        setTakeCard(findCard);
        setTurn(true);
      }, 750);
    } else {
      setTimeout(() => {
        const randomCardIndex = Math.floor(
          Math.random() * (randomplayer2Hand.length - 1)
        );
        const randomPlayCard = randomplayer2Hand[randomCardIndex];

        setBoardHand((prevBoardHand) => [...prevBoardHand, randomPlayCard]);
        setRandomplayer2Hand((prevRandomplayer2Hand) =>
          prevRandomplayer2Hand.filter(
            (card) => card?.title !== randomPlayCard?.title
          )
        );
        setTakeCard(randomPlayCard);
        setTurn(true);
      }, 750);
    }
  };
  useEffect(() => {}, [turn]);

  useEffect(() => {
    console.log(
      `"player 1 in kazandıkları :",${player1winCards.length},
      "player 2 in kazandıkları :",${player2winCards.length},
      "yerdeki kartlar :",${boardHand.length},
      "player 1 in eli :",${randomplayer1Hand.length},
      "player 2 nin eli :",${randomplayer2Hand.length},
      "destedeki kartlar :",${deck.length}`
    );
    isOver();
    lastCard();
    if (randomplayer1Hand.length < 1 && randomplayer2Hand.length < 1) {
      randomCards(); // Oyuncuların elinde kart kalmadığında kartları tekrar dağıtır
    }
    if (!turn) {
      player2CardHandle();
    }
  }, [turn]);

  return (
    <div className="App">
      <div className="score-board">
        <h4 className="score-board-table">Puanın : {player1winCards.length}</h4>
        <h4 className="score-board-table">
          Rakibin Puanı :{player2winCards.length}{" "}
        </h4>
      </div>
      <Player2Board
        onCardSelected={(card) => player2CardHandle(card)}
        randomplayer2Hand={randomplayer2Hand}
        turn={turn}
        player2winCards={player2winCards}
      />

      {/* <button onClick={restartGame}>Baştan Başla</button> */}
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
