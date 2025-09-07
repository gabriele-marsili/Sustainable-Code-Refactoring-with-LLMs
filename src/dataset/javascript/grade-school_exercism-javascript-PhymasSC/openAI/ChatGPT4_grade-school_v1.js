export class GradeSchool {
	#listing = {};

	roster() {
		// Return a deep copy to prevent external mutation
		return JSON.parse(JSON.stringify(this.#listing));
	}

	add(student, grade) {
		if (!this.#listing[grade]) {
			this.#listing[grade] = new Set();
		}
		this.#listing[grade].add(student);
	}

	grade(grade) {
		// Return a sorted array of students or an empty array if grade doesn't exist
		return this.#listing[grade] ? Array.from(this.#listing[grade]).sort() : [];
	}
}