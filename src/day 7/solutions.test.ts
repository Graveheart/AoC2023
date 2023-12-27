import { describe, expect, it } from "bun:test";
import { getTotalJokerWinnings, getTotalWinnings } from "./solutions";

describe("Day 7", async () => {
	const input = await Bun.file("test.txt").text();
	it("Part One", async () => {
		const res = getTotalWinnings(input);
		expect(res).toEqual(6440);
	});

	it("Part One test 2", async () => {
		const input = await Bun.file("test2.txt").text();
		const res = getTotalWinnings(input);
		expect(res).toEqual(18075);
	});

	it("Part Two", async () => {
		const input = await Bun.file("test.txt").text();
		const res = getTotalJokerWinnings(input);
		expect(res).toEqual(5905);
	});

	it("Part Two test 2", async () => {
		const input = await Bun.file("test3.txt").text();
		const res = getTotalJokerWinnings(input);
		expect(res).toEqual(399);
	});
});
