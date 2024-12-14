import { JSX, useMemo } from "react";
import "./styles.css";
import { SixDot } from "../../assets/icons";
import { strings } from "../../constants";

interface FunctionCardProps {

}

const RadioDot = (): JSX.Element => {
	return <span>
  <span className="radio-circle"></span>
</span>
}

const FunctionCard = (): JSX.Element => {

	return (
		<div className="function-card">
			<div className="function-header">
				<img src={SixDot} className="function-six-dot" />
				<div className="function-header-text">Function: 1</div>
			</div>
			<label className="function-label" htmlFor="equation">
				{strings.FUNCTION_CARD.EQUATION}
			</label>
			<input
				type="text"
				id="equation"
				className="function-input"
				placeholder="x^2"
			/>

			<label className="function-label" htmlFor="next-function">
			{strings.FUNCTION_CARD.NEXT_FUNCTION}
			</label>
			<select id="next-function" className="function-select">
				<option value="" selected>
					Function: 2
				</option>
				
			</select>

			<div className="radio-group">
				<label className="radio-option">
					<RadioDot/>
					{strings.FUNCTION_CARD.INPUT}
				</label>
				<label className="radio-option">
				{strings.FUNCTION_CARD.OUTPUT}
					<RadioDot/>
				</label>
			</div>
		</div>
	);
};

export default FunctionCard;
