export class GradeSchool {
	#listing = {};

	roster() {
		const rosterCopy = {};
		for (const grade in this.#listing) {
			if (this.#listing.hasOwnProperty(grade)) {
				rosterCopy[grade] = [...(this.#listing[grade] || [])];
			}
		}
		return rosterCopy;
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