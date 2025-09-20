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
        let name = '';
        for (let i = 0; i < 2; i++) {
            name += Robot.alphabet[Math.floor(Math.random() * 26)];
        }
        for (let i = 0; i < 3; i++) {
            name += Math.floor(Math.random() * 10);
        }
        return name;
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
