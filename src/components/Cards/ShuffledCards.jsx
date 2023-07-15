import CardsData from "./CardsData";

function shuffle(array) {
  const shuffledArray = [...array]; // Orjinal array'in bir kopyasını oluşturuyoruz

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ];
  }

  return shuffledArray;
}

const shuffledCards = shuffle(CardsData);
export default shuffledCards;
