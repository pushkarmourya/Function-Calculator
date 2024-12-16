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
    <div className="output-card-wrapper">
      <div
        className="io-card-header"
        style={{ backgroundColor: borderColor }}
      >
        {'Final Output y'}
      </div>
      <div
        className="io-card"
        style={{ borderColor }}
      >
        <div style={{ height: 50, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

          <RadioDot
            ref={outputRef}
            getCoordinates={getOutputCoordinate}
          />
          <div
            className="io-divider"
            style={{ backgroundColor: borderColor }}
          />
        </div>
        <span className="output-value" style={{ width: 50, padding: 0, textAlign: 'end', paddingRight: 10 }}>{output}</span>
      </div>
    </div>
  );
});

export { OutputCard };
