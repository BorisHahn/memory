import './App.css';
import { useState, useEffect } from 'react';
import Grid from '../Grid/Grid';
import border from '../../images/border.png';
const { array } = require('../../utils/store');

const App = () => {
  const [cards, setCards] = useState([]);
  const [turnCards, setTurnCards] = useState([]);
  const [counter, setCounter] = useState(0);
  const [counterComputer, setCounterComputer] = useState(0);
  useEffect(() => {
    setCards([...array]);
  }, []);

  //Функция генерации случайного индекса

  const getNewIndex = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  //Генерация новой сетки карточек

  const generateNewGridOfCards = (array) => {
    let newArray = new Array(12);

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

    setTimeout(() => stepByComputer(), 2000);
  };

  // Ход компьютера

  const stepByComputer = () => {
    const firstRand = getNewIndex(0, cards.length);
    handleTurnCard(cards[firstRand]);
  };

  return (
    <div className="app">
      <div className="header">
        <div className="app__counter-wrapper">
          <div className="app__counter-border">
            <p className="app__counter">{counter}</p>
          </div>
        </div>
        <div className="app__counter-wrapper">
          <div className="app__counter-border">
            <p className="app__counter">{counterComputer}</p>
          </div>
        </div>
      </div>
      <Grid cards={cards} handleTurnCard={handleTurnCard} />
    </div>
  );
};

export default App;
