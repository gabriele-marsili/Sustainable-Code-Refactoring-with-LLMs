var School = function() { this.class = Object.create(null); };

School.prototype.roster = function() { return this.class; };

School.prototype.grade = function(grade) { return this.class[grade] || []; };

School.prototype.add = function(student, grade) {
	if (this.class[grade]) {
		const students = this.class[grade];
		let insertIndex = 0;
		while (insertIndex < students.length && students[insertIndex] < student) {
			insertIndex++;
		}
		students.splice(insertIndex, 0, student);
	} else {
		this.class[grade] = [student];
	}
};

export default School;