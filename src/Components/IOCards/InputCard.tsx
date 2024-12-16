import React, { JSX, useEffect, useRef, useState } from "react";
import "./IOCards.css";
import { RadioDot } from "../RadioDot/RadioDot";
import { Coordinate } from "../../constants";

interface InputCardProps {
  getInput: (value: string | number) => void
  getCoordinates?: (coord: Coordinate) => void
}

const InputCard = (props: InputCardProps): JSX.Element => {

  const { getCoordinates = () => { }, getInput } = props

  const [input, setInput] = useState<string>("2");
  const inputRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    getInput(input)
  }, [input])

  const getInputCoordinate = (coord: Coordinate) => {
    getCoordinates(coord)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setInput(value);
  };

  const borderColor = '#E29A2D'

  return (
    <div className="input-card-wrapper">
      <div
        className="io-card-header"
        style={{ backgroundColor: borderColor }}
      >
        {'Initila Value of x'}
      </div>
      <div
        className="io-card"
        style={{ borderColor }}
      >
        <div style={{ height: 50, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="io-value"
            placeholder="x"
            style={{ width: 60, padding: 0, textAlign: 'start', paddingLeft: 10 }}
          />
          <div
            className="io-divider"
            style={{ backgroundColor: borderColor }}
          />
        </div>
        <RadioDot
          ref={inputRef}
          getCoordinates={getInputCoordinate}
        />
      </div>
    </div>
  );
};

export default InputCard;
