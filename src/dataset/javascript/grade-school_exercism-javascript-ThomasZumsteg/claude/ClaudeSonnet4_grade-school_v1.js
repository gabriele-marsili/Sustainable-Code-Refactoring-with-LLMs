/* A class to keep track of students in a school */
var School = function() { this.class = Object.create(null); };

// The entire school
School.prototype.roster = function() { return this.class };
// A grade level of the school
School.prototype.grade = function(grade) { return this.class[grade] || [] };

School.prototype.add = function(student, grade) {
	/* Adds students to the school */
	if( this.class[grade] ) {
		const students = this.class[grade];
		const insertIndex = this._findInsertIndex(students, student);
		students.splice(insertIndex, 0, student);
	}
	else {
		this.class[grade] = [student];
	}
};

School.prototype._findInsertIndex = function(arr, student) {
	let left = 0;
	let right = arr.length;
	
	while (left < right) {
		const mid = (left + right) >>> 1;
		if (arr[mid] < student) {
			left = mid + 1;
		} else {
			right = mid;
		}
	}
	
	return left;
};

export default School;