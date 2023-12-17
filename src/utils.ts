declare global {
	interface Array<T> {
		sum(): T;
	}
}

Array.prototype.sum = function () {
	if (this.length === 0) {
		throw new Error("Array is empty");
	}

	const firstItem = this[0];
	if (typeof firstItem === "number") {
		return this.reduce((acc, val) => acc + val, 0);
	}
	if (typeof firstItem === "string") {
		return this.reduce((acc, val) => acc + val, "");
	}
	throw new Error("Unsupported array type");
};

declare global {
	interface String {
		parseNumbers(): number[];
	}
}
const digitsRegexp = /\d+/g;
String.prototype.parseNumbers = function () {
	if (this.length === 0) {
		throw new Error("String is empty");
	}
	return [...this.matchAll(digitsRegexp)].map((match) => Number(match[0]));
};

export {};
