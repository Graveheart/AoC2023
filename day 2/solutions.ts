const input = await Bun.file("input.txt").text();
const COLORS = ["blue", "red", "green"];

const MAX_VALUES: Record<(typeof COLORS)[number], number> = {
	blue: 14,
	red: 12,
	green: 13,
};
export const getPossibleGames = (input: string) => {
	const result = input.split("\n").reduce((acc, line, index) => {
		let possible = true;
		const regex = /(\d+)\s(\w+)/g;
		const sets = line.match(regex);
		// biome-ignore lint/complexity/noForEach: <explanation>
		sets?.forEach((set) => {
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			const [, count, color] = set.match(/(\d+)\s(\w+)/)!;
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

console.log(getPossibleGames(input));
