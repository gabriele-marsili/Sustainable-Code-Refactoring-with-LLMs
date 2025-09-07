//
// This is only a SKELETON file for the 'Grade School' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

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
		return [...this.#listing[grade]].sort();
	}
}