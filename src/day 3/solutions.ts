import "../utils.ts";
const input = await Bun.file("input.txt").text();

const NUMBERS = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
function isNumber(char: string) {
	return NUMBERS.has(char);
}
const NOT_SYMBOLS = new Set([...NUMBERS, "."]);
export function isSymbol(char: string) {
	return !NOT_SYMBOLS.has(char);
}

const isInBounds = (schematic: string[][], row: number, col: number) => {
	if (row < 0) return false;
	if (row >= schematic.length) return false;
	if (col < 0) return false;
	if (col >= schematic[row]!.length) return false;
	return true;
};

const hasAdjacentSymbol = (schematic: string[][], row: number, col: number) => {
	for (let iRow = row - 1; iRow <= row + 1; iRow++) {
		for (let iCol = col - 1; iCol <= col + 1; iCol++) {
			if (!isInBounds(schematic, iRow, iCol)) continue;
			if (isSymbol(schematic[iRow]![iCol]!)) return true;
		}
	}
	return false;
};

export const getPartNumbers = (input: string) => {
	const numbers: number[] = [];
	const schematic: string[][] = input.split("\n").map((line) => line.split(""));
	for (let row = 0; row < schematic.length; row++) {
		let currentNumber = "";
		let isPartNumber = false;

		for (let col = 0; col < schematic[row]!.length; col++) {
			const char = schematic[row]![col]!;
			if (isNumber(char)) {
				currentNumber += char;
				if (hasAdjacentSymbol(schematic, row, col)) {
					isPartNumber = true;
				}
			} else {
				if (isPartNumber) {
					numbers.push(Number(currentNumber));
					isPartNumber = false;
				}
				currentNumber = "";
			}
		}
		if (isPartNumber) numbers.push(Number(currentNumber));
	}

	return numbers.sum();
};

console.log(getPartNumbers(input));
