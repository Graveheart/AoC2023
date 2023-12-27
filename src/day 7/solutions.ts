import "../utils.ts";
const input = await Bun.file("input.txt").text();

const cards = [
	"A",
	"K",
	"Q",
	"J",
	"T",
	"9",
	"8",
	"7",
	"6",
	"5",
	"4",
	"3",
	"2",
] as const;
type Card = (typeof cards)[number];
const isCard = (card: string): card is Card => cards.includes(card);
const cardRank = new Map(cards.map((card, index) => [card, index + 1]));
const possibleHands = ["5", "4", "32", "3", "22", "2", ""];
const getCardCounts = (handCards: Card[]) => {
	const cardCounts = handCards.reduce((acc, card) => {
		if (acc.has(card)) {
			acc.set(card, acc.get(card)! + 1);
		} else {
			acc.set(card, 1);
		}
		return acc;
	}, new Map<Card, number>());
	const sortedCardCounts = Object.fromEntries([
		...cardCounts.entries(),
	]) as Record<Card, number>;
	return sortedCardCounts;
};
const handRank = new Map(possibleHands.map((hand, index) => [hand, index + 1]));
const parseHands = (input: string) => {
	const hands = input.split("\n").map((hand) => {
		const [cardsString, bid] = hand.split(" ");
		const handCards: Card[] = cardsString.split("").filter(isCard);
		const cardRanks = handCards.map(
			(card) => cardRank.get(card) ?? card.length,
		);
		let handStrength = "";
		const cardCounts = getCardCounts(handCards);
		const sortedCardCounts = Object.entries(cardCounts).toSorted(
			(a, b) => b[1] - a[1],
		) as [Card, number][];

		for (const [_, count] of sortedCardCounts) {
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

const parseJokerHands = (input: string) => {
	const hands = input.split("\n").map((hand) => {
		const [cardsString, bid] = hand.split(" ");
		const handCards: Card[] = cardsString.split("").filter(isCard);
		const cardRanks = handCards.map((card) =>
			card === "J" ? cardRank.size + 1 : cardRank.get(card) ?? card.length,
		);
		console.log(cardRanks);
		let handStrength = "";
		const cardCounts = getCardCounts(handCards);
		const jokerCounts = cardCounts.J;
		const cardCountsWithJoker = { ...cardCounts };
		const sortedCardCounts = Object.entries(cardCounts).toSorted(
			(a, b) => b[1] - a[1],
		) as [Card, number][];
		if (jokerCounts && sortedCardCounts.length) {
			let [highestCard, count] = sortedCardCounts.at(0) as [Card, number];
			if (highestCard === "J") {
				const newHighestCardCount = sortedCardCounts.at(1);
				if (newHighestCardCount) {
					highestCard = newHighestCardCount.at(0) as Card;
					count = newHighestCardCount.at(1) as number;
				}
			}
			cardCountsWithJoker.J = 0;
			cardCountsWithJoker[highestCard] = count + jokerCounts;
		}
		const sortedWithJokerCounts = Object.entries(cardCountsWithJoker).toSorted(
			(a, b) => b[1] - a[1],
		) as [Card, number][];
		console.log(sortedWithJokerCounts);
		for (const [_, count] of sortedWithJokerCounts) {
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
	const handRankings = parseHands(input).toSorted((a, b) => {
		if (a.handRanking === b.handRanking)
			return compareHandRanking(a.cardRanking, b.cardRanking);
		return b.handRanking - a.handRanking;
	});
	return handRankings.reduce((winningsSum, hand, index) => {
		const handWinning = hand.bid * (index + 1);
		return winningsSum + handWinning;
	}, 0);
};

export const getTotalJokerWinnings = (input: string) => {
	const handRankings = parseJokerHands(input).toSorted((a, b) => {
		if (a.handRanking === b.handRanking)
			return compareHandRanking(a.cardRanking, b.cardRanking);
		return b.handRanking - a.handRanking;
	});
	console.log(handRankings);
	return handRankings.reduce((winningsSum, hand, index) => {
		const handWinning = hand.bid * (index + 1);
		return winningsSum + handWinning;
	}, 0);
};

console.log(getTotalJokerWinnings(input));
