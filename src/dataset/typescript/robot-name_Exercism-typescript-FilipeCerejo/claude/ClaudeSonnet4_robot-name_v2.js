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
            const letter1 = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
            const letter2 = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
            const num1 = Math.floor(Math.random() * 10);
            const num2 = Math.floor(Math.random() * 10);
            const num3 = Math.floor(Math.random() * 10);
            newName = letter1 + letter2 + num1 + num2 + num3;
        } while (Robot.ReleaseNames.has(newName));
        Robot.ReleaseNames.add(newName);
        return newName;
    }
    get name() {
        return this._name;
    }
    resetName() {
        Robot.ReleaseNames.delete(this._name);
        this._name = this.buildName();
    }
    static releaseNames() {
        return Robot.ReleaseNames;
    }
}
exports.Robot = Robot;
Robot.ReleaseNames = new Set();
