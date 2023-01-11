import "./Grid.css";
import Card from "../Card/Card";

const Grid = ({ cards, handleTurnCard }) => {
  const cardItem = cards.map((item, index) => {
    return <Card card={item} key={index} handleTurnCard={handleTurnCard} />;
  });

  return <ul className="grid">{cardItem}</ul>;
};

export default Grid;
