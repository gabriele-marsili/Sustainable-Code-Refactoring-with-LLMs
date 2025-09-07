/* A class to keep track of students in a school */
var School = function() { this.class = {} };

// The entire school
School.prototype.roster = function() { return this.class };
// A grade level of the school
School.prototype.grade = function(grade) { return this.class[grade] || [] };

School.prototype.add = function(student, grade) {
	/* Adds students to the school */
	if( this.class[grade] ) {
		const students = this.class[grade];
		const insertIndex = this.binarySearch(students, student);
		students.splice(insertIndex, 0, student);
	}
	else
		this.class[grade] = [student];
};

School.prototype.binarySearch = function(arr, target) {
	let left = 0;
	let right = arr.length;
	
	while (left < right) {
		const mid = Math.floor((left + right) / 2);
		if (arr[mid] < target) {
			left = mid + 1;
		} else {
			right = mid;
		}
	}
	return left;
};

export default School;