const Player1Board = ({
  randomHand,
  randomCards,
  randomplayer1Hand,
  setRandomHand,
  setRandomplayer1Hand,
}) => {
  const playedCardHandle = (card) => {
    setRandomHand((prevState) => [...prevState, card]);
    setRandomplayer1Hand((prevHand) =>
      prevHand.filter((c) => c.title !== card.title)
    );
  };

  return (
    <div className="Player1Board">
      {randomplayer1Hand.map((card) => {
        return (
          <div
            style={{ color: card.color }}
            key={card.title}
            className="Board-Cards"
            onClick={() => playedCardHandle(card)}
          >
            <span className="card-title-top">{card.value}</span>
            <span className="card-icon">
              <div>{card.icon}</div>
            </span>
            <span className="card-title-bottom">{card.value}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Player1Board;
