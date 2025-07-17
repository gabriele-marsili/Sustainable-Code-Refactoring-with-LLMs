"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIRECTIONS = ['north', 'east', 'south', 'west'];
const MOVEMENT_BY_DIRECTION = new Map([
    ['north', [0, 1]],
    ['east', [1, 0]],
    ['south', [0, -1]],
    ['west', [-1, 0]],
]);
const INSTRUCTIONS = {
    L: 'turnLeft',
    R: 'turnRight',
    A: 'advance'
};
class Robot {
    constructor(x = 0, y = 0, direction = 'north') {
        this.orient(direction);
        this.at(x, y);
    }
    orient(direction) {
        if (!DIRECTIONS.includes(direction)) {
            throw 'Invalid Robot Bearing';
        }
        this.bearing = direction;
    }
    turnRight(amount = 1) {
        const currentDirectionIndex = DIRECTIONS.indexOf(this.bearing);
        const newDirectionIndex = (currentDirectionIndex + amount + DIRECTIONS.length) % DIRECTIONS.length;
        this.orient(DIRECTIONS[newDirectionIndex]);
    }
    turnLeft() {
        this.turnRight(-1);
    }
    at(x, y) {
        this.coordinates = [x, y];
    }
    advance() {
        const [x, y] = this.coordinates;
        const [deltaX, deltaY] = MOVEMENT_BY_DIRECTION.get(this.bearing);
        this.coordinates = [x + deltaX, y + deltaY];
    }
    instructions([...shortInstructions]) {
        return shortInstructions.map((letter) => INSTRUCTIONS[letter]);
    }
    evaluate(shortInstructionsString) {
        this.instructions(shortInstructionsString).forEach((instruction) => {
            this[instruction]();
        });
    }
}
exports.default = Robot;
