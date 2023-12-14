const input = await Bun.file("input.txt").text();

export const calibrate = (input: string) => {
	const lines = input.split("\n").map((line) =>
		Array.from(line)
			.map((d) => parseInt(d))
			.filter((d) => !Number.isNaN(d)),
	);

	const result = lines.reduce((acc, line) => {
		return acc + line[0] * 10 + (line.at(-1) ?? 0);
	}, 0);
	return result;
};

const DIGIT_STRINGS = [
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
];

const replaceDigitNames = (s: string) => {
	let newString = s;
	DIGIT_STRINGS.forEach((digit, i) => {
		newString = newString.replaceAll(digit, `${digit}${i + 1}${digit}`);
	});
	return newString;
};

export const calibrateWithLetters = (input: string) => {
	const replacedInput = replaceDigitNames(input);
	return calibrate(replacedInput);
};
console.log(calibrate(input));
console.log(calibrateWithLetters(input));
