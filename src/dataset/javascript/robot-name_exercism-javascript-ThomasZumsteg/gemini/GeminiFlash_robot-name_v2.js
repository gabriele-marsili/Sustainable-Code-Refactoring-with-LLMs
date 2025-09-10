const Robot = function() { this.name = getName() }

Robot.prototype.reset = function() {
	this.name = getName();
};

// Keeps track of robot names in use
const namesInUse = new Set();

function getName() {
	/* Generates a robot name */
	let name;
	// Potential for loop if there are lots (676000) of robots
	while (true) {
		name = String.fromCharCode(
			Math.floor(Math.random() * 26) + 65,
			Math.floor(Math.random() * 26) + 65,
			Math.floor(Math.random() * 10) + 48,
			Math.floor(Math.random() * 10) + 48,
			Math.floor(Math.random() * 10) + 48
		);
		if (!namesInUse.has(name)) {
			namesInUse.add(name);
			break;
		}
	}

	return name;
}

export default Robot;