class Palindromes {
	constructor(args) {
		this.maxFactors = args['maxFactor'];
		this.minFactor = args['minFactor'] || 1;
		this.palindromes = null;
	}

	generate() {
		if (this.palindromes) return;
		this.palindromes = new Map();

		for (let i = this.minFactor; i <= this.maxFactors; i++) {
			for (let j = i; j <= this.maxFactors; j++) {
				const product = i * j;
				if (isPalindrome(product)) {
					if (!this.palindromes.has(product)) {
						this.palindromes.set(product, []);
					}
					this.palindromes.get(product).push([i, j]);
				}
			}
		}
	}

	largest() {
		if (!this.palindromes) return null;
		const max = Math.max(...this.palindromes.keys());
		return { value: max, factors: this.palindromes.get(max) };
	}

	smallest() {
		if (!this.palindromes) return null;
		const min = Math.min(...this.palindromes.keys());
		return { value: min, factors: this.palindromes.get(min) };
	}
}

function isPalindrome(num) {
	const str = num.toString();
	let left = 0, right = str.length - 1;
	while (left < right) {
		if (str[left++] !== str[right--]) return false;
	}
	return true;
}

export default Palindromes;