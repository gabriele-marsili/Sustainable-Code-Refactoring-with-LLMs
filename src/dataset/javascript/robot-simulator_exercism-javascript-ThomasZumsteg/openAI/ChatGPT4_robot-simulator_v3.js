var Robot = function() {};

const directions = ['north', 'east', 'south', 'west'];
const vectors = { north: [0, 1], east: [1, 0], south: [0, -1], west: [-1, 0] };

Robot.prototype.orient = function(direction) {
    if (!vectors.hasOwnProperty(direction)) throw "Invalid Robot Bearing";
    this.bearing = direction;
};

Robot.prototype.turnRight = function() {
    this.bearing = directions[(directions.indexOf(this.bearing) + 1) % directions.length];
};

Robot.prototype.turnLeft = function() {
    this.bearing = directions[(directions.indexOf(this.bearing) + directions.length - 1) % directions.length];
};

Robot.prototype.at = function(x, y) {
    this.coordinates = [x, y];
};

Robot.prototype.advance = function() {
    const [dx, dy] = vectors[this.bearing];
    this.coordinates[0] += dx;
    this.coordinates[1] += dy;
};

const instructionsMap = {
    L: 'turnLeft',
    R: 'turnRight',
    A: 'advance',
};

Robot.prototype.instructions = function(instruction_list) {
    return [...instruction_list].map(instruction => instructionsMap[instruction]);
};

Robot.prototype.place = function({ direction, x, y }) {
    this.orient(direction);
    this.at(x, y);
};

Robot.prototype.evaluate = function(instruction_list) {
    this.instructions(instruction_list).forEach(action => this[action]());
};

export default Robot;