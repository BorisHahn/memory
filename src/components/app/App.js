import './App.css';
import { useState, useEffect } from 'react';
import Grid from '../Grid/Grid';
const { array } = require('../../utils/store');

const App = () => {
  const [cards, setCards] = useState([]);
  const [turnCards, setTurnCards] = useState([]);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    setCards([...array]);
  }, []);

  //Генерация новой сетки карточек

  const generateNewGridOfCards = (array) => {
    let newArray = new Array(4);

    const getNewIndex = (min, max) => {
      return Math.floor(Math.random() * (max - min) + min);
    };

    for (let i = 0; i < newArray.length; i++) {
      const rand = getNewIndex(0, array.length);
      newArray[i] = array.splice(rand, 1)[0];
    }
    setCards([...newArray]);
  };

  useEffect(() => {
    if (turnCards.length > 1) {
      checkSimilar();
    }
  }, [turnCards]);

  //Открытие карточек

  const handleTurnCard = (item) => {
    if (turnCards.length >= 1) {
      if (item._id === turnCards[0]._id) {
        return;
      }
    }
    if (turnCards.length >= 2) return;
    const newCards = [...cards];
    const clickedItem = newCards[cards.indexOf(item)];
    clickedItem.opened = !clickedItem.opened;
    setCards(newCards);
    setTurnCards([...turnCards, clickedItem]);
  };

  //Проверка открытых карточек на совпадение

  const checkSimilar = () => {
    if (turnCards[0].name === turnCards[1].name) {
      setTimeout(() => {
        setCounter(counter + 5);
      }, 500);
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
      setTimeout(() => generateNewGridOfCards(newCards), 500);
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
