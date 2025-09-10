/* A robot to that follows simple instructions */
var Robot = function() {}

// Directions the robot can face and associated vectors
var directions = {
    'north': 0,
    'east': 1,
    'south': 2,
    'west': 3
};
var vectors = [[0, 1], [1, 0], [0, -1], [-1, 0]];

Robot.prototype.orient = function(direction) {
	/* Sets the direction of the robot */
	if(!(direction in directions))
		throw "Invalid Robot Bearing";
	this.bearing = direction;
	this.bearingIndex = directions[direction];
};

Robot.prototype.turnRight = function() {
	/* Changes the bearing one step to the right */
	this.bearingIndex = (this.bearingIndex + 1) % 4;
	this.bearing = Object.keys(directions)[this.bearingIndex];
};

Robot.prototype.turnLeft = function() {
	/* Changes the bearing one step to the left */
	this.bearingIndex = (this.bearingIndex + 3) % 4;
	this.bearing = Object.keys(directions)[this.bearingIndex];
};

/* Sets the robots position */
Robot.prototype.at = function(x, y) { this.coordinates = [x,y] };

Robot.prototype.advance = function() {
	/* Move the position one step in the direction the robot is facing */
	const vector = vectors[this.bearingIndex];
	this.coordinates[0] += vector[0];
	this.coordinates[1] += vector[1];
};

// Instructions the robot understands
var instructions = {
	'L': 'turnLeft',
	'R': 'turnRight',
	'A': 'advance',
};

Robot.prototype.instructions = function(instruction_list) {
	/* Make a list of instructions from a string */
	const actions = [];
	for (let i = 0; i < instruction_list.length; i++) {
		const instruction = instruction_list[i];
		actions.push(instructions[instruction]);
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