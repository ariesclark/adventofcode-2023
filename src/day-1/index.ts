/* eslint-disable unicorn/prefer-module */
/* eslint-disable unicorn/prefer-top-level-await */
import { readFile } from "node:fs/promises";
import path from "node:path";

const words = [
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine"
];

const WordNumberRegex = new RegExp(words.join("|"), "gi");

void (async () => {
	const input = await readFile(path.resolve(__dirname, "input.txt"), "utf8");

	const value = input
		.split("\n")
		.filter(Boolean)
		.map((value) => {
			value = value
				.replaceAll(
					WordNumberRegex,
					(match) =>
						`${(
							words.indexOf(match.toLowerCase()) + 1
						).toString()}${match.slice(-1)}`
				)
				.replaceAll(
					WordNumberRegex,
					(match) =>
						`${(
							words.indexOf(match.toLowerCase()) + 1
						).toString()}${match.slice(-1)}`
				)
				// Remove all non-numeric characters.
				.replaceAll(/\D/g, "");

			const numbers = [...value].map(Number);
			const result = Number.parseInt(`${numbers.at(0)!}${numbers.at(-1)!}`);

			return result;
		});

	const sum = value.reduce(
		(accumulator, currentValue) => accumulator + currentValue
	);

	console.log(sum);
})();
