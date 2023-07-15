const Player1Board = ({
  randomHand,
  randomCards,
  randomplayer1Hand,
  setRandomHand,
  setRandomplayer1Hand,
  setTurn,
  turn,
  setTakeCard,
}) => {
  const playedCardHandle = (card) => {
    setRandomHand((prevState) => [...prevState, card]);
    setRandomplayer1Hand((prevHand) =>
      prevHand.filter((c) => c.title !== card.title)
    );

    setTurn(false);
    setTakeCard(card);
  };

  return (
    <div className="Player1Board">
      {randomplayer1Hand.map((card) => {
        return (
          <button
            style={{ color: card.color }}
            key={card.title}
            className="Board-Cards"
            onClick={() => playedCardHandle(card)}
            disabled={turn ? false : true}
          >
            <span className="card-title-top">{card.value}</span>
            <span className="card-icon">
              <div>{card.icon}</div>
            </span>
            <span className="card-title-bottom">{card.value}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Player1Board;
