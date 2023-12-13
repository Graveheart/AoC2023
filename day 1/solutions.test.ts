import { describe, expect, it } from "bun:test";
import { calibrate, calibrateWithLetters } from "./solutions";

describe("Day 1", () => {
	it("Part One", async () => {
		const input = await Bun.file("test.txt").text();
		const res = calibrate(input);
		expect(res).toEqual(142);
	});

	it("Part Two", async () => {
		const input = await Bun.file("test2.txt").text();
		const res = calibrateWithLetters(input);
		expect(res).toEqual(281);
	});
});
