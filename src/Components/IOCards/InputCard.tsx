import React, { JSX, useEffect, useRef, useState } from "react";
import { Coordinate, strings } from "../../constants";
import { RadioDot } from "../RadioDot/RadioDot";
import "./IOCards.css";

interface InputCardProps {
  getInput: (value: string | number) => void;
  getCoordinates?: (coord: Coordinate) => void;
}

const InputCard = (props: InputCardProps): JSX.Element => {
  const { getCoordinates = () => {}, getInput } = props;

  const [input, setInput] = useState<string>("2");
  const inputRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    getInput(input);
  }, [input]);

  const getInputCoordinate = (coord: Coordinate) => {
    getCoordinates(coord);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setInput(value);
  };

  return (
    <div className="io-card-wrapper input-card-wrapper">
      <div className="io-card-header input-card-header">{strings.IO_CARD.INITIAL_VALUE}</div>
      <div className="io-card input-card">
        <div className="io-row">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="io-value"
            placeholder="x"
          />
          <div className="input-divider"/>
        </div>
        <RadioDot ref={inputRef} getCoordinates={getInputCoordinate} />
      </div>
    </div>
  );
};

export default InputCard;
