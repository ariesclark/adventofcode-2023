import { readFile } from "fs/promises";
import path from "path";

// Paper -> Rock -> Scissors

// A = Rock
// B = Paper
// C = Scissors

// X = Rock
// Y = Paper
// Z = Scissors

const translate = {
	A: "rock",
	B: "paper",
	C: "scissors",
	X: "rock", // lose
	Y: "paper", // draw
	Z: "scissors" // win
} as const;

type Move = typeof translate[keyof typeof translate];

const winMap = {
	rock: "scissors",
	paper: "rock",
	scissors: "paper"
} as const;

const moveScore = {
	rock: 1,
	paper: 2,
	scissors: 3
};

function getRoundScore(opponent: Move, self: Move): number {
	if (self === opponent) return 3 + moveScore[self];
	if (winMap[self] === opponent) return 6 + moveScore[self];
	return moveScore[self];
}

function getRealRoundScore(opponent: Move, outcome: Move): number {
	switch (outcome) {
		case "paper": {
			return getRoundScore(opponent, opponent);
		}
		case "rock": {
			return getRoundScore(opponent, winMap[opponent]);
		}
		case "scissors": {
			return getRoundScore(opponent, winMap[winMap[opponent]]);
		}
	}
}

function getTotalScore(scores: Array<number>) {
	return scores.reduce((a, b) => a + b, 0);
}

void (async () => {
	const input = await readFile(path.resolve(__dirname, "input.txt"), "utf8");
	const totalScore = getTotalScore(
		input.split("\r\n").map((a) => {
			const [b, c] = a.split(" ");
			return getRoundScore(
				translate[b as keyof typeof translate],
				translate[c as keyof typeof translate]
			);
		})
	);

	const totalRealScore = getTotalScore(
		input.split("\r\n").map((a) => {
			const [b, c] = a.split(" ");
			return getRealRoundScore(
				translate[b as keyof typeof translate],
				translate[c as keyof typeof translate]
			);
		})
	);

	// What would your total score be if everything
	// goes exactly according to your strategy guide?
	console.log("part 1", totalScore);

	// Following the Elf's instructions for the second column,
	// what would your total score be if everything goes
	// exactly according to your strategy guide?
	console.log("part 2", totalRealScore);
})();
