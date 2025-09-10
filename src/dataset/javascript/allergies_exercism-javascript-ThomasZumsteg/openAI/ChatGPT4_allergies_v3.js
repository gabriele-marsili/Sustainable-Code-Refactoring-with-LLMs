class Allergies {
	constructor(code) {
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
		this.allergieMap = this.allergieList.map((_, index) => Boolean(this.code & (1 << index)));
	}

	list() {
		return this.allergieList.filter((_, index) => this.allergieMap[index]);
	}

	allergicTo(item) {
		const index = this.allergieList.indexOf(item);
		return index !== -1 ? this.allergieMap[index] : false;
	}
}

export default Allergies;