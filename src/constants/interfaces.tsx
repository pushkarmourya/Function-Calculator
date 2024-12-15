export interface Coordinate {
    x: number;
    y: number;
}

export interface CardData {
	name: string;
	nextFunction: string;
	input: string | number;
	output: string | number;
	inputCoordinates: Coordinate;
	outputCoordinates: Coordinate;
}