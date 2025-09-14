var Palindromes = function(args) {
	this.maxFactors = args['maxFactor'];
	this.minFactor = args['minFactor'] || 1;
}

Palindromes.prototype.generate = function() {
	if(this.palindromes)
		return;
	this.palindromes = {};
	this.minValue = Infinity;
	this.maxValue = -Infinity;
	
	for(var i = this.minFactor; i <= this.maxFactors; i++) {
		for(var j = i; j <= this.maxFactors; j++) {
			var product = i * j;
			if(is_palindrome(product)) {
				if(!(product in this.palindromes))
					this.palindromes[product] = [];
				this.palindromes[product].push([i,j]);
				
				if(product < this.minValue) this.minValue = product;
				if(product > this.maxValue) this.maxValue = product;
			}
		}
	}
};

Palindromes.prototype.largest = function() {
	return {value: this.maxValue, factors: this.palindromes[this.maxValue]};
};

Palindromes.prototype.smallest = function() {
	return {value: this.minValue, factors: this.palindromes[this.minValue]};
};

function is_palindrome(num) {
	var original = num;
	var reversed = 0;
	while(num > 0) {
		reversed = reversed * 10 + num % 10;
		num = Math.floor(num / 10);
	}
	return original === reversed;
}

export default Palindromes;