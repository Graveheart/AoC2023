import { describe, expect, it } from "bun:test";
import { findMultipleSteps, findSteps } from "./solutions";

describe("Day 8", async () => {
	it.skip("Part One test 1", async () => {
		const input = await Bun.file("test.txt").text();
		const res = findSteps(input);
		expect(res).toEqual(2);
	});

	it.skip("Part One test 2", async () => {
		const input = await Bun.file("test2.txt").text();
		const res = findSteps(input);
		expect(res).toEqual(6);
	});

	it("Part Two", async () => {
		const input = await Bun.file("test3.txt").text();
		const res = findMultipleSteps(input);
		expect(res).toEqual(6);
	});
});
