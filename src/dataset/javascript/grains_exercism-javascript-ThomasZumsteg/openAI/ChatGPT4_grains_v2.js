import BigInt from './big-integer.js';

export default function () {
	/* Counts the number of grains of rice on squares of a chess board */
	const cache = {
		total: BigInt(2).pow(64).prev().toString(),
	};
	return {
		// Grains start at 1 and double every square
		square: (n) => (n > 0 && n <= 64 ? BigInt(1).shiftLeft(n - 1).toString() : "0"),
		total: () => cache.total,
	};
}