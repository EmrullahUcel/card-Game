const Board = ({ boardHand }) => {
  return (
    <div className="Board">
      {boardHand.map((card) => {
        return (
          <div
            style={{ color: card.color }}
            key={card.title}
            className="Board-Cards"
          >
            <span className="card-title-top">{card.value}</span>
            <span className="card-icon">{card.icon}</span>
            <span className="card-title-bottom">{card.value}</span>
          </div>
        );
      })}
    </div>
  );
};
export default Board;
