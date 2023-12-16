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

export function isGearSymbol(char: string) {
	return char === "*";
}

const isInBounds = (schematic: string[][], row: number, col: number) => {
	if (row < 0) return false;
	if (row >= schematic.length) return false;
	if (col < 0) return false;
	if (col >= schematic[row]!.length) return false;
	return true;
};

const hasAdjacentSymbol = (
	schematic: string[][],
	row: number,
	col: number,
	check: (char: string) => boolean,
) => {
	for (let iRow = row - 1; iRow <= row + 1; iRow++) {
		for (let iCol = col - 1; iCol <= col + 1; iCol++) {
			if (!isInBounds(schematic, iRow, iCol)) continue;
			if (check(schematic[iRow]![iCol]!)) return true;
		}
	}
	return false;
};

const getAdjacentGearSymbol = (
	schematic: string[][],
	row: number,
	col: number,
) => {
	for (let iRow = row - 1; iRow <= row + 1; iRow++) {
		for (let iCol = col - 1; iCol <= col + 1; iCol++) {
			if (!isInBounds(schematic, iRow, iCol)) continue;
			if (isGearSymbol(schematic[iRow]![iCol]!))
				return { path: `${iRow}.${iCol}` };
		}
	}
	return undefined;
};

// Optimized solution
export const getPartNumbers = (
	input: string,
	check: (char: string) => boolean,
) => {
	const partNumbers: number[] = [];
	const rows: string[] = input.split("\n");
	const schematic = rows.map((row) => row.split(""));
	rows.forEach((row, rowIndex) => {
		const regexp = /\d+/g;
		const matches = [...row.matchAll(regexp)];
		matches.forEach((match) => {
			const currentNumber = match[0];
			if (match.index !== undefined) {
				for (
					let colIndex = match.index;
					colIndex < match.index + currentNumber.length;
					colIndex++
				) {
					if (hasAdjacentSymbol(schematic, rowIndex, colIndex, check)) {
						partNumbers.push(Number(currentNumber));
						break;
					}
				}
			}
		});
	});
	return partNumbers;
};

export const sumPartNumbers = (input: string) => {
	const partNumbers = getPartNumbers(input, isSymbol);
	return partNumbers.sum();
};

export const sumPartNumbers2 = (input: string) => {
	const numbers: number[] = [];
	const schematic: string[][] = input.split("\n").map((line) => line.split(""));
	for (let row = 0; row < schematic.length; row++) {
		let currentNumber = "";
		let isPartNumber = false;

		for (let col = 0; col < schematic[row]!.length; col++) {
			const char = schematic[row]![col]!;
			if (isNumber(char)) {
				currentNumber += char;
				if (hasAdjacentSymbol(schematic, row, col, isSymbol)) {
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

export const sumGearRatios = (input: string) => {
	const partNumbersRecord: Map<string, number> = new Map();
	const rows: string[] = input.split("\n");
	const schematic = rows.map((row) => row.split(""));
	let currentGearRatio = 0;
	rows.forEach((row, rowIndex) => {
		const regexp = /\d+/g;
		const matches = [...row.matchAll(regexp)];
		matches.forEach((match) => {
			const currentNumber = match[0];
			if (match.index !== undefined) {
				for (
					let colIndex = match.index;
					colIndex < match.index + currentNumber.length;
					colIndex++
				) {
					const gearSymbol = getAdjacentGearSymbol(
						schematic,
						rowIndex,
						colIndex,
					);
					if (gearSymbol) {
						const gearPath = gearSymbol.path;
						const prevGearValue = partNumbersRecord.get(gearPath);
						if (prevGearValue) {
							currentGearRatio += prevGearValue * Number(currentNumber);
							partNumbersRecord.delete(gearPath);
						}
						partNumbersRecord.set(gearPath, Number(currentNumber));
						break;
					}
				}
			}
		});
	});
	return currentGearRatio;
};
console.log(sumPartNumbers(input));
console.log(sumGearRatios(input));
