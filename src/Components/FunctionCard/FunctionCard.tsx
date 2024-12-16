import React, { JSX, useEffect, useRef, useState } from "react";
import { SixDot } from "../../assets/icons";
import { Coordinate, strings } from "../../constants";
import { evaluateEquation } from "../../utils";
import { RadioDot } from "../RadioDot/RadioDot";
import "./FunctionCard.css";

interface FunctionCardProps {
  name: string
  nextFunction: string
  input: string | number
  getOutput?: (output: string | number) => void
  getInputCoordinates?: (inputDot: Coordinate) => void;
  getOutputCoordinates?: (outputDot: Coordinate) => void;
}

const { INPUT, INVALID_EQUATION, OUTPUT, EQUATION, NEXT_FUNCTION, PLACEHOLDER } = strings.FUNCTION_CARD

const CardHeader = React.memo(({ name }: { name: string }): JSX.Element => {
  return <div>
    <div className="function-header">
      <img src={SixDot} className="function-six-dot" />
      <div className="function-header-text">{name}</div>
    </div>
    <label className="function-label" htmlFor="equation">
      {EQUATION}
    </label>
  </div>
})

const FunctionCard = (props: FunctionCardProps): JSX.Element => {
  const { name, nextFunction, input, getOutput = () => { }, getInputCoordinates = () => { }, getOutputCoordinates = () => { } } = props;

  const [equation, setEquation] = useState<string>("");
  const [output, setOutput] = useState<string | number>("");

  const inputDotRef = useRef<HTMLSpanElement>(null);
  const outputDotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    getOutput(output);
  }, [output])

  useEffect(() => {
    solveEquation();
  }, [input, equation])

  const solveEquation = () => {
    try {
      const solution = evaluateEquation(equation, input);
      setOutput(solution);
    } catch (error) {
      setOutput(INVALID_EQUATION);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEquation(e.target.value);
  };

  const renderDropDown = () => {
    return <>
      <label className="function-label" htmlFor="next-function">
        {NEXT_FUNCTION}
      </label>
      <select id="next-function" className="function-select" disabled>
        <option value="" selected className="dropdown-option">
          {nextFunction}
        </option>
      </select>
    </>
  }

  return (
    <div className="function-card">
      <CardHeader name={name} />
      <input
        type="text"
        id="equation"
        className="function-input"
        placeholder={PLACEHOLDER}
        value={equation}
        onChange={handleInputChange}
      />
      {renderDropDown()}
      <div className="radio-group">
        <label className="radio-option">
          <RadioDot
            ref={inputDotRef}
            getCoordinates={getInputCoordinates}
          />
          {INPUT}
        </label>
        <label className="radio-option">
          {OUTPUT}
          <RadioDot
            ref={outputDotRef}
            getCoordinates={getOutputCoordinates}
          />
        </label>
      </div>
    </div>
  );
};

export default FunctionCard;
