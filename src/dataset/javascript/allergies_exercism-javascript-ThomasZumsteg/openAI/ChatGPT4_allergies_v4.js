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
	}

	list() {
		return this.allergieList.filter((_, index) => this.code & (1 << index));
	}

	allergicTo(item) {
		const index = this.allergieList.indexOf(item);
		return index !== -1 && (this.code & (1 << index)) !== 0;
	}
}

export default Allergies;