const Robot = function() {
  this.bearingIndex = 0;
  this.coordinates = [0, 0];
};

const directions = ['north', 'east', 'south', 'west'];
const vectors = [[0, 1], [1, 0], [0, -1], [-1, 0]];
const directionMap = new Map([
  ['north', 0],
  ['east', 1], 
  ['south', 2],
  ['west', 3]
]);

const instructionMap = new Map([
  ['L', 'turnLeft'],
  ['R', 'turnRight'],
  ['A', 'advance']
]);

Robot.prototype.orient = function(direction) {
  const index = directionMap.get(direction);
  if (index === undefined) {
    throw "Invalid Robot Bearing";
  }
  this.bearingIndex = index;
  this.bearing = direction;
};

Robot.prototype.turnRight = function() {
  this.bearingIndex = (this.bearingIndex + 1) & 3;
  this.bearing = directions[this.bearingIndex];
};

Robot.prototype.turnLeft = function() {
  this.bearingIndex = (this.bearingIndex + 3) & 3;
  this.bearing = directions[this.bearingIndex];
};

Robot.prototype.at = function(x, y) {
  this.coordinates[0] = x;
  this.coordinates[1] = y;
};

Robot.prototype.advance = function() {
  const vector = vectors[this.bearingIndex];
  this.coordinates[0] += vector[0];
  this.coordinates[1] += vector[1];
};

Robot.prototype.instructions = function(instruction_list) {
  const result = new Array(instruction_list.length);
  for (let i = 0; i < instruction_list.length; i++) {
    result[i] = instructionMap.get(instruction_list[i]);
  }
  return result;
};

Robot.prototype.place = function(args) {
  this.orient(args.direction);
  this.at(args.x, args.y);
};

Robot.prototype.evaluate = function(instruction_list) {
  for (let i = 0; i < instruction_list.length; i++) {
    const action = instructionMap.get(instruction_list[i]);
    this[action]();
  }
};

export default Robot;