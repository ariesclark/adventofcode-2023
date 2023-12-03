/* eslint-disable unicorn/no-unreadable-array-destructuring */
import { readFile } from "node:fs/promises";
import path from "node:path";

function boundaries(value: number, length: number, offset: number) {
	return [
		Array.from(
			{ length: length + 2 },
			(_, index) => value + index - 1 - offset
		),
		[value - 1, value + length],
		Array.from({ length: length + 2 }, (_, index) => value + index - 1 + offset)
	]
		.flat()
		.filter((value) => value >= 0);
}

void (async () => {
	const input = await readFile(path.resolve(__dirname, "input.txt"), "utf8");
	const lineLength = input.split("\n", 1)[0].length + 1;

	const numbers = [...input.matchAll(/\d+/g)].map(
		(value: RegExpMatchArray) =>
			[value.index!, value[0].length, Number.parseInt(value[0])] as const
	);

	const symbols = new Set(
		[...input.matchAll(/[^\d\s.]/g)].map(
			(value: RegExpMatchArray) => value.index
		)
	);

	const a = numbers
		.filter(([index, length]) => {
			return boundaries(index, length, lineLength).reduce(
				(previous, current) => {
					if (previous || symbols.has(current)) return true;
					return false;
				},
				false
			);
		})
		.flatMap(([, , value]) => value)
		.reduce((previous, current) => previous + current, 0);

	console.log({ a });

	const asterisks = new Set(
		[...input.matchAll(/\*./g)].map((value: RegExpMatchArray) => value.index!)
	);

	const c: Record<string, Array<number>> = {};

	for (const [index, length, value] of numbers) {
		for (const current of boundaries(index, length, lineLength)) {
			if (asterisks.has(current)) {
				c[current] ??= [];
				c[current].push(value);
			}
		}
	}

	const b = Object.values(c).reduce(
		(previous, current) =>
			previous +
			(current.length > 1
				? current.reduce((previous, current) => previous * current, 1)
				: 0),
		0
	);

	console.log({ b });
})();
