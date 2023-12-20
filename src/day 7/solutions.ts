import "../utils.ts";
const input = await Bun.file("input.txt").text();

const cards = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
const cardRank = new Map(cards.map((card, index) => [card, index + 1]));
const possibleHands = ["5", "4", "23", "3", "22", "2", ""];
const handRank = new Map(possibleHands.map((hand, index) => [hand, index + 1]));
const parseHands = (input: string) => {
	const hands = input.split("\n").map((hand, index) => {
		const [cardsString, bid] = hand.split(" ");
		const cards = cardsString.split("");
		const cardRanks = cards.map((card) => cardRank.get(card) ?? card.length);
		const cardCounts = cards.reduce((acc, card) => {
			if (acc.has(card)) {
				acc.set(card, acc.get(card) + 1);
			} else {
				acc.set(card, 1);
			}
			return acc;
		}, new Map());
		let handStrength = "";
		for (const [_, count] of [...cardCounts.entries()].sort(
			(a, b) => a[1] - b[1],
		)) {
			if (count > 1) {
				handStrength += count.toString();
			}
		}
		const handRanking = handRank.get(handStrength) ?? possibleHands.length;
		return {
			handRanking,
			cardRanking: cardRanks,
			cardsString,
			bid: parseInt(bid),
		};
	});
	return hands;
};

const compareHandRanking = (aCardRanking: number[], bCardRanking: number[]) => {
	const difference = aCardRanking.reduce((rankingSum, cardRank, index) => {
		if (rankingSum !== 0) return rankingSum;
		return bCardRanking[index] - cardRank;
	}, 0);
	return difference;
};

export const getTotalWinnings = (input: string) => {
	const handRankings = parseHands(input).sort((a, b) => {
		if (a.handRanking === b.handRanking)
			return compareHandRanking(a.cardRanking, b.cardRanking);
		return b.handRanking - a.handRanking;
	});
	return handRankings.reduce((winningsSum, hand, index) => {
		const handWinning = hand.bid * (index + 1);
		return winningsSum + handWinning;
	}, 0);
};

console.log(getTotalWinnings(input));
