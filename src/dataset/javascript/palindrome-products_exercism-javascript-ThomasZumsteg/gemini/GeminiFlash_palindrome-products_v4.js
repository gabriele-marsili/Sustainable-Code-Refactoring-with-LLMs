var Palindromes = function(args) {
	this.maxFactors = args['maxFactor'];
	this.minFactor = args['minFactor'] || 1;
	this.palindromes = {};
};

Palindromes.prototype.generate = function() {
	if (Object.keys(this.palindromes).length > 0) {
		return;
	}

	for (let i = this.minFactor; i <= this.maxFactors; i++) {
		for (let j = i; j <= this.maxFactors; j++) {
			const product = i * j;
			if (is_palindrome(product)) {
				if (!this.palindromes[product]) {
					this.palindromes[product] = [];
				}
				this.palindromes[product].push([i, j]);
			}
		}
	}
};

Palindromes.prototype.largest = function() {
	let largest = -1;
	for (const key in this.palindromes) {
		if (this.palindromes.hasOwnProperty(key)) {
			const numKey = parseInt(key, 10);
			if (numKey > largest) {
				largest = numKey;
			}
		}
	}

	return largest === -1 ? { value: null, factors: [] } : { value: largest, factors: this.palindromes[largest] };
};

Palindromes.prototype.smallest = function() {
	let smallest = Infinity;
	for (const key in this.palindromes) {
		if (this.palindromes.hasOwnProperty(key)) {
			const numKey = parseInt(key, 10);
			if (numKey < smallest) {
				smallest = numKey;
			}
		}
	}

	return smallest === Infinity ? { value: null, factors: [] } : { value: smallest, factors: this.palindromes[smallest] };
};

function is_palindrome(num) {
    const str = String(num);
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