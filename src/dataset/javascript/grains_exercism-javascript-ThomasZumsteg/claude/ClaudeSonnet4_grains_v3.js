import BigInt from './big-integer.js';

export default function () {
	const cache = new Map();
	const maxSquare = BigInt(2).pow(64).prev();
	
	return {
		square: function (n) {
			if (cache.has(n)) {
				return cache.get(n);
			}
			const result = BigInt(2).pow(n - 1).toString();
			cache.set(n, result);
			return result;
		},
		total: function() { 
			return maxSquare.toString();
		},
	}
}