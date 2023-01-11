import "./App.css";
import { useState, useEffect } from "react";
import Grid from "../Grid/Grid";
const { array } = require("../../utils/store");

const App = () => {
  const [cards, setCards] = useState([]);
  const [turnCards, setTurnCards] = useState([]);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    setCards([...array]);
  }, []);

  useEffect(() => {
    if (turnCards.length > 1) {
      checkSimilar();
    }
  }, [turnCards]);

  const handleTurnCard = (item) => {
    if (turnCards.length >= 2) return;
    const newCards = [...cards];
    const clickedItem = newCards[cards.indexOf(item)];
    clickedItem.opened = !clickedItem.opened;
    setCards(newCards);
    setTurnCards([...turnCards, clickedItem]);
  };

  const checkSimilar = () => {
    if (turnCards[0].name === turnCards[1].name) {
      setCounter(counter + 5);
    }
    const newCards = [...cards];
    turnCards.forEach((item) => {
      const itemIndex = cards.indexOf(item);
      newCards[itemIndex] = Object.assign({}, newCards[itemIndex], {
        opened: false,
      });
    });
    setTimeout(() => {
      setCards(newCards);
      setTurnCards([]);
    }, 1000);
  };

  return (
    <div className="app">
      <h1 className="app__counter">Score: {counter}</h1>
      <Grid cards={cards} handleTurnCard={handleTurnCard} />
    </div>
  );
};

export default App;
