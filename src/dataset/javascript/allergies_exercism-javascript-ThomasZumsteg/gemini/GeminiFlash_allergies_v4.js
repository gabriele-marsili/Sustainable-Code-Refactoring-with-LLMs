var Allergies = function(code) {
	this.code = code;
	this.allergieList = [
		'eggs',
		'peanuts',
		'shellfish',
		'strawberries',
		'tomatoes' ,
		'chocolate' ,
		'pollen' ,
		'cats',
	];
};

Allergies.prototype.list = function() {
	const allergies = [];
	for (let i = 0; i < this.allergieList.length; i++) {
		if (this.code & (1 << i)) {
			allergies.push(this.allergieList[i]);
		}
	}
	return allergies;
};

Allergies.prototype.allergicTo = function(item) {
	const index = this.allergieList.indexOf(item);
	return index !== -1 && Boolean(this.code & (1 << index));
};

export default Allergies;