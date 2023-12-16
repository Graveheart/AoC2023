import { describe, expect, it } from "bun:test";
import { getCardInstances, getWinningNumbers } from "./solutions";

describe("Day 4", async () => {
	const input = await Bun.file("test.txt").text();
	it("Part One", async () => {
		const res = getWinningNumbers(input);
		expect(res).toEqual(13);
	});

	it("Part Two", async () => {
		const res = getCardInstances(input);
		expect(res).toEqual(30);
	});
});
