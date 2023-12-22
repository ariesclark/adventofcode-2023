import { readFile } from "node:fs/promises";
import path from "node:path";

void (async () => {
	const input = await readFile(path.resolve(__dirname, "input.txt"), "utf8");

	const a = input
		.split("\n")
		.map((line) => {
			const [, _winning, _current] = [
				...line.matchAll(/Card\s+\d+:(.+)\|(.+)/gm)!
			][0];

			const winning = new Set(
				_winning
					.trim()
					.split(/\s+/)
					.map((a) => Number.parseInt(a, 10))
			);

			const current = _current
				.trim()
				.split(/\s+/)
				.map((a) => Number.parseInt(a, 10));

			const won = current.filter((a) => winning.has(a));
			const score = won.length > 0 ? Math.pow(2, won.length - 1) : 0;

			return score;
		})
		.reduce((a, b) => a + b, 0);

	console.log({ a });

	const foo: Array<number> = [];
	const b = input.split("\n").map((line) => {
		const [, _winning, _current] = [
			...line.matchAll(/Card\s+\d+:(.+)\|(.+)/gm)!
		][0];

		const winning = new Set(
			_winning
				.trim()
				.split(/\s+/)
				.map((a) => Number.parseInt(a, 10))
		);

		const current = _current
			.trim()
			.split(/\s+/)
			.map((a) => Number.parseInt(a, 10));

		return current.filter((a) => winning.has(a)).length;
	});

	const c = [...b]
		.reverse()
		.map((a) => {
			const n = foo.slice(foo.length - a).reduce((a, b) => a + b, 0) + 1;
			foo.push(n);

			return n;
		})
		.reduce((a, b) => a + b, 0);

	console.log({ c });
})();
