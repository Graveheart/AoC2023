import "../utils.ts";
const input = await Bun.file("input.txt").text();

const cards = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
const cardRank = new Map(cards.map((card, index) => [card, index + 1]));
