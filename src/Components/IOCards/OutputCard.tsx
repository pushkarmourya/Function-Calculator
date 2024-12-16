import React, { JSX, memo, useRef } from "react";
import "./IOCards.css";
import { Coordinate, strings } from "../../constants";
import { RadioDot } from "../RadioDot/RadioDot";

interface OutputCardProps {
  output: string | number;
  getCoordinates?: (coord: Coordinate) => void;
}

const OutputCard = memo((props: OutputCardProps): JSX.Element => {
  const { getCoordinates = () => {}, output } = props;

  const outputRef = useRef<HTMLSpanElement | null>(null);

  const getOutputCoordinate = (coord: Coordinate) => {
    getCoordinates(coord);
  };

  return (
    <div className="io-card-wrapper output-card-wrapper">
      <div className="io-card-header output-card-header">{strings.IO_CARD.FINAL_VALUE}</div>
      <div className="io-card output-card">
        <div className="io-row">
          <RadioDot ref={outputRef} getCoordinates={getOutputCoordinate} />
          <div className="output-divider"></div>
        </div>
        <span className="io-value output-value">{output}</span>
      </div>
    </div>
  );
});

export default OutputCard;