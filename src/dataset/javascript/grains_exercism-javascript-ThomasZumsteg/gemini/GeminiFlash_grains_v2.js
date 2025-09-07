import BigInt from './big-integer.js';

export default function () {
	/* Counts the number of grains of rice on squares of a chess board */
	return {
		// Grains start at 1 and double every square
		square: function (n) {
            if (n < 1 || n > 64) {
                return "0"; // Or throw an error, depending on desired behavior for invalid input
            }
            if (n === 1) return "1";
            let result = BigInt(1);
            for (let i = 1; i < n; i++) {
                result = result.multiply(2);
            }
            return result.toString();
        },
		total: function() { return BigInt("18446744073709551615").toString() },
	}
}