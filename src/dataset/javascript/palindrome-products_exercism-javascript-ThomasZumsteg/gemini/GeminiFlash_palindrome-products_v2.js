var Palindromes = function(args) {
	/* Pairs of numbers that when multipied are palindromes */
	this.maxFactors = args.maxFactor;
	this.minFactor = args.minFactor || 1;
	this.palindromes = null;
};

Palindromes.prototype.generate = function() {
	/* Finds all palindrome products in a range */
	if (this.palindromes) {
		return;
	}

	this.palindromes = {};
	let minPalindrome = Infinity;
	let maxPalindrome = -Infinity;

	for (let i = this.minFactor; i <= this.maxFactors; i++) {
		for (let j = i; j <= this.maxFactors; j++) {
			const product = i * j;
			if (isPalindrome(product)) {
				if (!this.palindromes[product]) {
					this.palindromes[product] = [];
				}
				this.palindromes[product].push([i, j]);
				minPalindrome = Math.min(minPalindrome, product);
				maxPalindrome = Math.max(maxPalindrome, product);
			}
		}
	}

	this.minPalindrome = minPalindrome === Infinity ? undefined : minPalindrome;
	this.maxPalindrome = maxPalindrome === -Infinity ? undefined : maxPalindrome;
};

Palindromes.prototype.largest = function() {
	/* The largest product generated */
	if (!this.palindromes) {
		return undefined;
	}

	if (this.maxPalindrome === undefined) {
		return undefined;
	}

	return { value: this.maxPalindrome, factors: this.palindromes[this.maxPalindrome] };
};

Palindromes.prototype.smallest = function() {
	/* The smallest product generated */
	if (!this.palindromes) {
		return undefined;
	}

	if (this.minPalindrome === undefined) {
		return undefined;
	}

	return { value: this.minPalindrome, factors: this.palindromes[this.minPalindrome] };
};

function isPalindrome(num) {
	const str = num.toString();
	let left = 0;
	let right = str.length - 1;

	while (left < right) {
		if (str[left] !== str[right]) {
			return false;
		}
		left++;
		right--;
	}
	return true;
}

export default Palindromes;