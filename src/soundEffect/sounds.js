import saplak from "./sounds/saplak.mp3";
import cardSound from "./sounds/cardSound.mp3";
import takingCard from "./sounds/takingCards.mp3";
import opponentWin from "./sounds/opponentWin.mp3";

const song = () => {
  new Audio(saplak).play();
};
const playCard = () => {
  new Audio(cardSound).play();
};
const takingCards = () => {
  new Audio(takingCard).play();
};
const opponent = () => {
  new Audio(opponentWin).play;
};

export { takingCards, playCard, song, opponent };
