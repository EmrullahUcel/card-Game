import CardsData from "./CardsData";

function shuffle(deck) {
  const shuffledDeck = [...deck]; // Orjinal array'in bir kopyasını oluşturuyoruz

  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[randomIndex]] = [
      shuffledDeck[randomIndex],
      shuffledDeck[i],
    ];
  }

  return shuffledDeck;
}

const shuffledCards = shuffle(CardsData);
export default shuffledCards;
