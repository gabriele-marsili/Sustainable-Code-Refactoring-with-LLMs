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
            newName = `${this.getRandomLetter()}${this.getRandomLetter()}${this.getRandomNumber()}${this.getRandomNumber()}${this.getRandomNumber()}`;
        } while (Robot._releaseNames.has(newName));
        Robot._releaseNames.add(newName);
        return newName;
    }
    getRandomLetter() {
        return String.fromCharCode(65 + (Math.random() * 26) | 0);
    }
    getRandomNumber() {
        return (Math.random() * 10) | 0;
    }
    get name() {
        return this._name;
    }
    resetName() {
        this._name = this.buildName();
    }
    static releaseNames() {
        return Robot._releaseNames;
    }
}
exports.Robot = Robot;
Robot._releaseNames = new Set();
