export class GradeSchool {
	#listing = {};

	roster() {
		const copy = {};
		for (const grade in this.#listing) {
			if (this.#listing.hasOwnProperty(grade)) {
				copy[grade] = [...this.#listing[grade]];
			}
		}
		return copy;
	}

	add(student, grade) {
		if (!this.#listing[grade]) {
			this.#listing[grade] = [];
		}
		this.#listing[grade].push(student);
		this.#listing[grade].sort();
	}

	grade(grade) {
		if (!this.#listing[grade]) {
			return [];
		}
		return [...this.#listing[grade]].sort();
	}
}