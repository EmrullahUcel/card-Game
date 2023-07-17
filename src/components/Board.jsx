const Board = ({ boardHand }) => {
  return (
    <div className="Board">
      {boardHand.map((card) => {
        const cardClassName = `cards ${card.color.toLowerCase()}Shadow`;
        return (
          <div
            id="flipcard"
            style={{ color: card.color }}
            key={card.title}
            className={cardClassName}
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
