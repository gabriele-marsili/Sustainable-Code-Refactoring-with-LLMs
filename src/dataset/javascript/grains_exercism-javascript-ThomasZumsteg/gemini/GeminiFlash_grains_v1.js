import BigInt from './big-integer.js';

export default function () {
	/* Counts the number of grains of rice on squares of a chess board */
	const two = BigInt(2);
	const sixtyFour = BigInt(64);
	const totalGrains = two.pow(sixtyFour).prev().toString();

	return {
		// Grains start at 1 and double every square
		square: function (n) {
			return two.pow(n - 1).toString();
		},
		total: function() {
			return totalGrains;
		},
	}
}