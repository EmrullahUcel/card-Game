import Player2Board from "./components/Player2Board";
import Player1Board from "./components/Player1Board";
import Board from "./components/Board";
import React, { useState, useEffect } from "react";
import shuffledCards from "./components/Cards/ShuffledCards";
import { song, playCard, takingCards } from "./soundEffect/sounds";
import "./style/App.css";
import "./style/phone.css";

function App() {
  const [deck, setDeck] = useState(shuffledCards); // Karıştırılmış desteyi tutan state
  const [boardHand, setBoardHand] = useState([]); // Yerdeki kartları tutan ve güncelleyen state
  const [randomplayer1Hand, setRandomplayer1Hand] = useState([]); // 1. oyuncuya dağıtılan kartları tutan state
  const [randomplayer2Hand, setRandomplayer2Hand] = useState([]); // 2. oyuncuya dağıtılan kartları tutan state
  const [turn, setTurn] = useState(true); // Sıranın hangi oyuncuda olduğunu kontrol eden state
  const [takeCard, setTakeCard] = useState(null); // Oyunculardan gelen kartları tutan state
  const [player1winCards, setPlayer1WinCards] = useState([]); // 1. oyuncunun kazandığı kartları tutan state
  const [player2winCards, setPlayer2WinCards] = useState([]); // 2. oyuncunun kazandığı kartları tutan state
  const [p1Points, setP1Points] = useState(0);
  const [p2Points, setP2Points] = useState(0);
  const [p1Pisti, setp1Pisti] = useState(0);
  const [p2Pisti, setp2Pisti] = useState(0);

  const dealTheCards = () => {
    if (deck.length === 52) {
      const boardCards = deck.splice(0, 4);
      const p1 = deck.splice(0, 4);
      const p2 = deck.splice(0, 4);
      const leftedCards = [...deck];
      setDeck(leftedCards);
      setBoardHand(boardCards);
      setRandomplayer1Hand(p1);
      setRandomplayer2Hand(p2);
    } else if (randomplayer1Hand.length < 1 && randomplayer2Hand.length < 1) {
      const p1 = deck.splice(0, 4);
      const p2 = deck.splice(0, 4);
      setRandomplayer1Hand(p1);
      setRandomplayer2Hand(p2);
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
      if (!turn) {
        const removedCards = boardHand.splice(0, boardHand.length);
        setPlayer1WinCards([...player1winCards, ...removedCards]);
        setDeck([...deck]);
        takingCards();
      } else {
        const removedCards = boardHand.splice(0, boardHand.length);
        setPlayer2WinCards([...player2winCards, ...removedCards]);
        setDeck([...deck]);
        takingCards();
      }
    }
  };
  const pisti = () => {
    if (
      boardHand.length > 1 &&
      boardHand.length < 3 &&
      takeCard?.value === boardHand[0]?.value
      //eğer yerde hiç kart yoksa oyuncudan gelen kartla yerdeki son kartın eşleşip eşleşmediğini kontrol ediyoruz
      //--bu sayede pişti durumuna bakıyoruz
    ) {
      song();
      if (!turn) {
        const removedCards = boardHand.splice(0, boardHand.length);
        setPlayer1WinCards([...player1winCards, ...removedCards]);
        setDeck([...deck]);
        takingCards();
        setp1Pisti(p1Pisti + 10);
      } else {
        const removedCards = boardHand.splice(0, boardHand.length);
        setPlayer2WinCards([...player2winCards, ...removedCards]);
        setDeck([...deck]);
        takingCards();
        setp2Pisti(p2Pisti + 10);
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
    playCard();
  };

  const player2CardHandle = (card) => {
    const boardLastCard = boardHand[boardHand.length - 1];
    const findCard = randomplayer2Hand.find(
      (c) => c?.value === boardLastCard?.value
    );
    const yourJoker = randomplayer2Hand.find((c) => c.value === "J");
    if (findCard) {
      setTimeout(() => {
        setBoardHand((prevBoardHand) => [...prevBoardHand, findCard]);
        setRandomplayer2Hand((prevRandomplayer2Hand) =>
          prevRandomplayer2Hand.filter((c) => c?.title !== findCard?.title)
        );
        setTakeCard(findCard);
        setTurn(true);
        playCard();
      }, 750);
    } else if (yourJoker && boardHand.length > 0 && !findCard) {
      setTimeout(() => {
        setBoardHand((prevBoardHand) => [...prevBoardHand, yourJoker]);
        setRandomplayer2Hand((prevRandomplayer2Hand) =>
          prevRandomplayer2Hand.filter((c) => c.title !== yourJoker.title)
        );
        setTakeCard(yourJoker);
        takingCards();
        setTurn(true);
        playCard();
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
        playCard();
      }, 750);
    }
  };
  const calcP1Points = () => {
    let total = 0;
    for (const card of player1winCards) {
      total = card.amount + total;
    }
    setP1Points(total + p1Pisti);
  };
  const calcP2Points = () => {
    let total2 = 0;
    for (const card of player2winCards) {
      total2 = card.amount + total2;
    }
    setP2Points(total2 + p2Pisti);
  };
  const isOver = () => {
    if (p1Points > p2Points) {
      console.log("p1 kazandı");
      const lastCardsP1 = player1winCards.splice(0, player1winCards.length);
      const lastCardsP2 = player2winCards.splice(0, player2winCards.length);
      const lastCardsBoard = boardHand.splice(0, boardHand.length);
      setDeck([...lastCardsP1, ...lastCardsP2, ...lastCardsBoard]);
    } else {
      console.log("p2 kazandı");
      const lastCardsP1 = player1winCards.splice(0, player1winCards.length);
      const lastCardsP2 = player2winCards.splice(0, player2winCards.length);
      const lastCardsBoard = boardHand.splice(0, boardHand.length);
      setDeck([...lastCardsP1, ...lastCardsP2, ...lastCardsBoard]);
    }
  };

  useEffect(() => {
    if (
      deck.length < 1 &&
      randomplayer1Hand.length < 1 &&
      randomplayer2Hand.length < 1
    ) {
      isOver();
    }
  }, [deck, randomplayer1Hand, randomplayer2Hand]);
  useEffect(() => {
    dealTheCards();
  }, [turn, randomplayer1Hand, randomplayer2Hand, boardHand]);
  useEffect(() => {
    if (!turn) {
      player2CardHandle();
    }
  }, [turn]);

  useEffect(() => {
    calcP1Points();
    calcP2Points();
  }, [p1Pisti, p2Pisti, p1Points, p2Points, turn]);
  useEffect(() => {
    pisti();
    lastCard();
  }, [boardHand]);
  const newGame = () => {
    const CardsP1 = randomplayer1Hand.splice(0, randomplayer1Hand.length);
    const CardsP2 = randomplayer2Hand.splice(0, randomplayer2Hand.length);
    const lastCardsP1 = player1winCards.splice(0, player1winCards.length);
    const lastCardsP2 = player2winCards.splice(0, player2winCards.length);
    const lastCardsBoard = boardHand.splice(0, boardHand.length);
    setDeck([
      ...deck,
      ...lastCardsP1,
      ...lastCardsP2,
      ...CardsP1,
      ...CardsP2,
      ...lastCardsBoard,
    ]);
    setP1Points(0);
    setP2Points(0);
    setTurn(true);
    setp1Pisti(0);
    setp2Pisti(0);
    dealTheCards();
  };

  return (
    <div className="App">
      <div className="score-board">
        <h4 className="score-board-table">Puanın : {p1Points}</h4>
        <h4 className="score-board-table">Rakibin Puanı :{p2Points}</h4>
      </div>
      <Player2Board
        onCardSelected={(card) => player2CardHandle(card)}
        randomplayer2Hand={randomplayer2Hand}
        turn={turn}
        player2winCards={player2winCards}
      />
      <button className="newGame" onClick={newGame}>Yeniden Başlat</button>
      <Board boardHand={boardHand} setBoardHand={setBoardHand} />
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
