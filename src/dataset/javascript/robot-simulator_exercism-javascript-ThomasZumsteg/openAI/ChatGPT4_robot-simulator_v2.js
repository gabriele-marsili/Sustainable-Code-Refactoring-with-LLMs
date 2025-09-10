class Robot {
  constructor() {
    this.directions = ['north', 'east', 'south', 'west'];
    this.vectors = { north: [0, 1], east: [1, 0], south: [0, -1], west: [-1, 0] };
    this.coordinates = [0, 0];
    this.bearing = 'north';
  }

  orient(direction) {
    if (!this.directions.includes(direction)) throw "Invalid Robot Bearing";
    this.bearing = direction;
  }

  turnRight() {
    this.bearing = this.directions[(this.directions.indexOf(this.bearing) + 1) % 4];
  }

  turnLeft() {
    this.bearing = this.directions[(this.directions.indexOf(this.bearing) + 3) % 4];
  }

  at(x, y) {
    this.coordinates = [x, y];
  }

  advance() {
    const [dx, dy] = this.vectors[this.bearing];
    this.coordinates[0] += dx;
    this.coordinates[1] += dy;
  }

  instructions(instructionList) {
    return [...instructionList].map((instruction) => {
      switch (instruction) {
        case 'L': return 'turnLeft';
        case 'R': return 'turnRight';
        case 'A': return 'advance';
        default: throw "Invalid Instruction";
      }
    });
  }

  place({ direction, x, y }) {
    this.orient(direction);
    this.at(x, y);
  }

  evaluate(instructionList) {
    for (const action of instructionList) {
      this[action]();
    }
  }
}

export default Robot;