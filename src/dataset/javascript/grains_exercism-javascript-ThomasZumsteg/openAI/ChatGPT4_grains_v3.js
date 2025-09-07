import BigInt from './big-integer.js';

export default function () {
	const two = BigInt(2);
	const totalGrains = two.pow(64).prev().toString();

	return {
		square: (n) => two.pow(n - 1).toString(),
		total: () => totalGrains,
	};
}