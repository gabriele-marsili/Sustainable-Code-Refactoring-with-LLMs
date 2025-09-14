var Robot = function() { this.name = getName() }

Robot.prototype.reset = function() {
	/* Give the robot a new name */
	var oldName = this.name;
	namesInUse.delete(oldName);
	this.name = getName();
};

// Keeps track of robot names in use
var namesInUse = new Set();

// Pre-calculate character code ranges
var LETTER_MIN = 65; // 'A'.charCodeAt(0)
var LETTER_MAX = 90; // 'Z'.charCodeAt(0)
var DIGIT_MIN = 48;  // '0'.charCodeAt(0)
var DIGIT_MAX = 57;  // '9'.charCodeAt(0)

function getName() {
	/* Generates a robot name */
	var rand = function(min, max) { return Math.floor(Math.random() * (max - min + 1) + min)};
	
	// Gets name that is not in use
	// Potential for infinite loop if there are lots (676000) of robots
	var name;
	do {
		name = String.fromCharCode(
			rand(LETTER_MIN, LETTER_MAX),
			rand(LETTER_MIN, LETTER_MAX),
			rand(DIGIT_MIN, DIGIT_MAX),
			rand(DIGIT_MIN, DIGIT_MAX),
			rand(DIGIT_MIN, DIGIT_MAX)
		);
	} while( namesInUse.has(name) );

	namesInUse.add(name);
	return name;
}

export default Robot;