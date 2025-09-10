var Robot = function() { this.name = getName(); };

Robot.prototype.reset = function() {
	namesInUse.delete(this.name);
	this.name = getName();
};

const namesInUse = new Set();
const LETTERS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
const DIGITS = Array.from({ length: 10 }, (_, i) => String.fromCharCode(48 + i));

function getName() {
	let name;
	do {
		name = `${LETTERS[randomIndex(26)]}${LETTERS[randomIndex(26)]}${DIGITS[randomIndex(10)]}${DIGITS[randomIndex(10)]}${DIGITS[randomIndex(10)]}`;
	} while (namesInUse.has(name));
	namesInUse.add(name);
	return name;
}

function randomIndex(max) {
	return Math.floor(Math.random() * max);
}

export default Robot;