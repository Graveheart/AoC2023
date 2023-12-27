import { describe, expect, it } from "bun:test";
import { extrapolate, extrapolateBackwards } from "./solutions";

describe("Day 9", () => {
	it.skip("Part One", async () => {
		const input = await Bun.file("test.txt").text();
		const res = extrapolate(input);
		expect(res).toEqual(114);
	});

	it("Part Two", async () => {
		const input = await Bun.file("test.txt").text();
		const res = extrapolateBackwards(input);
		expect(res).toEqual(2);
	});
});
