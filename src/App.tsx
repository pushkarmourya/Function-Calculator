import { JSX, useCallback, useEffect, useState } from 'react';
import './App.css';
import { ConnectingLine } from './Components/ConnectingLine/ConnectingLine';
import FunctionCard from './Components/FunctionCard/FunctionCard';
import InputCard from './Components/IOCards/InputCard';
import OutputCard from './Components/IOCards/OutputCard';
import { CardData, Coordinate } from './constants';

const App = () => {
  const [input, setInput] = useState<number | string>("")
  const [cardArray, setCardArray] = useState<CardData[]>([
    { name: "Function: 1", nextFunction: "Function: 2", input: 0, output: 0, inputCoordinates: { x: 0, y: 0 }, outputCoordinates: { x: 0, y: 0 } },
    { name: "Function: 2", nextFunction: "Function: 4", input: 0, output: 0, inputCoordinates: { x: 0, y: 0 }, outputCoordinates: { x: 0, y: 0 } },
    { name: "Function: 4", nextFunction: "Function: 5", input: 0, output: 0, inputCoordinates: { x: 0, y: 0 }, outputCoordinates: { x: 0, y: 0 } },
    { name: "Function: 5", nextFunction: "Function: 3", input: 0, output: 0, inputCoordinates: { x: 0, y: 0 }, outputCoordinates: { x: 0, y: 0 } },
    { name: "Function: 3", nextFunction: "-", input: 0, output: 0, inputCoordinates: { x: 0, y: 0 }, outputCoordinates: { x: 0, y: 0 } },
  ]);
  const [inputCoordinate, setInputCoordinate] = useState<Coordinate>({x:0 ,y:0});
  const [outputCoordinate, setOutputCoordinate] = useState<Coordinate>({x:0 ,y:0});


  const lineCoordinates = [
    [inputCoordinate, cardArray[0].inputCoordinates],
    [cardArray[0].outputCoordinates, { x: (cardArray[0].outputCoordinates.x + cardArray[1].outputCoordinates.x) / 2 - 110, y: cardArray[0].outputCoordinates.y + 90 }, cardArray[1].inputCoordinates],
    [cardArray[1].outputCoordinates, { x: 900, y: 390 }, { x: 550, y: 480 }, cardArray[2].inputCoordinates],
    [cardArray[2].outputCoordinates, { x: (cardArray[1].outputCoordinates.x + cardArray[3].outputCoordinates.x) / 2 - 220, y: cardArray[3].outputCoordinates.y + 90 }, cardArray[3].inputCoordinates],
    [cardArray[3].outputCoordinates, { x: cardArray[3].outputCoordinates.x + 80, y: (cardArray[1].outputCoordinates.y + cardArray[3].outputCoordinates.y) / 2 }, cardArray[4].inputCoordinates],
    [cardArray[4].outputCoordinates, outputCoordinate],
  ]

  useEffect(() => {
    setCardArray((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards[0].input = input;
      return updatedCards;
    });
  }, [input]);

  const handleOutputUpdate = (index: number, output: number | string) => {
    setCardArray((prevCards) => {
      const updatedCards = [...prevCards];
      if (index + 1 < updatedCards.length) {
        updatedCards[index + 1].input = output;
      }
      updatedCards[index].output = output;
      return updatedCards;
    });
  };

  const updateCoordinates = (index: number, coords: { inputDot?: Coordinate, outputDot?: Coordinate }) => {
    setCardArray((prevCards) => {
      const updatedCards = [...prevCards];

        updatedCards[index] = {
          ...updatedCards[index],
          inputCoordinates: coords?.inputDot || updatedCards[index].inputCoordinates,
          outputCoordinates: coords?.outputDot || updatedCards[index].outputCoordinates,
        };
        return updatedCards;
    });
  };

  const getFunctionCard = useCallback((index: number): JSX.Element => {
    if (index >= cardArray.length)
      return <></>

    const card: CardData = cardArray[index]
    return <FunctionCard
      key={index}
      name={card.name}
      nextFunction={card.nextFunction}
      input={card.input}
      getOutput={(output) => handleOutputUpdate(index, output)}
      getInputCoordinates={(coords) => updateCoordinates(index, { inputDot: coords })}
      getOutputCoordinates={(coords) => updateCoordinates(index, { outputDot: coords })}
    />
  }, [cardArray])

  return <div className="app-container">
    <div className='card-container'>
      <div className="card-row">
        {getFunctionCard(0)}
        {getFunctionCard(1)}
        {getFunctionCard(4)}
      </div>
    </div>
    <div className='card-container-2'>
      <div className="card-row">
        {getFunctionCard(2)}
        {getFunctionCard(3)}
      </div>
    </div>

    {lineCoordinates.map((lineCoordinate) => {
      return <ConnectingLine
        points={lineCoordinate}
      />
    })}

    <InputCard
      getInput={setInput}
      getCoordinates={setInputCoordinate}
    />
    <OutputCard
      output={cardArray[cardArray.length - 1].output}
      getCoordinates={setOutputCoordinate}
    />
  </div>
}

export default App;
