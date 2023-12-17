import "../utils.ts";
const input = await Bun.file("input.txt").text();

const parseRaces = (input: string) => {
	const lines = input.split("\n");
	const times = lines[0].parseNumbers();
	const distances = lines[1].parseNumbers();
	return { times, distances };
};

export const findWinningSum = (input: string) => {
	const { times, distances } = parseRaces(input);
	const totalSum = times.reduce((sum, raceTime, index) => {
		let wins = 0;
		// start at 1 and finish at raceTime - 1
		for (let speed = 1; speed < raceTime; ++speed) {
			const remainingTime = raceTime - speed;
			const myDistance = speed * remainingTime;
			if (myDistance > distances[index]) {
				++wins;
			}
			// we cannot win any more if our time is getting less
			else if (wins > 0) {
				break;
			}
		}
		return sum * wins;
	}, 1);
	return totalSum;
};

console.log(findWinningSum(input));
