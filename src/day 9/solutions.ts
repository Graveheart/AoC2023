const input = await Bun.file("input.txt").text();

const parseInput = (input: string) => {
	return input.split("\n").map((line) =>
		line
			.split(" ")
			.map((d) => parseInt(d))
			.filter((d) => !Number.isNaN(d)),
	);
};

export const extrapolate = (input: string) => {
	const lines = parseInput(input);
	const nextValuesTotal = lines.reduce((acc, line) => {
		const nextValue = getNextValue(line);
		return acc + nextValue;
	}, 0);
	return nextValuesTotal;
};

export const extrapolateBackwards = (input: string) => {
	const lines = parseInput(input);
	const previousValuesTotal = lines.reduce((acc, line) => {
		const previousValue = getPreviousValue(line);
		return acc + previousValue;
	}, 0);
	return previousValuesTotal;
};

const getNextValue = (line: number[]) => {
	const lineSize = line.length;
	const matrix = Array(lineSize)
		.fill(0)
		.map((_, index) => {
			if (index === 0) {
				return [...line];
			}
			return Array(lineSize - index).fill(9);
		});
	for (let row = 1; row < matrix.length; row++) {
		for (let col = 0; col < matrix[row].length; col++) {
			matrix[row][col] = matrix[row - 1][col + 1] - matrix[row - 1][col];
		}
		if (matrix[row].every((item) => item === 0)) {
			matrix.splice(row + 1, matrix.length - row + 1);
			break;
		}
	}
	for (let row = matrix.length - 1; row >= 0; row--) {
		const lastCol = matrix[row].length - 1;

		const difference = matrix[row + 1]?.[lastCol] ?? 0;
		matrix[row].push(matrix[row][lastCol] + difference);
	}
	return matrix.at(0)?.at(-1);
};

const getPreviousValue = (line: number[]) => {
	const lineSize = line.length;
	const matrix = Array(lineSize)
		.fill(0)
		.map((_, index) => {
			if (index === 0) {
				return [0, ...line];
			}
			return Array(lineSize - index).fill(0);
		});
	for (let row = 1; row < matrix.length; row++) {
		for (let col = 1; col < matrix[row].length; col++) {
			matrix[row][col] = matrix[row - 1][col + 1] - matrix[row - 1][col];
		}
		if (matrix[row].every((item) => item === 0)) {
			matrix.splice(row + 1, matrix.length - row + 1);
			break;
		}
	}
	for (let row = matrix.length - 2; row >= 0; row--) {
		matrix[row][0] = matrix[row][1] - matrix[row + 1][0];
	}
	return matrix.at(0)?.at(0);
};
// 5  10  13  16  21  30  45  68
//   5   3   3   5   9  15  23
//    -2   0   2   4   6   8
//       2   2   2   2   2
//         0   0   0   0
// [-1][0] = 0
// [-2][0] = [-2][1] - [-1][0] = 2
// [-3][0] = [-3][1] - [-2][0] = -2
console.log(extrapolate(input));
console.log(extrapolateBackwards(input));
