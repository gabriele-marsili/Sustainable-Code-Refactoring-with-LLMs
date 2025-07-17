"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Robot = exports.InvalidInputError = void 0;
class InvalidInputError extends Error {
    constructor(message) {
        super();
        this.message = message || 'Invalid Input';
    }
}
exports.InvalidInputError = InvalidInputError;
const DIRECTIONS = ['north', 'east', 'south', 'west'];
class Robot {
    constructor() {
        this._bearing = 'north';
        this._coordinates = [0, 0];
    }
    get bearing() {
        return this._bearing;
    }
    get coordinates() {
        return this._coordinates;
    }
    isDirection(direction) {
        return DIRECTIONS.includes(direction);
    }
    place(p) {
        if (!this.isDirection(p.direction)) {
            throw new InvalidInputError('Not a direction');
        }
        this._bearing = p.direction;
        this._coordinates = [p.x, p.y];
    }
    evaluate(instructions) {
        instructions.split('').forEach((intr) => {
            let curDirectionIdx = DIRECTIONS.indexOf(this._bearing);
            switch (intr) {
                case 'R':
                    this._bearing =
                        curDirectionIdx + 1 === DIRECTIONS.length ? DIRECTIONS[0] : DIRECTIONS[curDirectionIdx + 1];
                    break;
                case 'L':
                    this._bearing =
                        curDirectionIdx - 1 === -1
                            ? DIRECTIONS[DIRECTIONS.length - 1]
                            : DIRECTIONS[curDirectionIdx - 1];
                    break;
                case 'A':
                    switch (this._bearing) {
                        case 'north':
                            this._coordinates = [this._coordinates[0], this._coordinates[1] + 1];
                            break;
                        case 'east':
                            this._coordinates = [this._coordinates[0] + 1, this._coordinates[1]];
                            break;
                        case 'south':
                            this._coordinates = [this._coordinates[0], this._coordinates[1] - 1];
                            break;
                        case 'west':
                            this._coordinates = [this._coordinates[0] - 1, this._coordinates[1]];
                            break;
                    }
                    break;
            }
        });
    }
}
exports.Robot = Robot;
