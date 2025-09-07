export class GradeSchool {
	#listing = {};

	roster() {
		const result = {};
		for (const grade in this.#listing) {
			result[grade] = [...this.#listing[grade]];
		}
		return result;
	}

	add(student, grade) {
		if (this.#listing[grade]) {
			this.#listing[grade].push(student);
			this.#listing[grade].sort();
		} else {
			this.#listing[grade] = [student];
		}
	}

	grade(grade) {
		return this.#listing[grade] ? [...this.#listing[grade]] : [];
	}
}