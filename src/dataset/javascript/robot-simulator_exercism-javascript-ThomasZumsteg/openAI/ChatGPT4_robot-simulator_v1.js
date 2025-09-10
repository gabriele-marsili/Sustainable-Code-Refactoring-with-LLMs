/* A robot that follows simple instructions */
class Robot {
  constructor() {
    this.bearing = null;
    this.coordinates = [0, 0];
  }

  // Directions the robot can face and associated vectors
  static directions = ['north', 'east', 'south', 'west'];
  static vectors = { north: [0, 1], east: [1, 0], south: [0, -1], west: [-1, 0] };

  orient(direction) {
    /* Sets the direction of the robot */
    if (!Robot.directions.includes(direction)) throw "Invalid Robot Bearing";
    this.bearing = direction;
  }

  turnRight() {
    /* Changes the bearing one step to the right */
    this.bearing = Robot.directions[(Robot.directions.indexOf(this.bearing) + 1) % 4];
  }

  turnLeft() {
    /* Changes the bearing one step to the left */
    this.bearing = Robot.directions[(Robot.directions.indexOf(this.bearing) + 3) % 4];
  }

  at(x, y) {
    /* Sets the robot's position */
    this.coordinates = [x, y];
  }

  advance() {
    /* Move the position one step in the direction the robot is facing */
    const [dx, dy] = Robot.vectors[this.bearing];
    this.coordinates[0] += dx;
    this.coordinates[1] += dy;
  }

  instructions(instruction_list) {
    /* Make a list of instructions from a string */
    return [...instruction_list].map((instruction) => {
      if (instruction === 'L') return 'turnLeft';
      if (instruction === 'R') return 'turnRight';
      if (instruction === 'A') return 'advance';
    });
  }

  place(args) {
    /* Initialize the direction and location of a robot */
    this.orient(args.direction);
    this.at(args.x, args.y);
  }

  evaluate(instruction_list) {
    /* Robot performs a series of instructions */
    for (const action of this.instructions(instruction_list)) {
      this[action]();
    }
  }
}

export default Robot;