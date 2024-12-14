import { JSX, memo, useEffect, useRef, useState } from "react";
import { SixDot } from "../../assets/icons";
import { Coordinate, strings } from "../../constants";
import { evaluateEquation } from "../../utils";
import { getElementCoordinates } from "../../utils/graphUtil";
import "./styles.css";

interface FunctionCardProps {
	name: string
	nextFunction: string
	input: string | number
	getOutput?: (output: string | number) => void
	getCoordinates?: (coords: { inputDot: Coordinate; outputDot: Coordinate }) => void;
}

const RadioDot = memo(({ refProp }: { refProp: React.RefObject<HTMLSpanElement | null> }): JSX.Element => {
	return (
		<span ref={refProp}>
			<span className="radio-circle"></span>
		</span>
	);
});

const CardHeader = memo(({name}: {name: string}): JSX.Element => {
	return <div>
			<div className="function-header">
				<img src={SixDot} className="function-six-dot" />
				<div className="function-header-text">{name}</div>
			</div>
			<label className="function-label" htmlFor="equation">
				{strings.FUNCTION_CARD.EQUATION}
			</label>
	</div>
})

const FunctionCard = (props: FunctionCardProps): JSX.Element => {
	const { name, nextFunction, input, getOutput = () => { }, getCoordinates = () => {} } = props;

	const [equation, setEquation] = useState<string>("");
	const [output, setOutput] = useState<string | number>("");

	const inputDotRef = useRef<HTMLSpanElement>(null);
	const outputDotRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		getOutput(output);
	}, [output])

	useEffect(() => {
		solveEquation();
	}, [input])

	useEffect(() => {
		if (inputDotRef.current && outputDotRef.current) {
			const inputRect: Coordinate = getElementCoordinates(inputDotRef.current);
			const outputRect: Coordinate = getElementCoordinates(outputDotRef.current);

			getCoordinates({
				inputDot: { x: inputRect.x + 12, y: inputRect.y + 15},
				outputDot: { x: outputRect.x + 12, y: outputRect.y + 15},
			});
		}
	}, []);

	const solveEquation = () => {
		try {
			const solution = evaluateEquation(equation, input); // Evaluate the equation
			setOutput(solution);
		} catch (error) {
			setOutput("Invalid equation!");
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEquation(e.target.value);
		solveEquation();
	};

	return (
		<div className="function-card">
			<CardHeader name={name}/>
			<input
				type="text"
				id="equation"
				className="function-input"
				placeholder="Enter equation, e.g., x^2 + 2*x + 1"
				value={equation}
				onChange={handleInputChange}
			/>

			<label className="function-label" htmlFor="next-function">
				{strings.FUNCTION_CARD.NEXT_FUNCTION}
			</label>
			<select id="next-function" className="function-select">
				<option value="" selected>
					{nextFunction}
				</option>
			</select>

			<div className="radio-group">
				<label className="radio-option">
					<RadioDot refProp={inputDotRef}/>
					{strings.FUNCTION_CARD.INPUT}
				</label>
				<label className="radio-option">
					{strings.FUNCTION_CARD.OUTPUT}
					<RadioDot refProp={outputDotRef}/>
				</label>
			</div>
		</div>
	);
};

export default FunctionCard;
