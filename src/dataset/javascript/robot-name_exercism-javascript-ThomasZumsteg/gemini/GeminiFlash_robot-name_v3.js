var Robot = function() { this.name = getName() }

Robot.prototype.reset = function() {
	this.name = getName();
};

// Keeps track of robot names in use
var namesInUse = new Set();

function getName() {
	let name;
	const letterRange = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const digitRange = '0123456789';

	const generateName = () => {
		let newName = '';
		newName += letterRange[Math.floor(Math.random() * letterRange.length)];
		newName += letterRange[Math.floor(Math.random() * letterRange.length)];
		newName += digitRange[Math.floor(Math.random() * digitRange.length)];
		newName += digitRange[Math.floor(Math.random() * digitRange.length)];
		newName += digitRange[Math.floor(Math.random() * digitRange.length)];
		return newName;
	};

	do {
		name = generateName();
	} while (namesInUse.has(name));

	namesInUse.add(name);
	return name;
}

export default Robot;