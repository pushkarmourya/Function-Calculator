import { JSX } from "react";
import { Coordinate } from "../../constants";

/**
 * Props: 
 *  Coordinates = Array of points through which the line has to be drawn
 * 
 * Output:
 *  Line (Curved) drawn through given points
 */
interface Props {
  points: Coordinate[]; 
}

const ConnectingLine = (props: Props): JSX.Element => {
  const { points } = props;

  const generateCurvePath = () => {
    let path = `M ${points[0]} ${points[0]}`;

    for(let i=1; i<points.length-1;i++){
      path += ` Q ${points[i].x} ${points[i].y}, ${points[i+1].x} ${points[i+1].y}`;
    };

    return path;
  };

  if (!points.length)
    return <></>

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "#f8f9fa",
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="100%" stopColor="#3bbbdb" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        <path
          d={generateCurvePath()}
          stroke="url(#lineGradient)"
          fill="none"
          strokeWidth="5"
        />
      </svg>
    </div>
  );
};

export { ConnectingLine };
