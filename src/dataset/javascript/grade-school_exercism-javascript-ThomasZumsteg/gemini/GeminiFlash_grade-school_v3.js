/* A class to keep track of students in a school */
var School = function() { this.class = {} };

// The entire school
School.prototype.roster = function() {
    const roster = {};
    for (const grade in this.class) {
        if (this.class.hasOwnProperty(grade)) {
            roster[grade] = [...this.class[grade]]; // Create a copy to prevent modification of internal state
        }
    }
    return roster;
};

// A grade level of the school
School.prototype.grade = function(grade) {
    return this.class[grade] ? [...this.class[grade]] : []; // Return a copy to prevent modification of internal state
};

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