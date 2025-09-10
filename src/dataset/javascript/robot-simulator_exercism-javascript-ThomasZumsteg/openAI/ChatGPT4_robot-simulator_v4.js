var Robot = function() {}

const directions = ['north', 'east', 'south', 'west'];
const vectors = { north: [0, 1], east: [1, 0], south: [0, -1], west: [-1, 0] };
const instructionsMap = { L: 'turnLeft', R: 'turnRight', A: 'advance' };

Robot.prototype.orient = function(direction) {
	if (!vectors[direction]) throw "Invalid Robot Bearing";
	this.bearing = direction;
};

Robot.prototype.turnRight = function() {
	this.bearing = directions[(directions.indexOf(this.bearing) + 1) % 4];
};

Robot.prototype.turnLeft = function() {
	this.bearing = directions[(directions.indexOf(this.bearing) + 3) % 4];
};

Robot.prototype.at = function(x, y) {
	this.coordinates = [x, y];
};

Robot.prototype.advance = function() {
	const [dx, dy] = vectors[this.bearing];
	this.coordinates[0] += dx;
	this.coordinates[1] += dy;
};

Robot.prototype.instructions = function(instructionList) {
	return [...instructionList].map(instruction => instructionsMap[instruction]);
};

Robot.prototype.place = function({ direction, x, y }) {
	this.orient(direction);
	this.at(x, y);
};

Robot.prototype.evaluate = function(instructionList) {
	this.instructions(instructionList).forEach(action => this[action]());
};

export default Robot;