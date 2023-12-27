import "../utils.ts";
const input = await Bun.file("input.txt").text();

type Direction = "L" | "R";

const isDirection = (char: string): char is Direction =>
	char === "L" || char === "R";

type Instruction = Record<Direction, string>;
export function parse(input: string) {
	const split = input.split("\n");
	const instructions = split[0]!.split("").filter(isDirection);
	const mapLines = split.slice(2);
	const nodes = new Map<string, Instruction>();
	mapLines.forEach((line) => {
		const [_, node, L, R] = line.match(/(\w+) = \((\w+), (\w+)\)/)!;
		nodes.set(node, { L, R });
	});
	return { instructions, nodes };
}

export function parseMultipleStarts(input: string) {
	const split = input.split("\n");
	const instructions = split[0]!.split("").filter(isDirection);
	const mapLines = split.slice(2);
	const nodes = new Map<string, Instruction>();
	const startingNodes: string[] = [];
	mapLines.forEach((line) => {
		const [_, node, L, R] = line.match(/(\w+) = \((\w+), (\w+)\)/)!;
		nodes.set(node, { L, R });
		if (node.endsWith("A")) {
			startingNodes.push(node);
		}
	});
	return { instructions, nodes, startingNodes };
}

export function findSteps(input: string) {
	const parsedInput = parse(input);
	const { instructions, nodes } = parsedInput;
	let currentNode = "AAA";
	let steps = 0;
	while (true) {
		for (const instruction of instructions) {
			++steps;
			currentNode = nodes.get(currentNode)![instruction];
			if (currentNode === "ZZZ") return steps;
		}
	}
}

export function findMultipleSteps(input: string) {
	const parsedInput = parseMultipleStarts(input);
	const { instructions, nodes, startingNodes } = parsedInput;
	const currentNodes = [...startingNodes];
	const loopsPerNode = startingNodes.map((_, i) => {
		let loops = 0;
		while (true) {
			++loops;
			instructions.forEach((instruction) => {
				currentNodes[i] = nodes.get(currentNodes[i])![instruction];
			});
			if (currentNodes[i].endsWith("Z")) {
				return loops;
			}
		}
	});
	const totalLoops = loopsPerNode.reduce(
		(acc, loopsCount) => acc * loopsCount,
		1,
	);
	const totalSteps = totalLoops * instructions.length;
	return totalSteps;
}
console.log(findSteps(input));
console.log(findMultipleSteps(input));
