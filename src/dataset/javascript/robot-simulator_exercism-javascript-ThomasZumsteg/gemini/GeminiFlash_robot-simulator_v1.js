/* A robot to that follows simple instructions */
var Robot = function() {
    this.bearingIndex = 0; // Initialize bearingIndex
}

// Directions the robot can face and associated vectors
var directions = [ 'north', 'east', 'south', 'west' ];
var vectors = [[0, 1], [1, 0], [0, -1], [-1, 0]];

Robot.prototype.orient = function(direction) {
	/* Sets the direction of the robot */
	var index = directions.indexOf(direction);
	if(index == -1)
		throw "Invalid Robot Bearing";
	this.bearingIndex = index;
};

Robot.prototype.turnRight = function() {
	/* Changes the bearing one step to the right */
	this.bearingIndex = (this.bearingIndex + 1) % directions.length;
};

Robot.prototype.turnLeft = function() {
	/* Changes the bearing one step to the left */
	this.bearingIndex = (this.bearingIndex + directions.length - 1) % directions.length;
};

/* Sets the robots position */
Robot.prototype.at = function(x, y) { this.coordinates = [x,y] };

Robot.prototype.advance = function() {
	/* Move the position one step in the direction the robot is facing */
	var vector = vectors[this.bearingIndex];
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