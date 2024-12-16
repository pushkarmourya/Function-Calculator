import { JSX } from "react";
import { Coordinate } from "../../constants";
import "./ConnectingLine.css";

/**
 * Props: ̦
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

  if (points.length < 2) return <></>;

  const generateCurvePath = () => {
    let path = `M ${points[0].x} ${points[0].y}`;
    const len = points.length;

    for (let i = 1; i < len - 2; i++) {
      const nextPoint: Coordinate = {
        x: (points[i].x + points[i + 1].x) / 2,
        y: (points[i].y + points[i + 1].y) / 2,
      };
      path += ` Q ${points[i].x} ${points[i].y}, ${nextPoint.x} ${nextPoint.y}`;
    }

    if (len === 2) {
      path += ` l ${points[1].x} ${points[1].y}`;
    } else {
      path += ` Q ${points[len - 2].x} ${points[len - 2].y}, ${points[len - 1].x} ${points[len - 1].y}`;
    }

    return path;
  };

  const renderLine = (): JSX.Element => {
    return (
      <svg className="connecting-line-svg">
        <line
          x1={points[0].x}
          y1={points[0].y}
          x2={points[1].x}
          y2={points[1].y}
          className="connecting-line"
        />
      </svg>
    );
  };

  const renderCurve = (): JSX.Element => {
    return (
      <svg className="connecting-line-svg">
        <path
          d={generateCurvePath()}
          className="connecting-curve"
        />
      </svg>
    );
  };

  const renderPath = (): JSX.Element => {
    if (points.length === 2) {
      return renderLine();
    }
    return renderCurve();
  };

  return <div className="connecting-line-container">{renderPath()}</div>;
};

export { ConnectingLine };
