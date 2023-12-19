import { describe, expect, it } from "bun:test";
import { findWinningSum, findWinningWays } from "./solutions";

describe("Day 6", async () => {
	const input = await Bun.file("test.txt").text();
	it("Part One", async () => {
		const res = findWinningSum(input);
		expect(res).toEqual(288);
	});

	it("Part Two", async () => {
		const res = findWinningWays(input);
		expect(res).toEqual(71503);
	});
});
