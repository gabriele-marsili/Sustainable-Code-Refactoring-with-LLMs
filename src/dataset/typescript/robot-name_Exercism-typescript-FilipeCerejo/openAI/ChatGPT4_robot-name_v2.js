"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Robot = void 0;
class Robot {
    constructor() {
        this._name = this.buildName();
    }
    buildName() {
        let newName;
        do {
            newName = `${Robot.getRandomLetter()}${Robot.getRandomLetter()}${Robot.getRandomNumber()}${Robot.getRandomNumber()}${Robot.getRandomNumber()}`;
        } while (Robot.releaseNames.has(newName));
        Robot.releaseNames.add(newName);
        return newName;
    }
    static getRandomLetter() {
        return Robot.letters[Math.floor(Math.random() * Robot.letters.length)];
    }
    static getRandomNumber() {
        return Robot.numbers[Math.floor(Math.random() * Robot.numbers.length)];
    }
    get name() {
        return this._name;
    }
    resetName() {
        Robot.releaseNames.delete(this._name);
        this._name = this.buildName();
    }
    static releaseNames() {
        return new Set(Robot.releaseNames);
    }
}
exports.Robot = Robot;
Robot.releaseNames = new Set();
Robot.letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
Robot.numbers = Array.from({ length: 10 }, (_, i) => i.toString());
