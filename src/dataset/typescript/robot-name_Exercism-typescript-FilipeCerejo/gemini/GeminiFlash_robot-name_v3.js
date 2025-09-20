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
            newName = this.generateName();
        } while (Robot.releaseNames.has(newName));
        Robot.releaseNames.add(newName);
        return newName;
    }
    generateName() {
        const letter1 = Robot.alphabet[Math.floor(Math.random() * 26)];
        const letter2 = Robot.alphabet[Math.floor(Math.random() * 26)];
        const number = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `${letter1}${letter2}${number}`;
    }
    get name() {
        return this._name;
    }
    resetName() {
        this._name = this.buildName();
    }
    static releaseNamesSet() {
        return Robot.releaseNames;
    }
}
exports.Robot = Robot;
Robot.releaseNames = new Set();
Robot.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
