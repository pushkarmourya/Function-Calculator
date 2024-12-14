import { JSX, useState } from 'react';
import './App.css';
import FunctionCard from './Components/FunctionCard/FunctionCard';
import { CardData, Coordinate } from './constants';
import { ConnectingLine } from './Components/ConnectingLine/ConnectingLine';

const App = () => {
  const [cardArray, setCardArray] = useState<CardData[]>([
    { name: "Function: 1", nextFunction: "Function: 2", input: 5, inputCoordinates: { x: 0, y: 0 }, outputCoordinates: { x: 0, y: 0 } },
    { name: "Function: 2", nextFunction: "Function: 3", input: 10, inputCoordinates: { x: 0, y: 0 }, outputCoordinates: { x: 0, y: 0 } },
    { name: "Function: 3", nextFunction: "Function: 4", input: 15, inputCoordinates: { x: 0, y: 0 }, outputCoordinates: { x: 0, y: 0 } },
    { name: "Function: 4", nextFunction: "Function: 5", input: 20, inputCoordinates: { x: 0, y: 0 }, outputCoordinates: { x: 0, y: 0 } },
    { name: "Function: 5", nextFunction: "-", input: 25, inputCoordinates: { x: 0, y: 0 }, outputCoordinates: { x: 0, y: 0 }  },
  ]);

  const updateCoordinates = (index: number, coords: { inputDot: Coordinate, outputDot: Coordinate }) => {
    setCardArray((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards[index] = {
        ...updatedCards[index],
        inputCoordinates: coords.inputDot,
        outputCoordinates: coords.outputDot
      };
      return updatedCards;
    });
  };

  const getFunctionCard = (index: number):JSX.Element => {
    if(index >= cardArray.length)
        return <></>
    const card: CardData = cardArray[index]
    return <FunctionCard
    key={index}
    name={card.name}
    nextFunction={card.nextFunction}
    input={card.input}
    getCoordinates={(coords) => updateCoordinates(index, coords)}
  />
  }

  console.log(cardArray)

  return <div className="app-container">
      <div className="card-row">
        {getFunctionCard(0)}
        {getFunctionCard(1)}
        {getFunctionCard(2)}
      </div>
      <div className="card-row">
        {getFunctionCard(3)}
        {getFunctionCard(4)}
      </div>
    <ConnectingLine
      points={[cardArray[0].outputCoordinates, cardArray[1].inputCoordinates]}
    />
    <ConnectingLine
      points={[cardArray[1].outputCoordinates, cardArray[2].inputCoordinates]}
    />
    <ConnectingLine
    points={[cardArray[2].outputCoordinates, cardArray[3].inputCoordinates]}
  />
    <ConnectingLine
      points={[cardArray[3].outputCoordinates, cardArray[4].inputCoordinates]}
    />
  </div>
}

export default App;
