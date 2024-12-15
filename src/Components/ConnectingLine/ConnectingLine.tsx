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

  if (points.length < 2)
    return <></>

  console.log({ points })

  const generateCurvePath = () => {
    let path = `M ${points[0].x} ${points[0].y}`;
    const len = points.length

    for (let i = 1; i < len - 2; i++) {
      const nextPoint: Coordinate = { x: (points[i].x + points[i + 1].x) / 2, y: (points[i].y + points[i + 1].y) / 2 };
      path += ` Q ${points[i].x} ${points[i].y}, ${nextPoint.x} ${nextPoint.y}`;
    };

    if (len === 2) {
      path += ` l ${points[1].x} ${points[1].y}`;
    }
    else {
      path += ` Q ${points[len - 2].x} ${points[len - 2].y}, ${points[len - 1].x} ${points[len - 1].y}`;
    }

    console.log({ path })
    return path;
  };

  console.log(generateCurvePath())
  const renderLine = (): JSX.Element => {
    return <svg
      width="100%"
      height="100%"
      style={{
        position: "relative",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 10,
      }}>
      <line
        x1={points[0].x}
        y1={points[0].y}
        x2={points[1].x}
        y2={points[1].y}
        stroke="#0066FF"
        strokeOpacity="0.3"
        strokeWidth="7" />
    </svg>
  }

  const renderCurve = (): JSX.Element => {
    return <svg
      width="100%"
      height="100%"
      style={{
        position: "relative",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <path
        d={generateCurvePath()}
        stroke="#0066FF"
        strokeOpacity="0.3"
        fill="none"
        strokeWidth="7"
      />
    </svg>
  }

  const renderPath = (): JSX.Element => {
    if (points.length === 2) {
      return renderLine();
    }
    return renderCurve();
  }
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100vh",
      }}
    >
      {renderPath()}
    </div>
  );
};

export { ConnectingLine };
