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
var directionsArray = ['north', 'east', 'south', 'west'];

Robot.prototype.orient = function(direction) {
	/* Sets the direction of the robot */
	if(!(direction in directions))
		throw "Invalid Robot Bearing";
	this.bearing = direction;
};

Robot.prototype.turnRight = function() {
	/* Changes the bearing one step to the right */
	var i = directions[this.bearing];
	this.bearing = directionsArray[(i + 1) % 4];
};

Robot.prototype.turnLeft = function() {
	/* Changes the bearing one step to the left */
	var i = directions[this.bearing];
	this.bearing = directionsArray[(i + 3) % 4];
};

/* Sets the robots position */
Robot.prototype.at = function(x, y) { this.coordinates = [x,y] };

Robot.prototype.advance = function() {
	/* Move the position one step in the direction the robot is facing */
	var dir = directions[this.bearing];
	var vector = vectors[dir];
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
	var result = [];
	for (var i = 0; i < instruction_list.length; i++) {
		result.push(instructions[instruction_list[i]]);
	}
	return result;
};

Robot.prototype.place = function(args) {
	/* Initilized the direction and location of a robot */
	this.orient(args['direction']);
	this.at(args['x'], args['y']);
};

Robot.prototype.evaluate = function(instruction_list) {
	/* Robot preforms a series of instructions */
	var actions = this.instructions(instruction_list);
	for (var i = 0; i < actions.length; i++) {
		this[actions[i]]();
	}
};

export default Robot;