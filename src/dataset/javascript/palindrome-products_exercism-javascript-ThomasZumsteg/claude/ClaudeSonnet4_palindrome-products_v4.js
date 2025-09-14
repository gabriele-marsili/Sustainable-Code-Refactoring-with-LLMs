var Palindromes = function(args) {
	this.maxFactors = args['maxFactor'];
	this.minFactor = args['minFactor'] || 1;
}

Palindromes.prototype.generate = function() {
	if(this.palindromes)
		return;
	this.palindromes = {};
	const maxFactor = this.maxFactors;
	const minFactor = this.minFactor;
	
	for(let i = minFactor; i <= maxFactor; i++) {
		for(let j = i; j <= maxFactor; j++) {
			const product = i * j;
			if(isPalindrome(product)) {
				if(!this.palindromes[product])
					this.palindromes[product] = [];
				this.palindromes[product].push([i,j]);
			}
		}
	}
};

Palindromes.prototype.largest = function() {
	let max = 0;
	for(const key in this.palindromes) {
		const num = +key;
		if(num > max) max = num;
	}
	return {value: max, factors: this.palindromes[max]};
};

Palindromes.prototype.smallest = function() {
	let min = Infinity;
	for(const key in this.palindromes) {
		const num = +key;
		if(num < min) min = num;
	}
	return {value: min, factors: this.palindromes[min]};
};

function isPalindrome(num) {
	let reversed = 0;
	let original = num;
	while(num > 0) {
		reversed = reversed * 10 + num % 10;
		num = Math.floor(num / 10);
	}
	return original === reversed;
}

export default Palindromes;