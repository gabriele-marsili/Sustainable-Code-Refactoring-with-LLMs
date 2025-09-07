import BigInt from './big-integer.js';

export default function () {
	const precomputedTotal = BigInt(2).pow(64).prev().toString();
	return {
		square: function (n) { return (1n << BigInt(n - 1)).toString(); },
		total: function () { return precomputedTotal; },
	};
}