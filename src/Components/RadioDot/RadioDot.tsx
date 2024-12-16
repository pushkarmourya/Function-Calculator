import { JSX, memo, useEffect } from "react";
import { Coordinate } from "../../constants";
import { getElementCoordinates } from "../../utils/graphUtil";
import "./RadioDot.css"

interface RadioProps {
  ref: React.RefObject<HTMLSpanElement | null>;
  getCoordinates?: (coord: Coordinate) => void;
}

export const RadioDot = memo((props: RadioProps): JSX.Element => {
  const { ref, getCoordinates = () => { } } = props
  useEffect(() => {
    if (ref.current) {
      const inputRect: Coordinate = getElementCoordinates(ref.current);

      getCoordinates({ x: inputRect.x - 6, y: inputRect.y - 5 } as Coordinate);
    }
  }, [ref]);

  return (
    <span ref={ref}>
      <span className="radio-circle"></span>
    </span>
  );
});