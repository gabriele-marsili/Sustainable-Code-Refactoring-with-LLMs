export class GradeSchool {
	#listing = {};

	roster() {
		return this.#listing;
	}

	add(student, grade) {
		if (this.#listing[grade]) {
			this.#listing[grade].push(student);
		} else {
			this.#listing[grade] = [student];
		}
	}

	grade(grade) {
		if (!this.#listing[grade]) return [];
		return this.#listing[grade].slice().sort();
	}
}