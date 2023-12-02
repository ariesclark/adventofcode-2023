import { readFile } from "node:fs/promises";
import path from "node:path";

void (async () => {
	const input = await readFile(path.resolve(__dirname, "input.txt"), "utf8");

	const value = input.split("\n").map((a) =>
		a
			.split(":", 2)[1]
			.split(";")
			.map((c) =>
				c.split(",").reduce(
					(previous, current) => {
						const [...[a]] = current
							.trim()
							.matchAll(/(\d+) (red|blue|green)/g) as unknown as [
							[never, string, "red" | "blue" | "green"]
						];

						const [, amount, color] = [...a];
						previous[color] += Number.parseInt(amount);

						return previous;
					},
					{ red: 0, blue: 0, green: 0 }
				)
			)
	);

	const a = value
		.map((a) =>
			a
				.map((b) => b.red <= 12 && b.green <= 13 && b.blue <= 14)
				.reduce((previous, current) => previous && current)
		)
		.reduce(
			(previous, current, index) => (previous += current ? index + 1 : 0),
			0
		);

	console.log({ a });

	const b = value
		.map((a) => {
			const { red, green, blue } = a.reduce((previous, current) => ({
				red: Math.max(previous.red, current.red),
				green: Math.max(previous.green, current.green),
				blue: Math.max(previous.blue, current.blue)
			}));

			return red * green * blue;
		})
		.reduce((previous, current) => (previous += current), 0);

	console.log({ b });
})();
