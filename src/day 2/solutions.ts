import "@total-typescript/ts-reset";

const input = await Bun.file("input.txt").text();
const COLORS = ["blue", "red", "green"] as const;
type COLOR = (typeof COLORS)[number];
const MAX_VALUES: Record<COLOR, number> = {
	blue: 14,
	red: 12,
	green: 13,
};

export const getCountsPerLine = (line: string) => {
	const regex = /(\d+)\s(\w+)/g;
	const sets = (line.match(regex) ?? []).map((set) => {
		const [, count, color] = set.match(/(\d+)\s(\w+)/)!;
		return { count: Number(count), color } as { count: number; color: COLOR };
	});
	return sets;
};
export const getPossibleGames = (input: string) => {
	const result = input.split("\n").reduce((acc, line, index) => {
		let possible = true;
		getCountsPerLine(line).forEach(({ count, color }) => {
			if (COLORS.includes(color)) {
				const maxCount = MAX_VALUES[color];
				if (Number(count) > maxCount) {
					possible = false;
				}
			}
		});
		return possible ? acc + index + 1 : acc;
	}, 0);
	return result;
};
export const getGamesPower = (input: string) => {
	const result = input.split("\n").reduce((acc, line) => {
		const maxCountMap = new Map(COLORS.map((color) => [color, 0]));
		getCountsPerLine(line).forEach(({ count, color }) => {
			const maxCount = maxCountMap.get(color)!;
			if (count > maxCount) {
				maxCountMap.set(color, count);
			}
		});
		const total = [...maxCountMap.values()].reduce((total, val) => val * total);
		return acc + total;
	}, 0);
	return result;
};

console.log(getGamesPower(input));
