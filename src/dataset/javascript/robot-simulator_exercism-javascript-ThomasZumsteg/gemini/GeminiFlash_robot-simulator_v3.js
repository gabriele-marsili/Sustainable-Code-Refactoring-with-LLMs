/* A robot to that follows simple instructions */
var Robot = function() {}

// Directions the robot can face and associated vectors
const directions = [ 'north', 'east', 'south', 'west' ];
const vectors = [[0, 1], [1, 0], [0, -1], [-1, 0]];
const directionMap = new Map(directions.map((direction, index) => [direction, index]));

Robot.prototype.orient = function(direction) {
	/* Sets the direction of the robot */
	if(!directionMap.has(direction))
		throw "Invalid Robot Bearing";
	this.bearing = direction;
};

Robot.prototype.turnRight = function() {
	/* Changes the bearing one step to the right */
	const i = directionMap.get(this.bearing);
	this.bearing = directions[(i + 1) % directions.length];
};

Robot.prototype.turnLeft = function() {
	/* Changes the bearing one step to the left */
	const i = directionMap.get(this.bearing);
	this.bearing = directions[(i + directions.length - 1) % directions.length];
};

/* Sets the robots position */
Robot.prototype.at = function(x, y) { this.coordinates = [x,y] };

Robot.prototype.advance = function() {
	/* Move the position one step in the direction the robot is facing */
	const dir = directionMap.get(this.bearing);
	const vector = vectors[dir];
	this.coordinates[0] += vector[0];
	this.coordinates[1] += vector[1];
};

// Instructions the robot understands
const instructions = {
	'L': 'turnLeft',
	'R': 'turnRight',
	'A': 'advance',
};

Robot.prototype.instructions = function(instruction_list) {
	/* Make a list of instructions from a string */
	const instructionArray = instruction_list.split('');
	const actions = new Array(instructionArray.length);
	for (let i = 0; i < instructionArray.length; i++) {
		actions[i] = instructions[instructionArray[i]];
	}
	return actions;
};

Robot.prototype.place = function(args) {
	/* Initilized the direction and location of a robot */
	this.orient(args['direction']);
	this.at(args['x'], args['y']);
};

Robot.prototype.evaluate = function(instruction_list) {
	/* Robot preforms a series of instructions */
	const actions = this.instructions(instruction_list);
	for (let i = 0; i < actions.length; i++) {
		this[actions[i]]();
	}
};

export default Robot;