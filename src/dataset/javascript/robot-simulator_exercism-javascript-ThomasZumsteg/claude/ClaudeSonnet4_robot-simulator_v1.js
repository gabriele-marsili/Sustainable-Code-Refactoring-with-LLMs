/* A robot to that follows simple instructions */
var Robot = function() {
    this.directionIndex = 0; // Cache direction index instead of string
    this.coordinates = [0, 0]; // Initialize coordinates
}

// Directions the robot can face and associated vectors
var directions = [ 'north', 'east', 'south', 'west' ];
var vectors = [[0, 1], [1, 0], [0, -1], [-1, 0]];

// Create direction lookup map for O(1) access
var directionMap = {};
directions.forEach(function(dir, index) {
    directionMap[dir] = index;
});

// Instructions lookup object
var instructions = {
    'L': 'turnLeft',
    'R': 'turnRight',
    'A': 'advance',
};

Robot.prototype.orient = function(direction) {
    /* Sets the direction of the robot */
    var index = directionMap[direction];
    if(index === undefined)
        throw "Invalid Robot Bearing";
    this.directionIndex = index;
    this.bearing = direction;
};

Robot.prototype.turnRight = function() {
    /* Changes the bearing one step to the right */
    this.directionIndex = (this.directionIndex + 1) & 3; // Use bitwise AND for modulo 4
    this.bearing = directions[this.directionIndex];
};

Robot.prototype.turnLeft = function() {
    /* Changes the bearing one step to the left */
    this.directionIndex = (this.directionIndex + 3) & 3; // Use bitwise AND for modulo 4
    this.bearing = directions[this.directionIndex];
};

/* Sets the robots position */
Robot.prototype.at = function(x, y) { 
    this.coordinates[0] = x;
    this.coordinates[1] = y;
};

Robot.prototype.advance = function() {
    /* Move the position one step in the direction the robot is facing */
    var vector = vectors[this.directionIndex];
    this.coordinates[0] += vector[0];
    this.coordinates[1] += vector[1];
};

Robot.prototype.instructions = function(instruction_list) {
    /* Make a list of instructions from a string */
    var result = new Array(instruction_list.length);
    for(var i = 0; i < instruction_list.length; i++) {
        result[i] = instructions[instruction_list[i]];
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
    var instructionArray = this.instructions(instruction_list);
    for(var i = 0; i < instructionArray.length; i++) {
        this[instructionArray[i]]();
    }
};

export default Robot;