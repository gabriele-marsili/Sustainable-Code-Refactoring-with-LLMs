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
	this.allergyMap = {
		'eggs': 1,
		'peanuts': 2,
		'shellfish': 4,
		'strawberries': 8,
		'tomatoes': 16,
		'chocolate': 32,
		'pollen': 64,
		'cats': 128
	};
};

Allergies.prototype.list = function() {
	const allergic = [];
	for (const allergy in this.allergyMap) {
		if (this.allergyMap.hasOwnProperty(allergy) && this.allergicTo(allergy)) {
			allergic.push(allergy);
		}
	}
	return allergic;
};

Allergies.prototype.allergicTo = function(item) {
	return (this.code & this.allergyMap[item]) !== 0;
};

export default Allergies;