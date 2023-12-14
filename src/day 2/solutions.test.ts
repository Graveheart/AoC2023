import { describe, expect, it } from "bun:test";
import { getGamesPower, getPossibleGames } from "./solutions";

describe("Day 2", () => {
	it("Part One", async () => {
		const input = await Bun.file("test.txt").text();
		const res = getPossibleGames(input);
		expect(res).toEqual(8);
	});
	it("Part Two", async () => {
		const input = await Bun.file("test.txt").text();
		const res = getGamesPower(input);
		expect(res).toEqual(2286);
	});
});
