var Allergies = function(code) {
	this.code = code & 255; // Mask to 8 bits to prevent overflow
	this.allergieList = [
		'eggs',
		'peanuts',
		'shellfish',
		'strawberries',
		'tomatoes',
		'chocolate',
		'pollen',
		'cats'
	];
}

Allergies.prototype.list = function() {
	var result = [];
	var code = this.code;
	var allergies = this.allergieList;
	
	for (var i = 0; i < 8; i++) {
		if (code & (1 << i)) {
			result.push(allergies[i]);
		}
	}
	
	return result;
};

Allergies.prototype.allergicTo = function(item, index) {
	if (typeof index === 'undefined') {
		index = this.allergieList.indexOf(item);
		if (index === -1) return false;
	}
	return Boolean(this.code & (1 << index));
};

export default Allergies;