import { describe, expect, it } from "bun:test";
import { sumGearRatios, sumPartNumbers, sumPartNumbers2 } from "./solutions";

describe("Day 3", async () => {
	const input = await Bun.file("test.txt").text();
	it("Part One", async () => {
		const res = sumPartNumbers(input);
		expect(res).toEqual(4361);
	});

	it("Part One Old", async () => {
		const res = sumPartNumbers2(input);
		expect(res).toEqual(4361);
	});

	it("Part Two", async () => {
		const res = sumGearRatios(input);
		expect(res).toEqual(467835);
	});
});
