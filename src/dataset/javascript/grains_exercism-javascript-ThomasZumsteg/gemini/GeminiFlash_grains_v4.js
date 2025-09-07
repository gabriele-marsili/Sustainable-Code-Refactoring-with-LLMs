import BigInt from './big-integer.js';

export default function () {
	return {
		square: function (n) {
            if (n < 1 || n > 64) {
                return "0";
            }
            return BigInt(1).shiftLeft(n - 1).toString();
        },
		total: function() { return BigInt("18446744073709551615").toString() },
	}
}