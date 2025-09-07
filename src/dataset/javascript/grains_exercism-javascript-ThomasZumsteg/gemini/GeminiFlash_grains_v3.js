import BigInt from './big-integer.js';

export default function () {
	const two = BigInt(2);
	const sixtyFour = BigInt(64);

	return {
		square: function (n) {
			const nBigInt = BigInt(n);
			const exponent = nBigInt.prev();
			return two.pow(exponent).toString();
		},
		total: function() {
			return two.pow(sixtyFour).prev().toString();
		},
	}
}