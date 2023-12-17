import { describe, expect, it } from "bun:test";
import { findSeedLocations } from "./solutions";

describe("Day 5", async () => {
	const input = await Bun.file("test.txt").text();
	it("Part One", async () => {
		const res = findSeedLocations(input);
		expect(res).toEqual(35);
	});

	// it("Part Two", async () => {
	// 	const res = findSeedRangeLocations(input);
	// 	expect(res).toEqual(46);
	// });
});
