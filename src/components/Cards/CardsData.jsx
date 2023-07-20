import {
  BsSuitDiamond,
  BsSuitSpade,
  BsSuitHeart,
  BsSuitClub,
} from "react-icons/bs";

const suits = [
  { name: "heart", color: "red", icon: <BsSuitHeart /> },
  { name: "spades", color: "deepskyblue", icon: <BsSuitSpade /> },
  { name: "diamond", color: "red", icon: <BsSuitDiamond /> },
  { name: "club", color: "deepskyblue", icon: <BsSuitClub /> },
];

const CardsData = [];
const values = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

suits.forEach((suit) => {
  for (let i = 1; i <= 13; i++) {
    let amount = 0;
    if (
      (suit.name === "diamond" && values[i - 1] === "10") ||
      (suit.name === "heart" && values[i - 1] === "10")
    ) {
      amount = 3;
    }
    if (values[i - 1] === "1" || values[i - 1] === "J") {
      amount = 4;
    }
    if (
      (suit.name === "club" && values[i - 1] === "2") ||
      (suit.name === "heart" && values[i - 1] === "2")
    ) {
      amount = 2;
    }
    CardsData.push({
      id: CardsData.length + 1,
      title: `${suit.name}${i}`,
      value: i === 1 ? "A" : values[i - 1],
      color: suit.color,
      icon: suit.icon,
      amount: amount,
    });
  }
});
console.log(CardsData);
export default CardsData;
