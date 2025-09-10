var Allergies = function(code) {
	this.code = code;
	this.allergieList = [
		'eggs',
		'peanuts',
		'shellfish',
		'strawberries',
		'tomatoes',
		'chocolate',
		'pollen',
		'cats',
	];
};

Allergies.prototype.list = function() {
	return this.allergieList.filter((_, index) => this.code & (1 << index));
};

Allergies.prototype.allergicTo = function(item) {
	const index = this.allergieList.indexOf(item);
	return index !== -1 && Boolean(this.code & (1 << index));
};

export default Allergies;