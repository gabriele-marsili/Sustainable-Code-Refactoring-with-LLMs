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
            newName = `${Robot.randomString(Robot.LETTERS, 2)}${Robot.randomString(Robot.DIGITS, 3)}`;
        } while (Robot.releaseNames.has(newName));
        Robot.releaseNames.add(newName);
        return newName;
    }
    static randomString(source, length) {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += source.charAt(Math.floor(Math.random() * source.length));
        }
        return result;
    }
    get name() {
        return this._name;
    }
    resetName() {
        this._name = this.buildName();
    }
    static releaseNames() {
        return Robot.releaseNames;
    }
}
exports.Robot = Robot;
Robot.releaseNames = new Set();
Robot.LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
Robot.DIGITS = "0123456789";
