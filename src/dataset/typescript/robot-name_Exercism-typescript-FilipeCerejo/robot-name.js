"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Robot = void 0;
class Robot {
    constructor() {
        Robot.ReleaseNames = new Set();
        this._name = this.buildName();
    }
    buildName() {
        let newName;
        do {
            newName = '';
            newName += this.getRandomLetter();
            newName += this.getRandomLetter();
            newName += this.getRandomNumber();
            newName += this.getRandomNumber();
            newName += this.getRandomNumber();
        } while (Robot.ReleaseNames.has(newName));
        Robot.ReleaseNames.add(newName);
        return newName;
    }
    getRandomLetter() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }
    getRandomNumber() {
        return Math.floor(Math.random() * 10);
    }
    get name() {
        return this._name;
    }
    resetName() {
        //Robot.ReleaseNames.delete(this._name);
        this._name = this.buildName();
    }
    static releaseNames() {
        return Robot.ReleaseNames;
    }
}
exports.Robot = Robot;
