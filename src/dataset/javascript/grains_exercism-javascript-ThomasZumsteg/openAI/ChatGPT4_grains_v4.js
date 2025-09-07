import BigInt from './big-integer.js';

export default function () {
	const powersOfTwo = Array.from({ length: 64 }, (_, i) => BigInt(2).pow(i));
	const totalGrains = powersOfTwo[63].multiply(2).subtract(1).toString();

	return {
		square: function (n) { return powersOfTwo[n - 1].toString(); },
		total: function () { return totalGrains; },
	};
}