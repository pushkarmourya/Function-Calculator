import { JSX, memo, useRef } from "react";
import { Coordinate } from "../../constants";
import { RadioDot } from "../RadioDot/RadioDot";
import "./IOCards.css";

interface OutputCardProps {
  output: string | number
  getCoordinates?: (coord: Coordinate) => void
}

const OutputCard = memo((props: OutputCardProps): JSX.Element => {

  const { getCoordinates = () => { }, output } = props

  const outputRef = useRef<HTMLSpanElement | null>(null);

  const getOutputCoordinate = (coord: Coordinate) => {
    getCoordinates(coord)
  }

  const borderColor = '#4CAF79'

  return (
    <div className="io-card-wrapper">
      <div
        className="io-card-header"
        style={{ backgroundColor: borderColor }}
      >
        {'Final Value'}
      </div>

      <div
        className="io-card"
        style={{ borderColor }}
      >
        <RadioDot ref={outputRef}/>
        <div
          className="io-divider"
          style={{ backgroundColor: borderColor }}
        ></div>

        <span className="io-value">{output}</span>
      </div>
    </div>
  );
});

export { OutputCard };
