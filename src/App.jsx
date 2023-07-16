import Player2Board from "./components/Player2Board";
import Player1Board from "./components/Player1Board";
import Board from "./components/Board";
import React, { useState, useEffect } from "react";
import shuffledCards from "./components/Cards/ShuffledCards";
import "./App.css";

function App() {
  const [cards, setCards] = useState(shuffledCards); // karıştırılmış desteyi tuttuğumuz state
  const [boardHand, setBoardHand] = useState([]); // yerdeki kartları tuttuğumuz ve güncellediğiniz state
  const [randomplayer1Hand, setRandomplayer1Hand] = useState([]); // 1.oyuncuya dağıtılan kartları tuttuğumuz state
  const [randomplayer2Hand, setRandomplayer2Hand] = useState([]); // 2.oyuncuya dağıtılan kartları tuttuğumuz state
  const [turn, setTurn] = useState(true); // sıranın hangi oyuncuda olduğunu kontrol ettiğimiz state
  const [takeCard, setTakeCard] = useState([]); // oyunculardan gelen kartları tutan state
  const [player1winCards, setPlayer1WinCards] = useState([]);
  const [player2winCards, setPlayer2WinCards] = useState([]);
  const [flipCards, setFlipCards] = useState(true);
  useEffect(() => {
    //sadece oyun 4 tane kartı ortaya koyuyoruz
    firstCards();
    setFlipCards("flip-Cards");
  }, []);
  const firstCards = () => {
    //4 tane kartı ortaya koyuyoruz
    const randomCard = shuffledCards.splice(0, 4);
    setBoardHand(randomCard);
    setCards([...shuffledCards]);
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
          setPlayer1WinCards([...boardHand.splice(0, boardHand.length)]);
        } else {
          setPlayer2WinCards([...boardHand.splice(0, boardHand.length)]);
          console.log("Player2Board'e gidiyor");
        }
      }
      if (!turn) {
        setPlayer1WinCards([...boardHand.splice(0, boardHand.length)]);
      } else {
        setPlayer2WinCards([...boardHand.splice(0, boardHand.length)]);
        console.log("Player2Board'e gidiyor");
      }
    }
  };

  useEffect(() => {
    // tur her değiştiğinde lastCard fonksiyonu ile kazanma koşullarını sağlayıp sağlamadığını kontrol ediyoruz
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
      window.location.reload(); // oyun bittiğinde sayfayı yeniliyoruz ve oyunu yeniden başlatıyoruz
      firstCards(); // oyunu tekrar başlatmak için tekrar ilk kartları dağıtıyoruz ve oyun tekrardan başlatıyoruz
    }
  };
  if (randomplayer1Hand.length < 1 && randomplayer2Hand.length < 1) {
    randomCards(); // eğer oyuncuların elindeki kartlar bitmişse tekrar dağıtılmasını sağlıyoruz
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
