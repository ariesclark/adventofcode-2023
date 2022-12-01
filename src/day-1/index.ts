import { readFile } from "fs/promises";
import path from "path";

void (async () => {
	const input = await readFile(path.resolve(__dirname, "input.txt"), "utf8");
	console.log(input);

	const value = input
		.split("\r\n")
		.map((a) => a.split("\n").reduce((b, c) => b + Number.parseInt(c), 0))
		.sort((a, b) => (a > b ? 1 : -1))
		.reverse();

	// Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?
	console.log("part 1", value[0]);

	// Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?
	console.log(
		"part 2",
		value.slice(0, 3).reduce((a, b) => a + b, 0)
	);
})();
