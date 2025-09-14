var Robot = function() { this.name = getName() }

Robot.prototype.reset = function() {
	var oldName = this.name;
	namesInUse.delete(oldName);
	this.name = getName();
};

var namesInUse = new Set();

var LETTER_A_CODE = 65;
var LETTER_Z_CODE = 90;
var DIGIT_0_CODE = 48;
var DIGIT_9_CODE = 57;

function getName() {
	var name;
	do {
		name = String.fromCharCode(
			Math.floor(Math.random() * 26) + LETTER_A_CODE,
			Math.floor(Math.random() * 26) + LETTER_A_CODE,
			Math.floor(Math.random() * 10) + DIGIT_0_CODE,
			Math.floor(Math.random() * 10) + DIGIT_0_CODE,
			Math.floor(Math.random() * 10) + DIGIT_0_CODE
		);
	} while (namesInUse.has(name));

	namesInUse.add(name);
	return name;
}

export default Robot;