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
		// Directly map the binary code to the allergy list
		return this.allergieList.filter((_, index) => this.code & (1 << index));
	}

	allergicTo(item) {
		// Use a precomputed index for efficiency
		const index = this.allergieList.indexOf(item);
		return index !== -1 && Boolean(this.code & (1 << index));
	}
}

export default Allergies;