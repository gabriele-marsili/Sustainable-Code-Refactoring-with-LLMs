/* A class to keep track of students in a school */
var School = function() { this.class = {} };

// The entire school
School.prototype.roster = function() { return structuredClone(this.class) };
// A grade level of the school
School.prototype.grade = function(grade) { return this.class[grade] ? [...this.class[grade]] : [] };

School.prototype.add = function(student, grade) {
	/* Adds students to the school */
	if( this.class[grade] ) {
		this.class[grade].push(student);
		this.class[grade].sort();
	}
	else
		this.class[grade] = [student];
};

export default School;