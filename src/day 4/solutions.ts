import "../utils.ts";
const input = await Bun.file("input.txt").text();

const parseNumbers = (input: string) => {
	const regexp = /\d+/g;
	return [...input.matchAll(regexp)].map((match) => match[0]);
};

const parseScratchcard = (input: string) => {
	const parsedCards = input.split("\n").map((card) => {
		const [winningNumbersString, cardNumbersString] = card
			.split(":")[1]
			.split("|");
		const winningNumbers = new Set(parseNumbers(winningNumbersString));
		const cardNumbers = parseNumbers(cardNumbersString);
		return { winningNumbers, cardNumbers };
	});
	return parsedCards;
};

export const createCardArray = (length: number, startingNumber = 0) =>
	Array.from({ length }, (_, i) => i + 1 + startingNumber);

export const getWinningNumbers = (input: string) => {
	const totalPoints = parseScratchcard(input).reduce(
		(points, { winningNumbers, cardNumbers }) => {
			const matches = cardNumbers.reduce((accMatches, number) => {
				const match = winningNumbers.has(number);
				if (match) {
					return accMatches ? accMatches * 2 : 1;
				}
				return accMatches;
			}, 0);
			return points + matches;
		},
		0,
	);
	return totalPoints;
};

export const getCardInstances = (input: string) => {
	const parsedCards = parseScratchcard(input);
	const cardInstances = createCardArray(parsedCards.length);
	const instancesMap = new Map(
		cardInstances.map((cardNumber) => [cardNumber, 1]),
	);
	parsedCards.forEach(({ winningNumbers, cardNumbers }, cardIndex) => {
		const totalMatches = cardNumbers.reduce((matches, number) => {
			const match = winningNumbers.has(number);

			return match ? matches + 1 : matches;
		}, 0);
		const cardNumber = cardIndex + 1;
		const newCardInstances = createCardArray(totalMatches, cardNumber);
		newCardInstances.forEach((cardToUpdate) => {
			const multiplier = instancesMap.get(cardNumber) ?? 1;
			const prevValue = instancesMap.get(cardToUpdate) ?? 1;
			const newValue = prevValue + multiplier;
			instancesMap.set(cardToUpdate, newValue);
		});
	});
	const allInstances = [...instancesMap.values()];
	return allInstances.sum();
};
console.log(getWinningNumbers(input));
console.log(getCardInstances(input));
