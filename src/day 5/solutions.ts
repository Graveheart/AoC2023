import "../utils.ts";
const input = await Bun.file("input.txt").text();

const parseAlmanac = (input: string) => {
	const categories = input.split("\n\n");
	const seeds = categories[0].parseNumbers();
	const converters = categories.slice(1).map((d) =>
		d
			.split("\n")
			.slice(1)
			.map((list) => list.parseNumbers())
			.toSorted(),
	);
	return { seeds, converters };
};

const convertSourceToDestination = (
	source: number,
	converters: number[][][],
) => {
	let destination = source;
	for (const map of converters) {
		for (const [destStart, sourceStart, length] of map) {
			if (sourceStart <= destination && sourceStart + length > destination) {
				destination = destStart + (destination - sourceStart);
				break;
			}
		}
	}
	return destination;
};

export const findSeedLocations = (input: string) => {
	const { seeds, converters } = parseAlmanac(input);

	let lowestLocation = Infinity;
	seeds.forEach((seed) => {
		const destination = convertSourceToDestination(seed, converters);
		lowestLocation = Math.min(lowestLocation, destination);
	});
	return lowestLocation;
};

console.log(findSeedLocations(input));
