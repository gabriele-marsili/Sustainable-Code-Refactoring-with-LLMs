var Palindromes = function(args) {
	this.maxFactors = args['maxFactor'];
	this.minFactor = args['minFactor'] || 1;
}

Palindromes.prototype.generate = function() {
	if(this.palindromes)
		return;
	
	this.palindromes = {};
	this._minValue = Infinity;
	this._maxValue = -Infinity;
	
	for(var i = this.minFactor; i <= this.maxFactors; i++) {
		for(var j = i; j <= this.maxFactors; j++) {
			var product = i * j;
			if(is_palindrome_optimized(product)) {
				if(!(product in this.palindromes))
					this.palindromes[product] = [];
				this.palindromes[product].push([i,j]);
				
				if(product < this._minValue) this._minValue = product;
				if(product > this._maxValue) this._maxValue = product;
			}
		}
	}
};

Palindromes.prototype.largest = function() {
	return {value: this._maxValue, factors: this.palindromes[this._maxValue]};
};

Palindromes.prototype.smallest = function() {
	return {value: this._minValue, factors: this.palindromes[this._minValue]};
};

function is_palindrome_optimized(num) {
	var str = num.toString();
	var len = str.length;
	var half = len >> 1;
	
	for(var i = 0; i < half; i++) {
		if(str[i] !== str[len - 1 - i])
			return false;
	}
	return true;
}

export default Palindromes;