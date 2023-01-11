import "./Card.css";
import { useState } from "react";
import shirt from "../../images/shirt.png";

const Card = ({ card, handleTurnCard }) => {
  const { image, opened } = card;
  // const [rotate, setRotate] = useState(false);

  const cardStyle = opened ? "card flip" : "card";

  const handleTurn = () => {
    // setRotate(!rotate);
    handleTurnCard(card);
  };

  return (
    <li className={cardStyle} onClick={handleTurn}>
      <img className="card__front" src={image} alt=""></img>
      <img className="card__back" src={shirt} alt=""></img>
    </li>
  );
};

export default Card;
